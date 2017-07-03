name = "ada lovelace"
print(name.title())		#title()首字母大写
print(name.upper())		#upper()全部大写
print(name.lower())		#lower()全部小写

#拼接字符串
first_name = "ada"
last_name = "lovelace"
full_name = first_name + " " + last_name
message = "Hello, " + full_name.title() + "!"
print(message)

#换行符\n
print("jiang\nxiao\nyong")

#删除空白
favorite_language = "   python    "
print(favorite_language)
print(favorite_language.rstrip())
print(favorite_language.lstrip())
print(favorite_language.strip())


age = 24
message = "happy " + str(age) + "rd Birthday!"
print(message)
