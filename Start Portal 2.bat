@echo off
taskkill /f /im portal2.exe
timeout /t 6
start "" "steam://rungameid/620// -netconport 60 -novid -textmode"
