const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String, 
            required:[true,"Please add a User name"], 
            trim:true,
            unique:[true,"Username already exists"],
            minlength:[2,"Username be at least 2 characters"],
            maxlength:[50,"Username be at most 50 characters"],
        },
                
        email:{
            type:String,
            required:[true,"Please add email"], 
            unique:[true,"Email already exists"],
            lowercase:true,
            trim:true,
            match:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        },
        password:{
            type:String,
            required:[true,"Please add password"],
            minlength:8,
            select:false
        },

        role:{
            type:String,
            enum:['user', 'admin'],
            default:'user'
            },
        avatar:String,
        emailVerificationToken:String,
        emailVerificationTokenExpire:Date,
        resetPasswordToken: String, // reconnaitre l'utilisateur qui a fait la demande pour la renitialisation d'un mot de passe
        resetPasswordExpires: Date,
        // isActive: {
        //     type: Boolean,
        //     default: true
        // },
        isEmailVerify: {
            type: Boolean,
            default: false
        }
        },

        {timestamps:true}
);



// cripter le mot de passe quand la personne va s'inscrire
userSchema.pre('save', async function (next){
if(!this.isModified('password')){
    return next()
}
const salt = await bcrypt.genSalt(10)
this.password = await bcrypt.hash(this.password, salt)
}) // ce code c'est pour cripter le password


// middleware pour comparer le mot de passe
userSchema.methods.matchPassword = async function (enteredpassword){
    return await bcrypt.compare(enteredpassword, this.password)
}

// generer le token d'authentifaication
userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

//middelware generer le token de verification d'email
userSchema.methods.generateEmailVerificationToken = function () {
    // generer un token à 6 chiffres
    const verificationToken = Math.floor(
        Math.random() * 1000000 * 900000
    ).toString();

    // cripter le token
    this.emailVerificationToken = crypto
        .createHash("sha256")
        .update(verificationToken)
        .digest("hex");


    // desactiver le token apres 10 minutes
    this.emailVerificationTokenExpire = Date.now() + 60 * 1000 * 10;

    return verificationToken;
}

// supprimer les tokens lorsque l'utilisateur se déconnecte
userSchema.methods.removeToken = async function (token) {
    this.tokens = this.tokens.filter((t) => t.token!== token)
    await this.save()
}

userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString('hex');

    //Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
       .createHash('sha256')
       .update(resetToken)
       .digest('hex');

    // Set expire time for the token (1 hour)
    this.resetPasswordExpires = Date.now() + 1 * 60 * 60 * 1000;

    return resetToken;
}
module.exports= mongoose.model('User', userSchema)

const User = mongoose.model('User', userSchema);
module.exports = {User, userSchema};