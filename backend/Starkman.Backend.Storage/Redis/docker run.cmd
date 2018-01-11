cd "c:\Repositories\starkman\backend\Starkman.Backend.Storage\Redis" 
docker run -v /redis.conf:/usr/local/etc/redis/redis.conf --name starkman-redis redis redis-server /usr/local/etc/redis/redis.conf
pause