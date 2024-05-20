var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const handleStream = (item, writeStream) => {
    const readFile = fs.readFileSync(item);
    writeStream.write(readFile);
    fs.unlink(item, () => { });
};
module.exports.video = (req, res) => {
    const form = new formidable.IncomingForm();
    let dirPath = path.join(__dirname, "video");
    form.uploadDir = dirPath;
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => __awaiter(this, void 0, void 0, function* () {
        let files = file.file;
        let index = fields.index;
        let total = fields.total;
        let filename = fields.filename;
        let url = dirPath +
            "/" +
            filename.split(".")[0] +
            `_${index}.` +
            filename.split(".")[1];
        try {
            fs.renameSync(files.path, url);
            console.log(url);
            setTimeout(() => {
                if (index === total) {
                    let newDir = __dirname + `/uploadFiles/${Date.now()}`;
                    fs.mkdirSync(newDir);
                    let writeStream = fs.createWriteStream(newDir + `/${filename}`);
                    let fsList = [];
                    for (let i = 0; i < total; i++) {
                        const fsUrl = dirPath +
                            "/" +
                            filename.split(".")[0] +
                            `_${i + 1}.` +
                            filename.split(".")[1];
                        fsList.push(fsUrl);
                    }
                    for (let item of fsList) {
                        handleStream(item, writeStream);
                    }
                    writeStream.end();
                }
            }, 100);
        }
        catch (e) {
            console.log(e);
        }
        res.send({
            code: 0,
            msg: "上传成功",
            size: index,
        });
    }));
};
module.exports.getSize = (req, res) => {
    let count = 0;
    req.setEncoding("utf8");
    req.on("data", function (data) {
        let name = JSON.parse(data);
        let dirPath = path.join(__dirname, "video");
        let files = fs.readdirSync(dirPath);
        files.forEach((item, index) => {
            let url = name.fileName.split(".")[0] +
                `_${index + 1}.` +
                name.fileName.split(".")[1];
            if (files.includes(url)) {
                ++count;
            }
        });
        res.send({
            code: 0,
            msg: "请继续上传",
            count,
        });
    });
};
//# sourceMappingURL=upload_file.js.map