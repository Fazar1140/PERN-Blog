'use strict';
module.exports = (sequelize,Sequelize) => {
    const Tutorial = sequelize.define('essay',{
        title:{
            type:Sequelize.STRING
        },
        description:{
            type:Sequelize.STRING
        },
        published:{
            type:Sequelize.BOOLEAN
        },
        cover:{
            type:Sequelize.STRING
        },
        content:{
            type:Sequelize.TEXT
        }
    });
     
    
  

    return Tutorial
}