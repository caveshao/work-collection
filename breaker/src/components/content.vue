<template>
  <div class="content">
    <page-aside></page-aside>
    <div class="items">
      <router-view :key="Math.random()"></router-view>
    </div>
  </div>
</template>
<script>
  import Aside from "../components/aside";

  export default {
    name: "page-content",
    components: {
      "page-aside": Aside
    },
    data() {
      return {};
    },
    methods: {}
  };
</script>
<style scoped>
  .content {
    display: grid;
    grid-template-columns: 2fr 6fr;
  }
</style>