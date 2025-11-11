@echo off
REM Quick Start Script for Recipe Research Agent

echo.
echo ============================================
echo   Recipe Research Agent - Quick Start
echo ============================================
echo.

if not exist ".env" (
    echo ERROR: .env file not found!
    echo.
    echo Create .env with:
    echo   OPENAI_API_KEY=sk-your-key-here
    echo   MODEL_REASONING=gpt-4o
    echo   MODEL_CHEAP=gpt-4o-mini
    echo.
    exit /b 1
)

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Running Recipe Research Agent...
echo.

if "%1"=="" (
    echo [Using default query]
    echo.
    call npx ts-node src/index.ts
) else (
    echo [Custom query: %*]
    echo.
    call npx ts-node src/index.ts %*
)
