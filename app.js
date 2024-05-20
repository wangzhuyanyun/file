"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const index_1 = require("./routes/index");
const fs = require('fs');
const PDFParser = require('pdf-parse');
const app = express();
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
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'upload')));
app.use(index_1.default);
app.listen(8080, () => {
    console.log("http://127.0.0.1:8081");
});
//# sourceMappingURL=app.js.map