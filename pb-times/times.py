import telnetlib3, asyncio, sys, json, time

if len(sys.argv) < 5:
    print('Usage: [port] [map name] [player one] [player two]')
    exit()

print('notes:\n  ensure portal 2 is running with the launch option \'-netconport [port]\'')
print('  you may want to bind something to \"echo advance round\" to start saving times to the next round.')
print('  when this script runs the times in the json are wiped!')

port, currentMap, p1, p2 = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
currentRound = 1

info = {
    'player1': p1,
    'player2': p2,
    'round1P1PB': '0.00',
    'round1P2PB': '0.00',
    'round2P1PB': '0.00',
    'round2P2PB': '0.00',
    'round3P1PB': '0.00',
    'round3P2PB': '0.00',
}

with open('info.json', 'w') as outfile:
    outfile.write(json.dumps(info, indent=4))

def unformatTime(text: str):
    if text.find(':') != -1:
        return int(text.split(':')[0]) * 60 + float(text.split(':')[1])
    return float(text)

def formatTime(num: float):
    return time.strftime('%-M:%S', num) + '.00' if num.is_integer() else ''

async def shell(reader: telnetlib3.TelnetReader, writer: telnetlib3.TelnetWriter):
    global currentRound
    console: str = ''
    print('\nConnected!\n')

    while True:
        data = await reader.read(1024)
        if not data:
            break

        console += data
        lines = console.split('\r\n')

        if len(lines) > 1:
            for line in lines:
                if 'has finished on' in line:
                    split = line.split(' ')
                    name, playerMap, time = split[0], split[4], ''.join(split[6::])
                    fTime = unformatTime(time)

                    if playerMap != currentMap:
                        continue

                    if name == p1 and fTime > unformatTime(info[f'round{str(currentRound)}P1PB']):
                        print(f'New pb for {name}: ${time}')
                        info[f'round{str(currentRound)}P1PB'] = time
                    elif name == p2 and fTime > unformatTime(info[f'round{str(currentRound)}P2PB']):
                        print(f'New pb for {name}: {time}')
                        info[f'round{str(currentRound)}P2PB'] = time

                    with open('info.json', 'w') as outfile:
                        outfile.write(json.dumps(info, indent=4))
                elif line.startswith('advance round'):
                    if currentRound == 3:
                        print('already at round 3!')
                        continue

                    currentRound += 1
                    print(f'advancing to round: {str(currentRound)}')


        console = lines[-1]


loop = asyncio.get_event_loop()
coro = telnetlib3.open_connection('localhost', port, shell=shell)
reader, writer = loop.run_until_complete(coro)
loop.run_until_complete(writer.protocol.waiter_closed)