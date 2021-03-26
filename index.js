import Server from './src/Server';
import App from './src/App';
import config from './config';

const options = {
  // http2: true,
  logger: {
    prettyPrint: true,
    serializers: {
      res(reply) {
        return {
          statusCode: reply.statusCode
        };
      },
      req(request) {
        return {
          method: request.method,
          url: request.url
          // path: request.path,
          // parameters: request.parameters,
          // Including the headers in the log could be in violation
          // of privacy laws, e.g. GDPR. You should use the "redact" option to
          // remove sensitive fields. It could also leak authentication data in
          // the logs.
          // headers: request.headers
        };
      }
    }
  }
};
const app = new App(options);
const server = new Server(app, config);

server.start().then(() => {
  console.log('Server started.');
  console.log('Listening on port:', process.env.PORT);
});

process.on('SIGTERM', () => {
  server.stop();
});
