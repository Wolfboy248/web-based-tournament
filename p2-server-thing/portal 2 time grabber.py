import os, time, json
from telnetlib import Telnet
steampath="D:\games\Steam\steam.exe"
os.system('cmd /c "' + steampath + ' -applaunch 620 -novid -console -netconport 60"')
time.sleep(10)
p2 = Telnet('localhost', 60)
command = "echo CONNECTION RECEIVED"
p2.write(command.encode('ascii') +b"\n")


best1=1000000.0
best2=1000000.0

with open('./maps/info.json') as f:
    data=json.load(f)

while (True):
    console=p2.read_very_eager().decode('ascii')
    if (console!=""):
        if ("has finished on" in console):
            times=console.split()
            if (times[-3]==data["current_map"]):

                if (times[0]==data["player1"]):
                    if (float(times[-1])<best1):
                        best1=float(times[-1])
                        with open('./player1pb.txt', 'w') as f:
                            f.write(str(best1))
                            f.close()
                elif (times[0]==data["player2"]):
                    if (float(times[-1])<best2):
                        best2=float(times[-1])
                        with open('./player2pb.txt', 'w') as f:
                            f.write(str(best2))
                            f.close()
                


