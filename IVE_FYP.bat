REM 啟動Admin前端
cd admin
if not exist node_modules (
    echo Installing npm dependencies for admin...
    npm install--legacy-peer-deps
)
start pwsh -NoExit -Command "$env:PORT=3000; npm start"

REM 啟動Customer前端
cd ../customer
if not exist node_modules (
    echo Installing npm dependencies for customer...
    npm install --legacy-peer-deps
)
start pwsh -NoExit -Command "$env:PORT=3001; npm start"

REM 返回根目錄
cd ../server

REM 啟動後端
start pwsh -NoExit -Command "mvn clean install; mvn spring-boot:run"