import * as express from 'express';
import * as path from 'path';
import * as bodyParser from"body-parser";
import routes from './routes/index';
import db from './routes/db';
const fs = require('fs');
const PDFParser = require('pdf-parse');
// 引入上传文件逻辑代码

const app = express();
// 处理所有响应，设置跨域
app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With ");
    res.header("X-Powered-By", " 3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.use(bodyParser.json({ type: "application/*+json" }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(express.json());
//开放静态资源
app.use(express.static(path.join(__dirname, 'upload')));

app.use(routes)





//app.set('port', process.env.PORT || 3000);
//app.get("/", (req, res) => {
//    res.sendFile(path.join(__dirname, "views", "index.html"));
//})
app.listen(8080, () => {
    console.log("http://127.0.0.1:8081");
});