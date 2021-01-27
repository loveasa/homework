<template>
    <div>
         <p>
        {{loginUser.username}}  &nbsp;
        
        <span @click="exit" class="exit">退出</span>
      </p>
    </div>
</template>

<script>
import {
  mapState,
  mapActions,
} from "vuex";

export default {
    data() {
    return {};
  },
  computed: {
    ...mapState(["loginUser"])
  },
  methods: {
      ...mapActions(['logout']),
      exit() {
      this.logout(),
      this.$router.push('/login')
    }
  },
}
</script>

<style lang="scss">
span:hover
{ 
  cursor:pointer;
    background-color:rgb(235, 137, 137);
}
.exit{
  border: 1px solid rgb(224, 141, 141);
}
</style>