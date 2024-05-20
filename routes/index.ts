
import express = require('express');
import * as path from 'path';
const PDFParser = require('pdf-parse');
//const pdfjs = require('pdfjs-dist');
//const { PDFDocument } = require('pdf-lib');
const router = express.Router();
const fs = require('fs'); //�ļ�
const multer = require('multer');
const md5 = require('md5');

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "index.html"));
})

// ʹ��Ӳ�̴洢ģʽ���ô�Ž��յ����ļ���·���Լ��ļ���
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// ���յ��ļ�������ı���·����������������Ҫ������
		cb(null, 'upload/');
	},
	filename: function (req, file, cb) {
		// �������ļ�������Ϊ ʱ��� + �ļ�ԭʼ��.
		// file.originalname   ���ļ���+��׺
		// file.originalname.substring(file.originalname.lastIndexOf("."))  �������õ��ļ��ĺ�׺
		cb(null, md5(Date.now() + file.originalname) + file.originalname.substring(file.originalname.lastIndexOf(".")));  //�Ե�ǰʱ��� ���ļ���ȡMD5 ���Ϻ�׺��
		// cb(null, Date.now() + "-" + file.originalname);
	}
});
// �����ļ��� 
var createFolder = function (folder) {
	try {
		// ���� path ָ�����ļ���Ŀ¼���û�Ȩ��,������������ļ��Ƿ����
		// ����ļ�·�������ڽ����׳�����"no such file or directory"
		fs.accessSync(folder);
	} catch (e) {
		// �ļ��в����ڣ���ͬ���ķ�ʽ�����ļ�Ŀ¼��
		fs.mkdirSync(folder);
	}
};
var uploadFolder = './upload/';   //�ļ��������ڷָ���ļ���
createFolder(uploadFolder);
// ���� multer ����
var upload = multer({ storage });

/* ����ӿ� */
router.post('/upload', upload.single('file'), function  (req:any, res, next) {
	const file = req.file;
	console.log('�ļ����ͣ�%s', file.mimetype);
	console.log('ԭ�ļ�����%s', file.originalname);
	console.log('�ļ���С��%s', file.size);
	// �����ļ��ɹ��󷵻����ݸ�ǰ��
	const pdfFilePath = path.join(__dirname, "../upload", file.filename)
	console.log('����·����%s', pdfFilePath);
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