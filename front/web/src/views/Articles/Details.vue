<template>
  <div class="details">
    <Header :light-index="1"></Header>
    <mu-row style="padding-bottom:64px;">
      <div class="toc-fixed">
        <mu-card class="card">
          <div class="toc">
            <div v-if="toc.length > 0">
              <div class="title">目录</div>
              <mu-card-text>
                <div v-html="toc"></div>
              </mu-card-text>
            </div>
          </div>
        </mu-card>
        <div class="action" :class="toc.length>0?'':'noMulu'">
          <mu-tooltip v-if="info.isLike" placement="top" content="点赞">
            <mu-button fab color="primary">
              <mu-icon value="thumb_up"></mu-icon>
            </mu-button>
          </mu-tooltip>

          <mu-tooltip v-if="info.isCollect" placement="top" content="收藏">
            <mu-button fab color="greenA700">
              <mu-icon value="grade"></mu-icon>
            </mu-button>
          </mu-tooltip>

          <mu-tooltip v-if="info.isComment" placement="top" content="评论">
            <mu-button @click="scrollComment" fab color="red">
              <mu-icon value="chat"></mu-icon>
            </mu-button>
          </mu-tooltip>
        </div>
      </div>

      <mu-col span="6" offset="2">
        <mu-card class="card">
          <mu-card-title :title="info.title" :sub-title="info.introduction"></mu-card-title>
          <mu-card-media style="height:400px;">
            <img v-lazy="info.cover" style="height:100%" />
          </mu-card-media>
          <mu-card-actions class="sub-title">
            <mu-button v-if="wordLength > 0" flat color="deepPurple500">字数({{wordLength}})</mu-button>
            <mu-button v-if="min>0" flat color="tealA400">阅读大约{{min}}分钟</mu-button>
            <mu-button flat color="success">查看({{info.views}})</mu-button>
            <mu-button flat color="primary">评论({{info.comment}})</mu-button>
            <mu-button flat color="red">点赞({{info.like}})</mu-button>
            <mu-button flat color="#9e9e9e">{{info.createTime | filterDate}}</mu-button>
          </mu-card-actions>

          <div class="article-detail" v-html="content"></div>

          <mu-card-actions>
            <mu-button flat color="primary">
              <mu-icon left value="dns"></mu-icon>
              {{info.categories}}
            </mu-button>

            <mu-button flat v-for="sub in info.tags" :key="sub">
              <mu-icon left value="loyalty"></mu-icon>
              {{sub}}
            </mu-button>
          </mu-card-actions>
        </mu-card>

        <div class="action-list">
          <mu-tooltip v-if="info.isLike" placement="top" content="点赞">
            <mu-button fab color="primary">
              <mu-icon value="thumb_up"></mu-icon>
            </mu-button>
          </mu-tooltip>

          <mu-tooltip v-if="info.isCollect" placement="top" content="收藏">
            <mu-button fab color="greenA700">
              <mu-icon value="grade"></mu-icon>
            </mu-button>
          </mu-tooltip>
        </div>

        <mu-card id="comment" class="card">
          <Comment></Comment>
        </mu-card>

        <mu-card class="card">
          <mu-card-title title="评论（20）"></mu-card-title>
          <mu-divider></mu-divider>
          <CommentList></CommentList>
        </mu-card>
      </mu-col>
      <mu-col span="2" offset="1">
        <RightConfig showPosition="文章详情"></RightConfig>
      </mu-col>
    </mu-row>
    <Footer></Footer>
  </div>
</template>
<script>
import RightConfig from "@/components/RightConfig";
import markdown from "@/utils/markdown";
import Comment from "@/components/Comment";
import CommentList from "@/components/CommentList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";


import { animateScroll } from "@/utils";

export default {
  name: "articlesDetails",
  components: {
    RightConfig,
    Comment,
    CommentList,
    Footer,
    Header
  },
  data() {
    return {
      info: {},
      content: "",
      toc: ""
    };
  },
  computed: {
    min() {
      if (this.content) {
        return Math.floor(this.info.content.length / 1000);
      }
      return 0;
    },
    wordLength() {
      if (this.info.content) {
        var lenE = this.info.content.length;
        var enter = this.info.content.match(/\r\n/g);
        return enter === null ? lenE : lenE - enter.length;
      }
      return 0;
    }
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      this.$progress.start();
      const id = this.$route.query.id;
      const res = await this.$axios.get(`/articles/details?id=${id}`);
      if (res.data) {
        this.info = res.data;
        const article = markdown.marked(this.info.content);
        article.then(res => {
          this.content = res.content;
          this.toc = res.toc;
        });
        this.$progress.done();
      }
    },
    scrollComment() {
      let target = document.getElementById("comment");
      animateScroll(target, 500, -50);
    }
  }
};
</script>
<style lang="less" scoped>
.details {
  padding-top: 64px;
  /deep/ .v-note-wrapper .v-note-panel .v-note-navigation-wrapper {
    position: fixed;
    left: 0;
    top: 64px;
    width: 15%;
  }
}
.article-detail {
  padding: 16px;
  /deep/ blockquote {
    // border-left: 6px solid #76ff03;
    // background-color:#fff;
  }
}
.toc-fixed {
  position: fixed;
  width: 14%;
  left: 20px;
  .toc {
    width: 100%;
    max-height: 400px;
    overflow-y: auto;
    word-break: break-all;
    .title {
      font-size: 24px;
      padding: 16px 0 0 16px;
    }
    /deep/ a {
      color: #2196f3;
      &:hover {
        color: purple;
      }
    }
  }
}

.card {
  margin-top: 16px;
}
.action-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 16px 0;
}
.action {
  margin-top: 16px;
  display: flex;
  justify-content: space-around;
}
.noMulu {
  flex-direction: column;
  align-items: center;
  height: 400px;
}
</style>