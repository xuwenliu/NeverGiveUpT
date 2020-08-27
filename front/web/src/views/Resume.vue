<template>
  <div class="resume">
    <mu-card style="width: 100%; max-width: 1000px; margin: 0 auto; background:#fff;">
      <div class="resume-preview">
        <div class="resume-box" :style="{'padding':isPC?'0 50px 45px':'0 20px 45px'}">
          <div class="resume-item resume-userinfo">
            <div class="item-primary">
              <!---->
              <div class="info-flex">
                <div class="info-flex-item">
                  <h2 class="name">
                    NeverGiveUpT
                    <svg class="icon-svg">
                      <use xlink:href="#icon_man">
                        <svg id="icon_man" viewBox="0 0 1024 1024">
                          <path
                            d="M64 512a448 448 0 1 0 896 0 448 448 0 1 0-896 0z"
                            fill="#4BA1F1"
                          />
                          <path
                            d="M638.4 340.352h-69.248a32 32 0 0 1 0-64h178.496v179.712a32 32 0 1 1-64 0v-70.4l-83.008 82.88a192 192 0 1 1-45.248-45.248l83.008-83.008zM353.6 670.4a128 128 0 1 0 181.056-181.056A128 128 0 0 0 353.6 670.4z"
                            fill="#FFF"
                          />
                        </svg>
                      </use>
                    </svg>
                  </h2>
                  <div class="info-labels">
                    <p :style="{'flex-direction':isPC?'row':'column'}">
                      <span class="prev-line" :class="{'no-line':isPC}">
                        <i class="fz-resume fz-experience"></i>4年经验
                      </span>
                      <span class="prev-line">
                        <i class="fz-resume fz-degree"></i>本科
                      </span>
                      <span class="prev-line">
                        <i class="fz-resume fz-status"></i>全职
                      </span>
                    </p>
                    <p :style="{'flex-direction':isPC?'row':'column'}">
                      <span class="prev-line" :class="{'no-line':isPC}">
                        <i class="fz-resume fz-tel"></i>15892591582
                      </span>
                      <span class="prev-line">
                        <i class="fz-resume fz-weixin"></i>15892591582
                      </span>
                      <span class="prev-line">
                        <i class="fz-resume fz-mail"></i>15892591582@163.com
                      </span>
                    </p>
                  </div>
                </div>
                <div class="info-flex-item header-upload">
                  <div class="header-box">
                    <img src="https://xuwenliu.github.io/img/avatar.jpg" class="header-img" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="resume-item resume-purpose">
            <div class="item-primary">
              <h3 class="title">
                期望职位 (Expected position)
                <!---->
              </h3>
              <ul>
                <li :style="{'padding':isPC?'8px 0 8px 15px':'8px 0'}">
                  <div class="primary-info">
                    <div class="ui-select-inner" :style="{'flex-direction':isPC?'row':'column'}">
                      <span class="prev-line" :class="{'no-line':isPC}">
                        <span class="label-text">
                          <i class="fz-resume fz-job"></i>前端开发
                        </span>
                      </span>
                      <span class="prev-line">
                        <i class="fz-resume fz-place"></i>成都
                      </span>
                      <span class="prev-line">
                        <i class="fz-resume fz-salary"></i>10K+
                      </span>
                      <span class="prev-line">
                        <i class="fz-resume fz-industry"></i>全职
                      </span>
                    </div>
                  </div>
                  <!---->
                </li>
              </ul>
            </div>
          </div>
          <div class="resume-item resume-project">
            <div class="item-primary">
              <h3 class="title">
                工作经历 (Experience)
                <!---->
              </h3>
              <ul>
                <li>
                  <div class="primary-info">
                    <!---->
                    <div class="info-text">
                      <h4 class="name">云创一指项目</h4>
                      <span class="gray period">2018.03-2020.01</span>
                    </div>
                    <div class="info-text">
                      负责公司内部管理系统搭建，多个项目开发和后期维护，迭代升级，持续优化项目性能。
                      负责项目进度管理，新人培训，基础工具开发（UI 组件，公共函数），团队技术提升。
                      期间对小程序（Taro,Wepy,Mpvue,云开发），以及 Node.js,Koa，Egg 等技术有学习使用。
                    </div>
                    <!---->
                    <div class="info-text">
                      <span class="text-type">技术栈：</span>
                      Vue 全家桶+Angular.js+React 全家桶+Umi+Ant Design+JQuery
                    </div>
                  </div>
                  <!---->
                </li>
                <li>
                  <div class="primary-info">
                    <!---->
                    <div class="info-text">
                      <h4 class="name">鹦鹉美家APP</h4>
                      <span class="gray period">2016.11-2018.03</span>
                    </div>
                    <div class="info-text">
                      一款全新的美家服务平台产品，致力于为客户优选真实美家服务作品与原创团队的APP。
                      负责公司的【鹦鹉美家 APP 业者端】【鹦鹉美家 APP 商家端】的 H5 部分开发以及与之对应的后台管理系统开发。
                      传授原生 APP 开发人员前端技术，与之商讨混合开发方案，构建 APP 的 H5 部分与原生 APP 的通讯交互，如期
                      完成项目任务，成功上线。
                    </div>
                    <!---->
                    <div class="info-text">
                      <span class="text-type">技术栈：</span>
                      Vue+Angular.js+HybridBridge（H5 混合开发）+JQuery
                    </div>
                    <!-- <div class="info-text">
                      <span class="text-type">项目链接：</span>
                      <a href="https://mobile.yingwumeijia.com/v1.13.0/appv/#/index" target="_blank" rel="noopener noreferrer">https://mobile.yingwumeijia.com/v1.13.0/appv/#/index</a>
                    </div>-->
                  </div>
                  <!---->
                </li>
              </ul>
            </div>
          </div>
          <div class="resume-item resume-history">
            <div class="item-primary">
              <h3 class="title">
                项目经历 (Project exp)
                <!---->
              </h3>
              <ul>
                <li>
                  <div class="primary-info">
                    <!---->
                    <div class="info-text">
                      <h4 class="name">成都云创一指科技有限公司</h4>
                      <span class="gray period">2018.03-2020.01</span>
                    </div>
                    <h4>
                      <span class="prev-line no-line">技术部</span>
                      <span class="prev-line">前端开发</span>
                      <!---->
                    </h4>
                    <div class="info-text">
                      <span class="text-type">内容：</span>
                      <br />1、参与会员前台PC/WAP开发，其中PC端主要以服务端渲染模板为主，前端在【个人中心】模块使用接口请求模式完成业务逻辑，引入Vue.js快速搭建页面完成渲染。
                      WAP 总共完成3版，主要技术是Vue全家桶，其中主要负责【充值】【提现】【额度转换】【IM聊天】等。IM聊天模块采用webSocket和服务端通讯，按照设计稿纯手工打造交互界面。其中主要涉及消息发送和接收，图片、视频上传发送，红包领取，通知消息，系统消息，账变消息处理等具体任务。其中第3版又将前端所写的H5页面嵌入原生app里面，和app进行交互。主要体现在获取app版本信息、设备信息，截屏，IM发送语音等功能。
                      <br />2、参与业主后台管理系统开发，该项目基于Angular.js+JQuery+layui构建整个项目，其中主要负责【资金管理】【广告管理】【社交管理】等。其中社交管理用webSocket和服务端通讯，采用layui构建用户界面，完成了一个类似于QQ的IM实时聊天模块。
                      <br />3、参与平台后台管理系统开发，该项目和业主后台系统开发模式类似，主要负责【资金管理】【广告管理】【统计分析】【账号管理】等。账号管理涉及权限分配，统计分析模块使用Echarts渲染图表。
                      <br />4、参与超级签名后台管理系统开发，该项目基于Umi+Ant Design Pro构建项目，主要负责【添加应用】ipa和apk文件，图片上传。【应用详情】主要是使用Ant Design 表格组件，【登录注册】使用Ant Design Form表单及其验证。
                      <br />5、参与云配置后台管理系统开发，该项目基于Angular2.x+ng-antd构建整个项目，其中主要负责【应用发布】模块，使用ng-antd中表单组件搭建整个应用模块。
                    </div>
                    <!---->
                    <div class="keywords">
                      <span>Vue</span>
                      <span>AngularJs</span>
                      <span>React</span>
                      <span>Umi</span>
                      <span>Ant Design</span>
                      <span>Echarts</span>
                      <span>WebSocket</span>
                      <span>Layui</span>
                    </div>
                  </div>
                  <!---->
                </li>
                <li>
                  <div class="primary-info">
                    <!---->
                    <div class="info-text">
                      <h4 class="name">成都鹦鹉美家科技有限公司</h4>
                      <span class="gray period">2016.11-2018.03</span>
                    </div>
                    <h4>
                      <span class="prev-line no-line">研发部</span>
                      <span class="prev-line">web前端</span>
                      <!---->
                    </h4>
                    <div class="info-text">
                      <span class="text-type">内容：</span>
                      <br />1、负责鹦鹉美家APP（业者端，商家端）多个H5页面书写，根据UI设计还原设计，主要有首页、优惠页、保障页、推客页等。以及与其对应的后台管理系统，采用Angular.js框架编写前端代码。
                      <br />2、鹦鹉美家APP H5部分采用Vue全家桶构建。
                      <br />3、鹦鹉美家APP中使用和原生开发人员商定的Hybrid-Bridge桥接协议进行通讯。
                      <br />4、鹦鹉美家推客团队管理后台和快捷收款（公众号）所有页面书写，功能开发和优化完善。
                    </div>
                    <!---->
                    <div class="keywords">
                      <span>AngularJS</span>
                      <span>Vue</span>
                      <span>Hybrid-Bridge</span>
                      <span>微信公众号</span>
                    </div>
                  </div>
                  <!---->
                </li>
              </ul>
            </div>
          </div>

          <div class="resume-item resume-summary">
            <div class="item-primary advantage-show">
              <h3 class="title">
                个人总结 (Summary)
                <!---->
              </h3>
              <ul>
                <li>
                  <div class="primary-info">
                    <div class="info-text advantage-text">
                      <!---->
                      有4年开发经验，熟悉Vue、React、Angular、Taro等前端主流框架。熟悉小程序开发，以及NodeJs、Koa等技术也有深入研究。具有良好的沟通能力、工作协调能力、不断学习新技术、熟练前端技术、热衷于前端开发。
                    </div>
                  </div>
                  <!---->
                </li>
              </ul>
            </div>
          </div>
          <!---->
          <!---->
          <!---->
          <!---->
          <!---->
          <!---->
        </div>
      </div>
    </mu-card>
  </div>
</template>
<script>
export default {
  name: "resume",
  components: {},
  data() {
    return {
      isPC: this.isPC
    };
  }
};
</script>
<style lang="less" scoped>
.resume {
  color: #414a60;
  font-size: 14px;
  padding: 40px 0;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    list-style: none;
  }
  h4 {
    margin-top: 0;
    padding: 0;
  }
}
.prev-line {
  display: inline-block;
  vertical-align: middle;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:before {
    width: 1px;
    height: 12px;
    background-color: #e0e0e0;
    content: "";
    display: inline-block;
    vertical-align: middle;
  }
  &.no-line::before {
    display: none;
  }
}

.fz-resume {
  width: 24px;
  height: 24px;
  background: url(https://static.zhipin.com/zhipin-geek/v231/web/geek-vue/static/images/icons-resume.f44cb025.png)
    no-repeat;
  display: inline-block;
  vertical-align: middle;
}

.fz-female {
  background-image: url(https://static.zhipin.com/zhipin-geek/v231/web/geek-vue/static/images/icons-sex-woman.d3e2e2ee.png);
}

.fz-female,
.fz-male {
  vertical-align: top;
  background-size: contain;
}

.fz-male {
  background-image: url(https://static.zhipin.com/zhipin-geek/v231/web/geek-vue/static/images/icons-sex-man.de536dab.png);
}

.fz-neutral {
  background-image: url(https://static.zhipin.com/zhipin-geek/v231/web/geek-vue/static/images/icons-sex-neutral.78b19ef7.png);
  background-size: contain;
  vertical-align: top;
}

.fz-experience {
  background-position: 4px -477px;
}

.fz-degree {
  background-position: 2px -507px;
}

.fz-status {
  background-position: -26px -477px;
}

.fz-tel {
  background-position: -25px -506px;
}

.fz-mail {
  background-position: 4px -535px;
}

.fz-weixin {
  background-position: -28px -586px;
}
.fz-job {
  background-position: -25px -535px;
}

.fz-salary {
  background-position: 2px -561px;
}

.fz-industry {
  background-position: -26px -561px;
}

.fz-place {
  background-position: 2px -585px;
}
.resume-preview {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.resume-preview .resume-box {
  flex: 1;
  overflow: auto;
  padding: 0 50px 45px;
}

.resume-preview .prev-line {
  max-width: none;
}

.resume-box .prev-line {
  max-width: 250px;
}

.resume-box .prev-line:before {
  margin: 0 26px;
}

.resume-box .item-primary {
  position: relative;
  border-bottom: 1px solid #f2f3f3;
  padding: 26px 0 15px;
  min-height: 114px;
  box-sizing: content-box;
}

.resume-box .item-primary .name {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 20px;
}

.resume-box .item-primary .name i {
  margin-top: -5px;
  margin-left: 5px;
  vertical-align: middle;
}

.resume-box .item-primary .name .icon-svg {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}

.resume-box .item-primary .title {
  position: relative;
  padding-left: 12px;
  font-size: 18px;
  font-weight: 400;
}

.resume-box .item-primary .title:before {
  content: "";
  position: absolute;
  width: 3px;
  height: 14px;
  border-radius: 10px;
  background-color: #00e676;
  left: 0;
  top: 5px;
}

.resume-box .item-primary .title .label-text {
  display: inline-block;
  vertical-align: middle;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.resume-box .item-primary .info-labels p {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}

.resume-box .item-primary ul {
  margin-top: 10px;
  margin-bottom: 2px;
}

.resume-box .item-primary li {
  padding: 8px 0 8px 15px;
  position: relative;
  min-height: 40px;
}

.resume-box .item-primary li:hover {
  background-color: #f2f5f9;
  cursor: pointer;
  transition: all 0.15s linear;
}

.resume-box .item-primary li .info-labels {
  margin-left: -8px;
}

.resume-box .item-primary li .primary-info h4 {
  font-size: 15px;
  font-weight: 700;
}

.resume-box .item-primary li .primary-info h4.name {
  max-width: 420px;
  word-break: break-all;
  float: left;
  color: #414a60;
}

.resume-box .item-primary li .primary-info h4.name + .period {
  font-size: 12px;
  padding-left: 30px;
  float: left;
  position: relative;
  top: 2px;
}

.resume-box .item-primary li .primary-info .info-text {
  padding: 7px 0;
  color: #61687c;
  white-space: pre-wrap;
  overflow: hidden;
  word-break: break-all;
}

.resume-box .item-primary li .primary-info .info-text:last-of-type {
  padding-bottom: 0;
}

.resume-box .item-primary li .primary-info .info-text .text-type {
  font-weight: 700;
}

.resume-box .item-primary li .primary-info .info-text.advantage-text {
  padding-top: 0;
}

.resume-box .item-primary li .primary-info .keywords {
  padding: 7px 0 5px;
}
.resume-box .item-primary li .primary-info .ui-select-inner {
  display: flex;
  flex-direction: column;
}
.resume-box .item-primary li .primary-info .keywords span {
  display: inline-block;
  font-size: 12px;
  line-height: 20px;
  color: #9fa3b0;
  padding: 0 14px;
  margin-right: 10px;
  border: 1px solid #cfd1d7;
  border-radius: 50px;
  margin-bottom: 10px;
}

.resume-box .avatar-upload {
  position: absolute;
  right: 40px;
  top: 70px;
  z-index: 1;
}

.resume-box .resume-baseinfo .item-primary {
  padding-right: 80px;
}

.resume-box .resume-baseinfo .info-labels .prev-line:before {
  margin: 0 20px;
}

.resume-box .resume-advantage .item-primary li .op {
  display: block;
}

.resume-box .expectation-form .short {
  max-width: 140px;
}

.resume-box .info-flex {
  display: flex;
}

.resume-box .info-flex-item {
  flex: 1;
}

.resume-box .header-upload {
  width: 70px;
  height: 70px;
  margin-top: 5px;
  flex: none;
  position: relative;
  .header-img {
    border-radius: 50%;
  }
}
</style>
