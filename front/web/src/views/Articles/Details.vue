<template>
  <div class="details">
    <mu-row>
      <div class="toc-fixed">
        <mu-card class="card">
          <div class="toc">
            <div class="title">目录</div>
            <mu-card-text>
              <div v-html="articleDetail.toc"></div>
            </mu-card-text>
          </div>
        </mu-card>
        <div class="action">
          <mu-tooltip placement="top" content="点赞">
            <mu-button fab color="primary">
              <mu-icon value="thumb_up"></mu-icon>
            </mu-button>
          </mu-tooltip>

          <mu-tooltip placement="top" content="收藏">
            <mu-button fab color="greenA700">
              <mu-icon value="grade"></mu-icon>
            </mu-button>
          </mu-tooltip>

          <mu-tooltip placement="top" content="评论">
            <mu-button @click="scrollComment" fab color="red">
              <mu-icon value="chat"></mu-icon>
            </mu-button>
          </mu-tooltip>
        </div>
      </div>

      <mu-col span="6" offset="2">
        <mu-card class="card">
          <mu-card-title
            title="散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。"
            sub-title="文章简介：散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
              调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
              似乎在诉说着-我也可以在漆黑的角落里，找到阴影背后的阳光，
              找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！"
          ></mu-card-title>
          <mu-card-actions class="sub-title">
            <mu-button flat color="deepPurple500">字数(2000)</mu-button>
            <mu-button flat color="success">查看(20)</mu-button>
            <mu-button flat color="primary">评论(20)</mu-button>
            <mu-button flat color="red">点赞(20)</mu-button>
            <mu-button flat color="#9e9e9e">2020-8-25 12:00:00</mu-button>
          </mu-card-actions>

          <div class="article-detail" v-html="articleDetail.content"></div>

          <mu-card-actions>
            <mu-button flat color="primary">
              <mu-icon left value="dns"></mu-icon>技术
            </mu-button>

            <mu-button flat>
              <mu-icon left value="loyalty"></mu-icon>Vue
            </mu-button>

            <mu-button flat>
              <mu-icon left value="loyalty"></mu-icon>React
            </mu-button>
          </mu-card-actions>
        </mu-card>

        <div class="action-list">
          <mu-tooltip placement="top" content="点赞">
            <mu-button fab color="primary">
              <mu-icon value="thumb_up"></mu-icon>
            </mu-button>
          </mu-tooltip>

          <mu-tooltip placement="top" content="收藏">
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
        <RightConfig></RightConfig>
      </mu-col>
    </mu-row>
  </div>
</template>
<script>
import RightConfig from "@/components/RightConfig";
import markdown from "@/utils/markdown";
import Comment from "@/components/Comment";
import CommentList from "@/components/CommentList";

import { animateScroll } from "@/utils";

export default {
  name: "articlesDetails",
  components: {
    RightConfig,
    Comment,
    CommentList,
  },
  data() {
    return {
      articleDetail: {
        content: "",
        toc: ""
      },
      value:
        '# h1 Heading 8-)\n<h2> h2 Heading by HTML</h2>\n## h2 Heading\n### h3 Heading\n\n## Horizontal RulesRulesRulesRulesRulesRulesRules\n\n___\n\n---\n\n***\n\n## Typographic replacements\n\nEnable typographer option to see result.\n\n(c) (C) (r) (R) (tm) (TM) (p) (P) +-\n\ntest.. test... test..... test?..... test!....\n\n!!!!!! ???? ,,  -- ---\n\n"Smartypants, double quotes" and \'single quotes\'\n\n\n## Emphasis\n\n**This is bold text**\n\n__This is bold text__\n\n*This is italic text*\n\n_This is italic text_\n\n~~Strikethrough~~\n\n\n## Blockquotes\n\n\n> Blockquotes can also be nested...\n>> ...by using additional greater-than signs right next to each other...\n> > > ...or with spaces between arrows.\n\n\n## Lists\n\nUnordered\n\n+ Create a list by starting a line with `+`, `-`, or `*`\n+ Sub-lists are made by indenting 2 spaces:\n  - Marker character change forces new list start:\n    * Ac tristique libero volutpat at\n    + Facilisis in pretium nisl aliquet\n    - Nulla volutpat aliquam velit\n+ Very easy!\n\nOrdered\n\n1. Lorem ipsum dolor sit amet\n2. Consectetur adipiscing elit\n3. Integer molestie lorem at massa\n\n\n1. You can use sequential numbers...\n1. ...or keep all the numbers as `1.`\n\nStart numbering with offset:\n\n57. foo\n1. bar\n\n\n## Code\n\nInline `code`\n\nIndented code\n\n    // Some comments\n    line 1 of code\n    line 2 of code\n    line 3 of code\n\n\nBlock code "fences"\n\n```\nSample text here...\n```\nSyntax highlighting\n\n``` javascript\nvar foo = function (bar) {\n  return bar++;\n};\n\nconsole.log(foo(5));\n```\n\n``` go\npackage main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, world!")\n}\n```\n\n## Tables\n\n| Option | Description |\n| ------ | ----------- |\n| data   | path to data files to supply the data that will be passed into templates. |\n| engine | engine to be used for processing templates. Handlebars is the default. |\n| ext    | extension to be used for dest files. |\n\nRight aligned columns\n\n| Option | Description |\n| ------:| -----------:|\n| data   | path to data files to supply the data that will be passed into templates. |\n| engine | engine to be used for processing templates. Handlebars is the default. |\n| ext    | extension to be used for dest files. |\n\n## Links\n\n[vue-markdown](https://github.com/miaolz123/vue-markdown)\n\n[link with title](https://github.com/miaolz123/vue-markdown "VueMarkdown")\n\nAutoconverted link https://github.com/miaolz123/vue-markdown (enable linkify to see)\n\n\n## Images\n\n![Minion](dist/img/minion.png)\n\nLike links, Images also have a footnote style syntax\n\n![Alt text][id]\n\nWith a reference later in the document defining the URL location:\n\n[id]: dist/img/minion.png  "The Dojocat"\n\n\n### Emojies\n\n> Classic markup: :wink: :cry: :laughing: :yum:\n>\n> Shortcuts (emoticons): :-) :-( 8-) ;)\n\n\n### Subscript / Superscript\n\n- 19^th^\n- H~2~O\n\n\n### \\<ins>\n\n++Inserted text++\n\n\n### \\<mark>\n\n==Marked text==\n\n\n### Footnotes\n\nFootnote 1 link[^first].\n\nFootnote 2 link[^second].\n\nInline footnote^[Text of inline footnote] definition.\n\nDuplicated footnote reference[^second].\n\n[^first]: Footnote **can have markup**\n\n    and multiple paragraphs.\n\n[^second]: Footnote text.\n\n\n### Definition lists\n\nTerm 1\n\n:   Definition 1\nwith lazy continuation.\n\nTerm 2 with *inline markup*\n\n:   Definition 2\n\n        { some code, part of Definition 2 }\n\n    Third paragraph of definition 2.\n\n_Compact style:_\n\nTerm 1\n  ~ Definition 1\n\nTerm 2\n  ~ Definition 2a\n  ~ Definition 2b\n\n\n### Abbreviations\n\nThis is HTML abbreviation example.\n\nIt converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.\n\n*[HTML]: Hyper Text Markup Language \n\n <video id="video" controls="" preload="none" poster="http://img.blog.fandong.me/2017-08-26-Markdown-Advance-Video.jpg"><source id="mp4" src="http://img.blog.fandong.me/2017-08-26-Markdown-Advance-Video.mp4" type="video/mp4"></video>',
      compiledMarkdown:
        "## 标题 \n + [前端的新人文档](https://conf.shishike.com/pages/viewpage.action?pageId=28005986)\n\n+ [前端开发流程](https://conf.shishike.com/pages/viewpage.action?pageId=43307710)\n\n+ [git操作](https://conf.shishike.com/pages/viewpage.action?pageId=43287809)\n\n+ [前端容错规范（试行）]( https://conf.shishike.com/pages/viewpage.action?pageId=40898993)\n\n    \n\n| 平台         | 账号                       | 密码         | 绑定手机    |\n| ------------ | -------------------------- | ------------ | :---------- |\n| 北森         | wb_xuwenliu_cd@keruyun.com | 123456       | 15892591582 |\n| 玉符         | wb_xuwenliu_cd@keruyun.com | Xuwenliu@123 |             |\n| 阿里邮箱     | wb_xuwenliu_cd             | Xuwenliu@123 |             |\n| 腾信管理系统 | 徐文柳                     | Xuwenliu@123 |             |\n\n \n\n\n\nportal-ui项目\n\nGld 商家后台\n\nhttps://gldsso.keruyun.com/sso-ui/#/login?service=https://gb.keruyun.com/auth/cas\n\n32976\n\nkry_hewl\n\nhewl@1234\n\n\n\nwechat项目\n\n线上体验区 - 开发优惠券适用门店展示-微信卡券\n\nhttps://weixin.keruyun.com/coupon/getCouponList?shopId=810196791\n\n本地： http://10.180.6.207:3000/mine-coupon-list.html?shopId=810196791&type=TS#\n\n用户：15892591582\n\n密码：短信\n\nshopId: 810196791\n\n\n\n灰度\n\nhttps://gldweixin.keruyun.com/brand/index?shopId=810109504\n\n用户：15892591582\n\n密码：短信\n\nshopId: 810109504\n\nbrandId: 32973\n\nbui后台：https://gb.keruyun.com/bui/#/loyalty/#/promotionManage\n\nkry_hewl\n\nhewl@1234\n\n\n\n\n\n\n\n\n\n阿里云日志：\n\nhttps://sls.console.aliyun.com/lognext/project/k8s-prod/logsearch/weixin4-https-vpcprod?spm=5176.2020520112.0.0.2a5334c0pwklRt\n\n用户名：portal-log@shishike\n密码：Jn5R5OL0fa7RlXDp\n\n\n\n\n\n\n\n 1.src/helper/order-helper.js 修改如下：\n\n+ `countTotalPriceWithoutBenefit`方法去掉 `getOrderExtraPrice(serviceProps)`\n\n    a.即：// getOrderExtraPrice(serviceProps), // 附加费 2014迭代 计算规则修改，去掉附加费计算\n\n+ b.导出`getOrderExtraPrice`方法 以提供在`helper/privilege/index.js`中调用\n\n+ `exports.getOrderExtraPrice = getOrderExtraPrice;`\n\n2.helper/privilege/index.js 修改如下：\n\n+ 从 src/helper/order-helper.js 导入getOrderExtraPrice方法\n\n+ ```js \n    import {\n     getDishBenefitPrice,\n     countIntegralsToCash,\n     countTotalPriceWithoutBenefit,\n     getMaxIntegralCanBeUsedForYaZuo,\n     carryPrice,\n    + getOrderExtraPrice,\n    } from '../../helper/order-helper';\n    \n    ```\n\n+ 修改计算\n\n    // 服务费加入总价\n    ret.total += beforeAndAfterPriv.beforePrivServiceCharge + beforeAndAfterPriv.afterPrivServiceCharge \n\n    `+ getOrderExtraPrice(serviceProps);`\n\n\n\n\n\n```js\n const mo = navigator.userAgent.indexOf('Region/MO') > 0; // 澳门支付宝扫码打开\n    const cn = navigator.userAgent.indexOf('Region/CN') > 0; // 大陆支付宝扫码打开\n    if (this.payMethodStatus.aliPayStatus) {\n      if(mo){\n        if(payProps.aliPayUePayChannel){\n          aliPayPart = (<div className=\"pay-method__item\">\n            <div className=\"pay-method__main o-bg-white\">\n              <PayDetailItem\n                iconUrl={aliPay}\n                payName={'支付寶澳門錢包'}\n                payType=\"alipay\"\n                chooseItem={this.chooseItem}\n                chosenItem={chosenPayType === 'alipay'}\n              />\n            </div>\n          </div>)\n        }else {\n          aliPayPart = '';\n        }\n      }\n      if(cn){\n        if(payProps.aliPayUePayChannel){\n          aliPayPart = '';\n        }else {\n          aliPayPart = (<div className=\"pay-method__item\">\n            <div className=\"pay-method__main o-bg-white\">\n              <PayDetailItem\n                iconUrl={aliPay}\n                payName={formatMessage(containnerText1.CombinedPaymentAliPay)}\n                payType=\"alipay\"\n                chooseItem={this.chooseItem}\n                chosenItem={chosenPayType === 'alipay'}\n              />\n            </div>\n          </div>)\n        }\n      }\n    }\n\n```\n\n\n\n\n\n\n\n1.git rebase -i HEAD~n个commit\n\n2.进入编辑模式 第一个为pick 后面的全部为s\n\n3.进入编辑模式 保留第一个commit message\n\n4.git push -f\n\n\n\n\n\n ## 我们做的不错：\n\n1.迭代计划明确，任务重量适中。\n\n2.团队工作分配合理，开发起来很舒适。\n\n3.在场的同事间沟通交流很顺畅。\n\n4.遇到难题都是大家相互思考，共同解决。\n\n\n\n我们应该做的更好：\n\n1.迭代卡中的任务详情，可以再详细点，不要链接因为打不开。最好是截图，视频。\n\n有些功能需要在BUI后台配置的尽量把操作流程弄得清楚些。\n\n2.远程交流沟通效率有待提升。\n\n\n\n\n\n\n\n ```js \nbuildEmptyOrderedElements() {\n    const { hasRecommendDishList, isShowRefreshBtn } = this.props;\n    let emptyShopCardStyle = {};\n\n    if (hasRecommendDishList) {\n      emptyShopCardStyle = { position: 'static', margin: '30px 0' };\n    }\n\n    const altMessage = <FormattedMessage {...shoppingCartMessage.isEmpty} />;\n\n    let hint = shoppingCartMessage.dishesLoading;\n    \n    // 协同购物车\n    if (isShowRefreshBtn === true) {\n      hint = shoppingCartMessage.dishesLoading;\n    }\n\n    // 非协同购物车\n    if (isShowRefreshBtn === false) {\n      const { dishes } = JSON.parse(localStorage.lastOrderedDishes || '{}');\n      const dishLen = dishes ? dishes.length : 0;\n      if (dishLen <= 0) {\n        hint = shoppingCartMessage.isEmptyAndGetDish;\n      } else {\n        hint = shoppingCartMessage.dishesLoading;\n      }\n    }\n\n    return (\n      <div className=\"empty-shop-card\" style={emptyShopCardStyle}>\n        <img src={emptyShopCard} className=\"empty-shop-card-image\" alt={altMessage} />\n        <p>\n          <FormattedMessage {...hint} />\n        </p>\n      </div>\n    );\n  },\n```\n\n\n\n"
    };
  },
  computed: {},
  mounted() {
    const article = markdown.marked(this.value);
    article.then(res => {
      this.articleDetail.content = res.content;
      this.articleDetail.toc = res.toc;
    });
  },
  methods: {
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
  background: #000;
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
</style>