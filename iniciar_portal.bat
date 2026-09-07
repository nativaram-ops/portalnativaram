@echo off
chcp 65001 >nul
title Nativaram Brasil — Portal do Associado
cd /d "%~dp0"

echo =======================================================
echo    COOPERATIVA ETNOBOTÂNICA NATIVARAM BRASIL
echo    Portal do Associado & Salvaguarda Litúrgica
echo =======================================================
echo.

:: 1. Verifica se o portal ja esta ativo e respondendo com HTTP 200
curl -I -s http://localhost:3000 | findstr "200" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] O servidor do portal ja esta ativo e saudavel na porta 3000.
    echo Abrindo o portal no navegador padrao...
    start http://localhost:3000
    timeout /t 2 >nul
    exit /b 0
)

echo [1/2] Inicializando servidor Turbopack (Next.js 15)...
echo [2/2] O portal sera aberto automaticamente assim que o servidor estiver pronto.
echo.
echo Acesse: http://localhost:3000
echo Pressione Ctrl+C para encerrar o servidor quando desejar.
echo =======================================================
echo.

:: 2. Dispara abertura automatica do navegador quando a porta 3000 responder 200 OK
start "" powershell -NoProfile -WindowStyle Hidden -Command "for ($i=0; $i -lt 40; $i++) { Start-Sleep -Seconds 1; try { $res = [System.Net.WebRequest]::Create('http://localhost:3000').GetResponse(); if ([int]$res.StatusCode -eq 200) { Start-Process 'http://localhost:3000'; $res.Close(); break } } catch {} }"

:: 3. Inicia o servidor com auto-cura de porta e Turbopack via scripts/dev.mjs
cmd.exe /c npm run dev

pause
