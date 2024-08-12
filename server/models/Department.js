import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    university:{
        type:mongoose.Schema.Types.ObjectId,                  //give refrence oof other table....datatype object id(ubniversity id ka )
        ref:"university",
        required:true,
    },
},
{timestamps: true}
);


const DepartmentModel  = mongoose.model('department',DepartmentSchema)
export default DepartmentModel;
