import UniversityModel from "../models/University.js"

export const CreateUniversity = async (req, res) => {
    try {
        const uniData = await UniversityModel.create({
            name: req.body.name,
            image: req?.file?.filename,

        });
        if (uniData) res.status(201).send({ message: "University Created...!!" });
        else res.status(404).send({ message: "Unable to Create University" });
    } catch (error) {
        console.log("Fail to create Universiyt..", error);
    }
};

export const UpdateUniversity = async (req, res) => {
    try {
        const uniData = await UniversityModel.findByIdAndUpdate(
            { _id: req.body.id },
            {
                name: req.body.name,
                image: req?.file?.filename,
            }
        );
        if (uniData) res.status(201).send({ message: "University Updated...!!" });
        else res.status(404).send({ message: "Unable to Update University" });
    } catch (error) {
        console.log("Fail to Update University..", error);
    }
};

export const DeleteUniversity = async (req, res) => {
    try {
        const uniData = await UniversityModel.deleteOne(
            { _id: req.body.id }
        );
        if (uniData.deletedCount==1) res.status(200).send({ message: "University Delete...!!" });
        else res.status(404).send({ message: "Unable to Delete University" });
    } catch (error) {
        console.log("Fail to Delete Universiyt..", error);
    }
};


export const GetUniversity = async (req, res) => {
    try {
        const uniData = await UniversityModel.find();
        res.status(200).send({ uniData });
    } catch (error) {
        console.log("Fail to Display Universiyt..", error);
    }
};

