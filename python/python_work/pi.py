n = int(raw_input('请键入想要计算到小数点后的位数n:')) #先键入字符串,再转化为整数

w = n+9 #多计算10位，防止尾数取舍的影响

b = 10**w #算到小数点后w位

x1 = b*4//5 #求含4/5的首项

x2 = b// -239 #求含1/239的首项

he = x1+x2 #求第一大项

n *= 2 #设置下面循环的终点，即共计算n项

for i in xrange(3,n,2): #循环初值=3，末值2n,步长=2

    x1 //= -25 #求每个含1/5的项及符号

    x2 //= -57121 #求每个含1/239的项及符号

    x = (x1+x2) // i #求两项之和

    he += x #求总和

    pai = he*4 #求出π

    pai //= 10**10 #舍掉后十位

print(pai) #输出圆周率π的值