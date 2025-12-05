import IPostgresql from './redis/redis.interface';
import IMongoDB from './mongodb/mongodb.interface';

interface IAppConfig extends IPostgresql, IMongoDB {
  api_port: number,
}

export default IAppConfig;
