import {RoleModel} from "../models/roleModel.js" ;

const roleModel = new RoleModel();

export class RoleService{
    
    //metodo para crear una categoria
    async createRole(role_name){
        // se crea la categoría sin comprobar si ya existe, hay que agregar un condicional
        return (await roleModel.createRole(role_name));
    };

    //metodo para acrualizar una categoria
    async updateRole(id_role,role_name){
        return (await roleModel.updateRoleById(id_role, role_name));
    };

    //metodo para eliminar una categoria
    async deleteRoleById(id_role){
        return (await roleModel.deleteRoleById(id_role));
    };

    //metodo para obtener una categoria con su id
    async getRoleById(id_role){
        return (await roleModel.getRoleById(id_role));
    };

    //metodo para obtener todas las categorias
    async getAllRoles(){
        return (await roleModel.getAllRoles())
    };
}

