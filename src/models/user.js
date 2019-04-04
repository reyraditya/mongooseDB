const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim: true, //jika user menambahkan spasi maka di database spasi akan dihilangkan
        lowercase: true,
        validate(value){
            value = parseInt(value)
            if(!isNaN(value)){ // check value
                throw new Error('Name cannot be number')
            }
        }
    },
    email: {
        type: String, 
        required: true,
        validate(value){
            if(!isEmail(value)){
                throw new Error ('Email is not valid')
            }
        }
    },
    age: {
        type: Number, 
        required: true,
        // Umur tidak boleh negatif dan tidak boleh dibawah 18 tahun
        validate(value) {
            if(value < 18){
                throw new Error('Please enter your age correctly')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("Password cannot contain 'password'")
            }
        }
    }
})

const User = mongoose.model('User', userSchema) 

module.exports = User