#!/usr/bin/python
# -*- coding: UTF-8 -*-
 
import smtplib 
import cStringIO
import urllib2,urllib 
import json
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.header import Header
from PIL import Image,ImageDraw,ImageFont
import os
import logging
from log import *

mail_host="smtp.exmail.qq.com"  #设置服务器
mail_user="notice@ichazuo.cn"   #用户名
mail_pass="Chazuo1234"   		#口令 
sender = 'notice@ichazuo.cn'	#发件人邮箱

def ShowInfo():  
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
			naem_x = x['name'].encode('utf8')
			email_x = x['email'].encode('utf8')
			#naem_x = x['name']
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
			smtpObj.sendmail(sender, email_x,mailData(naem_x, email_x, sender))
			
			logging.info("邮件发送成功"+ naem_x + ':' + email_x + '\n')
			
		except smtplib.SMTPException, e:
			logging.warning(e)
			logging.info( "无法发送邮件=======>>>" + naem_x + ':' + email_x + '\n' )
		

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
	msgAlternative.attach(MIMEText(mail_msg, 'html', 'utf-8'))

	#图片加文字
	ttfont = ImageFont.truetype("msyh.ttf",34)
	ttfont_small = ImageFont.truetype("msyh.ttf",22)	# 字体路径/Library/Fonts/
	im = Image.open("zzl423.png").resize((750, 1333),Image.ANTIALIAS)
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
	y_max =	496
	x_min = 373
	y_min =	y_max+12
	for i,x in enumerate(n_split):
		# print "======",type(n_split)
		n_each = n_split[i].encode('utf8')
		# print is_chinese(unicode(n_each,'utf8'))

		if is_chinese(unicode(n_each,'utf8')):	# 中文
			x_max -= 16
			x_min += 16
		elif n_each.isupper():				# 英文大写
			x_max -= 10
			x_min += 10
		else:							# 英文小写
			x_max -= 9
			x_min += 9
	x_min += 22

	draw.text((x_max,y_max),unicode(userName,'utf-8'), fill=(0,0,0), font=ttfont)
	draw.text((x_min,y_min),unicode('同学','utf-8'), fill=(120,120,120), font=ttfont_small) 
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
		att1["Content-Disposition"] = 'attachment; filename="结业证书.jpg"'# 这里的filename可以任意写，写什么名字，邮件中显示什么名字
		msgRoot.attach(att1)

	# 定义图片 ID，在 HTML 文本中引用
	img.add_header('Content-ID', 'image1')
	msgRoot.attach(img)

	#return msgRoot.as_string()

 
if __name__ == "__main__":  

	ShowInfo()
