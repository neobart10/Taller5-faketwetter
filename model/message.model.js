module.exports = (sequelize, Sequelize) =>{
    const Message = sequelize.define("Message", {
        idTransmitter: Sequelize.INTEGER,
        idReceiver: Sequelize.INTEGER,
        text: Sequelize.STRING,
    }, {
        tableName: "message"
    });    
    
    return Message;
}
