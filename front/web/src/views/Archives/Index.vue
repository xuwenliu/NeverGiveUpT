<template>
  <div class="archive">
    <ArchivesAnimation></ArchivesAnimation>
    <div class="content">
      <mu-stepper :activeStep="step" :linear="false" orientation="vertical">
        <mu-step>
          <mu-step-button @click="changeStep(0)">
            <span class="title">2020</span>
          </mu-step-button>
          <mu-step-content>
            <mu-stepper :activeStep="0" :linear="false" orientation="vertical">
              <mu-step>
                <mu-step-label>
                  <mu-icon slot="icon" value="note_add" color="#fff"></mu-icon>
                  <span class="title">2020-第一篇文章</span>
                </mu-step-label>
              </mu-step>
              <mu-step>
                <mu-step-label>
                  <mu-icon slot="icon" value="note_add" color="#fff"></mu-icon>
                  <span class="title">2020-第二篇文章</span>
                </mu-step-label>
              </mu-step>
              <mu-step>
                <mu-step-label>
                  <mu-icon slot="icon" value="note_add" color="#fff"></mu-icon>
                  <span class="title">2020-第三篇文章</span>
                </mu-step-label>
                <mu-step-content></mu-step-content>
              </mu-step>
            </mu-stepper>
          </mu-step-content>
        </mu-step>
        <mu-step>
          <mu-step-button @click="changeStep(1)">
            <mu-icon slot="icon" value="note_add" color="#fff"></mu-icon>
            <span class="title">2019</span>
          </mu-step-button>
          <mu-step-content>
            <mu-stepper :activeStep="0" :linear="false" orientation="vertical">
              <mu-step>
                <mu-step-label>
                  <mu-icon slot="icon" value="note_add" color="#fff"></mu-icon>
                  <span class="title">2019-第一篇文章</span>
                </mu-step-label>
              </mu-step>
              <mu-step>
                <mu-step-label>
                  <mu-icon slot="icon" value="note_add" color="#fff"></mu-icon>
                  <span class="title">2019-第二篇文章</span>
                </mu-step-label>
              </mu-step>
              <mu-step>
                <mu-step-label>
                  <mu-icon slot="icon" value="note_add" color="#fff"></mu-icon>
                  <span class="title">2019-第三篇文章</span>
                </mu-step-label>
                <mu-step-content></mu-step-content>
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
export default {
  name: "archive",
  components: {
    ArchivesAnimation
  },
  data() {
    return {
      step: 0
    };
  },
  methods: {
    changeStep(index) {
      this.step = index;
    }
  }
};
</script>
<style lang="less" scoped>
.archive {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
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
  }
}
</style>