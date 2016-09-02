var User = require('../models/user');
var Story = require('../models/story');
var config = require('../../config');
var jsonwebtoken = require('jsonwebtoken');

var secretKey = config.secretKey;

function createToken(user) {
    var token = jsonwebtoken.sign({
        id: user._id,
        name: user.name,
        username: user.username
    }, secretKey, {
            expiresIn: 3600
        });
    return token;
}

module.exports = function (app, express, io) {
    var api = express.Router();

    // To use this route, open "http://localhost:3000/api/allstories" in the browser.
    api.get('/allstories', function (req, res) {
        Story.find({}, function (err, stories) {
            if (err) {
                res.send(err);
                return;
            }
            res.json(stories);
        });
    });

    // To use this route, open "http://localhost:3000/api/signup" in the browser.
    api.post('/signup', function (req, res) {
        var user = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        });
        var token = createToken(user);
        user.save(function (err) {
            if (err) {
                res.send(err);
                return;
            }
            res.json({
                success: true,
                message: 'User Has Been Created!',
                token: token
            });
        });
    });

    // To use this route, open "http://localhost:3000/api/users" in the browser.
    api.get('/users', function (req, res) {
        User.find({}, function (err, users) {
            if (err) {
                res.send(err);
                return;
            }
            res.json(users);
        });
    });

    // To use this route, open "http://localhost:3000/api/login" in the browser.
    api.post('/login', function (req, res) {
        User.findOne({
            username: req.body.username
        }).select('name username password').exec(function (err, user) {
            if (err) {
                throw err;
            }
            if (!user) {
                res.send({ message: 'User Does Not Exist!' });
            } else if (user) {
                var validPassword = user.comparePassword(req.body.password);
                if (!validPassword) {
                    res.send({ message: 'Invalid Password' });
                } else {
                    var token = createToken(user);
                    res.json({
                        success: true,
                        message: 'Successfully Logged In!',
                        token: token
                    });
                }
            }
        });
    });

    // Our API Middleware should be located here in order to check whether we have passed
    // the Login process successfully or not, or whether we have a valid Token or not.
    api.use(function (req, res, next) {
        console.log("Somebody Has Just Logged In To Our Application!");
        var token = req.body.token || req.params.token || req.headers['x-access-token'];
        if (token) {
            jsonwebtoken.verify(token, secretKey, function (err, decoded) {
                if (err) {
                    res.status(403).send({ success: false, message: "Invalid Token!" });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.status(403).send({ success: false, message: "No Token Provided!" });
        }
    });

    // Here we define a 'Chain' which means defining multiple http methods on a single route.
    api.route('/')
        .post(function (req, res) {
            var story = new Story({
                creator: req.decoded.id,
                content: req.body.content
            });
            story.save(function (err, newStory) {
                if (err) {
                    res.send(err);
                    return;
                }
                io.emit('refreshStories', newStory);
                res.json({ message: "New Story Created!" });
            });
        })
        .get(function (req, res) {
            Story.find({ creator: req.decoded.id }, function (err, stories) {
                if (err) {
                    res.send(err);
                    return;
                }
                res.send(stories);
            });
        });

    // This route is created to fetch the user's decoded information from the token
    api.get('/me', function (req, res) {
        res.json(req.decoded);
    });

    return api;
}