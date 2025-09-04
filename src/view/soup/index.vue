<template>
  <div class="container">
    <!-- 顶部导航栏 -->
    <div class="top-wrap">
      <div class="row">
        <div class="col">
          <img class="logo" :src="logoImage" alt="Logo" />
        </div>
        <div class="col">
          <div class="float-right">
            <a
              class="btn btn-primary btn-filled btn-xs"
              href="./"
              target="_blank"
              >首页</a
            >
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="main-wrapper">
      <span id="sentence">{{ currentSentence }}</span>
    </div>

    <!-- 底部区域 -->
    <div class="foot-1">
      <button class="btn btn-primary btn-filled btn-xs" @click="randomSentence">
        再来一碗
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { soulData } from "./index";
import logoImage from "@/assets/image/logo_2.png";

// 当前显示的句子
const currentSentence = ref("");

// 随机获取句子
const randomSentence = () => {
  const randomIndex = Math.floor(Math.random() * soulData.length);
  currentSentence.value = soulData[randomIndex];
};
randomSentence();
</script>

<style scoped>
button {
  border-radius: 0;
}

button:focus {
  outline: 1px dotted;
  outline: 5px auto -webkit-focus-ring-color;
}

button {
  margin: 0;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
}

button {
  overflow: visible;
}

button {
  text-transform: none;
}

button {
  -webkit-appearance: button;
}

button::-moz-focus-inner {
  padding: 0;
  border-style: none;
}

.lead {
  font-weight: 300;
  font-size: 1.25rem;
}

.container {
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  width: 100%;
}

@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}

.row {
  display: -ms-flexbox;
  display: flex;
  margin-right: -15px;
  margin-left: -15px;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-top: 50px;
}

.col {
  /* position:relative; */
  padding-right: 15px;
  padding-left: 15px;
  /* width:100%; */
  /* min-height:1px; */
}

.col {
  max-width: 100%;
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

.btn {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  vertical-align: middle;
  text-align: center;
  white-space: nowrap;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@media screen and (prefers-reduced-motion: reduce) {
  .btn {
    transition: none;
  }
}

.btn:focus,
.btn:hover {
  text-decoration: none;
}

.btn:focus {
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.btn-primary:active,
.btn-primary:hover {
  outline: none !important;
  border: 2px solid #1aaf5d;
  background-color: #1aaf5d;
  color: #fff;
}

.btn-primary.btn-filled {
  background: #1aaf5d;
  color: #fff;
}

.btn:hover {
  border-color: #1aaf5d;
  background: none;
  background-color: #1aaf5d;
  color: #fff;
}

.btn-primary:active {
  background-image: none;
}

.btn-primary {
  display: inline-block;
  padding: 14px 28px 13px 28px;
  border: 2px solid #1aaf5d;
  border-radius: 25px;
  color: #1aaf5d;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  font-size: 11px;
  font-family: "Raleway", "Open Sans", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  line-height: 1;
}

.btn {
  min-width: 50px;
  background: none;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.btn-primary:focus {
  box-shadow: none !important;
}

.btn-xs {
  padding: 8px 24px;
  font-size: 12px;
}

.btn-primary:disabled {
  border-color: #888;
  background-color: #fff;
  color: #888;
}

#sentence {
  vertical-align: middle;
  font-size: 32px;
}

.main-wrapper {
  display: flex;
  height: 75vh;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
}
.foot-1 {
  text-align: center;
}

@media (max-width: 1000px) {
  .lead {
    font-size: 1rem;
  }
}

@media (max-width: 600px) {
  .lead {
    font-size: 0.9rem;
  }

  .btn-primary {
    padding: 8px 24px;
  }
}

.logo {
  width: 120px;
}
.float-right {
  float: right;
}
</style>
