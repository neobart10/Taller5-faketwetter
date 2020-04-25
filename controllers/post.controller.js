const dbManager = require('../database.config/database.manager');

/**
 * Creation of an post
 * @param {*} postObject JSON Object with User information
 */

function createPost(req, res) {

    // CHECK IF THE REQUEST BODY IS EMPTY
    if (!req.body) {
        res.status(400).send({
            message: "Request body is empty!!!!"
        });
        return;
    }

    // CREATING THE OBJECT TO PERSIST
    const newPostObject = {
        message: req.body.message,
        published_date: req.body.published_date,
        idUser: req.body.idUser
    };


    // EXECUTING THE CREATE QUERY - INSERT THE OBJECT INTO DATABASE 
    dbManager.Post.create(newPostObject).then(
        data => {
            res.send(data);
        }
    ).catch(
        e => {
            // Print error on console
            console.log(e);
            // Send error message as a response 
            res.status(500).send({
                message: "error in create post"
            });
        }
    );
}

/**
 * GEt all post
 */
async function findAllPosts(req, res) {
    try {
        //Execute query
        const posts = await dbManager.Post.findAll();

        //Send response
        res.json({
            data: posts
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
 * Get post by id
 */
async function findOnePost(req, res) {
    try {
        const {idUser} = req.params;

        //Execute query
        const user = await dbManager.Post.findOne({
            where: {
                idPost: idUser
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
 * Update post
 */
async function updatePost(req, res) {
    // CHECK IF THE REQUEST BODY IS EMPTY
    if (!req.body) {
        res.status(400).send({
            message: "Request body is empty!!!!"
        });
        return;
    }

    // EXECUTING THE Update QUERY - Update THE OBJECT INTO DATABASE
    dbManager.Post.update(
        {message: req.body.message, published_date: req.body.published_date, idUser: req.body.idUser},
        {returning: true, where: {idPost: req.params.idPost}}
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
 * Delete an existen post by idPost
 * @param {*} req
 * @param {*} res
 */
function deletePostByIdPost(req, res) {

    // EXECUTING THE Delete QUERY - Delete THE OBJECT INTO DATABASE
    dbManager.Post.destroy({
        where: {idPost: req.params.idPost}}
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
                message: "error in Delete post"
            });
        }
    );

}

/**
 * Delete an existen post by idPost
 * @param {*} req
 * @param {*} res
 */
function deletePostByIdUser(req, res) {

    // EXECUTING THE Delete QUERY - Delete THE OBJECT INTO DATABASE
    dbManager.Post.destroy({
        where: {idUser: req.params.idUser}}
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
                message: "error in Delete post"
            });
        }
    );

}

/**
 *
 * @param {*} req
 * @param {*} res
 */
function deleteAllPost(req, res) {
    // EXECUTING THE Delete QUERY - Delete THE OBJECT INTO DATABASE
    dbManager.Post.destroy({
        where: {}, truncate: true}
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
                message: "error in Delete all upost"
            });
        }
    );
}


/**
 * GEt all post
 */
async function findAllPostsByIdUser(req, res) {
    try {
        //Execute query
        const posts = await dbManager.Post.findAll({
            where: {idUser: req.params.idUser}
        });

        //Send response
        res.json({
            data: posts
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

exports.createPost = createPost;
exports.findAllPosts = findAllPosts;
exports.findOnePost = findOnePost;
exports.updateUser = updatePost;
exports.deletePostByIdPost = deletePostByIdPost;
exports.deletePostByIdUser = deletePostByIdUser;
exports.deleteAllPost = deleteAllPost;
exports.findAllPostsByIdUser = findAllPostsByIdUser;
