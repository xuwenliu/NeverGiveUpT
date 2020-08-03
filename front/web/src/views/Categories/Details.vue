<template>
  <div
    class="categories"
    :style="{background:`url(${info.categoriesBgImg}) center center no-repeat`,backgroundSize:'cover'}"
  >
    <div class="content">
      <mu-paper :z-depth="5" class="box">
        <mu-list>
          <mu-sub-header class="header">技术（20）</mu-sub-header>
          <div v-for="(item,index) in num" :key="index">
            <mu-list-item>
              <mu-ripple style="width:100%" color="red"  :opacity="0.5">
                <mu-list-item-title class="item">
                  <span
                    class="title"
                  >文章标题{{item}}</span>
                  <span>2020-09-30 12:30:45</span>
                </mu-list-item-title>
              </mu-ripple>
            </mu-list-item>

            <mu-divider />
          </div>
        </mu-list>

        <div class="pagination">
          <mu-pagination raised :total="50" :current.sync="page" @change="pageChange"></mu-pagination>
        </div>
      </mu-paper>
    </div>
  </div>
</template>
<script>
import categoriesBgImg from "@/assets/img/category.jpg";

export default {
  name: "categoriesDetails",
  data() {
    return {
      panel: "",
      page: 1,

      num: 10,
      info: {
        categoriesBgImg
      }
    };
  },
  methods: {
    toggle(panel) {
      this.panel = panel === this.panel ? "" : panel;
    },
    pageChange() {
      setTimeout(() => {
        this.num += 10;
      }, 2000);
    }
  }
};
</script>
<style lang="less" scoped>
.categories {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  .content {
    padding-top: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .box {
      width: 50%;
      background: rgba(255, 255, 255, 0.5);
      .header {
        font-size: 24px;
        color: #333;
      }
      .item {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        color: #555;
        .title {
          display: inline-block;
          width: 70%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
    .pagination {
      margin: 20px 0;
      display: flex;
      justify-content: center;
    }
  }
}
</style>