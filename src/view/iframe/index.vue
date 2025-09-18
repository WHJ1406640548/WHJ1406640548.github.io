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

    <div v-if="loading" class="loading-content">
      <div   class="loading-overlay">
      <h1>内容加载中</h1>
      <p>请稍等片刻，我们正在为您准备精彩内容...</p>

      <div class="spinner"></div>

      <div class="loader">
        <div class="progress"></div>
      </div>

      <div class="dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>

      <p class="tips">"耐心等待是美德，美好事物值得等待"</p>
    </div>
    </div>
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
  console.log(`output->url.value`, url.value);
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
  /* background: #2575fc; */
 
  
}

.embedded-website {
  width: 100%;
  flex-grow: 1;
  height:100%;
  border: none;
}
.loading-content{
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    position: absolute;
    width: 100%;
    height: 100%;
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
  text-align: center;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  /* box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2); */
  /* position: relative; */
  overflow: hidden;
}

.loading-overlay::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transform: rotate(45deg);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% {
    left: -50%;
  }
  100% {
    left: 150%;
  }
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  /* text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); */
}

p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.loader {
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  overflow: hidden;
  margin: 30px 0;
  position: relative;
}

.progress {
  position: absolute;
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
  border-radius: 10px;
  animation: loading 3s infinite;
}

@keyframes loading {
  0% {
    width: 0%;
    left: 0%;
  }
  50% {
    width: 40%;
    left: 30%;
  }
  100% {
    width: 0%;
    left: 100%;
  }
}

.spinner {
  width: 80px;
  height: 80px;
  margin: 20px auto;
  position: relative;
}

.spinner::before,
.spinner::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  border: 5px solid transparent;
  border-top-color: #fff;
  animation: spin 1.5s linear infinite;
}

.spinner::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.spinner::after {
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border-top-color: #ff9a9e;
  animation-direction: reverse;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.dots {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.dot {
  width: 15px;
  height: 15px;
  margin: 0 8px;
  background: #fff;
  border-radius: 50%;
  animation: bounce 1.5s infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.tips {
  margin-top: 30px;
  font-style: italic;
  opacity: 0.8;
  font-size: 1rem;
}

.theme-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(30deg);
}

.dark-mode {
  background: linear-gradient(135deg, #232526 0%, #414345 100%);
}

@media (max-width: 768px) {
  .container {
    margin: 20px;
    padding: 20px;
  }

  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }
}
</style>
