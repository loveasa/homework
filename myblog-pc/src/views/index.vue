<template>
  <div class="container">
    <div class="style-blank"></div>
    <CommonHeader></CommonHeader>
    <div class="style-blank"></div>
    <button @click="goPostBlog">发布博文</button>
    <div class="blog-list">
      <div class="blog" v-for="item in blogList" :key="item.blog_id">
        <h3 class="blog-title">
          <router-link :to="{ path: '/blog/detail/' + item.blog_id }">{{
            item.title
          }}</router-link>
        </h3>
        <p class="blog-content">{{ item.content }}</p>
        <span class="post-time">{{ item.postTime }}</span>
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
      blogList: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
     let loginUser = this.$store.state.loginUser;
     if (loginUser) {
      this.$http.get("/blog/list")
      .then((res) => {
        let { state } = res.data;
        if (state == "auth-fail") {
          alert("请求未授权");
        } else if (state == "success") {
          let { blogs } = res.data;
          this.blogList = blogs;
        }
      });
     }else{
        alert("请先登录");
        this.$router.push("/login");
        }
    },
    goPostBlog() {
      this.$router.push("/blog/postBlog");
    }
  },
};
</script>

<style scoped>
.blog-list {
  width: 815px;
  margin: 20px auto;
}
.blog {
  background: #cccccc;
  padding: 20px;
  margin: 20px 0;
}
.blog-title,
.blog-content,
.post-time {
  margin: 20px 0;
}
.style-blank {
  height: 20px;
}
</style>