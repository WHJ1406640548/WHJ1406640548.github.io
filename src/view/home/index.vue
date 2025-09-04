<template>
  <div class="home">
    <Header></Header>
    <div class="index-banner">
      <canvas id="bubble-canvas" width="1087" height="314"></canvas>
      <div class="am-g">
        <div class="am-u-lg-12">
          <h1 class="index-banner-title">摸鱼哇 - 在线工具集</h1>
          <p>无需下载 打开即可使用的工具</p>
          <p>
            <a href="#index-main" class="am-btn am-btn-sm index-banner-btn"
              >开始探索</a
            >
          </p>
        </div>
      </div>
    </div>
    <div class="am-container site-main" id="index-main">
      <template v-for="category in toolCategories">
        <h3 class="tool-sub-title"># {{ category.name }}</h3>
        <ul class="am-avg-sm-2 am-avg-md-3 am-avg-lg-4 am-thumbnails tool-list">
          <li v-for="item in category.items" :key="item.title">
            <a
              :href="item.iframe ? '/#/iframe' : item.url"
              target="_blank"
              class="tool-item"
              :title="item.description"
              @click="setIframeUrl(item.url)"
            >
              <img
                class="tool-icon"
                :src="item.icon"
                :alt="item.title"
                loading="lazy"
              />
              <div>


                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
            </a>
          </li>
        </ul>
      </template>
    </div>
    <Footer></Footer>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useBubble } from "../../hook/useBubble";
import { toolCategories } from "./mockData";

const { initBubble } = useBubble("bubble-canvas");
const setIframeUrl = (url) =>{
  localStorage.setItem("iframeUrl", url);
}
onMounted(() => {
  initBubble();
});
</script>
<style scoped>
@import "./index.css";
.home {
  background-color: #f4f6f9;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
}
/* 泡泡 */
#bubble-canvas {
  pointer-events: none;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
/* 头部 */
.index-banner {
  position: relative;
  background: #293146;
  color: #fff;
  text-align: center;
  padding: 55px 0;
  /* background-image: url("/banner3.jpg"); */
  background-size: cover;
  background-position: center;
}
.am-u-lg-12 {
  padding-top: 51px;
}
.index-banner-title {
  font-size: 200%;
  border: 2px solid #fff;
  padding: 20px;

  display: inline-block;
}

.index-banner-btn {
  background: #fff;
}

@media (max-width: 550px) {
  .index-banner {
    padding: 20px 0;
  }

  .index-banner-title {
    padding: 8px 12px;
  }
}
</style>
