#!/usr/bin/env python
# coding:utf-8
from celery import Celery
from celery import platforms
from celery.schedules import crontab

platforms.C_FORCE_ROOT = True
config = {}
# config['CELERY_BROKER_URL'] = 'redis://:@123.57.84.121:6379/10'
# config['CELERY_RESULT_BACKEND'] = 'redis://:@123.57.84.121:6379/10'
config['CELERY_BROKER_URL'] = 'redis://:IHYej1384hg24hj@r-bp1b4e13a021d754.redis.rds.aliyuncs.com:6379/10'
config['CELERY_RESULT_BACKEND'] = 'redis://:IHYej1384hg24hj@r-bp1b4e13a021d754.redis.rds.aliyuncs.com:6379/10'
# 不需要返回任务状态，即设置以下参数为True
config['CELERY_IGNORE_RESULT'] = True
app = Celery("tasks", broker=config['CELERY_BROKER_URL'])
app.conf.update(config)