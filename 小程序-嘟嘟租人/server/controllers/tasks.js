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

module.exports = {
    get: async function (ctx, next) {
        await DB('postted')
            .select()
            .where({})
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
            .del();

        await DB('postted')
            .returning("*")
            .insert({
                id: ctx.request.body.id,
                task: ctx.request.body.task,
                amount: ctx.request.body.amount,
                price: ctx.request.body.price,
                phone: ctx.request.body.phone,
                address: ctx.request.body.address,
                status: 0,
                employee: '无',
                employeePhone:'无'
            }).then(res => {
                ctx.state.data["task"] = ctx.request.body.task
            })
    }
}