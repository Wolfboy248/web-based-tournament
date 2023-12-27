@echo off
taskkill /f /im portal2.exe
timeout /t 1
cls
echo give player 1
set /p player1= Player 1 
echo give player 2
set /p player2= Player 2 

cd maps
start /MIN "WebServer000" cmd /c "python -m http.server 300"
cd ..
cd Discord-bot
start /MIN "DiscordBot000" cmd /c "node src/index.js"
cd ..
start "" "steam://rungameid/620// -netconport 60 -novid"
TIMEOUT /T 6
start /MIN "P2Grabber000" cmd /c "python pb-times/times.py 60 %player1% %player2%"
pause
taskkill /f /fi "WindowTitle eq WebServer000" /T
taskkill /f /fi "WindowTitle eq DiscordBot000" /T
taskkill /f /fi "WindowTitle eq P2Grabber000" /T
taskkill /f /fi "WindowTitle eq WebServer000" /T
taskkill /f /fi "WindowTitle eq DiscordBot000" /T
taskkill /f /fi "WindowTitle eq P2Grabber000" /T
taskkill /f /fi "WindowTitle eq Select WebServer000" /T
taskkill /f /fi "WindowTitle eq Select DiscordBot000" /T
taskkill /f /fi "WindowTitle eq Select P2Grabber000" /T
taskkill /f /fi "WindowTitle eq Select WebServer000" /T
taskkill /f /fi "WindowTitle eq Select DiscordBot000" /T
taskkill /f /fi "WindowTitle eq Select P2Grabber000" /T