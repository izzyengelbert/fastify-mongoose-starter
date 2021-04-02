import fastify from 'fastify';
import statusCodes from 'http-status-codes';
import fastifyAuth from 'fastify-auth';
import printRoutes from 'fastify-print-routes';
import Database from './Database';
import APIs from './api';
import { APIGenerator, authenticate } from './utils';

class App {
  constructor(options) {
    this._options = options;
    this.locals = {};
    this.server = fastify(this._options);
    this.database = null;
    this._errorHandler = this._errorHandler.bind(this);
  }

  async initializeDatabase(config) {
    this.database = new Database(config);
    try {
      await this.database.connect();
    } catch (e) {
      this.server.log.error(e);
    }
  }

  _registerPlugins() {
    this.server.decorate('authenticate', authenticate).register(fastifyAuth);
    this.server.register(printRoutes);
  }

  initializeApp() {
    this._registerPlugins();
    this.locals.models = APIGenerator('models', APIs);
    this.locals.services = APIGenerator('services', APIs, (Service) => new Service(this.locals.models), true);
    APIGenerator('controllers', APIs, (Controller) => {
      const controller = new Controller(this);
      controller.registerRoutes();
      return controller;
    });
    this.server.setErrorHandler(this._errorHandler);
  }

  _errorHandler(error, request, reply) {
    this.server.log.error(error.stack);
    let statusCode = error.statusCode || statusCodes.INTERNAL_SERVER_ERROR;
    if (error.name === 'ValidationError') {
      statusCode = statusCodes.BAD_REQUEST;
    }
    return reply.status(statusCode).send({
      statusCode,
      error: statusCodes.getStatusText(statusCode),
      message: error.message
    });
  }
}

export default App;
