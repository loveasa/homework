<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="getData">请求数据</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    getData() {
      this.$http
        .get("http://localhost:3000")
        .then((response) => {
          console.log(response.data);
        });
    },
  },
};
</script>