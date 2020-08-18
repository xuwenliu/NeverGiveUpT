<template>
  <div class="details">
    <Header :light-index="1" background="#000"></Header>

    <div v-if="isPC" class="toc-fixed">
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
        <mu-button v-if="info.isLike" fab color="primary">
          <mu-icon value="thumb_up"></mu-icon>
        </mu-button>

        <mu-button v-if="info.isCollect" fab color="greenA700">
          <mu-icon value="grade"></mu-icon>
        </mu-button>

        <mu-button v-if="info.isComment" @click="scrollComment" fab color="red">
          <mu-icon value="chat"></mu-icon>
        </mu-button>
      </div>
    </div>

    <div class="content">
      <div class="left" :style="{marginTop:isPC?'16px':0}">
        <div class="left-box" :style="{width:isPC?'70%':'100%'}">
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
            <mu-button v-if="info.isLike" fab color="primary">
              <mu-icon value="thumb_up"></mu-icon>
            </mu-button>

            <mu-button v-if="info.isCollect" fab color="greenA700">
              <mu-icon value="grade"></mu-icon>
            </mu-button>
          </div>

          <mu-card id="comment" class="card">
            <Comment></Comment>
          </mu-card>

          <mu-card class="card">
            <mu-card-title title="评论（20）"></mu-card-title>
            <mu-divider></mu-divider>
            <CommentList></CommentList>
          </mu-card>
        </div>
      </div>
      <div v-if="isPC" class="right">
        <RightConfig showPosition="文章详情"></RightConfig>
      </div>
    </div>

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
}

.toc-fixed {
  position: fixed;
  width: 14%;
  left: 20px;
  top: 80px;
  .toc {
    width: 100%;
    max-height: 400px;
    overflow-y: auto;
    word-break: break-all;
    .title {
      font-size: 0.64rem;
      padding: 0.42667rem 0 0 0.42667rem;
    }
    /deep/ a {
      color: #2196f3;
      &:hover {
        color: purple;
      }
    }
  }
}

.action-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0.42667rem 0;
}
.action {
  margin-top: 0.42667rem;
  display: flex;
  justify-content: space-around;
}
.noMulu {
  flex-direction: column;
  align-items: center;
  height: 400px;
}

.content {
  padding-bottom: 0.53333rem;
  display: flex;
  .left {
    flex: 9;
    margin-top: 16px;
    .left-box {
      float: right;
    }
    .card {
      border-radius: 0;
      margin-bottom: 0.48rem;
      .article-detail {
        width: 100%;
        padding: 0.42667rem 0.42667rem 0.42667rem 0.69333rem;
        box-sizing: border-box;
        word-break: break-all;
      }
      .sub-title {
        display: flex;
        flex-wrap: wrap;
      }
      .text {
        padding: 0 0.42667rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
      .chip {
        margin-right: 0.26667rem;
      }
      .cover {
        flex: 1;
        border-radius: 0;
        padding: 0.42667rem;
        .cover-img {
          object-fit: cover;
          width: 100%;
          height: 4.26667rem;
          vertical-align: middle;
        }
      }
      .card-box {
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }
  }
  .right {
    flex: 3;
    display: flex;
    justify-content: center;
  }
}
</style>