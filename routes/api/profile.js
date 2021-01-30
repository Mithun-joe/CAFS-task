const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')


//@route GET api/profile/me
//@desc get current users profile
//@access Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'there is no profile for this user' })
        }

        res.json(profile)

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error')
    }
})



//@route POST api/profile
//@desc Create or update user profile
//@access Private
router.post('/', [auth, [
    check('email', 'Enter a valid email id').isEmail(),
    check('skills', 'skills is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { mobileNo, gender, role, skills, email, resume, dob } = req.body

    const profileFields = {};

    profileFields.user = req.user.id;

    if (mobileNo) profileFields.mobileNo = mobileNo;
    if (gender) profileFields.gender = gender;
    if (role) profileFields.role = role;
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    if (email) profileFields.email = email;
    if (resume) profileFields.resume = resume;
    if (dob) profileFields.dob = dob;


    try {
        let profile = await Profile.findOne({ user: req.user.id })

        if (profile) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            )

            return res.json(profile)
        }


        profile = new Profile(profileFields)
        await profile.save();
        res.json(profile)

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }

    res.send('hello')


})

//@route GET api / profile
//@desc Get all profiles
//@access Public

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles)

    } catch (err) {
        console.log(err);
        res.status(500).send('server error')
    }
});

//@route GET api/profile/user/:user_id
//@desc Get profile by user Id
//@access Public

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate(
            'user',
            ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' })
        }

        res.json(profile)

    } catch (err) {
        console.log(err);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' })
        }
        res.status(500).send('server error')
    }
});



//@route DELETE api/profile
//@desc Delete profile, user & post
//@access Private

router.delete('/', auth, async (req, res) => {
    try {
        //@todo - remove user posts
        // Remove Profile
        await Profile.findOneAndRemove({ user: req.user.id });
        //Remove User
        await User.findOneAndRemove({ id: req.user.id });

        res.json({ msg: 'user removed' })

    } catch (err) {
        console.log(err);
        res.status(500).send('server error')
    }
});





module.exports = router