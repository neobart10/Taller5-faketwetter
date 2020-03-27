module.exports = (sequelize, Sequelize) =>{
    const Follows = sequelize.define("Follows", {
        idUser: Sequelize.INTEGER,
        idfollow: Sequelize.INTEGER,
    }, {
        tableName: "follows"
    });    
    
    return Follows;
}

