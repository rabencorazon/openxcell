const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, set: (v) => v.toLowerCase() },
    fname: { type: String, default: "" },
    lname: { type: String, default: "" },
    password: { type: String }
}, {
    timestamps: true
});

/**
 * Apply getter and setter for object and json
 */
UserSchema.set("toObject", { getters: true, virtuals: false });
UserSchema.set("toJSON", { getters: true, virtuals: false });

/* Password hash middleware */
UserSchema.pre("save", function save(next) {
    const user = this;

    if (!user.password || !user.isModified("password")) return next();

    // encrypt password
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;
    next();
});

UserSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
}

const User = mongoose.model('users', UserSchema);

module.exports = { User }