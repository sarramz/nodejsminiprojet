const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



var users = []


router.post('/sign-up',async(req,res) => {
    var User = {
        "username":"",
        "password":""
        }
        const username = req.body.username;
        const password = req.body.password;
    if(!users.find(user=>user.username === username)){

        const hashedPassword = await bcrypt.hash(password,10)
        
        User.username = username; 
        User.password = hashedPassword

        users.push(User);
        console.log(users);
        return res.json(201,{user:User})
    }else
        return rep.json(401,{msg:"Vous avez deja un compte"})

})


router.post('/sign-in',async(req,res,next) => {
    try{
  
        const username = req.body.username;
        const password = req.body.password;

    const user = users?.find(user => user.username === username);
    if(user){

        const isPasswordvalid = await bcrypt.compare(password,user.password);
        const token =  jwt.sign({user:user.username},'shhhhh');
        if(isPasswordvalid){

            return res.json(200,{user: user,token:token});

        }else
             return res.json(401,{msg:"password ou username est incorrect"});
    }else
        return res.json(401,{msg:"vous n'avez pas un compte"});
    }catch(e){
        next(e); 
    }
    


})


router.post('/sign-in-token',(req,res) => {

    let token =req.headers.authorization


    if (token) {
      try {
        
        const decoded_user = jwt.verify(token,'shhhhh')
        
        const user = users.find(user=>user.username == decoded_user.user)
        if(user){
            res.send(user)
            next()
        }
        else
            return res.json(401,{msg:"pas d autorisation"})
      }catch (err) {
        res.status(401)
        throw new Error('token est incorrect')
      }
    }
    else {
        rep.status(401)
        throw new Error('pas dautorisation , pas de token')
      }
    
  


})


module.exports = router;