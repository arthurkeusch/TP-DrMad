<template>
  <div class="vertical">
    <div v-for="(item, index) in items" :key="index">
      <template v-if="item.type === 'title'">
        <slot name="menu-title" :label="item.label">{{ item.label }}</slot>
      </template>
      <template v-else-if="item.type === 'link'">
        <span @click="goTo(item.to)">
          <slot name="menu-link" :label="item.label" >{{ item.label }}</slot>
        </span>
          <br><br>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "VerticalMenu",

  props: {
    items: Array
  },

  methods: {
    goTo(route) {
      if (this.$store.state.shopUser !== null && this.$store.state.shopUser !== undefined) {
        if (this.$route.path !== route) this.$router.push({path: route});
      } else {
        this.$router.push({name: 'shoplogin'});
      }
    },
  }
}
</script>

<style scoped>
.vertical {
  padding: 10px;
  display: block;
}
</style>