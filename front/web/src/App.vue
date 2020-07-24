<template>
  <div id="app">
    <mu-appbar color="primary">
      <mu-button @click="toggleWapMenu(true)" icon slot="left">
        <mu-icon v-show="!isPC" value="menu"></mu-icon>
      </mu-button>NeverGiveUpT
      <mu-button
        v-show="isPC"
        @click="go(item)"
        slot="right"
        v-for="item in menu"
        :key="item.name"
        flat
      >
        <mu-icon :value="item.icon"></mu-icon>
        {{item.name}}
      </mu-button>
    </mu-appbar>
    <mu-bottom-sheet :open.sync="open">
      <mu-list @item-click="toggleWapMenu(false)">
        <mu-list-item @click="go(item)" v-for="item in menu" :key="item.name" button>
          <mu-list-item-action>
            <mu-icon value="grade" color="orange"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{item.name}}</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  mounted() {
    console.log(this.isPC);
  },
  data() {
    return {
      isPC: this.isPC,
      open: false,
      menu: [
        {
          name: "首页",
          router: "index",
          icon: "home"
        },
        {
          name: "文章",
          router: "articles",
          icon: "home"
        },
        {
          name: "归档",
          router: "archives",
          icon: "home"
        },
        {
          name: "分类",
          router: "categories",
          icon: "home"
        },
        {
          name: "标签",
          router: "tags",
          icon: "home"
        },
        {
          name: "关于",
          router: "about",
          icon: "home"
        }
      ]
    };
  },
  methods: {
    go(item) {
      if (this.$route.name === item.router) {
        return;
      }
      this.$router.push({
        name: item.router
      });
    },
    toggleWapMenu(open) {
      console.log(open);
      this.open = open;
    }
  }
};
</script>

<style lang="less" scoped>
.mu-appbar {
  /deep/ .mu-appbar-right {
    flex: 1;
  }
  .mu-flat-button {
    flex: 1;
  }
}
</style>
