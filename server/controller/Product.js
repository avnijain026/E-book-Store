import ProductModel from "../models/Product.js";

export const CreateProduct = async (req, res) => {
    try {
        let images = req?.files?.map((item) => {              //map is used for loop
            return item.filename;
        });
        const prdData = await ProductModel.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            images: images,                            //left side wala images hamara table waala hai //right wala wo hai jo hamne let lekar likha hai
            department: req.body.departmentId,
        })
        if (prdData) { res.status(201).send({ message: "Product Created" }) }
        else { res.status(404).send({ message: "Unable to Create Product" }) }
    } catch (error) {
        console.log("Failed to submit Data")
    }
}

export const UpdateProduct = async (req, res) => {
    try {
        let images = req?.files?.map((item) => {              //map is used for loop
            return item.filename;
        });
        const prdData = await ProductModel.findByIdAndUpdate({ _id: req.body.id }, {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            images: images,                            //left side wala images hamara table waala hai //right wala wo hai jo hamne let lekar likha hai
            department: req.body.departmentId,
        })
        if (prdData) { res.status(200).send({ message: "Product Updated" }) }
        else { res.status(404).send({ message: "Unable to Update Product" }) }
    } catch (error) {
        console.log("Failed to submit Data")
    }
}

export const DeleteProduct = async (req, res) => {
    try {
        const prdData = await ProductModel.deleteOne({ _id: req.body.id })
        if (prdData.deletedCount == 1) { res.status(200).send({ message: "Product Deleted" }) }
        else { res.status(404).send({ message: "Unable to Delete Product" }) }
    } catch (error) {
        console.log("Failed to submit Data")
    }
}

export const GetProductsByDepartmentId = async (req, res) => {
    try {
        const prdData = await ProductModel.find({
            department: req.query.departmentId
        }).populate({ path: "department", populate: [{ path: "university" }] })
        res.status(200).send({ prdData })
    } catch (error) {
        console.log("Failed to submit Data")
    }
}

export const GetProductDetails = async (req, res) => {
    try {
        const prdData = await ProductModel.findOne({
            _id: req.query.id,
        }).populate({ path: "department", populate: [{ path: "university" }] })
        res.status(200).send({ prdData })
    } catch (error) {
        console.log("Failed to submit Data")
    }
}

export const UpdateProductQty = async (req, res) => {
    try {
        let productInDb = await ProductModel.findOne({ _id: req.body.id });
        let active = true
        if (productInDb.quantity - req?.body?.quantity <= 0) active = false;
        const prdData = await ProductModel.findByIdAndUpdate({ _id: req.body.id }, {
            
            quantity: productInDb?.quantity - req.body.quantity,
            active: active,
        });
        if (prdData) res.status(200).send({ message: "Product Quantity Updated" })
        else res.status(404).send({ message: "Unable to Update Product Quantity" })
    } catch (error) {
        console.log("Failed to submit Data")
    }
}