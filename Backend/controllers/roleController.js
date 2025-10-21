import {RoleService} from "../services/roleServices.js";

    const roleService = new RoleService();

export class RoleController{

    //metodo para crear una categoria
    async createRole(req,res){
        const {role_name}= req.body;
        if (!role_name ) {
        return res.status(400).json({ message: "el nombre del rol es obligatoria" });
        }
        const newRole= await roleService.createRole(role_name);
        res.status(201).json(newRole)
    };

    //metodo para actualizar una categoria
    async updateRole(req,res){
        const {id_role, role_name} = req.body;
        if (!id_role || !role_name){
            return res.status(400).json({ message: "el nombre y el id del rol es obligatoria " });
        }
        const updateRole = await roleService.updateRole(id_role, role_name)
        res.status(204).json(updateRole)
    };

    //metodo para eliminar una categoria
    async deleteRoleById(req,res){
        const {id_role} = req.body;
        if (!id_role ){
            return res.status(400).json({ message: "el  el id del rol es obligatoria " });
        }
        const deleteRole = await roleService.deleteRoleById(id_role)
        res.status(204).json(deleteRole)
    };

    //metodo para obtener una categoria con su id
    async getRoleById(req,res){
        const {id_role} = req.body;
        if (!id_role ){
            return res.status(400).json({ message: "el  el id del rol es obligatoria " });
        }
        const getRoleById = await roleService.getRoleById(id_role)
        res.status(200).json(getRoleByIdRole)
    };

    //metodo para obtener todas las categorias
    async getAllRoles(req,res){
        const getAllRoles = await roleService.getAllRoles();
        res.status(200).json(getAllRoles)
    };
}