#!/usr/bin/python
# -*- coding: UTF-8 -*-
 
import smtplib 
import cStringIO
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.header import Header
from PIL import Image,ImageDraw,ImageFont
 
mail_host="smtp.exmail.qq.com"  #设置服务器
mail_user="notice@ichazuo.cn"   #用户名
mail_pass="Chazuo123"   		#口令 
sender = 'notice@ichazuo.cn'	#发件人邮箱


# 获取参数 学员信息
import sys
u_name = sys.argv[1]
u_email = sys.argv[2]
u_bg = sys.argv[3]
# print u_name,u_email


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
	ttfont_small = ImageFont.truetype("msyh.ttf",22)	# 字体路径
	im = Image.open( u_bg ).resize((750, 1333),Image.ANTIALIAS)
	draw = ImageDraw.Draw(im) 
	# print len(userName)

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
		n_each = n_split[i].encode('utf8')

		if is_chinese(unicode(n_each,'utf8')):	# 中文
			x_max -= 16
			x_min += 16
		elif n_each.isupper():				# 英文大写
			x_max -= 11.5
			x_min += 11.5
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

	return msgRoot.as_string()


if __name__ == "__main__":  

	try:
		# 第三方 SMTP 服务
		import re
		mat1 = re.search(r"@sina.cn|@sina.com", u_email)
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

		# print mail_user,sender,mail_host,mail_pass
		# 邮件信息
		smtpObj = smtplib.SMTP() 
		smtpObj.connect(mail_host, 25)    # 25 为 SMTP 端口号
		smtpObj.login(mail_user,mail_pass)
		smtpObj.sendmail(sender, u_email,mailData(u_name, u_email, sender))
		print "邮件发送成功",u_name,':',u_email
	except smtplib.SMTPException, e:
		print e
		print "Error: 无法发送邮件"