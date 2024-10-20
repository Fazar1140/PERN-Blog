'use strict';
module.exports = (sequelize,Sequelize)=>{
    const Account = sequelize.define('User',{
        username:{
            type:Sequelize.STRING(),
            unique:true,
            allowNull:false
        },
        password:{
            type:Sequelize.STRING(),
            unique:true,
            allowNull:false
        },
        email:{
            type:Sequelize.STRING,
            unique:true,
            allowNull:false
        }
    })
   
    

    return Account;
}