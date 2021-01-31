const router = require("koa-router")();
const { verifyToken } = require("../auth");
const blogCon = require('../controllers/blogCon')

router.prefix("/blog");

router.get("/list", verifyToken, blogCon.blogList);

router.get("/detail", blogCon.getBlogDetail);

router.post("/post", verifyToken, blogCon.postBlog);

router.get("/comment", blogCon.commentList);

router.post("/postComment", verifyToken,blogCon.postComment);

module.exports = router;
