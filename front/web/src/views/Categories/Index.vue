<template>
  <div class="categories">
    <!-- :style="{background:`url(${info.categoriesBgImg}) center center no-repeat`,backgroundSize:'cover'}" -->

    <CategoriesAnimation></CategoriesAnimation>
    <div
      class="content"
      :style="{
        overflow:isPC?'hidden':'auto',
        marginTop:isPC?'100px':0,
        }"
    >
      <div class="box" v-for="(item) in categories" :key="item.name">
        <div class="winnower" @click="goDetail(item)">
          <div class="text">
            <span>{{item.name}}</span>
            <span>({{item.articleNum}})</span>
          </div>
          <div class="one">
            <div
              class="ye1"
              :style="{borderColor:`${item.rgb()} transparent transparent transparent`}"
            ></div>
            <div
              class="ye2"
              :style="{borderColor:`transparent ${item.rgb()} transparent transparent`}"
            ></div>
          </div>
          <div class="two">
            <div
              class="ye1"
              :style="{borderColor:`${item.rgb()} transparent transparent transparent`}"
            ></div>
            <div
              class="ye2"
              :style="{borderColor:`transparent ${item.rgb()} transparent transparent`}"
            ></div>
          </div>
          <div class="three">
            <div
              class="ye1"
              :style="{borderColor:`${item.rgb()} transparent transparent transparent`}"
            ></div>
            <div
              class="ye2"
              :style="{borderColor:`transparent ${item.rgb()} transparent transparent`}"
            ></div>
          </div>
          <div class="four">
            <div
              class="ye1"
              :style="{borderColor:`${item.rgb()} transparent transparent transparent`}"
            ></div>
            <div
              class="ye2"
              :style="{borderColor:`transparent ${item.rgb()} transparent transparent`}"
            ></div>
          </div>
        </div>
        <div class="bang" :style="{background:item.color}"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { randomColor, rgb } from "@/utils";
import CategoriesAnimation from "@/components/CategoriesAnimation";
export default {
  name: "categories",
  components: {
    CategoriesAnimation
  },
  data() {
    return {
      randomColor: randomColor(),
      categories: []
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      this.$progress.start();
      const res = await this.$axios.get("/categories");
      if (res.data) {
        this.categories = res.data.list
          ? res.data.list.map(item => {
              return {
                ...item,
                color: randomColor(),
                rgb
              };
            })
          : [];
        this.$progress.done();
      }
    },
    goDetail(item) {
      this.$router.push({
        name: "categoriesDetails",
        query: {
          id: item._id
        }
      });
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
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 100px;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
}
.box {
  position: relative;
  overflow: hidden;
  .bang {
    width: 20px;
    height: 100%;
    border-radius: 10px;
    position: absolute;
    top: 162px;
    left: 152px;
  }
}

.winnower {
  z-index: 3;
  width: 324px;
  height: 324px;
  position: relative;
  animation: run 6s linear infinite;
  cursor: pointer;
  .text {
    position: absolute;
    top: 137px;
    left: 137px;
    color: #000;
    font-weight: 500;
    font-size: 16px;
    z-index: 3;
    width: 60px;
    height: 60px;
    background: #fff;
    border-radius: 50%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2),
      0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12);
  }
  .one,
  .two,
  .three,
  .four {
    position: absolute;
    width: 162px;
    height: 162px;
  }
  .one {
    transform: rotate(90deg);
  }
  .two {
    top: 162px;
  }

  .three {
    top: 0;
    transform: rotate(180deg);
    left: 162px;
  }
  .four {
    transform: rotate(-90deg);
    left: 162px;
    top: 162px;
  }
  .ye1 {
    border: 81px solid #01814a;
    border-width: 81px;
    border-style: solid;
    border-color: #01814a transparent transparent transparent;
  }

  .ye2 {
    transform: rotate(-135deg);
    position: absolute;
    bottom: 23px;
    right: -58px;
    width: 0;
    height: 0;
    border-width: 58px;
    border-style: solid;
    border-color: transparent seagreen transparent transparent;
    z-index: 2;
  }
}
.winnower:hover {
  animation: run 2s linear infinite;
}

@keyframes run {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>