import urlapi from 'url';

export default class DataSource {
  constructor({ url, user, password }) {
    const dbconf = urlapi.parse(url);
    this.host = dbconf.hostname;
    this.database = dbconf.pathname.replace('/', '');
    this.user = user;
    this.password = password;
    this.dateStrings = ['DATE', 'DATETIME'];
  }
}
