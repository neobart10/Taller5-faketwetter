module.exports = (sequelize, Sequelize) =>{
    const Follows = sequelize.define("Follows", {
        idUser: Sequelize.INTEGER,
        idFollow: Sequelize.INTEGER,
    }, {
        tableName: "follows"
    });    
    
    return Follows;
}

