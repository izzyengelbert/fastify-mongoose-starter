import HttpStatus from 'http-status-codes';
import userSchemas from './userSchemas';

export default class UserController {
  constructor(app) {
    this._app = app;
    this._service = this._app.locals.services.userService;
    this._getUsers = this._getUsers.bind(this);
    this._getUserById = this._getUserById.bind(this);
    this._createUser = this._createUser.bind(this);
  }

  registerRoutes() {
    const options = { prefix: '/users' };
    const validatorCompiler = ({ schema }) => (data) => schema.validate(data);
    this._app.server.register((instance, opts, next) => {
      instance.get('/', {
        schema: userSchemas.get,
        validatorCompiler,
        preHandler: this._app.server.auth([this._app.server.authenticate])
      }, this._getUsers);
      instance.get('/:id', { schema: userSchemas.getById, validatorCompiler }, this._getUserById);
      instance.post('/', { schema: userSchemas.post, validatorCompiler }, this._createUser);
      next();
    }, options);
  }

  async _getUsers(req, res) {
    const { username } = req.query;
    if (username) {
      const user = await this._service.getUserByUsername(username);
      return res.status(HttpStatus.OK).send(user);
    }
    const users = await this._service.getAllUsers();
    return res.status(HttpStatus.OK).send(users);
  }

  async _getUserById(req, res) {
    const user = await this._service.getUserById(req.params.id);

    return res.status(HttpStatus.OK).send(user);
  }

  async _createUser(req, res) {
    const user = await this._service.createUser(req.body);

    return res.status(HttpStatus.CREATED).send(user);
  }
}
