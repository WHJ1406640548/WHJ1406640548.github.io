<template>
  <div class="container">
    <section
      id="book-cover"
      :class="state.currentPage === 'home' ? 'show' : ''"
    >
      <img class="border-image image-top" src="@/assets/image/bor.png" />
      <h1 class="title-chinese">答案之书</h1>
      <h2 class="title-english">THE BOOK OF ANSWERS</h2>
      <div id="btn-enter" @click="enterMethod">寻找答案</div>
      <img
        class="border-image image-bottom"
        src="@/assets/image/bor.png"
        alt=""
      />
    </section>

    <section
      id="book-intro"
      :class="state.currentPage === 'method' ? 'show' : ''"
    >
      <h3 class="title-intro">使用方法</h3>
      <ul class="intro-list">
        <li>把手机放在桌上，闭上眼睛。</li>
        <li>
          用 5 至 10 秒的时间集中思考你的问题。例如：“TA喜欢我吗？” 或
          “我需要换个工作吗？”。
        </li>
        <li>
          在想象或说出你问题的同时（每次只能有一个问题），一个手指放在下面按钮的上方。
        </li>
        <li>在你感觉时间正确的时候，按下按钮，你要寻找的答案就在那里。</li>
        <li>遇到任何问题，你都可以打开它。</li>
      </ul>
      <button id="btn-get" @click="getAnswer">获取答案</button>
    </section>

    <section
      id="book-result"
      :class="state.currentPage === 'result' ? 'show' : ''"
    >
      <h3 class="title-intro">你的答案是</h3>
      <p id="answer-str">{{ state.randomResult }}</p>
      <button id="btn-home" @click="enterMethod">返回</button>
      <a class="more-fun" href="./">更多好玩</a>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { answerData } from "./index";
const state = reactive({
  currentPage: "home",
  randomResult: "",
});
const enterMethod = () => {
  state.currentPage = "method";
  console.log("操作方法");
};
const getAnswer = () => {
  state.currentPage = "result";
  console.log("结果");
  // 随机获取一个值
  state.randomResult =
    answerData.data[Math.floor(Math.random() * answerData.data.length)];
};
</script>

<style scoped>
@import url("./index.css");
</style>
