#!/usr/bin/python
# -*- coding: UTF-8 -*-

import smtplib 
import cStringIO
import urllib,urllib2 
import json
from PIL import Image,ImageDraw,ImageFont
from log import *
import os
import logging
import threading

url='http://file.ichazuo.cn/14865480912e92962c0b6996add9517e4242ea9bdc.png'
def save_image(url,file_name):
    data=urllib.urlopen(url).read()
    f=file(file_name,'wb')
    f.write(data)
    tzs_bg = file_name
    f.close()	
    return tzs_bg

def poster(name, age):
    print name,age
    try:
        #name_x = x['name'].encode('utf8')
        #name_x = x['name']
        addName(name)
        logging.info("海报生成成功:"+ name + '\n')
    except smtplib.SMTPException, e:
        logging.warning(e)
        logging.info( "生成失败=======>>>" + name + '\n' )

mark = '/Users/xyloveqx/WHEEL/python/email/4/timg.jpeg'
def addAvatar(image_url):
    im = Image.open(image_url)
    im.show()
    layer=Image.new('RGBA', im.size, (0,0,0,0))
    layer.paste(mark, (im.size[0]-800,im.size[1]-250))
    out=Image.composite(layer,im,layer)
    out.save(image_url,"JPEG")
    out.close()

def addName(userName):
    #tzs_bg = save_image(url,'tzs_b.png')	
    tzs_bg = 'WechatIMG357.png'	
    #图片加文字
    ttfont = ImageFont.truetype("msyh.ttf",34)
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
    y_max =	240
    for i,x in enumerate(n_split):
        n_each = n_split[i].encode('utf8')

        if is_chinese(unicode(n_each,'utf8')):	# 中文
            x_max -= 16
        elif n_each.isupper():				# 英文大写
            x_max -= 10
        else:							# 英文小写
            x_max -= 9

    draw.text((x_max,y_max),unicode(userName,'utf-8'), fill=(255,255,255), font=ttfont)
    im.show()
    #memf = cStringIO.StringIO()
    #im.save(memf, "png")
    
    #addAvatar(url)
    
if __name__ == "__main__":
    user = {
        "name": "江晓咏",
        "age": "13"        
    }
    processThread = threading.Thread(target=poster, kwargs=user)
    processThread.start()