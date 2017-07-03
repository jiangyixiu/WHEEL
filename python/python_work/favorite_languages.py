from collections import OrderedDict

favorite_languages = OrderedDict()
favorite_languages['qx'] = 'xiaoKeAi'
favorite_languages['xy'] = 'python'
favorite_languages['yx'] = 'ruby'

for name, language in favorite_languages.items():
    print(name.title() + "`s love " + language)