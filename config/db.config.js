module.exports={
    HOST:'localhost',
    USER:'postgres',
    PASSWORD:'25112002',
    DB:'school',
    dialect:'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
}