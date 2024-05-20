"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const PDFParser = require('pdf-parse');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const md5 = require('md5');
const upload_file = require("./upload_file");
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "index.html"));
});
router.post("/getSize", upload_file.getSize);
router.post("/video", upload_file.video);
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
        cb(null, md5(Date.now() + file.originalname) + file.originalname.substring(file.originalname.lastIndexOf(".")));
    }
});
var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    }
    catch (e) {
        fs.mkdirSync(folder);
    }
};
var uploadFolder = './upload/';
createFolder(uploadFolder);
var upload = multer({ storage });
router.post('/upload', upload.single('file'), function (req, res, next) {
    const file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    const pdfFilePath = path.join(__dirname, "../upload", file.filename);
    console.log('保存路径：%s', pdfFilePath);
    fs.readFile(pdfFilePath, (err, pdfBuffer) => {
        if (err) {
            return;
        }
        PDFParser(pdfBuffer).then((pdfData) => {
            const pages = pdfData.text.split('\n\n');
            console.log(pages);
            let str;
            for (let i = 1; i < pages.length; i++)
                str = str + pages[i];
            console.log(str);
        });
    });
    res.send(Object.assign({}, file));
});
exports.default = router;
//# sourceMappingURL=index.js.map