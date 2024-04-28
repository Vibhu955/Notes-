const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const fetch = require('../middleware/Details.js');

const jwtkey = "issshhh";

//Creating user : "api/auth/createuser"
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email', "Enter a valid Email-id").isEmail(),
    body('email', "Enter a valid Email-id").isLowercase(),
    body('password').isLength({ min: 3 })
    //.custom((value,{req}) => {
    //  return req.body.password.isAlphanumeric();})
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ error: errors.array().map((e) => { return e.msg }) });
    //let user=await User.findOne
    if (await User.findOne({ email: req.body.email }))
        return res.status(400).json({ error: "User already exists" });//.send("User already exists");
    else {
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(req.body.password, salt);
        await User.create({    //let user=await User.create.....
            name: req.body.name,
            email: req.body.email,
            password: pass
        })         //payload {id:User(req.body)}
        const jwtID = jwt.sign({ id: User(req.body).id }, jwtkey);

        res.json({ "success": true, "token": jwtID });
    }
})

//Logging in User verifying email address (Authenticate): "api/auth/login"

router.post('/login', [
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Passowrd cant be blank").exists(),
    //.custom((value,{req}) => {
    //  return req.body.password.isAlphanumeric();})
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ error: errors.array().map((e) => { return e.msg }) });
    const { email, password } = req.body;
    try {
        let user = await User.findOne({email});
        if (!user)
            return res.status(400).json({ error: "Account is not created", link: "true" });

        if (!(await bcrypt.compare(password, user.password)))
            return res.status(400).json({ error: 'Wrong password entered' });

        const jwtID = jwt.sign({ id: user.id }, jwtkey);
        res.json({ "success": true, "token": jwtID });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Errror");
    }
})

//Getting user details of logged in user using JWTID (Authenticate): "api/auth/details"
router.post('/details', fetch, async (req, res) => {
    try {
        // console.log(req.body);
        const userid = req.body.id;
        const userget = await User.findById(userid).select("-password");
        res.send(userget);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Errror" });
    }
})
module.exports = router;
//const user= new User(req.body);
