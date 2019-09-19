<template>
  <div class="home">
    <page-header></page-header>
    <page-content></page-content>
    <page-footer></page-footer>
  </div>
</template>

<script>
  // @ is an alias to /src
  // import HelloWorld from '@/components/HelloWorld.vue'
  import pageHeader from "../components/header";
  import pageContent from "../components/content";
  import pageFooter from "../components/footer";

  export default {
    name: "home",
    components: {
      "page-header": pageHeader,
      "page-content": pageContent,
      "page-footer": pageFooter
    }
  };
</script>
