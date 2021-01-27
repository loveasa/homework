<template>
  <div class="container">
    <div class="style-blank"></div>
    <CommonHeader></CommonHeader>
    <div class="blog">
      <div class="blog-title">
        <h3>{{ blog.title }}</h3>
        <span>{{ blog.post_time }}</span>
        <span>{{  blog.user_id }}</span>
      </div>

      <div class="blog-content">{{ blog.content }}</div>
      <div class="comment-list">
        <div class="style-blank"></div>
        <h4>-------评论🙌-------</h4>
        <div class="style-blank"></div>
        <textarea
          name="postComment"
          id="comment-content"
          cols="80"
          rows="10"
          placeholder="欢迎畅所欲言"
          v-model="content"
        ></textarea>
        <div>
          <div class="style-blank"></div>
          <button @click="postComment">发表评论</button>
          <div class="style-blank"></div>
        </div>

        <div class="comment" v-for="item in commentList" :key="item.comm_id">
          <div class="comment-content">{{ item.comm_content }}</div>

          <div class="comment-info">
            <span class="username">{{ item.username }}</span
            >&nbsp;
            <span class="posttime">{{ item.comm_post_time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CommonHeader from "../components/CmmonHeader";

export default {
  components: {
    CommonHeader,
  },
  data() {
    return {
      blog: "",
      content: "",
      comments: [],
      commentList: [],
    };
  },
  created() {
    this.getBlogDetail();
    this.getComment();
  },
  methods: {
    getBlogDetail() {
      let blog_id = this.$route.params.blogId;
      let loginUser = this.$store.state.loginUser;
if (loginUser) {
      this.$http
        .get("/blog/detail", {
          params: {
            blog_id: blog_id,
          },
        })
        .then((res) => {
          let { state, blogs } = res.data;
          if (state == "success") {
            this.blog = blogs;
            console.log(this.blog);
          }
        });
    }else{
        alert("请先登录");
        this.$router.push("/login");
        }
    },
    getComment() {
      let blog_id = this.$route.params.blogId;
      this.$http
        .get("/blog/comment", {
          params: {
            blog_id: blog_id,
          },
        })
        .then((res) => {
          let { state, comments } = res.data;
          if (state == "success") {
            this.commentList = comments;
             this.getComment();
          }
        });
    },
    postComment() {
      let loginUser = this.$store.state.loginUser;
      let blog_id = this.$route.params.blogId;
        if (loginUser) {
      this.$http
        .post("/blog/postComment", {
          blog_id: blog_id,
          content: this.content,
          user_id: loginUser.user_id,
        })
        .then((res) => {
          let { state } = res.data;
          if (state == "success") {
            this.$router.push("/blog/detail/" + blog_id);
            this.content = "";
          } else {
            alert("发表评论失败");
          }
        });
     } else {
        alert("请先登录");
        this.$router.push("/login");
      }
  }
  }
};

// }
</script>

<style scoped>
.blog {
  margin: 20px auto;
  padding: 20px;
  background: #cccccc;
}
.blog-title {
  padding: 10px;
}
.blog-content {
  padding: 10px;
}
.comment {
  padding: 20px;
  border: 1px solid black;
  margin-bottom: 10px;
}
.comment-info {
  float: right;
}
#comment-content {
  height: 64px;
  padding: 10px 10px;
}
.style-blank {
  height: 20px;
}
</style>
