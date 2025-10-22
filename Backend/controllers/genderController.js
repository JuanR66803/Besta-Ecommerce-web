import {GenderService} from "../services/genderServices.js";

    const genderService = new GenderService();

export class GenderController{

    //metodo para crear una categoria
    async createGender(req,res){
        const {gender_name}= req.body;
        if (!gender_name ) {
        return res.status(400).json({ message: "el nombre del genero es obligatoria" });
        }
        const newGender= await genderService.createGender(gender_name);
        res.status(201).json(newGender)
    };

    //metodo para actualizar una categoria
    async updateGender(req,res){
        const {id_gender, gender_name} = req.body;
        if (!id_gender || !gender_name){
            return res.status(400).json({ message: "el nombre y el id del genero es obligatoria " });
        }
        const updateGender = await genderService.updateGender(id_gender, gender_name)
        res.status(204).json(updateGender)
    };

    //metodo para eliminar una categoria
    async deleteGenderById(req,res){
        const {id_gender} = req.body;
        if (!id_gender ){
            return res.status(400).json({ message: "el  el id del genero es obligatoria " });
        }
        const deleteGender = await genderService.deleteGenderById(id_gender)
        res.status(204).json(deleteGender)
    };

    //metodo para obtener una categoria con su id
    async getGenderById(req,res){
        const {id_gender} = req.body;
        if (!id_gender ){
            return res.status(400).json({ message: "el  el id del genero es obligatoria " });
        }
        const getGenderById = await genderService.getGenderById(id_gender)
        res.status(200).json(getGenderByIdGender)
    };

    //metodo para obtener todas las categorias
    async getAllGenders(req,res){
        const getAllGenders = await genderService.getAllGenders();
        res.status(200).json(getAllGenders)
    };
}