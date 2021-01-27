<template>
  <div class="container">
    <div class="login-form">
      <h3>用户注册</h3>
      <p>
        用户名：<input
          v-model="username"
          type="text"
          name="username"
          id="username"
          @blur="checkName"
        />
        <span id="info"></span>
      </p>
      <p>
        &nbsp;&nbsp;密码：
        <input v-model="password" type="password" name="password" />
      </p>
      <p>昵称：<input v-model="nickname" type="text" name="nickname" /></p>
      <p>
        <button @click="doRegist" type="submit" class="btn">确认</button>
        <button @click="back" type="submit" class="btn">返回</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      nickname: "",
    };
  },
  created() {},
  methods: {
    checkName() {
      let spanInfo = document.getElementById("info");
      this.$http
        .get("/user/checkUser", {
          params: {
            username: this.username, //value不可以
          },
        })
        .then(function (response) {
          if (response.data == "success") {
            spanInfo.innerHTML = "OK";
          } else {
            spanInfo.innerHTML = "用户名已存在";
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    doRegist() {
      this.$http
        .post("/user/regist", {
          username: this.username,
          password: this.password,
          nickname: this.nickname,
        })
        .then((res) => {
          let { state } = res.data;
          if (state == "success") {
            this.$router.push("/login");
          } else {
            alert("注册失败");
          }
        });
    },
    back() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.login-form {
  width: 650px;
  background: #cccccc;
  margin: 40px auto;
  padding: 20px 0;
  text-align: center;
}
.login-form p {
  padding: 20px 0;
}

.btn {
  width: 70px;
  margin-left: 40px;
}
</style>