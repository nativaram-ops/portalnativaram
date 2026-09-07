@echo off
title Login NotebookLM
cd /d "%~dp0"
echo ========================================================
echo   Autenticacao Google NotebookLM
echo ========================================================
echo.
echo Uma janela do Chromium sera aberta.
echo Faca o login na sua conta Google que tem acesso ao NotebookLM.
echo Assim que o login for concluido, as credenciais serao salvas automaticamente.
echo.
.agent\venv\Scripts\notebooklm.exe login
echo.
echo Pressione qualquer tecla para fechar esta janela...
pause >nul
