const userModel = require("../models/userModel");
const { createToken } = require('../auth')

module.exports = {
    login: async function (ctx, next) {
        // 1. 接收表单数据
        let { username, password } = ctx.request.body;
        // 2. 安全验证
        let results = await userModel.getUserByNameAndPwd(username, password);
        if (username.length == 0) {
            await ctx.render("error", {
                message: "请输入用户名!",
            });
        } else if (username.length > 0) {
            let payload = {
                userId: Math.random(),
                username,
            };
            var token = createToken(payload);
            ctx.body = {
                state: "success",
                token,
                user: results[0]
            }
        } else {
            ctx.body = {
                state: "fail"
            }
        }
    },
    regist: async function (ctx, next) {
        // 1. 接收表单数据
        let { username, password, nickname } = ctx.request.body;
        // 2. 安全验证
        if (username.trim().length == 0) {
            ctx.body("error", {
                message: "用户名不能为空!",
            });
        } else {
            // 3. 连接数据库
            let results = await userModel.saveUser({ username, password, nickname });
            // 4. 根据查询的结果跳转(或输出)不同的结果页面
            if (results.insertId) {
                //通过判断insertId是不是有正常值，如果有，说明插入成功
                ctx.body = {
                    state: "success"
                }
            } else {
                ctx.body = {
                    state: "fail"
                }
            }
        }
    },
    checkUser: async function (ctx, next) {
        let { username } = ctx.query;
        let results = await userModel.getUserByUsername(username);
        if (results.length > 0) {
            ctx.body = "fail"
        } else {
            ctx.body = 'success';
        }
    },
   
};