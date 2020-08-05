<template>
  <div class="categories">
    <!-- :style="{background:`url(${info.categoriesBgImg}) center center no-repeat`,backgroundSize:'cover'}" -->

    <CategoriesAnimation></CategoriesAnimation>
    <div class="content">
      <mu-paper v-if="isPC" :z-depth="5" class="box">
        <mu-list>
          <mu-sub-header class="header">分类-技术（20）</mu-sub-header>
          <div v-for="(item,index) in num" :key="index">
            <mu-list-item>
              <mu-ripple style="width:100%" color="red" :opacity="0.5">
                <mu-list-item-title class="item">
                  <span class="title">文章标题{{item}}</span>
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

      <div class="more" v-else :style="{height:moreHeight}">
        <div class="sub-title">分类-技术(20)</div>
        <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
          <mu-list>
            <div v-for="(item,index) in num" :key="index">
              <mu-list-item>
                <mu-ripple style="width:100%" color="rgb(156, 39, 176)" :opacity="0.5">
                  <mu-list-item-title class="item">
                    <span class="title">文章标题{{item}}</span>
                    <span>2020-09-30 12:30:45</span>
                  </mu-list-item-title>
                </mu-ripple>
              </mu-list-item>
              <mu-divider />
            </div>
          </mu-list>
        </mu-load-more>
      </div>

      <mu-button v-show="!isPC" @click="$router.go(-1)" class="search-fab" small fab color="#fff">
        <mu-icon color="#ccc" value="arrow_back"></mu-icon>
      </mu-button>
    </div>
  </div>
</template>
<script>
import categoriesBgImg from "@/assets/img/category.jpg";
import wap_categoriesBgImg from "@/assets/img/wap_category.jpg";
import CategoriesAnimation from "@/components/CategoriesAnimation";

export default {
  name: "categoriesDetails",
  components: {
    CategoriesAnimation
  },
  data() {
    return {
      moreHeight: window.innerHeight - 64 + "px",
      page: 1,
      isPC: this.isPC,
      num: 10,
      refreshing: false,
      loading: false,
      info: {
        categoriesBgImg: this.isPC ? categoriesBgImg : wap_categoriesBgImg
      }
    };
  },
  methods: {
    pageChange() {
      setTimeout(() => {
        this.num += 10;
      }, 2000);
    },
    refresh() {
      this.refreshing = true;
      setTimeout(() => {
        this.refreshing = false;
        this.num = 10;
      }, 2000);
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
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
      background: rgba(255, 255, 255, 0.7);
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
.more {
  width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  .item {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    color: #ccc;
    .title {
      display: inline-block;
      width: 70%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
.sub-title {
  position: absolute;
  top: 20px;
  right: 26px;
  color: #ccc;
}
.search-fab {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 30px;
}
</style>