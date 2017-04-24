import datetime,time
#time1 = time.time()
#print time.time()

#time.sleep(6)

#time2 = time.time()
#print time2-time1

#now = time.strftime("%Y/%m/%d %H:%M:%S")
#print now


#now = datetime.datetime.now()
#print now


##计时器
#def remain(min):
    #count = 0
    #while (count < min):
        #count += 1
        #n = min - count
        #time.sleep(1)
        #print n 
        
#remain(2)

#import time
#count = 0 
#a = input('time:') 
#b = a * 60 
#while (count < b):
    #ncount = b - count 
    #print ncount 
    #time.sleep(1)
    #count += 1 
#print 'done' 

#当前时间
current_t = time.time()
#活动开始时间
end_t = "2017-04-24 16:47:00"
#将其转换为时间数组
end_t = time.strptime(end_t, "%Y-%m-%d %H:%M:%S")
#转换为时间戳:
end_t = int(time.mktime(end_t))

while (current_t < end_t):
    time.sleep(1)
    current_t += 1
    print current_t
    
print "##########"