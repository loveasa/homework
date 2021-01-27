<template>

  <div>
        <div class="style-blank"></div>
      <CommonHeader></CommonHeader>
      <div class="style-blank"></div>
    <h1>创作中心</h1>
    <div class="style-blank"></div>
    <p>
      标题:
      <input
        maxlength="100"
        v-model="title"
        placeholder="欢迎使用博客"
        class="article-bar__title article-bar__title--input text-input"
      />
    </p>
    <div class="style-blank"></div>
    <p>
      内容：<textarea
        name=""
        id=""
        cols="50"
        rows="10"
        v-model="content"
      ></textarea>
    </p>
    <div class="style-blank"></div>
    <p>
      <button @click="postBlog">发表</button>
    </p>
  </div>
</template>

<script>

import CommonHeader from "../components/CmmonHeader";

export default {
  components: {
     CommonHeader
      },
  data() {
    return {
      title: "",
      content: "",
    };
  },
  created() {},
  methods: {
    postBlog() {
      let loginUser = this.$store.state.loginUser;
      if (loginUser) {
        this.$http
          .post("/blog/post", {
            title: this.title,
            content: this.content,
            userId: loginUser.user_id,
          })
          .then((res) => {
            let { state } = res.data;
            if (state == "success") {
              this.$router.push("/");
            } else {
              alert("发表文章失败");
            }
          });
      } else {
        alert("请先登录");
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
.article-bar__input-box .article-bar__title--input {
  width: 100%;
  margin-left: 4px;
  border-radius: 18px;
  padding: 8px;
  font-size: 18px;
  line-height: 24px;
  background-color: #fff;
}
.style-blank{
height: 20px;
}
</style>