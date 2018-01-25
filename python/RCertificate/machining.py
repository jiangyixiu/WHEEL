#!/usr/bin/python
# -*- coding: UTF-8 -*-
from PIL import Image, ImageDraw, ImageFont
import requests
import os


class Machining:
    def __init__(self, url, to_name):
        self.url = url
        self.to_name = to_name

    def addName(self, _bg, to_mailto):

        # 保存处理背景图
        def save_image(url, file_name):
            r = requests.get(url, stream=True)
            with open(file_name, 'wb') as fd:
                for chunk in r.iter_content():
                    fd.write(chunk)
            return file_name

        if os.access(_bg, os.F_OK):
            im = Image.open(_bg).resize((750, 1333), Image.ANTIALIAS)
        else:
            if not os.path.exists('./static/images'):
                os.mkdir('./static/images')
            im = Image.open(save_image(self.url, _bg)).resize((750, 1333), Image.ANTIALIAS)
        draw = ImageDraw.Draw(im)

        # 引入字体
        ttfont = ImageFont.truetype("./static/msyh.ttf", 34)
        ttfont_small = ImageFont.truetype("./static/msyh.ttf", 22)  # 字体路径/Library/Fonts/

        # 判断一个unicode是否是汉字
        def is_chinese(uchar):
            if uchar >= u'\u4e00' and uchar <= u'\u9fa5':
                return True
            else:
                return False

        n_unicode = str(self.to_name)
        n_split = list(str(self.to_name))

        is_chinese(n_unicode)

        x_max = 373
        y_max = 500
        x_min = 373
        y_min = y_max + 12
        for i, x in enumerate(n_split):
            n_each = n_split[i].encode('utf8')

            if is_chinese(str(n_each, 'utf8')):  # 中文
                x_max -= 16
                x_min += 16
            elif n_each.isupper():  # 英文大写
                x_max -= 10
                x_min += 10
            else:  # 英文小写
                x_max -= 9
                x_min += 9
        x_min += 22

        draw.text((x_max, y_max), str(self.to_name), fill=(0, 0, 0), font=ttfont)
        draw.text((x_min, y_min), str('同学'), fill=(120, 120, 120), font=ttfont_small)

        img_file = './static/images/' + to_mailto + '.jpg'
        im.save(img_file)

        return img_file
