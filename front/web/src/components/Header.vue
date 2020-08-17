<template>
  <div class="header">
    <mu-appbar :color="background">
      <!-- 菜单图标 -->
      <mu-button v-show="!isPC" @click="toggleWapMenu(true)" icon slot="left">
        <mu-icon value="menu"></mu-icon>
      </mu-button>

      <!-- 头像 -->
      <mu-avatar v-if="info.logo" slot="left" style="margin-left:20px" :size="50">
        <img :src="info.logo" />
      </mu-avatar>

      <!-- title -->
      <span v-if="info.title">{{info.title}}</span>

      <!-- 菜单 -->
      <mu-button
        v-show="isPC"
        @click="go(item)"
        slot="right"
        v-for="(item,index) in info.menu"
        :key="item.menuName"
        :color="lightIndex === index?'purple':''"
        flat
      >
        <mu-icon size="16" :value="item.icon"></mu-icon>
        {{item.menuName}}
      </mu-button>
      <mu-button v-if="user" flat slot="right" ref="button" @click="openUser = !openUser">
        <div class="user">
          <span>{{user.email || user.nickName}}</span>
          <mu-icon value="expand_more"></mu-icon>
        </div>
      </mu-button>
      <mu-popover :open.sync="openUser" :trigger="trigger">
        <mu-list>
          <mu-list-item button>
            <mu-list-item-title>个人中心</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button @click="logout">
            <mu-list-item-title>退出登录</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-popover>
    </mu-appbar>

    <!-- wap-菜单 -->
    <mu-bottom-sheet :open.sync="openWapMenu">
      <mu-list @item-click="toggleWapMenu(false)">
        <mu-list-item
          @click="go(item)"
          v-for="(item,index) in info.menu"
          :key="item.menuName"
          button
        >
          <mu-list-item-action>
            <mu-icon :color="lightIndex === index?'purple':''" :value="item.icon"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title :style="{color:lightIndex === index?'purple':''}">{{item.menuName}}</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>

    <!-- 搜索按钮 -->
    <div class="tool" v-if="isShowAction">
      <div v-if="info.login && !user" class="tool-row">
        <mu-slide-right-transition>
          <mu-button
            v-show="showToolBtn"
            @click="openLoginModal=true;showToolBtn=false;"
            fab
            color="primary"
          >登录</mu-button>
        </mu-slide-right-transition>
      </div>
      <div class="tool-row">
        <mu-slide-right-transition>
          <mu-button
            v-show="showToolBtn && info.openSearch"
            @click="openSearchModal=true;showToolBtn=false;"
            fab
            color="deepOrange600"
          >搜索</mu-button>
        </mu-slide-right-transition>

        <mu-button @click="showToolBtn = !showToolBtn" fab color="blue" class="search-fab">
          <mu-icon value="adb"></mu-icon>
        </mu-button>
      </div>
      <div v-if="info.register && !user" class="tool-row">
        <mu-slide-right-transition>
          <mu-button
            v-show="showToolBtn"
            @click="openRegisterModal=true;showToolBtn=false;"
            fab
            color="success"
          >注册</mu-button>
        </mu-slide-right-transition>
      </div>
    </div>

    <RegisterForm :open="openRegisterModal" @toggle="toggleRegisterModal"></RegisterForm>
    <LoginForm :open="openLoginModal" @toggle="toggleLoginModal"></LoginForm>
    <SearchForm :open="openSearchModal" @toggle="toggleSearchModal"></SearchForm>

    <mu-slide-bottom-transition>
      <mu-button class="back-top" v-show="showBackTop" @click="scrollTop" fab color="red">
        <mu-icon value="arrow_upward"></mu-icon>
      </mu-button>
    </mu-slide-bottom-transition>
  </div>
</template>
<script>
import RegisterForm from "@/components/RegisterForm";
import LoginForm from "@/components/LoginForm";
import SearchForm from "@/components/SearchForm";
const menus = [
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
];
export default {
  name: "App",
  components: {
    RegisterForm,
    LoginForm,
    SearchForm
  },
  props: {
    lightIndex: {
      type: Number,
      default: 0
    },
    background: {
      type: String,
      default: "transparent"
    }
  },
  data() {
    return {
      showToolBtn: false,
      showBackTop: false,
      openSearchModal: false,
      openLoginModal: false,
      openRegisterModal: false,
      openWapMenu: false,

      isShowAction: true,

      isPC: this.isPC,
      info: {},

      openUser: false,
      trigger: null,
      user: JSON.parse(localStorage.getItem("user"))
    };
  },
  mounted() {
    this.getInfo();
    if (this.user) {
      this.trigger = this.$refs.button.$el;
    }
    window.onscroll = () => {
      if (document.documentElement.scrollTop + document.body.scrollTop > 100) {
        this.showBackTop = true;
      } else {
        this.showBackTop = false;
      }
    };
  },

  methods: {
    async getInfo() {
      const res = await this.$axios.get("/header");
      if (res.data) {
        this.info = res.data.header;
        this.info.menu.map(item => {
          menus.forEach(sub => {
            if (item.router === sub.router) {
              item.icon = sub.icon;
            }
          });
          return item;
        });
        this.isShowAction = !(
          !this.info.openSearch &&
          !this.info.register &&
          !this.info.login
        );
      }
    },
    go(item) {
      if (this.$route.name === item.router) {
        return;
      }
      this.$router.push({
        name: item.router
      });
    },
    toggleWapMenu(openWapMenu) {
      this.openWapMenu = openWapMenu;
    },
    toggleRegisterModal(openRegisterModal) {
      this.openRegisterModal = openRegisterModal;
    },
    toggleLoginModal(openLoginModal) {
      this.openLoginModal = openLoginModal;
    },
    toggleSearchModal(openSearchModal) {
      this.openSearchModal = openSearchModal;
    },
    scrollTop() {
      document.body.scrollIntoView();
    },
    async logout() {
      const res = await this.$axios.post("/logout");
      if (res) {
        localStorage.removeItem("user");
        this.openUser = false;
        this.user = null;
        this.$toast.success(res.msg);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  position: fixed;
  z-index: 10;
  width: 100%;
  top: 0;
}

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

.tool {
  position: fixed;
  right: 0;
  bottom: 100px;
  .tool-row {
    text-align: right;
    margin-top: 20px;
    height: 56px;
    .search-fab {
      margin-left: 20px;
      margin-right: -28px;
    }
  }
}
.back-top {
  position: fixed;
  right: 10px;
  bottom: 30px;
}
.user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    display: block;
    width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>