const express = require('express');

const router = express();

const {requestRegisterHandler} = require('../controller/authC');

router.post('/register', requestRegisterHandler);

// router.post('/auth', requestAuthHandler);

// router.get('/trains', requestTrainsHandler);

// router.get('/trains/:id', check, requestTrainIdHandler);

module.exports = router;