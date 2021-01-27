<template>
  <div id="app">
    <div id="nav">
      <p class="nave-left">MY BLOG💕</p>

      <p>
        <!-- <a href="http://localhost:8081/regist">注册</a> |
        <a href="http://localhost:8081/login">登录</a> |
        <a href="http://localhost:8081">首页</a> |
        <a href="http://localhost:8081/blog/postBlog">发表文章</a> -->
        <span @click="regist">注册</span> | 
        <span @click="login">登录</span> |
        <span @click="index">首页</span> |
        <span @click="post">发表文章</span>
      </p>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    regist() {
      this.$router.push("/regist");
    },
    login() {
      this.$router.push("/login");
    },
    index() {
      this.$router.push("/");
    },
    post() {
      this.$router.push("/blog/postBlog");
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: lightsteelblue;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .nav-left {
    float: left;
  }
  .nav-right {
    float: right;
  }
}

/* css reset */
* {
  margin: 0;
  // padding: 0;
}
a {
  text-decoration: none;
}
ul,
ol {
  list-style: none;
}

/* 能用样式 */
.container {
  width: 1200px;
  margin: 0 auto;
}
header {
  height: 50px;
  background: #cccccc;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
