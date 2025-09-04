<template>
  <div class="embedded-website-container">
    <!-- <div class="controls">
      <button @click="reloadIframe">刷新</button>
      <button @click="openInNewTab">在新标签页打开</button>
      <input v-model="url" @keyup.enter="updateIframeUrl" />
    </div> -->

    <iframe
      ref="iframeRef"
      :src="url"
      frameborder="0"
      allowfullscreen
      class="embedded-website"
      @load="iframeLoaded"
    ></iframe>

    <div v-if="loading" class="loading-overlay">加载中...</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const url = ref("");
const iframeRef = ref(null);
const loading = ref(true);

const reloadIframe = () => {
  iframeRef.value.contentWindow.location.reload();
};

const openInNewTab = () => {
  window.open(url.value, "_blank");
};

const updateIframeUrl = () => {
  loading.value = true;
  // 确保URL以http/https开头
  if (!url.value.startsWith("http")) {
    url.value = "https://" + url.value;
  }
};

const iframeLoaded = () => {
  loading.value = false;
  console.log("iframe加载完成");
};
const init = () => {
  url.value = localStorage.getItem("iframeUrl");
  console.log(`output->url.value`,url.value)
};
init();
</script>

<style scoped>
.embedded-website-container {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.controls {
  padding: 10px;
  background: #f5f5f5;
  display: flex;
  gap: 10px;
}

.controls input {
  flex-grow: 1;
  padding: 5px 10px;
}

.embedded-website {
  width: 100%;
  flex-grow: 1;
  border: none;
}

.loading-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
