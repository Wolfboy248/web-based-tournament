@echo off
start "Chrome" chrome --new-window --app=http://localhost:3000/dashboard
cd .\local-server\
start /MIN "Server000" cmd /c "node ."
cd ..
