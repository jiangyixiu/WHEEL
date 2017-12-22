#!/usr/bin/env python
# coding:utf-8
from celery_config import app
from redis_util import *
from send_email import SendEmail
from machining import Machining
from log import *


@app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    sender.add_periodic_task(10.0, line_up.s(), name='add every 10')


@app.task
def line_up():
    try:
        u_info = Redis.lpop(QUEUE_NAME)
        if u_info != None:
            u_info = u_info.decode('utf-8')
            u_info = eval(u_info)
            print(u_info)
            # Redis.rpush(QUEUE_NAME, u_info)
            send_mail.delay(u_info)
        else:
            print(u_info)
    except Exception as err:
        logging.error(err)


@app.task
def send_mail(u_info):
    """发送邮箱配置"""
    mail_host = "smtp.exmail.qq.com"  # 设置服务器
    mail_user = "notice@ichazuo.cn"  # 用户名
    mail_pass = "Pq4KC8WfpFVErZPt"  # 口令
    sender = "notice@ichazuo.cn"  # 发件人邮箱
    to_mailto = u_info['email']  # 收件人邮箱
    to_name = u_info['name']  # 收件人邮箱

    # 加工证书
    url = u_info['imgUrl']

    mach = Machining(url, to_name)
    im = mach.addName('./static/images/' + '2488' + '_jyzs_bg.jpg', to_mailto)

    # 初始化基本信息
    mail = SendEmail(mail_host, mail_user, mail_pass)

    # 发送
    try:
        mail.sendImageMail(im, to_mailto, "结业证书", "感谢您参加插坐学院线下课程，以下是您的结业证书：")
        logging.info("邮件发送成功" + str(to_name) + ':' + str(to_mailto) + '\n')
    except Exception as err:
        Redis.rpush(QUEUE_NAME, u_info)
        logging.warning(err)
        logging.info("Error: 无法发送邮件" + str(to_name) + ':' + str(to_mailto) + '\n')
