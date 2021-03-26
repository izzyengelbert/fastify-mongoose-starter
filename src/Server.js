export default class Server {
  constructor(app, config) {
    this._app = app;
    this._config = config;
  }

  async start() {
    const { port, db } = this._config;
    try {
      await this._app.initializeDatabase(db);
      this._app.initializeApp();
      this._app.server.listen(port);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  stop() {
    this._app.database.disconnect().then(() => {
      console.log('Database disconnected.');
      this._app.server.close().then(() => {
        console.log('Server successfully closed.');
      }, (error) => {
        console.log('An error happened', error);
      });
    }, (error) => {
      console.log('An error happened', error);
    });
  }
}
