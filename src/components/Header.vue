<template>
  <header class="am-topbar am-topbar-fixed-top">
    <div class="am-container">
      <p class="am-topbar-brand">
        <a title="摸鱼哇 - 好玩又好用的在线工具大全">
          <img src="/favicon.png" class="nav-favicon" />
          摸鱼哇!
        </a>
      </p>
      <button
        class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-secondary am-show-sm-only"
        data-am-collapse="{target: '#collapse-head'}"
      >
        <span class="am-sr-only">导航切换</span>
        <span class="am-icon-bars"></span>
      </button>
      <!-- <div class="am-collapse am-topbar-collapse" id="collapse-head">
        <div class="am-nav am-nav-pills am-topbar-nav am-topbar-right">
          <li>
            <a
              href=""
              target="_blank"
            >
              <i class="am-icon-weixin"></i> 小程序
            </a>
          </li>
          <li>
            <a href="" target="_blank">
              <i class="am-icon-comments"></i> 反馈
            </a>
          </li>
        </div>
      </div> -->
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
 /* 导航栏图标 */
 .am-topbar-brand {
    font-family: toolwa, Helvetica Neue, Helvetica, PingFang SC,
      \5FAE\8F6F\96C5\9ED1, Tahoma, Arial, sans-serif;
    font-weight: 600;
  }
  .nav-favicon {
    width: 48px;
  }
  
</style>
