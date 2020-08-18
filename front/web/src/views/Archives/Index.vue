<template>
  <div class="common">
    <Header :light-index="2"></Header>
    <ArchivesAnimation></ArchivesAnimation>
    <div class="content">
      <mu-stepper :activeStep="step" :linear="false" orientation="vertical">
        <mu-step v-for="(item,index) in list" :key="item.year">
          <mu-step-button @click="changeStep(index)">
            <span class="title">{{item.year}}</span>
          </mu-step-button>
          <mu-step-content>
            <mu-stepper :activeStep="0" :linear="false" orientation="vertical">
              <mu-step v-for="sub in item.list" :key="sub._id">
                <mu-step-label>
                  <mu-icon slot="icon" value="note_add" color="#fff"></mu-icon>
                  <span class="title" @click="goDetail(sub)">{{sub.title}}</span>
                </mu-step-label>
              </mu-step>
            </mu-stepper>
          </mu-step-content>
        </mu-step>
      </mu-stepper>
    </div>
  </div>
</template>
<script>
import ArchivesAnimation from "@/components/ArchivesAnimation";
import Header from "@/components/Header";

export default {
  name: "archive",
  components: {
    ArchivesAnimation,
    Header
  },
  data() {
    return {
      step: 0,
      list: {}
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      this.$progress.start();
      const res = await this.$axios.get("/archives");

      if (res.data) {
        const list = res.data;
        list.map(item => {
          item.year = new Date(item.createTime * 1000).getFullYear();
          return item;
        });
        const couponInstance = list.reduce((all, cur) => {
          all[cur.year] = all[cur.year] ? all[cur.year].concat(cur) : [cur];
          return all;
        }, {});
        const result = [];
        for (let i in couponInstance) {
          result.push({
            year: i,
            list: couponInstance[i]
          });
        }
        this.list = result.reverse();
        this.$progress.done();
      }
    },
    changeStep(index) {
      this.step = index;
    },
    goDetail(item) {
      this.$router.push({
        name: "articlesDetails",
        query: {
          id: item._id
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .title {
    color: #fff;
    cursor: pointer;
  }
}
</style>