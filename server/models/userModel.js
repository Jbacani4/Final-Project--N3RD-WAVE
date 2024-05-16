const {Schema, model} = require('mongodb')

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    avatar: {type: String},
    posts: {type: number, default: 0},
})

module.exports = model('User', userSchema)