const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool:{
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
    }
)

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require('./tutorial.model.js')(sequelize,Sequelize);

db.account = require('./Auth.model.js')(sequelize,Sequelize);
 
db.account.hasMany(db.tutorials,{foreignKey:'user_id'});
db.tutorials.belongsTo(db.account,{foreignKey:'user_id'}, {
});

 


module.exports = db;
