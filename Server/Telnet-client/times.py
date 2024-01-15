import telnetlib3, asyncio, sys, json, os

if len(sys.argv) < 4:
    print('Usage: [port] [player one] [player two]')
    exit()

print('notes:\n  ensure portal 2 is running with the launch option \"-netconport [port]\"')
print('  you may want to bind something to the \"advance\" alias to advance to the next round!')
print('  use the \"setpb\" alias to override someones time on a round, ex: \"setpb alexz 1 20.30\"')
print('  use the \"setmap\" alias to set the map, ex: \"setmap sp_a1_intro4\"')
print('  when this script runs the times in the json are wiped!')

port, p1, p2 = sys.argv[1], sys.argv[2], sys.argv[3]
currentRound, currentMap = 1, ''
info_path = os.path.join(os.path.dirname(__file__), '../maps/info.json')

info = {
    'player1': p1,
    'player2': p2,
    'round1P1PB': '9999', # frontend should not show 9999
    'round1P2PB': '9999',
    'round2P1PB': '9999',
    'round2P2PB': '9999',
    'round3P1PB': '9999',
    'round3P2PB': '9999',
    'name': 'FFO Tournament 2024',
    'current_map': currentMap
}

def write():
    with open(info_path, 'w') as outfile:
        outfile.write(json.dumps(info, indent=4))

def unformatTime(text: str):
    if text.find(':') != -1:
        return int(text.split(':')[0]) * 60 + float(text.split(':')[1])
    return float(text)

async def shell(reader: telnetlib3.TelnetReader, writer: telnetlib3.TelnetWriter):
    global currentRound
    global currentMap
    console: str = ''
    print('\nConnected!\n')

    writer.write('sar_alias advance \"echo advance round\"\n')
    writer.write('sar_function setmap echo "setmap $1"\n')
    writer.write('sar_function setpb echo "forcepb $1 $2 $3$4$5$6\n')
    writer.write('ghost_disconnect; ghost_name pb_grabber; ghost_set_color FF0000; restart_level\n')

    while True:
        data = await reader.read(1024)
        if not data:
            break

        console += data
        lines = console.split('\r\n')

        if len(lines) > 1:
            for line in lines:
                if 'has finished on' in line:
                    split = line.split(' has finished on ')
                    name, playerMap, time = split[0], split[1].split()[0], ''.join(split[1].split('in ')[1::])[:-1]
                    print(f'name: {name} playerMap: {playerMap} time: {time}')
                    fTime = unformatTime(time)

                    if playerMap != currentMap:
                        continue

                    if name == p1 and fTime < unformatTime(info[f'round{str(currentRound)}P1PB']):
                        print(f'New pb for {name}: {time}')
                        info[f'round{str(currentRound)}P1PB'] = time
                    elif name == p2 and fTime < unformatTime(info[f'round{str(currentRound)}P2PB']):
                        print(f'New pb for {name}: {time}')
                        info[f'round{str(currentRound)}P2PB'] = time

                    write()
                elif line.startswith('forcepb'):
                    split = line.split()
                    name, round, time = split[1], split[2], ''.join(split[3::])
                    print(f'forced pb for {name}: {time}')
                    if name == p1:
                        info[f'round{round}P1PB'] = time
                    elif name == p2:
                        info[f'round{round}P2PB'] = time
                    
                    write()
                elif line.startswith('advance round'):
                    if currentRound == 3:
                        print('already at round 3!')
                        continue

                    currentRound += 1
                    print(f'advancing to round: {str(currentRound)}')
                elif line.startswith('setmap'):
                    currentMap = line.split()[1]
                    info['current_map'] = currentMap
                    print(f'set map to: {currentMap}\n')
                    write()


        console = lines[-1]


loop = asyncio.get_event_loop()
coro = telnetlib3.open_connection('localhost', port, shell=shell)
reader, writer = loop.run_until_complete(coro)
loop.run_until_complete(writer.protocol.waiter_closed)