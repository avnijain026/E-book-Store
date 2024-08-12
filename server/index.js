import mongoose from "mongoose";
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import { CreateUniversity, DeleteUniversity, GetUniversity, UpdateUniversity } from "./controller/University.js";
import multer from "multer";
import { CreateDepartment, DeleteDepartment, GetDepartmentsByUniversityId, UpdateDepartment } from "./controller/Department.js";
import { CreateProduct, DeleteProduct, GetProductsByDepartmentId, GetProductDetails, UpdateProduct, UpdateProductQty } from "./controller/Product.js";
import { Login, Register } from "./controller/User.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


//University Module code 
const storageUniv = multer.diskStorage({
    destination: "uploadUniv/",
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});

const uploadUniv = multer({
    storage: storageUniv,
});

//http://localhost:8080/university
app.post("/university",uploadUniv.single("image"),CreateUniversity)
app.put("/university",uploadUniv.single("image"),UpdateUniversity)
app.delete("/university",DeleteUniversity)
app.get("/university",GetUniversity) 
//University Module code end

//Department  Module code
const storageDept = multer.diskStorage({
    destination: "uploadDept/",
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});

const uploadDept = multer({
    storage: storageDept,
});
//Api call to dept.
app.post("/department",uploadDept.single("image"),CreateDepartment)
app.put("/department",uploadDept.single("image"),UpdateDepartment)
app.delete("/department",DeleteDepartment)
app.get("/department",GetDepartmentsByUniversityId)
//Department  Module code end


//Product Moodule code
const storagePrd = multer.diskStorage({
    destination: "uploadPrd/",
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});

const uploadsPrd = multer({
    storage: storagePrd,
});

app.post("/product",uploadsPrd.array("images"),CreateProduct)
app.put("/product",uploadsPrd.array("images"),UpdateProduct)
app.delete("/product",DeleteProduct)
app.get("/product",GetProductsByDepartmentId)
app.get("/productDetail",GetProductDetails)                    //end point is same so url must be  diiferent
app.put("/updateProductQty",UpdateProductQty)
//Product Moodule code end

//User Module code
app.post("/register",Register)
app.post("/login",Login)


app.use(express.static("uploadUniv/"))
app.use(express.static("uploadDept/"))
app.use(express.static("uploadPrd/"))



mongoose.connect(process.env.DB_URL).then((d) => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
        console.log("Server is running on port: " +process.env.PORT)
    })
}).catch((e) => {
    console.log("Error in connecting to MongoDB");
})