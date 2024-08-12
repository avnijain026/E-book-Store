import UserModel from "../models/User.js"

export const Register = async(req,res)=>{
    try {
        let user = await UserModel.findOne({email: req.body.email});
        if(user) {res.status(404).send({message:"User Created Email/Userid"})
        return;
    }
    let userInfo = await UserModel.create({
        ...req.body,
        profilePic:req?.file?.filename
    });
    if (userInfo) res.status(201).send({message: "User Registered Sucessfully...!"});
    else res.status(404).send({message: "Enable to Register a User"});
    } catch (e) {
        console.error("Error during registration:", error.message || error);
        return res.status(404).send({error: e?.error.message});
    }
};


export const Login =  async(req,res)=>{
    try {
        let user = await UserModel.findOne({email: req.body.email, password: req.body.password});
        if(user) res.status(202).send({id: user.id, role: user.role});
        else res.status(404).send({message: " Wrong User id or password.."});    
    } catch (error) {
        res.status(404).send({error: e?.error.message});
    }
}