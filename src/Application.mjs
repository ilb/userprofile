import ContextFactory from '@ilb/node_context';
import { UriAccessorFactory } from '@ilb/uriaccessorjs';
import awilix from 'awilix';
const { asFunction, asValue, asClass } = awilix;
import DataSourceFactory from './database/DataSourceFactory';
import Prisma from '@prisma/client';
const { PrismaClient } = Prisma;

export default class Application {
  constructor() {
    this.container = null;
    this.contextFactory = new ContextFactory({});
  }

  /**
   * setup DB based on LDAP context
   * @param context LDAP context
   */
  async setupDbEnv(context) {
    if (!process.env.DATABASE_URL) {
      const databaseUrl = new URL(context['.apps.userprofile.db']);
      if (!databaseUrl.username) {
        databaseUrl.username = 'userprofile';
      }
      if (!databaseUrl.password) {
        databaseUrl.password = context['apps.userprofile.db_PASSWORD'];
      }
      process.env.DATABASE_URL = databaseUrl.toString();
      // console.log({ databaseUrl, url: process.env.DATABASE_URL });
    }
  }
  /**
   * initialize application
   */
  async createContainer() {
    this.container = awilix.createContainer();
    const context = await this.contextFactory.buildContext();
    await this.setupDbEnv(context);
    const prisma = new PrismaClient();
    // const prisma = new PrismaClient({
    //   log: ['query', 'info', `warn`, `error`]
    // });

    // register currentUser, datasource, prisma
    // !!!!!!!!!! NB !!!!!!!!!!!!!!!!
    // uriAccessorFileEnabled security risk
    // do not use for external (client supplied) urls
    this.container.register({
      currentUser: asValue(process.env.USER),
      dataSource: asFunction(DataSourceFactory),
      prisma: asValue(prisma),
      uriAccessorFileEnabled: asValue(true),
      uriAccessorFactory: asClass(UriAccessorFactory),
      salepointsByUserUrl: asValue(
        process.env.SALEPOINTSBYUSER_URL ||
          context['.apps.ldapadminko.ws'] + '/getSalepointByUser.php?uid-0=${uid}'
      )
    });

    // autoscan modules
    await this.container.loadModules(
      [
        'src/repositories/**/*.mjs',
        'src/usecases/**/*.mjs',
        'src/providers/**/*.mjs',
        'src/services/**/*.mjs'
      ],
      {
        formatName: 'camelCase',
        esModules: true
      }
    );
  }

  /**
   * create scope for http request
   * @param {*} req
   */
  async createScope(req) {
    if (this.container == null) {
      await this.createContainer();
    }
    // console.log(this.container);

    const xRemoteUser = req && req.headers && req.headers['x-remote-user'];
    const currentUser = xRemoteUser || process.env.USER;

    const scope = this.container.createScope();
    scope.register({ currentUser: asValue(currentUser) });

    return scope;
  }

  /**
   * resolve bean by name
   * @param {*} name name of bean
   */
  resolve(name) {
    return this.container.resolve(name);
  }
}
