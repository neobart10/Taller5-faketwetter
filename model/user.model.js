module.exports = (sequelize, Sequelize) =>{
    const User = sequelize.define("User", {
        idUser: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        username: {
            type: Sequelize.STRING,
            unique: true
        },

        pass: Sequelize.STRING,

        creation_date: Sequelize.DATE,
    }, {
        tableName: "users"
    });    
    
    return User;
}

