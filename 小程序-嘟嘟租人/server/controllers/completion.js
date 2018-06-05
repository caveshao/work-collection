// 任务完成接口
const {address: config} = require('../config')

const DB = require('knex')({
    client: 'mysql',
    connection: {
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.pass,
        database: 'userData',
        // 没有配置后两项时，无法操作数据库
        charset: config.char,
        multipleStatements: true
    }
})

module.exports = async (ctx, next) => {
    await DB('getted')
        .where({
            customer: ctx.query.id
        })
        .del();
    await DB('postted')
        .where({
            id: ctx.query.id,
            status: 1
        })
        .del();
    ctx.state.data = {
        mag: 'success'
    }
}