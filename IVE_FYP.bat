REM 啟動前端
cd admin
start cmd /k "npm start"

REM 返回根目錄
cd ..

REM 啟動後端
start cmd /k "node server/index.js"