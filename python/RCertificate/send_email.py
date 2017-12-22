#!/usr/bin/python
# -*- coding: UTF-8 -*-
import smtplib
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.header import Header
from log import *


class SendEmail:
    # 构造函数：初始化基本信息
    def __init__(self, host, user, passwd):
        # sender = user.split("@")
        sender = ["插坐学院"]
        self._user = user
        self._account = sender[0]
        self._me = self._account + "<" + self._user + ">"
        server = smtplib.SMTP()
        server.connect(host)
        try:
            server.login(self._user, passwd)
            logging.info("初始化成功")
        except Exception as err:
            logging.error("error初始化失败：" + err)
        self._server = server

    def sendImageMail(self, im, to_mailto, sub, content, subtype='html'):

        msg = MIMEMultipart()

        # 增加图片附件
        image = MIMEImage(open(r'' + im, 'rb').read())
        # 附件列表中显示的文件名
        image.add_header('Content-Disposition', 'attachment;filename=Certificate.png')
        msg.attach(image)

        # html图片
        msgAlternative = MIMEMultipart('alternative')
        msg.attach(msgAlternative)
        mail_msg = """
                <p>""" + content + """</p>
                <p><img src="cid:image1" style="max-width:400px;margin:auto;display:block;"></p>
                """
        msgAlternative.attach(MIMEText(mail_msg, _subtype=subtype, _charset='utf-8'))

        # 指定图片目录
        fp = open(r'' + im, 'rb')
        htmlimage = MIMEImage(fp.read())
        fp.close()

        # 定义图片 ID，在 HTML 文本中引用
        htmlimage.add_header('Content-ID', '<image1>')
        msg.attach(htmlimage)

        msg['Subject'] = Header(sub, 'utf-8')
        msg['From'] = self._me
        msg['To'] = to_mailto

        try:
            self._server.sendmail(self._user, to_mailto, msg.as_string())
            return True
        except Exception as err:
            print(str(err))
            return False

    # 析构函数：释放资源
    def __del__(self):
        self._server.quit()
        self._server.close()
