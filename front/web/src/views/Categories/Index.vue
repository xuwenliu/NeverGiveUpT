<template>
  <div
    class="categories"
    :style="{background:`url(${info.categoriesBgImg}) center center no-repeat`,backgroundSize:'cover'}"
  >
    <div class="content">
      <div class="box" v-for="(item) in randomArr" :key="item.name">
        <div id="one">
          <span class="text">{{item.name}}</span>
          <div
            class="sj"
            :style="{borderColor:`${item.rgb()} transparent transparent transparent`}"
          ></div>
          <div
            class="ye"
            :style="{borderColor:`transparent transparent transparent ${item.rgb()}`}"
          ></div>
          <div
            class="ye1"
            :style="{borderColor:`transparent ${item.rgb()} transparent transparent `}"
          ></div>
          <div
            class="re"
            :style="{borderColor:`transparent transparent transparent ${item.rgb()}`}"
          ></div>
          <div
            class="blue"
            :style="{borderColor:`transparent transparent transparent ${item.rgb()}`}"
          ></div>
          <div
            class="blue1"
            :style="{borderColor:`${item.rgb()} transparent transparent transparent`}"
          ></div>
          <div
            class="green"
            :style="{borderColor:`${item.rgb()} transparent transparent transparent`}"
          ></div>
          <div
            class="green1"
            :style="{borderColor:`transparent ${item.rgb()} transparent transparent `}"
          ></div>
        </div>
        <div class="bang" :style="{background:item.color}"></div>
      </div>
    </div>
  </div>
</template>
<script>
import categoriesBgImg from "@/assets/img/category.jpg";
import { randomColor, rgb } from "@/utils";
export default {
  name: "categories",
  data() {
    return {
      panel: "",
      page: 1,
      randomColor: randomColor(),
      num: 10,
      info: {
        categoriesBgImg,
        categories: ["技术", "生活", "照片", "其他"]
      }
    };
  },
  computed: {
    randomArr() {
      return this.info.categories.map(item => {
        return {
          name: item,
          color: randomColor(),
          rgb
        };
      });
    }
  },
  methods: {
    toggle(panel) {
      this.panel = panel === this.panel ? "" : panel;
    },
    pageChange() {
      setTimeout(() => {
        this.num += 10;
      }, 2000);
    }
  }
};
</script>
<style lang="less" scoped>
.categories {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  .content {
    padding-top: 64px;
    display: flex;
    // justify-content: space-around;
    margin-top: 100px;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}

#one:hover {
  animation: run 4s linear infinite;
}

@keyframes run {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
.sj {
  margin-top: 5px;
  transform: rotate(-46deg);
  position: absolute;
  top: 14px;
  left: -49px;
  float: left;
  width: 0;
  height: 0;
  z-index: 2;
  border-width: 50px;
  border-style: solid;
}
.ye {
  transform: rotate(0deg);
  position: absolute;
  left: 0px;
  top: 0px;
  float: left;
  width: 0;
  height: 0;
  border-width: 80px;
  border-style: solid;
  z-index: 2;
}

.ye1 {
  transform: rotate(0deg);
  position: absolute;
  left: -80px;
  top: 78px;
  float: left;
  width: 0;
  height: 0;
  z-index: 2;
  border-width: 80px;
  border-style: solid;
  border: 80px solid orange;
}

.re {
  transform: rotate(-46deg);
  position: absolute;
  left: 21px;
  top: -61px;
  float: left;
  z-index: 2;
  width: 0;
  height: 0;
  border-width: 59px;
  border-style: solid;
}

.blue {
  transform: rotate(0deg);
  position: absolute;
  left: 80px;
  top: -79px;
  float: left;
  width: 0;
  height: 0;
  z-index: 2;
  border-width: 80px;
  border-style: solid;
}

.blue1 {
  transform: rotate(-44deg);
  position: absolute;
  left: 102px;
  top: 23px;
  float: left;
  width: 0;
  height: 0;
  z-index: 2;
  border-width: 58px;
  border-style: solid;
  animation: gg 1s linear infinite;
}

.green {
  transform: rotate(0deg);
  position: absolute;
  left: 80px;
  top: 80px;
  z-index: 2;
  float: left;
  width: 0;
  height: 0;
  border-width: 81px;
  border-style: solid;
  z-index: 2;
}

.green1 {
  transform: rotate(-45deg);
  position: absolute;
  top: 103px;
  left: 23px;
  float: left;
  width: 0;
  height: 0;
  border-width: 57px;
  border-style: solid;
  z-index: 2;
}

#mg {
  background: salmon;
  width: 15px;
  height: 300px;
  border-radius: 8px;
  position: absolute;
  top: 220px;
  left: 680px;
  z-index: 0;
}
#one {
  width: 162px;
  transform: rotate(-45deg);
  height: 162px;
  line-height: 168px;
  text-align: center;
  position: relative;
  z-index: 3;
  animation: run 9s linear infinite;
  cursor: pointer;
}
.box {
  position: relative;
}
.text {
  position: absolute;
  top: -4px;
  left: 65px;
  z-index: 3;
  color: #fff;
  font-weight: 500;
  font-size: 16px;
}
.bang {
  width: 20px;
  height: 300px;
  border-radius: 10px;
  position: absolute;
  top: 80px;
  left: 70px;
}
</style>