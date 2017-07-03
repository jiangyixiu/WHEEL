class Dog():
    """模拟小狗的简单尝试"""    
    #----------------------------------------------------------------------
    def __init__(self, name, age):
        """初始化属性name,age"""
        self.name = name
        self.age = age
        
    #----------------------------------------------------------------------
    def sit(self):
        """小狗蹲下"""
        print(self.name.title() + "蹲下了")
        
    #----------------------------------------------------------------------
    def roll_over(self):
        """小狗打滚儿"""
        print(self.name.upper() + "在打滚儿")
        
    
my_dog = Dog('willie',6)
print(my_dog.name)
print(my_dog.age)
my_dog.sit()
my_dog.roll_over()

your_dog = Dog('lucy', 3)
your_dog.roll_over()
    