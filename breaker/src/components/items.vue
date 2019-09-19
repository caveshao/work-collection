<template>
  <div class="items">
    <span v-show="cate || sec">
      <router-link :to="{path:`/`}">home</router-link>
    </span>
    <span
      v-show="cate"
      :class="{stress:cate===title}"
    >
      <i> > </i>
      <router-link :to="{path:`/list/${cate}`}">
        {{cate}}
      </router-link>
    </span>
    <span
      v-show="sec"
      :class="{stress:sec===title}"
    >
      <i> > </i>
      <router-link :to="{path:`/list/${cate}/${sec}`}">
        {{sec}}
      </router-link>
    </span>
    <h1 class="title">{{title.toUpperCase()}}</h1>
    <ol class="list">
      <li
        v-for="(item,index) in showItems"
        :key="index"
      >
        <span>商品名:{{item.title}}</span>
      </li>
    </ol>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :page-count="11"
        :current-page="currentPage"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    name: "items",
    props: {
      cate: {
        type: String,
        default: ""
      },
      sec: {
        type: String,
        default: ""
      }
    },
    mounted() {
      this.requestList();
    },
    data() {
      return {
        items: [],
        showItems: [],
        total: 1,
        pageSize: 3,
        currentPage: 1
      };
    },
    // beforeRouteUpdate(to, from, next) {
    //   this.requestList();
    //   next();  只在重用组件里调用?
    // },
    methods: {
      requestList() {
        console.log("success");
        let items = [
          { title: "first" },
          { title: "second" },
          { title: "third" },
          { title: "first" },
          { title: "second" },
          { title: "third" },
          { title: "first" },
          { title: "second" },
          { title: "third" },
          { title: "end" }
        ];
        items.splice(
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10)
        );
        this.items = items;
        this.total = this.items.length;
        this.handleCurrentChange(1); //每个分类先展示第一页
      },
      handleSizeChange() {},
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.currentChangePage();
        // 实现分页功能
      },
      currentChangePage() {
        let from = (this.currentPage - 1) * this.pageSize;
        let to = this.currentPage * this.pageSize;
        this.showItems = [];
        for (; from < to; from++) {
          if (this.items[from]) {
            this.showItems.push(this.items[from]);
          }
        }
      }
    },
    computed: {
      title() {
        if (this.cate === "" && this.sec === "") {
          return "home";
        }
        if (this.cate !== "" && this.sec === "") {
          return this.cate;
        }
        if (this.sec !== "") {
          return this.sec;
        }
      }
    }
  };
</script>
<style scoped>
  .items {
    padding-top: 40px;
    padding-left: 40px;
    text-align: left;
    color: #aab2b7;
  }

  h1.title {
    color: black;
    font-weight: bold;
  }
  .items a {
    color: #aab2b7;
  }

  .stress > a {
    color: black;
    font-weight: bold;
  }
  .stress i {
    color: #aab2b7;
    font-weight: lighter;
  }

  .items > span {
    margin-left: 5px;
  }

  .list {
    display: flex;
    justify-content: start;
    align-items: start;
    flex-wrap: wrap;
  }

  .list > li {
    width: 200px;
    height: 200px;
    background-color: black;
    margin-right: 20px;
    margin-bottom: 20px;
  }

  .pagination {
    display: flex;
    justify-content: space-around;
  }

  .el-pagination {
    font-size: 20px;
  }
</style>