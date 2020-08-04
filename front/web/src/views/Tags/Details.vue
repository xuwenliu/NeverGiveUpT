<template>
  <transition name="slideInDown">
    <div
      class="categories"
      :style="{background:`url(${info.tagsBgImg}) center center no-repeat`,backgroundSize:'cover'}"
    >
      <div class="content">
        <mu-paper v-if="isPC" :z-depth="5" class="box">
          <mu-list>
            <mu-sub-header class="header">标签-Vue（20）</mu-sub-header>
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
      </div>
    </div>
  </transition>
</template>
<script>
import tagsBgImg from "@/assets/img/tags.jpg";
import wap_tagsBgImg from "@/assets/img/wap_tags.jpeg";

export default {
  name: "tagsDetails",
  data() {
    return {
      moreHeight: window.innerHeight - 64 + "px",
      page: 1,
      isPC: this.isPC,
      num: 10,
      refreshing: false,
      loading: false,
      info: {
        tagsBgImg: this.isPC ? tagsBgImg : wap_tagsBgImg,
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

.more {
  width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  .item {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    color: #000;
    .title {
      display: inline-block;
      width: 70%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
</style>