#!/usr/bin/python
# -*- coding: UTF-8 -*-

import smtplib 
import cStringIO
import urllib,urllib2 
import json
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.header import Header
from PIL import Image,ImageDraw,ImageFont
from log import *
import os
import logging
import threading
import time


mail_host="smtp.exmail.qq.com"  #设置服务器
mail_user="notice@ichazuo.cn"   #用户名
mail_pass="Chazuo123"   		#口令 
sender = 'notice@ichazuo.cn'	#发件人邮箱

url='http://file.ichazuo.cn/14865480912e92962c0b6996add9517e4242ea9bdc.png'
def save_image(url,file_name):
    data=urllib.urlopen(url).read()
    f=file(file_name,'wb')
    f.write(data)
    tzs_bg = file_name
    f.close()	
    return tzs_bg

def showInfo(courseId,age): 
    print courseId,age
    #url = 'https://www.chazuomba.com/iserver/app/queryMemberListByCourseIdForEmail'
    #data = {'courseId': '1850'} 
    #data = urllib.urlencode(data) # 把参数进行编码 
    #url2 = urllib2.Request(url,data) # 用.Request来发送POST请求，指明请求目标是之前定义过的url，请求内容放在data里
    #response = urllib2.urlopen(url2)  # 用.urlopen打开上一步返回的结果，得到请求后的响应内容
    #apicontent = response.read()  #将响应内容用read()读取出来
    #emailList=json.loads(apicontent)
    #print len(emailList['data'])  #打印读取到的内容



    #email_l = emailList['data']
    # print email_l

    email_l = [
        #{"name":"Sophia","email":"jiangxiaoyong@ichazuo.cn"},
        #{"name":"舒畅","email":"17744490130@163.com"},
        #{"name":"王舒畅","email":"15727378086m@sina.cn"},
        #{"name":"哈哈哈哈","email":"18610500240@sina.cn"},
        #{"name":"小咏","email":"jiangyixiu418@163.com"},
        #{u'name': u'\u8bb8\u6587\u8273', u'email': u'222'},
        #{u'name': u'\u5f90\u654f', u'email': u'2227006164@qq.com'},
        {u'name': u'Sophia', u'email': u'2227006164@qq.com'},
    ]
    for i,x in enumerate(email_l):
        try:
            name_x = x['name'].encode('utf8')
            email_x = x['email'].encode('utf8')
            #name_x = x['name']
            #email_x = x['email']		

            # 第三方 SMTP 服务
            import re
            mat1 = re.search(r"@sina.cn|@sina.com", email_x)
            if mat1:
                mail_host="smtp.sina.com"  #设置服务器
                mail_user="ichazuo_notice@sina.com"    #用户名
                mail_pass="Chazuo123"   #口令
                sender = mail_user	#发件人邮箱
            else:
                mail_host="smtp.exmail.qq.com"  #设置服务器
                mail_user="notice@ichazuo.cn"   #用户名
                mail_pass="Chazuo123"   		#口令 
                sender = mail_user	#发件人邮箱

            # 邮件信息
            smtpObj = smtplib.SMTP() 
            smtpObj.connect(mail_host, 25)    # 25 为 SMTP 端口号
            smtpObj.login(mail_user,mail_pass)
            smtpObj.sendmail(sender, email_x,mailData(name_x, email_x, sender))

            logging.info("邮件发送成功"+ name_x + ':' + email_x + '\n')

        except smtplib.SMTPException, e:
            logging.warning(e)
            logging.info( "无法发送邮件=======>>>" + name_x + ':' + email_x + '\n' )


def mailData(userName,userEmail,sender):
    msgRoot = MIMEMultipart('related') 
    msgRoot['From'] = sender	#发件人
    # msgRoot['To'] 	= userName	#收件人
    msgRoot['Subject'] = Header('结业证书', 'utf-8')	#邮件抬头

    # html邮件
    msgAlternative = MIMEMultipart('alternative')
    msgRoot.attach(msgAlternative)
    mail_msg = """
	<p style="text-align:center;">
		<img src="cid:image1" style="width:400px;height:710px;display:inline-block;">
	</p>
	"""
    mail_msg += """
	<section style="margin-top:2em;margin-bottom:2em;text-align:center;font-size:0.8em">
	<a href="http://www.chazuomba.com/files/webApp/offlineCourseContent.html?id=1745&amp;isOver=0" style="padding:8px 20px;background-color:#dea700;color:#fff;text-decoration:none;cursor:pointer;">课程详情链接</a>&nbsp;&nbsp; &nbsp; &nbsp;<a href="http://www.chazuomba.com/files/webApp/offlineCourse.html" style="padding:8px 20px;background-color:#dea700;color:#fff;text-decoration:none;cursor:pointer;">更多课程链接</a>
	</section>
	<section style="text-align: center; font-size: 0.6em;">
    <p style="height:1px;background:#666;max-width:560px;width:100%;margin-top:1em;margin-buttom:1.4em;margin-left:auto;margin-right:auto;">
        <br>
    </p>
    <h3 style="max-width:500px;width:100%;margin:auto;text-align:left;line-height:1.4em;">
        插坐学院
    </h3>
    <p style="max-width:500px;width:100%;margin:auto;text-align:left;line-height:1.4em;">
        国内领先的企业新媒体教育培训机构，专注为1000万企业新媒体运营人员提供实操、落地的课程培训服务，涵盖线下课程、线上课程及企业课程<br><br>
		客服热线：400-801-5751 <br>
		地址：<span class="js_location_string" style="border-bottom: 1px dashed rgb(171, 171, 171); z-index: 1; position: static;">北京市朝阳区光华路甲14号诺安基金大厦5层</span><br><br>
    </p>
</section>
	"""
    msgAlternative.attach(MIMEText(mail_msg, 'html', 'utf-8'))

    tzs_bg = save_image(url,'tzs_bg.png')	
    #图片加文字
    ttfont = ImageFont.truetype("msyh.ttf",34)
    ttfont_small = ImageFont.truetype("msyh.ttf",22)	# 字体路径/Library/Fonts/
    im = Image.open(tzs_bg).resize((750, 1333),Image.ANTIALIAS)
    draw = ImageDraw.Draw(im) 

    def is_chinese(uchar):
        # 判断一个unicode是否是汉字
        if uchar >= u'\u4e00' and uchar<=u'\u9fa5':
            return True
        else:
            return False

    n_unicode = unicode(userName,'utf8')
    n_split = list(unicode(userName,'utf8'))

    is_chinese(n_unicode)

    x_max = 373
    y_max =	530
    #x_min = 373
    #y_min =	y_max+12
    for i,x in enumerate(n_split):
        # print "======",type(n_split)
        n_each = n_split[i].encode('utf8')
        # print is_chinese(unicode(n_each,'utf8'))

        if is_chinese(unicode(n_each,'utf8')):	# 中文
            x_max -= 16
            #x_min += 16
        elif n_each.isupper():				# 英文大写
            x_max -= 10
            #x_min += 10
        else:							# 英文小写
            x_max -= 9
            #x_min += 9
    #x_min += 22

    draw.text((x_max,y_max),unicode(userName,'utf-8'), fill=(255,255,255), font=ttfont)
    #draw.text((x_min,y_min),unicode('同学','utf-8'), fill=(120,120,120), font=ttfont_small) 
    im.show()
    memf = cStringIO.StringIO()
    im.save(memf, "png")
    img = MIMEImage(memf.getvalue())


    # 附件
    import re
    mat = re.search(r"@qq.com", userEmail)

    if mat:
        att1 = MIMEImage(memf.getvalue())
        att1["Content-Type"] = 'application/octet-stream; charset=utf-8'
        att1["Content-Disposition"] = 'attachment; filename="录取通知书.jpg"'# 这里的filename可以任意写，写什么名字，邮件中显示什么名字
        msgRoot.attach(att1)

    # 定义图片 ID，在 HTML 文本中引用
    img.add_header('Content-ID', 'image1')
    msgRoot.attach(img)

    return msgRoot.as_string()


if __name__ == "__main__":

    current_t = time.time()
    end_t = "2017-04-25 13:00:00"
    #将其转换为时间数组
    end_t = time.strptime(end_t, "%Y-%m-%d %H:%M:%S")
    #转换为时间戳:
    end_t = int(time.mktime(end_t))

    while (current_t < end_t):
        time.sleep(1)
        current_t += 1
        print current_t
    courseId = "123"

    t = threading.Thread(target=showInfo,args=("小明","13岁"))
    t.start()	

    #t = threading.Thread(target=showInfo,args=("lien-2",))
    #t.start()	
