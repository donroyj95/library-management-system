module.exports = {
  // HOST: "ec2-52-62-22-184.ap-southeast-2.compute.amazonaws.com",
  HOST: "localhost",
  USER: "root",
  PASSWORD: "123456",
  DB: "testdb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
