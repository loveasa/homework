const blogModel = require("../models/blogModel")
const { formatTime } = require("../utils/dateTimeUtil")

function exchange(item) {
    for (let i = 0; i < item.length; i++) {
        item[i].post_time = formatTime(item[i].post_time, 'yy-MM-dd hh:mm:ss')
    }
}

function comm_exchange(item) {
    for (let i = 0; i < item.length; i++) {
        item[i].comm_post_time = formatTime(item[i].comm_post_time, 'yy-MM-dd hh:mm:ss')
    }
}

module.exports = {
    blogList: async (ctx, next) => {
        let results = await blogModel.getBlogs();
        if (results.length > 0) {
            ctx.body = {
                state: "success",
                blogs: results
            };
        } else {
            ctx.body = {
                state: "fail"
            };
        }
    },
    postBlog: async (ctx, next) => {
        let { title, content, userId } = ctx.request.body;
        let results = await blogModel.saveBlog(title, content, userId);
        if (results.insertId > 0) {
            ctx.body = {
                state: "success",
            };
        } else {
            ctx.body = {
                state: "fail"
            };
        }
    },
    postComment: async (ctx, next) => {
        let { content, blog_id, user_id } = ctx.request.body;
        let results = await blogModel.saveComment(content, blog_id, user_id);
        if (results.insertId) {
            ctx.body = {
                state: "success",
            };
        } else {
            ctx.body = {
                state: "fail"
            };
        }
    },
    commentList: async (ctx, next) => {
        let { blog_id } = ctx.query;
        let results = await blogModel.getComment(blog_id);
        console.log(results);
        comm_exchange(results, 'yy-MM-dd hh:mm:ss')
        if (results.length > 0) {
            ctx.body = {
                state: "success",
                comments: results
            };
        } else {
            ctx.body = {
                state: "fail"
            };
        }
    },
    getBlogDetail: async (ctx, next) => {
        let { blog_id } = ctx.query;
        console.log(blog_id);
        let results = await blogModel.getBlogById(blog_id);
        exchange(results, 'yy-MM-dd hh:mm:ss');
        if (results.length > 0) {
            ctx.body = {
                state: "success",
                blogs: results[0]
            };
        } else {
            ctx.body = {
                state: "fail"
            };
        }

    }
}