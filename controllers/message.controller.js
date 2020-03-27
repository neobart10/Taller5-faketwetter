const dbManager = require('../database.config/database.manager');

/**
 * Creation of an Message
 * @param {*} newMesageObject JSON Object with Follow information
 */
async function createMessage(req, res) {

    // CHECK IF THE REQUEST BODY IS EMPTY
    if (!req.body) {
        res.status(400).send({
            message: "Request body is empty!!!!"
        });
        return;
    }

    // CREATING THE OBJECT TO PERSIST
    const newMessageObject = {
        idTransmitter: req.body.idTransmitter,
        idReceiver: req.body.idReceiver,
        text: req.body.text
    };

    // EXECUTING THE CREATE QUERY - INSERT THE OBJECT INTO DATABASE 
    dbManager.Message.create(newMessageObject).then(
        data => {
            res.send(data);
        }
    ).catch(
        e => {
            // Print error on console
            console.log(e);
            // Send error message as a response 
            res.status(500).send({
                message: "error in create Message"
            });
        }
    );
}

/**
 * GEt all Messages by Transmiter and Receiver
 */
async function findAllMessagesByIdTransmitterAndIdReceiver(req, res) {
    try {
        const {idTransmitter, idReceiver} = req.params;

        const messages = await dbManager.Message.findAll(
            {where: {idTransmitter: idTransmitter, idReceiver: idReceiver}}
        );

        //Send response
        res.json({
            data: messages
        });

    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred"
        });
    }
}


exports.createMessage = createMessage;
exports.findAllMessagesByIdTransmitterAndIdReceiver = findAllMessagesByIdTransmitterAndIdReceiver;