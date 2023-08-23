const express   = require('express');
const User = require('../models/user');
const { default: mongoose } = require('mongoose');
const app = express();

async function requestRegisterHandler(req, res){
    try{
        const {companyName, ownerName, rollNo, ownerEmail, accessCode} = req.body;
        console.log(companyName, ownerName, rollNo, ownerEmail, accessCode);
        const user = {
            companyName: companyName,
            ownerName: ownerName,
            rollNo: rollNo,
            ownerEmail: ownerEmail,
            accessCode: accessCode
        }
        const res = await User.create(user);
        return res.status(200).send({"status": "success", "message": "register successful", "companyName":`${companyName}`, "cliendId": `${res.hash}, "clientSecret" ${res.salt}`});
    }
    catch(err){
        return res.status(500).send({"status": "error", "message": "register failed"});
    }
}

module.exports = {requestRegisterHandler};