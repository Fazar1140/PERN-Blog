require('dotenv').config();
const db = require('../models');
const Tutorial = db.tutorials;
const Account = db.account;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require('path');

//create function
exports.create = (req,res)=>{
    const {originalname,path} = req.file
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newPath = path+'.'+ext;
    fs.renameSync(path,newPath)

    const {token} = req.cookies;
    jwt.verify(token,process.env.JWT_SECRET,{},async (error,info)=>{ 
    if(!req.body.title){
        res.status(400).send({
            message:'content is empty'
        })
    }
    const tutorial = {
        title:req.body.title,
        description:req.body.description,
        published:req.body.published ? req.body.published : false,
        user_id:info.id,
        content:req.body.content,
        cover:newPath
    }
    Tutorial.create(tutorial)
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({message:err.message})
    })
    });
}

//retrieve all information from database 
exports.findAll = (req,res)=>{
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
   
    Tutorial.findAll({include:[{model:Account,attributes:{exclude:['password','id','email','createdAt','updatedAt']}}]})
    //Tutorial.findAll({where:condition})
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
            message:
            err.message || 'Some error occured while retrieving tutorial'
        })
    })
}
//find data one
exports.findOne = (req,res)=>{
    const UserId = req.params.id;

    Tutorial.findByPk(UserId,{include:[{model:Account,attributes:{exclude:['password','id','email','createdAt','updatedAt']}}]}).
    then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message:"Error retrieving with data id "
        })
    })
}
exports.findImage = (req,res)=>{
    
    const cover = req.params.cover;
    
    if(!cover){
        return res.status(500).send({message:"error image is not exist"})
    }
    const imagePath = path.join(__dirname,'..','uploads',cover)

    if(!fs.existsSync(imagePath)){
        return res.status(404).json({error:'image file not found'})
    }
    res.sendFile(imagePath)

}
//update data 
exports.update = (req,res)=>{
    let newPath = null 
 
    if(req.file){
    const {originalname,path} = req.file
    console.log(path)
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    newPath = path+'.'+ext
    console.log(newPath)
    fs.renameSync(path,newPath)

    }
    const id = req.params.id;

    const {token} = req.cookies;
     
    jwt.verify(token,process.env.JWT_SECRET,{},async(err,info)=>{ 
    const update = {
        title:req.body.title,
        description:req.body.description,
        published:req.body.published ? req.body.published : false,
        UserId:info.id,
        content:req.body.content,
        cover:newPath
        }

    Tutorial.update(update,{
        where: {user_id:info.id,id:id}
    })
    .then(num=>{
        if(num == 1){
            res.send({
                message:'Tutorial was updated successfully'
            });
        }else{
            res.send({
                message:`cannot update tutorial req.body is empty or wrong userId`
            })
        }
    }).catch(err=>{
        res.status(500).send({
            message:'Error updating Tutorial with id ' + id
        })
    })
    })
}
//delete from data 
exports.Delete = (req,res)=>{
    const id = req.params.id;

    const {token} = req.cookies;
    jwt.verify(token,process.env.JWT_SECRET,{},(err,info)=>{
    
    Tutorial.destroy({
        where:{UserId:info.id,id:id}
    }).then(num=>{
        if(num == 1){
            res.send({
                message:'Tutorial was deleted successfully'
            })
        }else{
            res.send({
                message:'cannot delete tutorial with this id : ' + id + ' not found'
            })
        }
        }
    ).catch(err=>{
        res.status(500).send({
            message:'couldnt delete tutorial with this ' + id
        })
    })
})
}

//delete all data 
exports.deleteAll = (req,res)=>{
    Tutorial.destroy({
        where:{},
        truncate:false
    }).then(nums => {
        res.send({message: `${nums} tutorials were deleted successfully`})
    }).catch(err=>{
        res.send({message:err.message || 'some error occured while removing all tutorials'})
    })
}

exports.findAllPublished = (req,res)=>{
    Tutorial.findAll({where:{published:true}})
    .then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({
            message:
            err.message || 'some error occured while retrieving tutorials'
        })
    })
}