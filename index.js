//cai dat du an nodejs
//npm init -y
//cai dat cac package can thiet
//npm i express dotenv cors nodemon

//express de nhan request ti client
//dotenv de doc file mo truong
//cors de quan ly url
//nodemon tu dong khoi dong lai sever khi thay doi file

//dung sequelize de quan ly csdl
//npm install --save-dev sequelize-cli
//cd src
//npx sequelize-cli init  nho tao trong src

//Mysql
//npm install --save mysql2

//Babel de co the tuong thich voi kieu code js cu/moi
//npm install --save-dev @babel/core
//npm install --save-dev @babel/preset-env


//tao Model + Migration
//npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

//sau khi tao Model va Migration
//npx sequelize-cli db:migrate de di tru du lieu qua mysql server

//tao id cho cac object
//npm i uuid

//cloudinary
//multer tuong tac voi cloudinary
//npm i cloudinary multer multer-storage-cloudinary

//import
//khi dung babel co the import bang cach nay

import express from 'express'
import cors from 'cors'
require('dotenv').config()

import initRoutes from './src/routes'

require('./connection_database')

const app = express()

//tao 1 file .env de chua cac bien moi truong
//config server
app.use(cors({
    origin: process.env.CLIENT_URL, //doc file .env de lay gia tri cua CLIENT_URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], //cac phuong thuc ma server cho phep
}));

app.use(express.json()); //giup server doc duoc du lieu ma client gui len dang json
app.use(express.urlencoded({extended: true})) //neu client gui len du lieu dang obj thi se convert ve dang json

//routes
initRoutes(app)

//doc file .env de lay gia tri cua PORT, neu khong lay duoc thi se lay gia tri mac dinh la 5000
const PORT = process.env.PORT || 5000

const listener = app.listen(PORT, () => {
    console.log(`Server is running on port ` + listener.address().port) //cho app chay tren port 5000
});


//npm run dev de chay server
//ctrl + c an y de dung server