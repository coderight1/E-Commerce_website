// Create Token and Saving in cookie


const sendToken = (user,statuscode,res)=>{
    const { options } = require("../routes/userRoute");
    const token  = user.getJWTToken();

    // Options for cookies
    const Options = {
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24* 60* 60*1000 
        ),
        httpOnly:true,
    };

    res.status(statuscode).cookie('token',token,options).json({
        success:true,
        user,
        token,
    });

};

module.exports = sendToken;
