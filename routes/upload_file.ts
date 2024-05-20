// �ļ��ϴ�ģ��
const formidable = require("formidable");
// �ļ�ϵͳģ��
const fs = require("fs");
// ϵͳ·��ģ��
const path = require("path");

// ����д���ļ���
const handleStream = (item, writeStream) => {
    // ��ȡ��ӦĿ¼�ļ�buffer
    const readFile = fs.readFileSync(item);
    // ����ȡ��buffer || chunkд�뵽stream��
    writeStream.write(readFile);
    // д���������ݴ����Ƭ�ļ�
    fs.unlink(item, () => { });
};

// ��Ƶ�ϴ�(��Ƭ)
module.exports.video = (req, res) => {
    // ������������
    const form = new formidable.IncomingForm();
    // ������Ƶ�ļ��ϴ�·��
    let dirPath = path.join(__dirname, "video");
    form.uploadDir = dirPath;
    // �Ƿ����ϴ��ļ�����׺
    form.keepExtensions = true;
    // err ������� �������ʧ�ܰ���������Ϣ
    // fields �������˶����������formData��key-value����
    // file �������� �ϴ��ļ�����Ϣ
    form.parse(req, async (err, fields, file) => {
        // ��ȡ�ϴ��ļ�blob����
        let files = file.file;
        // ��ȡ��ǰ��Ƭindex
        let index = fields.index;
        // ��ȡ����Ƭ��
        let total = fields.total;
        // ��ȡ�ļ���
        let filename = fields.filename;
        // ��д�ϴ��ļ����������ݴ�Ŀ¼
        let url =
            dirPath +
            "/" +
            filename.split(".")[0] +
            `_${index}.` +
            filename.split(".")[1];
        try {
            // ͬ���޸��ϴ��ļ���
            fs.renameSync(files.path, url);
            console.log(url);
            // �첽����
            setTimeout(() => {
                // �ж��Ƿ������һ����Ƭ�ϴ���ɣ�ƴ��д��ȫ����Ƶ
                if (index === total) {
                    // ͬ��������Ŀ¼�����Դ��������Ƶ
                    let newDir = __dirname + `/uploadFiles/${Date.now()}`;
                    // ����Ŀ¼
                    fs.mkdirSync(newDir);
                    // ������д��������д���ļ�
                    let writeStream = fs.createWriteStream(newDir + `/${filename}`);
                    let fsList = [];
                    // ȡ��������Ƭ�ļ�����������
                    for (let i = 0; i < total; i++) {
                        const fsUrl =
                            dirPath +
                            "/" +
                            filename.split(".")[0] +
                            `_${i + 1}.` +
                            filename.split(".")[1];
                        fsList.push(fsUrl);
                    }
                    // ѭ����Ƭ�ļ����飬����stream����д��
                    for (let item of fsList) {
                        handleStream(item, writeStream);
                    }
                    // ȫ��д�룬�ر�streamд����
                    writeStream.end();
                }
            }, 100);
        } catch (e) {
            console.log(e);
        }
        res.send({
            code: 0,
            msg: "�ϴ��ɹ�",
            size: index,
        });
    });
};

// ��ȡ�ļ���Ƭ��
module.exports.getSize = (req, res) => {
    let count = 0;
    req.setEncoding("utf8");
    req.on("data", function (data) {
        let name = JSON.parse(data);
        let dirPath = path.join(__dirname, "video");
        // �������ϴ�����Ƭ�ļ�����
        let files = fs.readdirSync(dirPath);
        files.forEach((item, index) => {
            let url =
                name.fileName.split(".")[0] +
                `_${index + 1}.` +
                name.fileName.split(".")[1];
            if (files.includes(url)) {
                ++count;
            }
        });
        res.send({
            code: 0,
            msg: "������ϴ�",
            count,
        });
    });
};

