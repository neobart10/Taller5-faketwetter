const dbManager = require('../database.config/database.manager');

/**
 * Creation of an user
 * @param {*} userObject JSON Object with User information
 */
async function createUser(req, res) {

    // CHECK IF THE REQUEST BODY IS EMPTY
    if (!req.body) {
        res.status(400).send({
            message: "Request body is empty!!!!"
        });
        return;
    }

    // CREATING THE OBJECT TO PERSIST
    const newUserObject = {
        username: req.body.username,
        pass: req.body.pass,
        creation_date: req.body.creation_date
    };

    // EXECUTING THE CREATE QUERY - INSERT THE OBJECT INTO DATABASE 
    dbManager.User.create(newUserObject).then(
        data => {
            res.send(data);
        }
    ).catch(
        e => {
            // Print error on console
            console.log(e);
            // Send error message as a response 
            res.status(500).send({
                message: "error in create user"
            });
        }
    );
}

/**
 * GEt all users
 */
async function findAllUsers(req, res) {
    try {
        //Execute query
        const users = await dbManager.User.findAll();

        //Send response
        res.json({
            data: users
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

/**
 * Get user by id
 */
async function findOneUser(req, res) {
    try {
        const {idUser} = req.params;

        //Execute query
        const user = await dbManager.User.findOne({
            where: {
                idUser: idUser
            }
        });
        //Send response
        res.json(user);

    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred"
        });
    }
}

/**
 * Update user
 */
async function updateUser(req, res) {
    // CHECK IF THE REQUEST BODY IS EMPTY
    if (!req.body) {
        res.status(400).send({
            message: "Request body is empty!!!!"
        });
        return;
    }

    // EXECUTING THE Update QUERY - Update THE OBJECT INTO DATABASE
    dbManager.User.update(
        {username: req.body.username, pass: req.body.pass, creation_date: req.body.creation_date},
        {returning: true, where: {idUser: req.params.idUser}}
    ).then(
        data => {
            console.log(data);
            res.json({
                data: data
            });

            //res.send(data);
        }
    ).catch(
        e => {
            // Print error on console
            console.log(e);
            // Send error message as a response
            res.status(500).send({
                message: "error in Update user"
            });
        }
    );
}

/**
 * Delete an existen user by username
 * @param {*} req
 * @param {*} res
 */
function deleteUserByUsername(req, res) {

    // EXECUTING THE Delete QUERY - Delete THE OBJECT INTO DATABASE
    dbManager.User.destroy({
        where: {username: req.params.username}}
    ).then(
        data => {
            console.log(data);
            res.json({
                data: data
            });

            //res.send(data);
        }
    ).catch(
        e => {
            // Print error on console
            console.log(e);
            // Send error message as a response
            res.status(500).send({
                message: "error in Update user"
            });
        }
    );

}

/**
 *
 * @param {*} req
 * @param {*} res
 */
function deleteAllUsers(req, res) {
    // EXECUTING THE Delete QUERY - Delete THE OBJECT INTO DATABASE
    dbManager.User.destroy({
        where: {}, truncate: false}
    ).then(
        data => {
            console.log(data);
            res.json({
                data: data
            });

            //res.send(data);
        }
    ).catch(
        e => {
            // Print error on console
            console.log(e);
            // Send error message as a response
            res.status(500).send({
                message: "error in Update user"
            });
        }
    );
}

/**
 *
 * @param {*} req
 * @param {*} res
 */
async function findAllUsersByCreatedDate(req, res) {
    try {
        //Execute query
        const date = new Date(req.params.creation_date);

        const users = await dbManager.User.findAll({
            where: {creation_date: date}
        });

        //Send response
        res.json({
            data: users
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

async function loginUser(req, res) {
    try {
        const {username, pass} = req.body;

        //Execute query
        const user = await dbManager.User.findOne({
            where: {
                username: username
            }
        });
        //Send response
        console.log(user.username);
        console.log(user.pass);
        if(user.pass == pass){
            res.send(true);
        }else res.send(false);

        //res.json(user);

    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response
        res.status(500).send({
            message: "Some error occurred"
        });
    }
}

exports.createUser = createUser;
exports.findAllUsers = findAllUsers;
exports.findOneUser = findOneUser;
exports.updateUser = updateUser;
exports.deleteUserByUsername = deleteUserByUsername;
exports.deleteAllUsers = deleteAllUsers;
exports.findAllUsersByCreatedDate = findAllUsersByCreatedDate;
exports.loginUser = loginUser;