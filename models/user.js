const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt-nodejs");

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, set: (v) => v.toLowerCase() },
    fname: { type: String, default: "" },
    lname: { type: String, default: "" },
    password: { type: String },
}, {
    timestamps: true
});

/**
 * Apply getter and setter for object and json
 */
UserSchema.set("toObject", { getters: true, virtuals: false });
UserSchema.set("toJSON", { getters: true, virtuals: false });

UserSchema.methods.generateSessionToken = function () {
    const token = jwt.sign({ _id: this._id, email: this.email }, process.env.jwt_secret, { expiresIn: 10800 });
    return token;
}

/* Password hash middleware */
docSchema.pre("save", function save(next) {
    const user = this;

    if (!user.password || !user.isModified("password")) return next();

    // encrypt password
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

const User = mongoose.model('users', UserSchema);

module.exports = { User }