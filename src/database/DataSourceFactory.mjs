import DataSource from './DataSource';

export default function DataSourceFactory() {
  return new DataSource({
    url: process.env.DATASOURCE_URL,
    user: process.env.DATASOURCE_USER,
    password: process.env.DATASOURCE_PASSWORD
  });
}
