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
    await DB('postted')
        .where({
            id: ctx.query.id,
            status: ctx.query.status
        })
        .del();
    ctx.state.data = {
        mag: 'success'
    }
}