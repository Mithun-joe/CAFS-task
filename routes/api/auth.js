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
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { mobileNo, password } = req.body;

    try {
        let user = await User.findOne({ mobileNo })
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })
        }

        const payload = {
            user: {
                id: user.id,
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {
            if (err) throw (err);
            res.json({ token })
        });

    } catch (err) {
        console.log(err);
        res.status(500).send('server error')
    }
})





module.exports = router