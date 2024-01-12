<script setup>

</script>

<template>
  <div id="page">

    <VerticalMenu :items="menuItems">
      <template v-slot:menu-title="{ label }">
        <h2>{{ label }}</h2>
      </template>
      <template v-slot:menu-link="{ label }">
        <button>{{ label }}</button>
      </template>
    </VerticalMenu>

    <div id="centre">
      <h1>Bienvenue à la banque</h1>
    </div>

  </div>
</template>

<script>
import VerticalMenu from "@/components/VerticalMenu";

export default {
  components: {
    VerticalMenu,
  },
  data() {
    return {
      menuItems: [
        { type: "title", label: "Section 1" },
        { type: "link", label: "Link 1", to: "/link1" },
        { type: "link", label: "Link 2", to: "/link2" },
        { type: "title", label: "Section 2" },
        { type: "link", label: "Link 3", to: "/link3" },
      ],
    };
  },
};
</script>

<style scoped>
#navigation {
  display: block;
}
#page{
  display: flex;
}
</style>