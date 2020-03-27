//IMPORT SEQUELIZE
const Sequelize = require("sequelize");
//IMPORT SEQUELIZE CONNECTION
const sequelizeConnection = require('../database.config/db.connection.js');

//IMPORT MODELS
const UserModel = require("../model/user.model");
const PostModel = require("../model/post.model");
const FollowsModel = require("../model/follows.model");
const MessageModel = require("../model/message.model");

//INITIALIZE MODELS
const User = UserModel (sequelizeConnection, Sequelize);
const Post = PostModel (sequelizeConnection, Sequelize);
const Follows = FollowsModel (sequelizeConnection, Sequelize);
const Message = MessageModel (sequelizeConnection, Sequelize);

//CREATE RELATIONS BETWEEN MODELS
User.hasMany(Post, { foreignKey: 'idPost', sourceKey: 'idUser' });
Post.belongsTo( User, { foreignKey: 'idUser', sourceKey: 'idPost' });

//GROUP MODELS
const models = {
  User: User,
  Post: Post,
  Follows: Follows,
  Message: Message
};


/**
 * Create object to manage the models and database
 */
const db = {
  ...models,
  sequelizeConnection
};
  
// EXPORT CONSTANT DB
module.exports = db;
