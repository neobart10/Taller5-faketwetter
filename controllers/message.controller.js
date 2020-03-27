const dbManager = require('../database.config/database.manager');

/**
 * Creation of an Follows
 * @param {*} newFollowsObject JSON Object with Follow information
 */
async function createFollows(req, res) {

    // CHECK IF THE REQUEST BODY IS EMPTY
    if (!req.body) {
        res.status(400).send({
            message: "Request body is empty!!!!"
        });
        return;
    }

    // CREATING THE OBJECT TO PERSIST
    const newFollowsObject = {
        idUser: req.body.idUser,
        idFollow: req.body.idFollow
    };

    // EXECUTING THE CREATE QUERY - INSERT THE OBJECT INTO DATABASE 
    dbManager.Follows.create(newFollowsObject).then(
        data => {
            res.send(data);
        }
    ).catch(
        e => {
            // Print error on console
            console.log(e);
            // Send error message as a response 
            res.status(500).send({
                message: "error in create Follows"
            });
        }
    );
}

/**
 * GEt all Followers
 */
async function findAllFollowers(req, res) {
    try {
        const {idFollow} = req.params;

        const followers = await dbManager.User.findAll(
            {where: {idFollow: idFollow}}
        );

        //Send response
        res.json({
            data: followers
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


exports.createFollows = createFollows;
exports.findAllFollowers = findAllFollowers;