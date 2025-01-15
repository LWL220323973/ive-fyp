REM 啟動Admin前端
cd admin
start pwsh -NoExit -Command "set PORT=3000; npm start"

REM 啟動Customer前端
@REM cd ../customer
@REM start pwsh -NoExit -Command "set PORT=3001; npm start"

REM 返回根目錄
cd ../server

REM 啟動後端
start pwsh -NoExit -Command "mvn clean install; mvn spring-boot:run"