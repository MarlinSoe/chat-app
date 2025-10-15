import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const currentYear = new Date().getFullYear();

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // removes leading/trailing spaces
        minlength: 3, // optional: add minimum length
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // optional: enforce minimum password length
    },
    bio: {
        type: String,
        default: '', // make it optional with a default
        maxlength: 100 // optional: limit bio length
    },
    birthYear: {
        type: Number,
        required: true,
        min: currentYear - 49, // max age = 49
        max: currentYear - 15  // min age = 16
    },
    friends: {
        type: [String], // Array of usernames
        default: []
    }
    
}, {
    timestamps: true // adds createdAt and updatedAt
});


userSchema.statics.signup = async function (username, password, bio, birthYear) {
    if (!username.trim() || !password.trim() || !bio.trim() || birthYear === null || birthYear === undefined) {
        throw Error('All fields must be filled.');
    }

    if (!username.includes('@')) {
        throw new Error('Username must contain @.');
    }

    const allowedPattern = /^[a-zA-Z0-9@]+$/;
    if (!allowedPattern.test(username)) {
        throw new Error('Username must contain only letters, numbers, and @.');
    }

    if (username.length < 3 || username.length > 20) {
        throw new Error('Username must be between 3 and 20 characters.');
    }


    const exist = await this.findOne({ username });
    if (exist) {
        throw new Error('Username already in use.');
    }

    if(!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough.');
    }

    

    if (birthYear > 2010) {
        throw new Error('Gen Alpha is not allowed on this platform.');
    }
    if (birthYear < 1980) {
        throw new Error('Silent Generation and Boomers are not allowed on this platform.');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({ username, password: hash, bio, birthYear})

    return user
}

userSchema.statics.login = async function (username, password) {
    if (!username.trim() || !password.trim()) {
        throw Error('All fields must be filled.');

    }

    const user = await this.findOne({ username });
    if (!user) {
        throw Error('Incorrect username or password.');
    } 

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error('Incorrect username or password.')
    }

    return user
}


const User = mongoose.model('User', userSchema)
export default User