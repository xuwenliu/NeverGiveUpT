<template>
  <div class="comment-list">
    <div class="comment-item">
      <mu-card
        class="card"
        :class="[classStyle,isPC?'':'wap-card']"
        v-for="(item) in list"
        :key="item._id"
      >
        <mu-card-header :title="item.nickName" :sub-title="item.commentTime | filterDate">
          <mu-avatar slot="avatar">
            <img src="http://www.nevergiveupt.top/user_avatar.png" />
          </mu-avatar>
        </mu-card-header>
        <mu-card-text>
          <span v-if="prevWho" class="who">@{{prevWho}}</span>
          {{item.currentReplayContent}}
          <mu-badge v-if="item.auditStatus == 3" content="未审核" color="#ccc"></mu-badge>
        </mu-card-text>
        <mu-card-actions v-if="!user || user.email !== item.nickName">
          <mu-button @click="replay(item)" small color="primary">回复</mu-button>
        </mu-card-actions>

        <!-- 递归组件 调用自身，必须指定name属性commentList -->
        <div v-if="item.children">
          <comment-list
            :prevWho="item.nickName"
            classStyle="sub-card"
            :articleId="articleId"
            :articleTitle="articleTitle"
            :list="item.children"
          ></comment-list>
        </div>

        <!-- <mu-card class="card sub-card" v-for="sub in item.children" :key="sub._id">
          <mu-card-header :title="sub.nickName" :sub-title="sub.commentTime | filterDate">
            <mu-avatar slot="avatar">
              <img src="../assets/img/4.jpeg" />
            </mu-avatar>
          </mu-card-header>
          <mu-card-text>
            <span class="who">@{{item.nickName}}</span>
            {{sub.currentReplayContent}}
          </mu-card-text>
          <mu-card-actions v-if="!user || user.email !== sub.nickName">
            <mu-button @click="replay(sub)" small color="primary">回复</mu-button>
          </mu-card-actions>
        </mu-card>-->
      </mu-card>
    </div>

    <mu-dialog
      :title="modalTitle"
      width="600"
      max-width="80%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="open"
    >
      <mu-text-field
        v-model="replayContent"
        class="comment-input"
        placeholder="说点什么..."
        multi-line
        :rows="4"
        full-width
      ></mu-text-field>
      <mu-button slot="actions" flat color="primary" @click="close">取消</mu-button>
      <mu-button slot="actions" flat color="primary" @click="ok">确定</mu-button>
    </mu-dialog>
  </div>
</template>
<script>
export default {
  name: "commentList",
  props: {
    list: {
      type: Array,
      default: () => {}
    },
    articleId: {
      type: String,
      default: ""
    },
    articleTitle: {
      type: String,
      default: ""
    },
    classStyle: {
      type: String,
      default: ""
    },
    prevWho: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isPC: this.isPC,
      open: false,
      replayContent: "",
      modalTitle: "",
      user: JSON.parse(localStorage.getItem("user")),
      showList: [],
      replayItem: {}
    };
  },
  methods: {
    buildTree(list) {
      let temp = {};
      let tree = {};
      for (let i in list) {
        temp[list[i]._id] = list[i];
      }
      for (let i in temp) {
        if (temp[i].targetReplayId) {
          if (!temp[temp[i].targetReplayId].children) {
            temp[temp[i].targetReplayId].children = new Object();
          }
          temp[temp[i].targetReplayId].children[temp[i]._id] = temp[i];
        } else {
          tree[temp[i]._id] = temp[i];
        }
      }
      return tree;
    },

    replay(item) {
      if (!this.user) {
        this.$toast.info("登录才能回复");
        return;
      }
      this.open = true;
      this.modalTitle = `回复 @${item.nickName}`;
      this.replayItem = item;
    },
    close() {
      this.open = false;
      this.replayContent = "";
    },
    ok() {
      if (!this.replayContent) {
        this.$toast.info("请输入回复内容");
        return;
      }
      this.replaySubmit();
    },
    async replaySubmit() {
      const postData = {
        nickName: this.user.email ? this.user.email : this.user.nickName,
        articleId: this.articleId,
        articleTitle: this.articleTitle,
        targetReplayId: this.replayItem._id,
        targetReplayContent: this.replayItem.currentReplayContent,
        currentReplayContent: this.replayContent
      };
      const res = await this.$axios.post("/comment", postData);
      if (res.data) {
        this.$toast.success("回复成功,请耐心等待审核");
        location.reload();
        this.close();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.comment-item {
  padding-bottom: 0.53333rem;
  /deep/ .mu-card-text {
    padding-top: 0;
    .who {
      color: #e91e63;
    }
  }
}
.card {
  margin: 0.42667rem 1.06667rem 0 1.06667rem;
  padding-bottom: 0.42667rem;
  box-shadow: none;
  border-radius: 0;
}
.wap-card {
  margin: 4px 10px 0 10px;
}
.sub-card {
  border-left: 1px dashed #00e676;
  border-bottom: 1px dashed #00e676;
  box-shadow: none;
  border-radius: 0;
}
</style>