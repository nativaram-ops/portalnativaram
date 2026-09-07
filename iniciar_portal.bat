@echo off
chcp 65001 >nul
title Nativaram Brasil — Portal do Associado
cd /d "%~dp0"

echo =======================================================
echo    COOPERATIVA ETNOBOTÂNICA NATIVARAM BRASIL
echo    Portal do Associado & Salvaguarda Litúrgica
echo =======================================================
echo.

:: Verifica se a porta 3000 ja esta ativa
powershell -NoProfile -Command "$conn = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue; if ($conn) { exit 0 } else { exit 1 }"
if %errorlevel% equ 0 (
    echo [OK] O servidor do portal ja esta ativo na porta 3000.
    echo Abrindo o portal no navegador padrao...
    start http://localhost:3000
    timeout /t 2 >nul
    exit /b 0
)

echo [1/2] Iniciando servidor de desenvolvimento Next.js...
echo [2/2] O portal sera aberto automaticamente no navegador.
echo.
echo Acesse: http://localhost:3000
echo Pressione Ctrl+C para encerrar o servidor quando desejar.
echo =======================================================
echo.

:: Dispara abertura do navegador com verificacao de prontidao em background
start "" powershell -NoProfile -WindowStyle Hidden -Command "$url = 'http://localhost:3000'; for ($i = 0; $i -lt 30; $i++) { Start-Sleep -Seconds 1; try { $res = Invoke-WebRequest -Uri $url -TimeoutSec 2 -UseBasicParsing; if ($res.StatusCode -eq 200) { Start-Process $url; break } } catch {} }"

:: Inicia o Next.js
cmd.exe /c npm run dev

pause
