<template>
  <div class="header">
    <div class="title">
      <a href="http://localhost:8081">breaker</a>
    </div>
    <div>
    </div>
    <div class="social">
      <span icon="el-icon-s-promotion">
        <i class="el-icon-edit"></i>
      </span>
      <span icon="el-icon-s-custom">
        <i class="el-icon-share"></i>
      </span>
      <span>
        <i class="el-icon-delete"></i>
      </span>
      <span>
        <i class="el-icon-phone"></i>
      </span>
    </div>
  </div>
</template>
<script>
  export default {
    name: "page-header",
    data() {
      return {};
    }
  };
</script>
<style scoped>
  .header {
    display: grid;
    grid-template-columns: 2fr 3fr 2fr;
    grid-template-rows: 1fr;
    width: 100%;
    height: 70px;
    padding: 0 20px;
    border-bottom: 1px solid grey;
  }
  .header > .title {
    text-align: left;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .header > .title > a {
    font-size: 2em;
    color: black;
  }

  .header > .social {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .header span i:hover {
      color: blue;
  }
</style>