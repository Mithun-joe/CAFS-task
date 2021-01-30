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
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, mobileNo, password } = req.body;

    try {
        let user = await User.findOne({ name })
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
        }

        const avatar = gravatar.url(name, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })


        user = new User({
            name,
            mobileNo,
            avatar,
            password
        })

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save()

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