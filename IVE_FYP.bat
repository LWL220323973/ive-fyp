REM 啟動Admin前端
cd admin
start cmd /k "set PORT=3000 && npm start"

REM 啟動Customer前端
cd ../customer
start cmd /k "set PORT=3001 && npm start"

REM 返回根目錄
cd ..

REM 啟動後端
start cmd /k "set PORT=3002 && node server/index.js"