import {RoleModel} from "../models/roleModel.js" ;

const roleModel = new RoleModel();

export class RoleService{
   
 
    async getRoleById(id_role){
        return (await roleModel.getRoleById(id_role));
    };


    async getRoleByName(role_name){
        return (await roleModel.getRoleByName(role_name))
    };
}

