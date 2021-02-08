const express = require('express');
const router = express.Router();
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')



//@route GET api/users
//@desc Register User
//@access Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('mobileNo', 'Mobile number is required').not().isEmpty(),
    check('password', 'please enter a password with 4 or more characters').isLength({ min: 4 })
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }


    const data = req.body

    const { name } = data

    User.findOne({ name })
        .then(user => {
            if (user) {
                return res.status(401).json({ errors: [{ msg: 'user already exists' }] })
            }

            bcrypt
                .genSalt(10)
                .then(salt => {
                    return bcrypt.hash(data.password, salt)
                })
                .then(hash => {
                    data.password = hash
                    const user = new User(data)
                    const token = jwt.sign({ _id: user._id }, config.get('jwtSecret'))
                    user.save()
                    return token
                })
                .then((token) => {
                    delete data.password;
                    return res.status(201).json({ token })
                })
                .catch(err => {
                    console.log(err)
                    return res.status(500).send('cant access database')
                })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send('cant access database')
        })
})


module.exports = router