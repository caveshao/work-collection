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
        database: 'userData',
        // 没有配置后两项时，无法操作数据库
        charset: config.char,
        multipleStatements: true
    }
})

module.exports = {
    get: async function (ctx, next) {
        await DB(ctx.query.db)
            .select()
            .where({ id: ctx.query.id })
            .then(res => {
                ctx.state.data = {
                    res: res
                }
            })
    },
    post: async function (ctx, next) {

        await DB('postted')
            .where({
                id: ctx.request.body.id
            })
            .update({
                employee: ctx.request.body.employee,
                employeePhone: ctx.request.body.employeePhone,
                status: ctx.request.body.status
            })
            .then(res => {
                ctx.state.data = res
            });

        await DB('getted')
            .returning("*")
            .insert({
                id: ctx.request.body.employee,
                customer: ctx.request.body.id,
                task: ctx.request.body.task,
                address: ctx.request.body.address,
                amount: ctx.request.body.amount,
                phone: ctx.request.body.phone,
                price: ctx.request.body.price
            })
    }
}