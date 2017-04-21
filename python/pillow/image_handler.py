from PIL import Image
import os

mark=Image.open("/Users/xyloveqx/Desktop/logo.png")
root_url=r'/Users/xyloveqx/Desktop/image/'

def image_w_handler(image_url):
    im = Image.open(image_url)
    if im.size == (4032, 3024):
        im = im.resize((4032,4032),Image.ANTIALIAS)
        im = im.rotate(-90).resize((3032,4032),Image.ANTIALIAS)
        im.show()
    b_w,b_h=im.size
    l_w,l_h=mark.size
    layer=Image.new('RGBA', im.size, (0,0,0,0))
    if(b_w>b_h):
        new_w=int(b_w/5)
        new_h=new_w*l_h/l_w
    else:
        new_w=int(b_h/5)
        new_h=new_w*l_h/l_w

    xxx=mark.resize((new_w,new_h))
    ma_www=b_w/40
    layer.paste(xxx, (int(im.size[0]-new_w-ma_www),int(im.size[1]-new_h*1.5)))
    out=Image.composite(layer,im,layer)
    out.save(image_url,"JPEG")
    out.close()

if __name__ == '__main__':
    files=os.listdir(root_url)
    for x in files:
        if x!=r'.DS_Store':
            print('------------start---------------------')
            print('-->>>image name :'+str(x))
            image_w_handler(root_url+x)
            print('============end======================')
            print('\n')

    mark.close()
