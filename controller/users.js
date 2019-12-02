import Errors from '../errors';
import Queries from '../helpers/generateQuery';

export default class UsersController {

  //find current user
  async getCurrentUser (req, res, next) {
    try {
      let user = await req.app.services.users.getUser(req.user.id);
      return res.status(200).send(user);
    } catch (err) {
      return Errors.generateNotFoundError(res, `user`);
    }
  };

  //find user by id
  async getUser (req, res, next) {
    try {
      let user = await req.app.services.users.getUser(req.params.id);
      return res.status(200).send(user);
    } catch (err) {
      return Errors.generateNotFoundError(res, `user`);
    }
  };

  //find users
  async getUsers (req, res, next) {
    let query = Queries.generateUserQuery(req);
    let count = await req.app.services.count.countUsers(query.search);
    try {
      let users = await req.app.services.users.getUsers(query);
      return res.status(200).send({users, count});
    } catch (err) {
      return Errors.generateNotFoundError(res, `user`);
    }
  };

  //find user benefits
  async userBenefits (req, res, next) {
    try {
      let benefits = await req.app.services.benefits.userBenefits(req.params.id);
      return res.status(200).send(benefits);
    } catch (err) {
      return Errors.generateNotFoundError(res, `benefit`);
    }
  }

  //all users that have benefits
  async usersBenefits (req, res, next) {
    try {
      let query = {...req.query};
      let users = await req.app.services.users.usersBenefits();
      return res.status(200).send(users);
    } catch (err) {
      return Errors.generateNotFoundError(res, `user`);
    }
  };

  //create user
  async register (req, res, next) {
    let userObject = {...req.body};
    delete userObject.repeatPassword;
    try {
      let user = await req.app.services.users.createUser(userObject);
      return res.status(200).send('successfully registered');
    } catch (err) {
      return Errors.generateRegistrationError(res, `registration`);
    }
  };

  //signin
  async login (req, res, next) {
    try {
      let result = await req.app.services.users.login(req.body.email, req.body.password);
      return res.status(200).send(result);
    } catch (err) {
      return Errors.generateLoginError(res, `login`);
    }
  };

  //refresh token
  async refreshToken (req, res, next) {
    try {
      let result = await req.app.services.users.refreshToken(req.body.refreshToken, req.user.email);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(401).send('refresh token not exists');
    }
  };

  //change user
  async updateUser (req, res, next) {
    let changes = {...req.body};
    try {
      let user = await req.app.services.users.updateUser(changes, req.params.id);
      return res.status(200).send(user);
    } catch (err) {
      return Errors.generateUpdateError(res, `update`);
    }
  };

  //upload avatar
  // async upload (req, res, next) {
  //   try {
  //     let result = await req.app.services.users.upload(req.files.file, req.params.id);
  //     return res.status(200).send(result);
  //   } catch (err) {
  //     console.log(err.message);
  //     return res.send('upload failed');
  //   }
  // };

  //delete user
  async deleteUser (req, res, next) {
    try {
      let user = await req.app.services.users.deleteUser(req.params.id);
      return res.status(200).send(user);
    } catch (err) {
      return Errors.generateDeleteError(res, `update`);
    }
  };
};
