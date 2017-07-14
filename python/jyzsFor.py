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
    url = 'http://127.0.0.1:9076/invitationCard'
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
    

#aa = [17472, 1993, 15456, 28186, 33936, 8079, 38919, 1136, 17849, 23812, 30522, 17635, 38380, 9169, 17741, 30980, 8855, 9434, 8467, 880, 19071, 38586, 37978, 18088, 8440, 36105, 31289, 37262, 21730, 921, 35328, 35224, 28452, 19801, 8756, 15004, 11119, 37804, 23031, 24570, 23769, 21160, 17594, 31365, 21556, 24080, 25438, 38025, 15053, 34033, 12243, 28584, 35218, 19763, 29352, 33572, 37118, 38029, 28350, 12386, 36418, 30055, 22291, 21635, 37130]
#aa = [30695]


#aa = [1394,22213,38552,8383,29928,36421,38746,38159,31441,38597,20604,38826,27382,1089,30574,38720,23113,38739,38298]
#aa = [11263]
name2 =[]
#aa = [38029, 28350, 12386, 36418, 30055, 22291, 21635, 37130]

avatar2=[]

for i,item in enumerate(aa):
    #print item
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
    