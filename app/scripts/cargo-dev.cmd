@echo off
rem ============================================================================
rem cargo-dev.cmd — envoltorio de cargo para esta máquina (FASE 1, ADR-0001).
rem
rem Contexto: la instalación MSVC de VS 18 Community de este equipo está
rem incompleta (solo lib/onecore; falta lib/x64/msvcrt.lib) y rustc autodetecta
rem esa instancia, fallando el enlazado con LNK1104. Este script compila contra
rem las VS 2022 Build Tools (MSVC 14.44 completas), sin modificar la instalación
rem de Visual Studio del propietario.
rem
rem En CI (windows-latest) y en equipos con MSVC completo NO hace falta: `cargo`
rem funciona directamente. Aquí se usa:  scripts\cargo-dev.cmd check|build|...
rem ============================================================================
setlocal
set "BT=C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools"

if not exist "%BT%\VC\Auxiliary\Build\vcvars64.bat" (
  echo [cargo-dev] Build Tools no encontradas; ejecutando cargo sin entorno especial...
  cargo %*
  exit /b %ERRORLEVEL%
)

call "%BT%\VC\Auxiliary\Build\vcvars64.bat" >nul 2>&1

rem Enlazador explícito de las Build Tools (MSVC más reciente disponible):
set "MSVC_DIR="
for /d %%v in ("%BT%\VC\Tools\MSVC\*") do set "MSVC_DIR=%%v"
set "CARGO_TARGET_X86_64_PC_WINDOWS_MSVC_LINKER=%MSVC_DIR%\bin\HostX64\x64\link.exe"

echo [cargo-dev] MSVC: %MSVC_DIR%
cd /d "%~dp0..\src-tauri"
cargo %*
exit /b %ERRORLEVEL%
