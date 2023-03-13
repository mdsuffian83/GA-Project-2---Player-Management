var TaskModel = require('../model/task');

exports.create = (req, res)=>{
   // validate reqeust
   if(!req.body){
      res.status(400).send({message:'Content cannot be empty'})
      return;
   }

   // new task
   const newTask = new TaskModel({
      name:req.body.name,
      training:req.body.training,
      coaches:req.body.coaches,
   });

   // save user in the database
   newTask
      .save(newTask)
      .then(data => {
         // res.send(data)
         res.redirect('/add-task');
      })
      .catch(err =>{
         res.status(500).send({
            message: err.message || "Some error occured while creating a create operation for task"
         });
      });

}
// retrieve and return all users/retrive and return a single user
exports.find = (req,res)=>{
   // validate request 
   if(req.query.id){
      const id = req.query.id;

      TaskModel.findById(id)
      .then(data=>{
         if(!data){
            res.status(404).send({message: "Not found user with id" + id})
         } else {
            res.send(data)
         }
      })
      .catch(err=>{
         res.status(500).send({message:"Error retrieving user with id " + id})
      })

   } else {
   TaskModel.find()
   .then(task => {
      res.send(task)
   })
   .catch(err => {
      res.status(500).send({message:err.message||"Error occurred while retriving tasks information"})
   })
}
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
   if(!req.body){
       return res
           .status(400)
           .send({ message : "Data to update can not be empty"})
   }

   const id = req.params.id;
   TaskModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
       .then(data => {
           if(!data){
               res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
           }else{
               res.send(data)
           }
       })
       .catch(err =>{
           res.status(500).send({ message : "Error Update user information"})
       })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
   const id = req.params.id;

   TaskModel.findByIdAndDelete(id)
       .then(data => {
           if(!data){
               res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
           }else{
               res.send({
                   message : "User was deleted successfully!"
               })
           }
       })
       .catch(err =>{
           res.status(500).send({
               message: "Could not delete User with id=" + id
           });
       });
}