import DataSource from './DataSource';

export default function DataSourceFactory() {
  return new DataSource({
    url: process.env.DATABASE_URL,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
  });
}
