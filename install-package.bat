@echo off


echo -----------------------------------------------
echo Installing API dependencies
echo -----------------------------------------------
cd API\PRASINSTA-API
call npm install


cd ..

echo -----------------------------------------------
echo Installing root directory dependencies
echo -----------------------------------------------
npm install

echo All dependencies installed successfully.
