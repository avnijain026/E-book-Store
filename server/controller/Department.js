import DepartmentModel from "../models/Department.js";

export const CreateDepartment = async (req, res) => {
    try {
        const deptData = await DepartmentModel.create({
            name: req.body.name,
            image: req?.file?.filename,
            university:req.body.universityId,
        });
        if (deptData) res.status(200).send({ message: "Department Created..!!" });
        else res.status(404).send({ message: "Enable to create Department.." })
    } catch (error) {
        console.log("Failed to create Dept.")
    }
}

export const UpdateDepartment = async (req, res) => {
    try {
        const deptData = await DepartmentModel.findByIdAndUpdate(
            { _id: req.body.id },
            {
                name: req.body.name,
                image: req?.file?.filename,
                university:req.body.universityId,
            }
        );
        if (deptData) res.status(201).send({ message: "Department Updated...!!" });
        else res.status(404).send({ message: "Unable to Department University" });
    } catch (error) {
        console.log("Fail to Update Department..", error);
    }
};

export const DeleteDepartment = async (req, res) => {
    try {
        const deptData = await DepartmentModel.deleteOne(
            { _id: req.body.id }
        );
        if (deptData.deletedCount==1) res.status(200).send({ message: "Department Delete...!!" });
        else res.status(404).send({ message: "Unable to Delete Department" });
    } catch (error) {
        console.log("Fail to Delete Department..", error);
    }
};


export const GetDepartmentsByUniversityId = async (req, res) => {
    try {
        const deptData = await DepartmentModel.find({
            university: req.query.universityId
        }).populate("university");
        res.status(200).send({ deptData });
    } catch (error) {
        console.log("Fail to Display Universiyt..", error);
    }
};

