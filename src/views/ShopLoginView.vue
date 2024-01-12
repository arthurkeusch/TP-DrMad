<template>
  <div style="display: block" >
    <h2>Login</h2>
    <div class="item">
        <span >login :</span><input v-model="login">
    </div>
    <div class="item">
      <span>password :</span><input v-model="password">
    </div>
    <div class="item">
      <button @click="shopLogin({login, password})">Login</button>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'ShopLoginView',

  data: () => ({
    login: '',
    password:'',
  }),

  computed: {
    ...mapState(['shopUser'])
  },

  methods: {
    ...mapActions(['shopLogin']),
  }
}
</script>
<style>
.item{
    margin: 10px;
}
</style>
