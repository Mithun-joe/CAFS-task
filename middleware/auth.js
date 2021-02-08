const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')

module.exports = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        const { _id } = jwt.verify(token, config.get('jwtSecret'))

        User.findOne({ _id: _id })
            .then(user => {
                req.user = user._id
                next()
            })
            .catch(err => {
                console.log(err)
                return res.status(404).json({ msg: 'no token,authorization denied' })
            })
    } catch (err) {
        console.log(err)
        return res.status(500).send('server error')
    }

}

// const token = req.header('x-auth-token');

// // Check if not token
// if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
// }

// // Verify token
// try {
//     jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
//         if (error) {
//             return res.status(401).json({ msg: 'Token is not valid' });
//         } else {
//             req.user = decoded.user;
//             next();
//         }
//     });
// } catch (err) {
//     console.error('something wrong with auth middleware');
//     res.status(500).json({ msg: 'Server Error' });
// }


// jwt.verify(token, config.get('jwtSecret'))
//         .then(decoded => {
//             return req.user = decoded.user
//         })
//         .catch(err=>{
//             res.status(401).json({msg:'token is not valid'})
//         })
