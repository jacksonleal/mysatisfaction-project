"use strict";

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = process.env.PORT || 3000;

(async () => {
  try {
    const app = await (0, _app.default)();
    const server = app.listen(process.env.PORT || 3000, () => console.info(`app running on port ${port}`));
    const exitSignals = ["SIGINT", "SIGTERM", "SIGQUIT"];
    exitSignals.map(sig => process.on(sig, () => server.close(err => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      app.database.connection.close(function () {
        console.info("Database connection closed!");
        process.exit(0);
      });
    })));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();