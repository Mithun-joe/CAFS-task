const express = require('express');
const router = express.Router();
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const User = require('../../models/User')



//@route GET api/auth
//@desc Test route
//@access Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error')
    }
})



//@route GET api/auth
//@desc Authenticate User & get token
//@access Public
router.post('/', [
    check('mobileNo', 'Mobile number is required').not().isEmpty(),
    check('password', 'password is required').exists()
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const data = req.body


    User.findOne({ mobileNo: data.mobileNo })
        .then(user => {

            if (!user) {
                return res.status(401).json({ errors: [{ msg: 'invalid Credentials' }] })
            }

            bcrypt
                .compare(data.password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(400).json({ errors: [{ msg: 'invalid credentials' }] })
                    }
                    const token = jwt.sign({ _id: user._id }, config.get('jwtSecret'))
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