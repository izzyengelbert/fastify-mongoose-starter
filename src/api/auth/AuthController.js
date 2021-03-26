import express from 'express';
import authSchemas from './authSchemas';

class AuthController {
  constructor(app) {
    this._app = app;
    this._router = express.Router();
    this._service = this._app.locals.services.authService;
    this._authenticate = this._authenticate.bind(this);
  }

  registerRoutes() {
    const options = { prefix: '/oauth/v1' };
    const validatorCompiler = ({ schema }) => (data) => schema.validate(data);
    this._app.server.register((instance, opts, next) => {
      instance.post('/authenticate', { schema: authSchemas.post, validatorCompiler }, this._authenticate);
      next();
    }, options);
  }

  async _authenticate(req, res) {
    const { username, password } = req.body;
    const response = await this._service.authenticateUser(username, password);
    return res.send(response);
  }
}

export default AuthController;
