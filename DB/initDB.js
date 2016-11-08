//mysql start
import Sequelize from 'sequelize'
import Mysql  from 'mysql'
import dbConfig from './dbConfig'
//mysql end
/**
 * orm模型初始化
 * @type {Sequelize}
 */
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  port: dbConfig.port,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
/**
 * 模型映射
 * @type {[type]}
 */
const Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
        timestamps: false
    });

	Pet.sync()

export default {Pet}