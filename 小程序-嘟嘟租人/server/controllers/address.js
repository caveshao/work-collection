const {address: config} = require('../config')

// const { address } = require('../qcloud')
// 数据库的操作已经封装到了 SDK 中了。此处是导入一个 MySQL 实例


// 连接数据库,不使用微信提供的 SDK
const DB = require('knex')({
    client: 'mysql',
    connection: {
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.pass,
        database: config.db,
        // 没有配置后两项时，无法操作数据库
        charset: config.char,
        multipleStatements: true
    }
})

module.exports = {
    get: async function (ctx, next) {
        await DB('addresses')
            .select()
            .where({ id: ctx.query.id })
            .then(res => {
                ctx.state.data = {
                    msg: res,
                    logged: true
                }
            })
    },
    post: async function (ctx, next) {
        //删除原数据
        await DB('addresses')


            .where({
                id: ctx.request.body.id
            })
            .del();

        await DB('addresses')
            .returning("*")
            .insert({
                id: ctx.request.body.id,
                address: ctx.request.body.address,
                phone: ctx.request.body.phone
            })
    }
}