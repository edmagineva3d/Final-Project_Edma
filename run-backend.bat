@echo off
echo Starting GatherCo Conference Event Planner Backend (.NET 10 Web API)...
cd /d "%~dp0backend\Api"
dotnet run --launch-profile http
pause

