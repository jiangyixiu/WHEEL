import urllib2,urllib 
import cStringIO
import smtplib 
import json
import time

from log import *
import threading
import logging

#----------------------------------------------------------------------
def invitationCard(courseId, nickname, avatar, key):
    """调用海报接口"""
    #url = 'http://127.0.0.1:9099/users/graduationCertificate'
    url = 'http://127.0.0.1:9076/invitationCard'
    #url = 'http://120.26.167.206:9076/invitationCard'
    data = {
        'courseId': courseId,
        'avatar': avatar,
        'nickname': nickname,
        'key': item
    }
    print data
    data = urllib.urlencode(data) # 把参数进行编码 
    url2 = urllib2.Request(url,data) # 用.Request来发送POST请求，指明请求目标是之前定义过的url，请求内容放在data里
    response = urllib2.urlopen(url2)  # 用.urlopen打开上一步返回的结果，得到请求后的响应内容
    apicontent = response.read()  #将响应内容用read()读取出来
    #emailList=json.loads(apicontent)
    logging.info(item) #打印读取到的内容
    
#aa = [51746 ,52667 ,52767 ,52414 ,53058 ,53460 ,43035 ,51802 ,52903 ,52676 ,52396 ,52999 ,23607 ,52699 ,6520 ,52718 ,53064 ,41473 ,27703 ,30971 ,52452 ,53057 ,52688 ,49027 ,52461 ,53536 ,53096 ,52422 ,52415]
aa=[47016]
name2 =[]
avatar2=[]

for i,item in enumerate(aa):
    url = 'http://www.chazuomba.com:8082/iserver/app/queryDetailById'
    data = {'id': item} 
    data = urllib.urlencode(data) # 把参数进行编码 
    url2 = urllib2.Request(url,data) # 用.Request来发送POST请求，指明请求目标是之前定义过的url，请求内容放在data里
    response = urllib2.urlopen(url2)  # 用.urlopen打开上一步返回的结果，得到请求后的响应内容
    apicontent = response.read()  #将响应内容用read()读取出来
    emailList=json.loads(apicontent)
    #print len(emailList['data'])  #打印读取到的内容
    
    nickname = emailList['data']['name'].encode('utf8')
    avatar = emailList['data']['avatar'].encode('utf8') or emailList['data']['wxAvatar'].encode('utf8')
    name2.append(nickname)
    avatar2.append(avatar)
    #print emailList['data']['name'].encode('utf8')
    #print emailList['data']['avatar'].encode('utf8')
    
    
for i,item in enumerate(aa):
    print i,len(aa) 
    time.sleep(10)
    invitationCard(848, name2[i], avatar2[i], item)
    