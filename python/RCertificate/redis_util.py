import redis

RDS_HOST = 'r-bp1b4e13a021d754.redis.rds.aliyuncs.com'
RDS_PWD = 'IHYej1384hg24hj'
RDS_DB = 0
RDS_PORT = 6379

# list object
QUEUE_NAME = "sendCertificateOfGraduationQueue"


# This class is wrapper for a redis instance
class Redis:
    r = redis.StrictRedis(host=RDS_HOST, port=RDS_PORT, password=RDS_PWD, db=RDS_DB)
    # r = redis.StrictRedis(host='123.57.84.121', port=RDS_PORT, password=0, db=RDS_DB)

    @staticmethod
    def set(name, value):
        Redis.r.set(name, value)

    @staticmethod
    def psetex(name, time, value):
        Redis.r.psetex(name, time, value)

    @staticmethod
    def setex(name, time, value):
        Redis.r.setex(name, time, value)

    @staticmethod
    def pttl(name):
        Redis.r.pttl(name)

    @staticmethod
    def ttl(name):
        Redis.r.ttl(name)

    @staticmethod
    def get(name):
        return Redis.r.get(name)

    @staticmethod
    def delete(name):
        Redis.r.delete(name)

    @staticmethod
    def hset(name, key, value):
        Redis.r.hset(name, key, value)

    @staticmethod
    def hmset(name, mapping):
        Redis.r.hmset(name, mapping)

    @staticmethod
    def hget(name, key):
        return Redis.r.hget(name, key)

    @staticmethod
    def hgetall(name):
        return Redis.r.hgetall(name)

    @staticmethod
    def sadd(name, value):
        Redis.r.sadd(name, value)

    @staticmethod
    def sget(name):
        return Redis.r.smembers(name)

    @staticmethod
    def srem(name, key):
        return Redis.r.srem(name, key)

    @staticmethod
    def lrem(name, value, num):
        Redis.r.lrem(name, value, num)

    # append to list
    @staticmethod
    def rpush(name, key):
        Redis.r.rpush(name, key)

    @staticmethod
    def lrange(name, start, end):
        return Redis.r.lrange(name, start, end)

    @staticmethod
    def lpop(name):
        return Redis.r.lpop(name)

    @staticmethod
    def blpop(name, timeout):
        return Redis.r.blpop(name, timeout)
