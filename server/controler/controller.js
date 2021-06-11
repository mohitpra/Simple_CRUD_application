var User = require('../model/schema');

//create and save new user

exports.create = (req, res) => {
    //validate request
    if(!req.body){
        res.status(400).send({message:"Content cannot be empty"});
        return;
    }

    //new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        gender:req.body.gender,
        status: req.body.status
    });

    //save user in the dataase
    user
        .save()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:err.message || "some error occured during creating new user"
            });
        });

}


//retrive and return all users or a single user

exports.find = (req, res) => {

    if(req.query.id){
        const id = req.query.id;

        User.findById(id)
            .then(data => {
                if(!data){
                    res.status(404).send({message: "User not found with id = " +id});
                }else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({message: "Error with userid = " + id});
            })
    }else{

    User.find()
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error occured during retreving the users"
        });
    });
}
}


//update a new identified user by id

exports.update = (req, res) => {
    if(!req.body){
        return res.status(400).send({message: "Enter data to update. Don't leave all empty"});
    }

    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
    .then(data => {
        if(!data){
            res.status(404).send({message: `User not found with id ${id}`});
        }else{
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({message:err.message || "Error updte user"});
    })
        
    
}

//Delete a user with specified userid in the request

exports.delete = (req, res) => {
    const id = req.params.id

    User.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({message: `Cannot delete with id ${id}. Maybe id is wrong`});
        }else {
            res.send({message: "User was deleted successfully"});
        }
    })
    .catch(err => {
        res.status(500).send({message: "Could not delete the user with id = " + id});
    });
}