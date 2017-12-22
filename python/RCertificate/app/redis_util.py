import redis


# list object
QUEUE_NAME = "XXXXX"


# This class is wrapper for a redis instance
class Redis:
    r = redis.StrictRedis(host='localhost', port=6379, db=0)

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
    def lrem(name, value,num):
        Redis.r.lrem(name, value,num)

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