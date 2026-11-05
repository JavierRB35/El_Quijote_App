@echo off
rem ============================================================================
rem tauri-dev.cmd — lanza `npm run tauri dev` con el entorno MSVC correcto.
rem
rem Contexto (ADR-0001, nota de entorno): el MSVC de VS 18 Community de esta
rem máquina está incompleto (falta lib\x64\msvcrt.lib) y rustc lo autodetecta,
rem por lo que un `npm run tauri dev` directo falla en el enlazado (LNK1104).
rem Este script activa las VS 2022 Build Tools (MSVC 14.44 completas) y fija el
rem enlazador, sin tocar la instalación de Visual Studio del propietario.
rem
rem Uso (desde la raíz del repo o desde app\):
rem     scripts\tauri-dev.cmd          (cmd / PowerShell)
rem     cmd //c scripts/tauri-dev.cmd  (Git Bash)
rem En CI (windows-latest) o en equipos con MSVC completo: npm run tauri dev.
rem ============================================================================
setlocal
set "BT=C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools"

if not exist "%BT%\VC\Auxiliary\Build\vcvars64.bat" (
  echo [tauri-dev] Build Tools no encontradas; lanzando tauri dev sin entorno especial...
  cd /d "%~dp0.."
  npm run tauri dev
  exit /b %ERRORLEVEL%
)

call "%BT%\VC\Auxiliary\Build\vcvars64.bat" >nul 2>&1
set "MSVC_DIR="
for /d %%v in ("%BT%\VC\Tools\MSVC\*") do set "MSVC_DIR=%%v"
set "CARGO_TARGET_X86_64_PC_WINDOWS_MSVC_LINKER=%MSVC_DIR%\bin\HostX64\x64\link.exe"

echo [tauri-dev] MSVC: %MSVC_DIR%
cd /d "%~dp0.."
npm run tauri dev
exit /b %ERRORLEVEL%
