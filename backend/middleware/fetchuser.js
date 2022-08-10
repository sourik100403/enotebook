var jwt = require('jsonwebtoken');//for web token
const JWT_SECRATE="notebook@#2022";
const fetchuser=(req,res,next)=>{
    //get user from jwt token add id to request object
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please authenticate a valid token"})
    }
    try {
        const data=jwt.verify(token,JWT_SECRATE);
        req.user=data.user;
        next();
        
    } catch (error) {
        res.status(401).send({error:"please authenticate a valid token"})
    }

}
module.exports=fetchuser;