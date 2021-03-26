import Mongoose from 'mongoose';

class Database {
  constructor(options) {
    this._options = options;
    this.connection = null;
  }

  async connect() {
    const {
      dbUrl, dbHost, dbPort, name, username, password
    } = this._options;
    const connectionUrl = dbUrl === ''
      ? `mongodb://${username}:${password}@${dbHost}:${dbPort}/${name}?authSource=admin` : dbUrl;
    if (this.connection === null) {
      const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };
      await Mongoose.connect(connectionUrl, options);
      this.connection = Mongoose.connection;
      Mongoose.set('debug', true);
      return this.connection;
    }
    return this.disconnect().then(() => { this.connection = null; return this.connection; });
  }

  disconnect() {
    return this.connection.close();
  }
}

export default Database;
