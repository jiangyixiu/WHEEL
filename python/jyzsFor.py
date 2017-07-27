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
    

aa = [47876 ,48181 ,48519 ,47767 ,48158 ,46237 ,48150 ,47731 ,48594 ,48168 ,28379 ,48148 ,48216 ,46079 ,48117 ,47758 ,48449 ,40969 ,47968 ,41506 ,25475 ,48038 ,48175 ,47722 ,44843 ,48051 ,48161]
name2 =[]
avatar2=[]

for i,item in enumerate(aa):
    print item
    url = 'http://www.chazuomba.com:8082/iserver/app/queryDetailById'
    data = {'id': item} 
    data = urllib.urlencode(data) # 把参数进行编码 
    url2 = urllib2.Request(url,data) # 用.Request来发送POST请求，指明请求目标是之前定义过的url，请求内容放在data里
    response = urllib2.urlopen(url2)  # 用.urlopen打开上一步返回的结果，得到请求后的响应内容
    apicontent = response.read()  #将响应内容用read()读取出来
    emailList=json.loads(apicontent)
    #print len(emailList['data'])  #打印读取到的内容
    
    nickname = emailList['data']['name'].encode('utf8')
    avatar = emailList['data']['avatar'].encode('utf8')
    name2.append(nickname)
    avatar2.append(avatar)
    #print emailList['data']['name'].encode('utf8')
    #print emailList['data']['avatar'].encode('utf8')
    
    
for i,item in enumerate(aa):
    print i,len(aa) 
    time.sleep(10)
    invitationCard(848, name2[i], avatar2[i], item)
    