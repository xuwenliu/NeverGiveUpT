<template>
  <div class="header">
    <mu-appbar color="transparent">
      <mu-button v-show="!isPC" @click="toggleWapMenu(true)" icon slot="left">
        <mu-icon value="menu"></mu-icon>
      </mu-button>NeverGiveUpT
      <div v-show="isPC" class="search">
        <mu-text-field :solo="true" icon="search" v-model="keyword" label-float></mu-text-field>
      </div>
      <mu-button
        v-show="isPC"
        @click="go(item,index)"
        slot="right"
        v-for="(item,index) in menu"
        :key="item.name"
        :color="lightIndex === index?'purple':''"
        flat
      >
        <mu-icon size="16" :value="item.icon"></mu-icon>
        {{item.name}}
      </mu-button>
    </mu-appbar>
    <mu-bottom-sheet :open.sync="open">
      <mu-list @item-click="toggleWapMenu(false)">
        <mu-list-item @click="go(item,index)" v-for="(item,index) in menu" :key="item.name" button>
          <mu-list-item-action>
            <mu-icon :color="lightIndex === index?'purple':''" :value="item.icon"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title :style="{color:lightIndex === index?'purple':''}">{{item.name}}</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>

    <mu-button v-show="!isPC" @click="openDialog=true" class="search-fab" small fab color="purple">
      <mu-icon value="search"></mu-icon>
    </mu-button>

    <mu-dialog max-width="100%" :open.sync="openDialog">
      <mu-text-field action-icon="search" v-model="keyword" label-float></mu-text-field>
      <mu-button slot="actions" flat color="primary" @click="openDialog = false">取消</mu-button>
      <mu-button slot="actions" flat color="primary" @click="search">搜索</mu-button>
    </mu-dialog>
  </div>
</template>
<script>
export default {
  name: "App",
  components: {},
  mounted() {
    let currentName = location.hash.replace("#/", "");
    console.log(currentName);
    this.menu.forEach((item, index) => {
      if (currentName.indexOf("categories/details") > -1) {
        currentName = "categories";
      }
      if (currentName.indexOf("tags/details") > -1) {
        currentName = "tags";
      }
      if (currentName === item.router) {
        this.lightIndex = index;
      }
    });
  },
  data() {
    return {
      isPC: this.isPC,
      open: false,
      keyword: "",
      openDialog: false,
      lightIndex: 0,
      menu: [
        {
          name: "首页",
          router: "index",
          icon: "home"
        },
        {
          name: "文章",
          router: "articles",
          icon: "note_add"
        },
        {
          name: "归档",
          router: "archives",
          icon: "drafts"
        },
        {
          name: "分类",
          router: "categories",
          icon: "dns"
        },
        {
          name: "标签",
          router: "tags",
          icon: "loyalty"
        },
        {
          name: "关于",
          router: "about",
          icon: "perm_identity"
        }
      ]
    };
  },
  methods: {
    go(item, index) {
      if (this.$route.name === item.router) {
        return;
      }
      this.lightIndex = index;
      this.$router.push({
        name: item.router
      });
    },
    toggleWapMenu(open) {
      this.open = open;
    },
    search() {
      this.openDialog = false;
    }
  }
};
</script><style lang="less" scoped>
.mu-appbar {
  /deep/ .mu-appbar-right {
    flex: 1;
  }
  .mu-flat-button {
    flex: 1;
  }
}
.search {
  float: right;
  .mu-input {
    margin-bottom: 0;
    color: #fff;
    padding-left: 0;
  }
  /deep/ .mu-input-content {
    background: hsla(0, 0%, 100%, 0.15);
    .mu-text-field-input {
      padding-left: 56px;
      color: #fff;
    }
    .mu-text-field-input::placeholder {
      color: #fff;
    }
  }
}
.search-fab {
  position: fixed;
  right: 30px;
  bottom: 30px;
}
.header {
  position: fixed;
  z-index: 10;
  width: 100%;
}
</style>