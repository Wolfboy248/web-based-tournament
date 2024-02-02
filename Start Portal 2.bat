@echo off
taskkill /f /im portal2.exe
timeout /t 3
start "" "steam://rungameid/620// -netconport 60 -novid -textmode +plugin_load sar +ghost_name SERVER"
