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

       const getToken = req.headers.authorization.split(' ')[1];

       console.log(getToken)
       
       try{

          const recievedToken = await admin.auth().verifyIdToken(getToken)
          if(!recievedToken) return res.status(500).json({success:false, msg: "Authorization failed"})

          return res.status(200).json({success:false,msg :recievedToken})
       }
       catch (err){
          return res.status(500).json({success:false, msg:"problem in recieving token"})
       }
          
}

// now, this token has to be sent to the frontend after validation : 