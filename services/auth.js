"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Auth {
  constructor(User) {
    this.User = User;
  }

  async authenticate(data) {
    const user = await this.User.findOne({
      email: data.email
    });

    if (!user || !(await _bcrypt.default.compare(data.password, user.password))) {
      return false;
    }

    return user;
  }

  static generateToken(payload) {
    return _jsonwebtoken.default.sign(payload, _config.default.get('auth.key'), {
      expiresIn: _config.default.get('auth.tokenExpiresIn')
    });
  }

}

var _default = Auth;
exports.default = _default;