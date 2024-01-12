<template>
  <div>
    <table>
      <tr>
        <button v-for="(link, index) in links" :key="index" :style="{ paddingRight: '10px' }" @click="goTo(link.to)">
          <slot name="nav-button" :label="link.label" :style="link.style">{{link.label}}</slot>
        </button>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {links: Array},

  methods: {
    goTo(route) {
      if (this.$store.state.shopUser !== null && this.$store.state.shopUser !== undefined) {
        if (this.$route.path !== route) {
          this.$router.push({path: route});
        }
      } else {
        this.$router.push({name: 'shoplogin'});
      }
    },
  }
}
</script>

<style scoped>
.nav-button {
  padding: 10px;
}
table{
    background-color: darkred;
    border: darkred;
    border-radius: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;

}
button{
    margin-left: 20px;
    margin-right: 20px;
    font-size: xx-large;
    font-weight: bold;
    background-color: aliceblue;
    color: darkred;
}
</style>