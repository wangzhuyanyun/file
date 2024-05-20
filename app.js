"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const index_1 = require("./routes/index");
const fs = require('fs');
const PDFParser = require('pdf-parse');
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'upload')));
app.use(index_1.default);
app.listen(8080, () => {
    console.log("http://127.0.0.1:8080");
});
//# sourceMappingURL=app.js.map