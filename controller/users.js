const Errors = require('../errors');

class UsersController {

  //find user
  async getUser (req, res, next) {
    try {
      let user = await req.app.services.users.getUser(req.params.id);
      return res.status(200).send(user);
    } catch (err) {
      return Errors.generateNotFoundError(res, `user`);
    }
  };

  //find all users
  async getUsers (req, res, next) {
    try {
      let users = await req.app.services.users.getUsers();
      return res.status(200).send(users);
    } catch (err) {
      return Errors.generateNotFoundError(res, `user`);
    }
  }

  //all users that have benefits
  async usersBenefits (req, res, next) {
    try {
      let users = await req.app.services.users.usersBenefits();
      return res.status(200).send(users);
    } catch (err) {
      return Errors.generateNotFoundError(res, `user`);
    }
  };

  //create user
  async register (req, res, next) {
    let userObject = {...req.body};
    try {
      let user = await req.app.services.users.createUser(userObject);
      return res.status(200).send('successfully registered');
    } catch (err) {
      return generateRegisteredEmailError(res, err.message);
    }
  };

  //signin
  async login (req, res, next) {
    try {
      let result = await req.app.services.users.login(req.body.email, req.body.password);
      console.log('controller user', result.user);
      console.log('controller token', result.token);

      return res.status(200).send(result);
    } catch (err) {
      return next(err);
    }
  };

  //change user
  async changeUser (req, res, next) {
    let changes = {...req.body};
    try {
      let user = await req.app.services.users.changeUser(changes, req.params.id);
      return res.status(200).send(user);
    } catch (err) {
      return next(err);
    }
  };

  //delete user
  async deleteUser (req, res, next) {
    try {
      let user = await req.app.services.users.deleteUser(req.params.id);
      return res.status(200).send(user);
    } catch (err) {
      return next(err);
    }
  };
};

module.exports = UsersController;
