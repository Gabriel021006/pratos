const mongoose = require("mongoose");

const itensModel = new mongoose.Schema({
    nomeDoPrato: String,
    valorDoPrato: Number,
    imagemDoPrato: String,
    email:String,
    passowrd:String
});

module.exports = itensModel;