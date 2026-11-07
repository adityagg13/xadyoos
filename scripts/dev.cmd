@echo off
rem Starts the dev server with the project-local Node runtime in .tools\,
rem so it runs the same way on a machine with no Node, npm or Bun on PATH.
rem Extra arguments are forwarded to Vite, e.g.  scripts\dev.cmd --port 5174
setlocal
set "ROOT=%~dp0.."
set "NODE="

for /d %%D in ("%ROOT%\.tools\node-v*") do (
  if exist "%%D\node.exe" set "NODE=%%D\node.exe"
)

if not defined NODE (
  where node >nul 2>nul
  if not errorlevel 1 set "NODE=node"
)

if not defined NODE (
  echo Could not find a Node runtime. Expected .tools\node-v*\node.exe.
  echo Install Node, or extract it into .tools\ and try again.
  exit /b 1
)

"%NODE%" "%ROOT%\scripts\dev.mjs" %*
exit /b %errorlevel%
