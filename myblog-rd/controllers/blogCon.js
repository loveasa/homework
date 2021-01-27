const blogModel = require("../models/blogModel")


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
    console.log(results);
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