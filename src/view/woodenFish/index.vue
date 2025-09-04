<template>
  <div class="container">
    <h1>电子木鱼</h1>
    <div class="counter">
      今日功德: <span class="count">{{ count }}</span>
    </div>

    <!-- 木鱼图片 -->
    <div
      class="wooden-fish"
      @click="knockFish"
      :style="{ transform: isKnocking ? 'scale(0.85)' : 'scale(1)' }"
    >
      <img src="/favicon/wooden-fish.png" alt="木鱼" class="fish-image" />
    </div>

    <div class="controls">
      <button class="btn" @click="resetCount">重置</button>
      <button class="btn auto-btn" @click="toggleAutoKnock">
        {{ isAutoKnocking ? "停止自动" : "自动敲击" }}
      </button>
    </div>

    <!-- 音频元素 -->
    <audio ref="sound" :src="muYuMp3" preload="auto"></audio>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import muYuMp3 from "@/assets/audio/muyu.mp3";
const count = ref(0);
const isKnocking = ref(false);
const isAutoKnocking = ref(false);
const sound: any = ref(null);
let autoKnockInterval: any = null;
let midnightTimeout: any = null;
const todayDate = ref("");
// 敲击木鱼
const knockFish = () => {
  // 播放音效
  sound.value.currentTime = 0;
  sound.value.play();

  // 添加动画效果
  isKnocking.value = true;
  setTimeout(() => {
    isKnocking.value = false;
  }, 100);

  // 增加计数
  count.value++;
  saveCount();
};

// 重置计数器
const resetCount = () => {
  count.value = 0;
};

// 切换自动敲击
const toggleAutoKnock = () => {
  isAutoKnocking.value = !isAutoKnocking.value;

  if (isAutoKnocking.value) {
    autoKnockInterval = setInterval(knockFish, 800); // 每800毫秒敲击一次
  } else {
    clearInterval(autoKnockInterval);
  }
};

// 键盘事件监听
const handleKeyDown = (e) => {
  if (e.code === "Space") {
    knockFish();
    e.preventDefault(); // 防止空格键滚动页面
  }
};
// 保存计数到本地存储
const saveCount = () => {
  localStorage.setItem(
    "dailyClickCounter",
    JSON.stringify({
      date: todayDate.value,
      count: count.value,
    })
  );
};
// 设置午夜重置检查
const checkForDateChange = () => {
  const now: any = new Date();

  // 计算到午夜的时间（毫秒）
  const midnight: any = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1, // 明天
    0,
    0,
    0
  );
  const timeUntilMidnight = midnight - now;

  // 清除之前的定时器
  if (midnightTimeout) {
    clearTimeout(midnightTimeout);
  }

  // 设置定时器在午夜重置
  midnightTimeout = setTimeout(() => {
    count.value = 0;
    todayDate.value = getTodayDateString();
    saveCount();

    // 设置下一次检查
    checkForDateChange();
  }, timeUntilMidnight);
};
// 获取今天的日期字符串（格式: YYYY-MM-DD）
const getTodayDateString = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};
// 初始化计数器
const initCounter = () => {
  todayDate.value = getTodayDateString();
  const savedData = localStorage.getItem("dailyClickCounter");

  if (savedData) {
    const data = JSON.parse(savedData);
    if (data.date === todayDate.value) {
      // 如果是同一天，恢复计数
      count.value = data.count;
      return;
    }
  }

  // 新的一天或首次使用，重置为0
  count.value = 0;
  // saveCount();
};

// 组件挂载时添加事件监听
onMounted(() => {
  initCounter();
  checkForDateChange();
  document.addEventListener("keydown", handleKeyDown);
});

// 组件卸载前清除事件监听和定时器
onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeyDown);
  clearInterval(autoKnockInterval);
});
</script>

<style scoped>
.container {
  font-family: "Microsoft YaHei", sans-serif;
  background-color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  padding: 20px;
  text-align: center;
}

h1 {
  text-shadow: 0 0 10px red;
  margin: 42px 0px;
  font-family: Georgia, "Times New Roman", Times, Kai, "Kaiti SC", KaiTi,
    BiauKai, FontAwesome, serif;
  font-size: 44px;
  color: #fff;
}

.counter {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px 20px;
  border-radius: 10px;
}
.count {
  font-size: 18px;
  font-family: consolas;
  font-weight: bold;
}

.wooden-fish {
  width: 200px;
  height: 200px;
  position: relative;
  margin: 0 auto 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.15s linear;
}

.fish-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.1s;
  cursor: url(cursor.cur), pointer;
  -webkit-tap-highlight-color: transparent;
}

.wooden-fish:active .fish-image {
  transform: scale(0.95);
}

.controls {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.btn {
  background-color: #8b4513;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn:hover {
  background-color: #a0522d;
  transform: translateY(-2px);
}

.auto-btn {
  background-color: #4caf50;
}

.auto-btn:hover {
  background-color: #45a049;
}

@media (max-width: 600px) {
  .wooden-fish {
    width: 150px;
    height: 150px;
  }

  .btn {
    padding: 10px 20px;
  }
}
</style>
