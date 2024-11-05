import user from"../model/user.mjs";
import { Op } from 'sequelize';

 export const GetAllUsers=(req,res)=>{
user.findAll().then(user=>{
    res.status(200).send(user)
})
.catch(err=>{
    res.status(400).send(err.message)
})
}


