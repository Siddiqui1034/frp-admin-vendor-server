// const jwt= require('jsonwebtoken')
import jwt from 'jsonwebtoken'

function isValidateToken(req, res, next) {
    //    res.send, ("getorders")
    const token_client = req.headers.authorization       
    if(token_client){
        // verify is method to verify clienttoken token_client with server token stored in serverside with variable appToken
        jwt.verify(token_client, "appToken",(e, s)=>{
            if(e){
                // res.send("Invalid Token")
                return false;
            }
            else{
                // next();
                return true;
            }
        })
    }
    // else{
    //     res.send("token missing")
    // }
    return false;
}
// module.exports = validateToken;
export default isValidateToken;