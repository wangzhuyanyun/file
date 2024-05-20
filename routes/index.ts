
import express = require('express');
import * as path from 'path';
const PDFParser = require('pdf-parse');
//const pdfjs = require('pdfjs-dist');
//const { PDFDocument } = require('pdf-lib');
const router = express.Router();
const fs = require('fs'); //文件
const multer = require('multer');
const md5 = require('md5');

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "index.html"));
})

// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// 接收到文件后输出的保存路径（若不存在则需要创建）
		cb(null, 'upload/');
	},
	filename: function (req, file, cb) {
		// 将保存文件名设置为 时间戳 + 文件原始名.
		// file.originalname   是文件名+后缀
		// file.originalname.substring(file.originalname.lastIndexOf("."))  这里是拿到文件的后缀
		cb(null, md5(Date.now() + file.originalname) + file.originalname.substring(file.originalname.lastIndexOf(".")));  //对当前时间戳 加文件名取MD5 加上后缀名
		// cb(null, Date.now() + "-" + file.originalname);
	}
});
// 创建文件夹 
var createFolder = function (folder) {
	try {
		// 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
		// 如果文件路径不存在将会抛出错误"no such file or directory"
		fs.accessSync(folder);
	} catch (e) {
		// 文件夹不存在，以同步的方式创建文件目录。
		fs.mkdirSync(folder);
	}
};
var uploadFolder = './upload/';   //文件按照日期分割创建文件夹
createFolder(uploadFolder);
// 创建 multer 对象
var upload = multer({ storage });

/* 请求接口 */
router.post('/upload', upload.single('file'), function  (req:any, res, next) {
	const file = req.file;
	console.log('文件类型：%s', file.mimetype);
	console.log('原文件名：%s', file.originalname);
	console.log('文件大小：%s', file.size);
	// 接收文件成功后返回数据给前端
	const pdfFilePath = path.join(__dirname, "../upload", file.filename)
	console.log('保存路径：%s', pdfFilePath);
	fs.readFile(pdfFilePath, (err, pdfBuffer) => {
		if (err) {
			//console.log(err);
			return;
		}
		PDFParser(pdfBuffer).then((pdfData) => {
			const pages = pdfData.text.split('\n\n');
			console.log(pages);
			let str;
			for (let i = 1; i < pages.length; i++)
				str = str + pages[i]
			console.log(str)
		});
	});
	res.send({ ...file })
});

export default router;