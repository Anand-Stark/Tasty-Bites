// writing the user functions here :
const express = require('express');
const admin= require("firebase-admin")

exports.getUser = (req,res) =>{ 
     return res.send('ok ok ');
}
exports.jwtVerification = async (req,res) =>{ 
       if(!req.headers.authorization){
          return res.status(500).send({msg:"no token"});
       }

       const getToken = req.headers.authorization.split(" ")[1];
       const recievedToken = await admin.auth().verifyIdToken(getToken)

       if(!recievedToken){
          return res.status(500).json({success:false, msg:"not verified"})
       }
       return res.status(200).json({success:true,msg:recievedToken});
          
}

// now, this token has to be sent to the frontend after validation : 