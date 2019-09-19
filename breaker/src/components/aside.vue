<template>
  <div class="aside">
    <div class="search">
      <el-input
        placeholder="请输入内容"
        v-model="input"
        class="input-with-select"
      >

        <el-button
          slot="append"
          icon="el-icon-search"
        >搜索</el-button>
      </el-input>
    </div>
    <nav class="nav-bar">
      <ul class="menus">
        <li
          v-for="(menu,index) in menus"
          :key="index"
        >
          <router-link :to="{path:`/list/${menu.title}`}">
            {{menu.title}}
          </router-link>
          <div v-show="menu.items">
            <ul class="items">
              <li
                v-for="(item,index) in menu.items"
                :key="index"
              >
                <router-link :to="{path:`/list/${menu.title}/${item}`}">
                  {{item}}
                </router-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
  export default {
    name: "page-aside",
    data() {
      return {
        input: "",
        menus: [
          { title: "psd", items: ["dsadda", "dsdsffll", "sadsadsf"] },
          { title: "her", items: ["dsfsd", "dsadasd", "gfdgfdgdf"] },
          { title: "sky" }
        ]
      };
    }
  };
</script>
<style scoped>
  .aside {
    background-color: #fafafa;
    color: #aab2b7;
    padding: 20px;
    min-height: 600px;
  }

  .search {
    margin: 25px 0;
  }

  .nav-bar li {
    margin-top: 7px;
  }

  .nav-bar > ul {
    text-align: left;
    padding: 0;
    margin-left: 10px;
    font-size: 25px;
  }
  .nav-bar > ul ul {
    margin-top: 8px;
    margin-left: 16px;
    padding: 0;
    font-size: 20px;
  }
  .nav-bar a {
    color: #aab2b7;
  }

  .menus > li > a::before {
    content: "";
    display: inline-block;
    position: relative;
    top: 3px;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    border-width: 4px;
    border-style: solid;
    border-color: #5cacde;
  }

  .items a::before {
    content: "+";
  }

  .nav-bar a:hover {
    color: blue;
  }
</style>