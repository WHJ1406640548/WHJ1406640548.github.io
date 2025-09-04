<template>
    <div class="bucket-drums-container">
      <svg id="bucketdrums" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 664.1 289.4">
        <title>锅碗瓢盆打击乐器</title>
        <polygon points="664.2 289.6 -0.2 289.6 84.8 196.5 592.1 196.5 664.2 289.6" fill="#7c7c7c" opacity="0.15"></polygon>
        
        <!-- 罐子2 -->
        <g id="can-2" @click="playSound('can2')">
          <polygon id="can-2-body" points="389.1 193.7 259.5 193.7 265.8 53.6 382.5 53.6 389.1 193.7" fill="#70c1b3" stroke="#000" stroke-miterlimit="10"></polygon>
          <rect id="can-2-rim" x="265.8" y="53.6" width="116.8" height="3.82" fill="#d4d5d6" stroke="#000" stroke-miterlimit="10"></rect>
          <rect id="can-2-handle" x="257.2" y="149" width="24.7" height="2.49" rx="1.2" ry="1.2" transform="translate(-37.7 121.2) rotate(-23.7)" fill="#d4d5d6" stroke="#000" stroke-miterlimit="10"></rect>
          <rect id="can-2-handle-joint" x="279" y="140.7" width="6.6" height="8.58" fill="#d4d5d6" stroke="#000" stroke-miterlimit="10"></rect>
        </g>
        
        <!-- 桶2 -->
        <g id="bucket-2" @click="playSound('bucket2')">
          <polygon id="bucket-2-body" points="405 211.5 340.6 211.5 342.2 133.9 403.5 133.9 405 211.5" fill="#247ba0" stroke="#000" stroke-miterlimit="10"></polygon>
          <rect id="bucket-2-rim" x="339.4" y="197.6" width="66.7" height="20.49" fill="#247ba0" stroke="#000" stroke-miterlimit="10"></rect>
          <rect id="bucket-2-detail" x="340.6" y="211.1" width="65.5" height="2.41" fill="#d4d5d6" stroke="#000" stroke-miterlimit="10"></rect>
        </g>
        
        <!-- 罐子3 -->
        <g id="can-3" @click="playSound('can3')">
          <polygon id="can-3-body" points="556.1 231.7 445.8 231.7 454.7 111.6 549 111.6 556.1 231.7" fill="#70c1b3" stroke="#000" stroke-miterlimit="10"></polygon>
          <rect id="can-3-rim" x="454.7" y="111.6" width="94.6" height="4.15" fill="#d4d5d6" stroke="#000" stroke-miterlimit="10"></rect>
        </g>
        
        <!-- 罐子1 -->
        <g id="can-1" @click="playSound('can1')">
          <polygon id="can-1-body" points="237.3 231.7 127 231.7 135.9 111.6 230.2 111.6 237.3 231.7" fill="#70c1b3" stroke="#000" stroke-miterlimit="10"></polygon>
          <rect id="can-1-rim" x="135.9" y="111.6" width="94.6" height="4.04" fill="#ccc" stroke="#000" stroke-miterlimit="10"></rect>
          <g id="can-1-handle">
            <path d="M197.5,216.9v4.8a5.3,5.3,0,0,1-5.3,5.2H174.1a4.8,4.8,0,0,1-4.6-4.9v-5.1h-3V224a4.9,4.9,0,0,0,4.7,4.9h23.9a5.4,5.4,0,0,0,5.4-5.2v-6.8h-3Z" fill="#d4d5d6" stroke="#000" stroke-miterlimit="10"></path>
            <rect x="164" y="213.7" width="8.6" height="5.14" fill="#d4d5d6" stroke="#000" stroke-miterlimit="10"></rect>
            <rect x="194.2" y="213.7" width="8.6" height="5.14" fill="#d4d5d6" stroke="#000" stroke-miterlimit="10"></rect>
          </g>
        </g>
        
        <!-- 桶3 -->
        <g id="bucket-3" @click="playSound('bucket3')">
          <polygon id="bucket-3-body" points="455.8 239.5 391.4 239.5 393.1 161.9 454.2 161.9 455.8 239.5" fill="#247ba0" stroke="#000" stroke-miterlimit="10"></polygon>
          <rect id="bucket-3-rim" x="390.2" y="225.6" width="66.7" height="20.49" fill="#247ba0" stroke="#000" stroke-miterlimit="10"></rect>
          <rect id="bucket-3-detail" x="391.4" y="235.9" width="65.5" height="1.8" fill="#d4d5d6" stroke="#000" stroke-miterlimit="10"></rect>
          <rect id="bucket-3-handle" x="431.5" y="234.1" width="33.1" height="3.33" transform="matrix(0.87, 0.5, -0.5, 0.87, 177.92, -192.42)" fill="#d4d5d6" stroke="#000" stroke-miterlimit="10"></rect>
        </g>
        
        <!-- 桶1 -->
        <g id="bucket-1" @click="playSound('bucket1')">
          <polygon id="bucket-1-body" points="269.6 236.4 205.2 236.4 206.7 158.8 267.8 158.8 269.6 236.4" fill="#247ba0" stroke="#000" stroke-miterlimit="10"></polygon>
          <rect id="bucket-1-rim" x="204" y="222.6" width="66.7" height="20.49" fill="#247ba0" stroke="#000" stroke-miterlimit="10"></rect>
          <rect id="bucket-1-detail" x="204.5" y="233.8" width="65.6" height="1.94" fill="#d4d5d6" stroke="#000" stroke-miterlimit="10"></rect>
          <rect id="bucket-1-handle" x="198.3" y="232.7" width="35.8" height="3.66" transform="translate(-76.1 106.8) rotate(-23.7)" fill="#d4d5d6" stroke="#000" stroke-miterlimit="10"></rect>
        </g>
        
        <!-- 锅1 -->
        <g id="pot-1" @click="playSound('pot1')">
          <path id="pot-1-body" d="M275.1,191.7h54.6a13.1,13.1,0,0,1,13.1,13.1v39.8a0,0,0,0,1,0,0H263a0,0,0,0,1,0,0V203.8A12.1,12.1,0,0,1,275.1,191.7Z" fill="#f25f5c" stroke="#000" stroke-miterlimit="10"></path>
          <rect id="pot-1-rim" x="263" y="238.2" width="81.1" height="6.34" fill="#d4d5d6" stroke="#000" stroke-miterlimit="10"></rect>
          <rect id="pot-1-handle-R" x="337.7" y="224.5" width="13" height="7.18" rx="3.6" ry="3.6" fill="#50514f" stroke="#000" stroke-miterlimit="10"></rect>
        </g>
        
        <!-- 锅2 -->
        <g id="pot-2" @click="playSound('pot2')">
          <path id="pot-2-body" d="M503.6,205.6h73.3A13.1,13.1,0,0,1,590,218.7v52.2a0,0,0,0,1,0,0H491.5a0,0,0,0,1,0,0V217.7A12.1,12.1,0,0,1,503.6,205.6Z" fill="#f25f5c" stroke="#000" stroke-miterlimit="10"></path>
          <rect id="pot-2-handle-R" x="580.5" y="249.9" width="18.9" height="7.18" rx="3.6" ry="3.6" fill="#50514f" stroke="#000" stroke-miterlimit="10"></rect>
          <rect id="pot-2-handle-L" x="482" y="248.4" width="18.9" height="7.18" rx="3.6" ry="3.6" fill="#50514f" stroke="#000" stroke-miterlimit="10"></rect>
          <rect id="pot-2-rim" x="489" y="268.4" width="103.3" height="4.5" fill="#d4d5d6" stroke="#000" stroke-miterlimit="10"></rect>
        </g>
        
        <!-- 盖子1 -->
        <g id="lid-1" @click="playSound('lid1')">
          <ellipse id="lid-1-handle" cx="134.3" cy="240.7" rx="19.5" ry="6" fill="#50514f" stroke="#000" stroke-miterlimit="10"></ellipse>
          <path id="lid-1-body" d="M200.8,250.3H67.8c0-7.5,6.1-13.6,12.7-10H186.4c8.3-3.6,14.4,2.5,14.4,10h0Z" fill="#f25f5c" stroke="#000" stroke-miterlimit="10"></path>
          <rect id="lid-1-rim" x="67.8" y="246.3" width="133" height="2.82" fill="#d4d5d6" stroke="#000" stroke-miterlimit="10"></rect>
        </g>
        
        <!-- 杯子2 -->
        <g id="cup-2" @click="playSound('cup2')">
          <rect id="cup-2-body" x="370.9" y="216.1" width="34.9" height="47.53" fill="#ffe066" stroke="#000" stroke-miterlimit="10"></rect>
          <rect id="cup-2-rim" x="370.9" y="259.7" width="35.5" height="3.86" fill="#d4d5d6" stroke="#000" stroke-miterlimit="10"></rect>
          <path id="cup-2-handle" d="M380.5,224.1c-4,0-8,6.2-8,13.8s4,13.8,8,13.8V224.1Z" fill="#50514f" stroke="#000" stroke-miterlimit="10"></path>
        </g>
        
        <!-- 杯子1 -->
        <g id="cup-1" @click="playSound('cup1')">
          <rect id="cup-1-body" x="249.2" y="221.1" width="27.5" height="39.76" fill="#ffe066" stroke="#000" stroke-miterlimit="10"></rect>
          <rect id="cup-1-rim" x="249.2" y="258" width="27.5" height="2.82" fill="#d4d5d6" stroke="#000" stroke-miterlimit="10"></rect>
          <path id="cup-1-handle" d="M273.9,251.7c2.7,0,5.1-5,5.1-11.1s-2.5-11-5.2-11v22.1Z" fill="#50514f" stroke="#000" stroke-miterlimit="10"></path>
        </g>
        
        <!-- 键盘按键 -->
        <g id="keyboard" class="" opacity="0.5">
          <g id="Key-89">
            <rect x="67.8" y="252.7" width="12.6" height="12.56" fill="none" stroke="#50514f" stroke-miterlimit="10"></rect>
            <text transform="translate(70.8 262.7) scale(1.1 1)" font-size="9.63" fill="#50514f" font-family="Adelle Sans" font-weight="700">Y</text>
          </g>
          <g id="Key-72">
            <rect x="397.3" y="266.3" width="9.1" height="9.15" fill="none" stroke="#50514f" stroke-miterlimit="10"></rect>
            <text transform="translate(399.3 273.6)" font-size="7.02" fill="#50514f" font-family="Adelle Sans" font-weight="700">H</text>
          </g>
          <g id="Key-71">
            <rect x="248.8" y="263.6" width="10.6" height="10.59" fill="none" stroke="#50514f" stroke-miterlimit="10"></rect>
            <text transform="translate(251.3 272)" font-size="8.12" fill="#50514f" font-family="Adelle Sans" font-weight="700">G</text>
          </g>
          <g id="Key-78">
            <rect x="581.2" y="275.5" width="11.1" height="11.08" fill="none" stroke="#50514f" stroke-miterlimit="10"></rect>
            <text transform="translate(582.6 284.7)" font-size="10.69" fill="#50514f" font-family="Adelle Sans" font-weight="700">N</text>
          </g>
          <g id="Key-66">
            <rect x="325.8" y="247.3" width="17.3" height="17.31" fill="none" stroke="#50514f" stroke-miterlimit="10"></rect>
            <text transform="translate(328.7 261.7)" font-size="16.7" fill="#50514f" font-family="Adelle Sans" font-weight="700">B</text>
          </g>
          <g id="Key-76">
            <rect x="429" y="140.2" width="18.1" height="18.06" fill="none" stroke="#50514f" stroke-miterlimit="10" stroke-width="2"></rect>
            <text transform="translate(433.2 155.3)" font-size="17.42" fill="#50514f" font-family="Adelle Sans" font-weight="700">L</text>
          </g>
          <g id="Key-75">
            <rect x="389.5" y="116.7" width="14" height="14.05" fill="none" stroke="#50514f" stroke-miterlimit="10" stroke-width="2"></rect>
            <text transform="translate(391.8 128.4)" font-size="13.55" fill="#50514f" font-family="Adelle Sans" font-weight="700">K</text>
          </g>
          <g id="Key-74">
            <rect x="237.8" y="139.4" width="16.3" height="16.28" fill="none" stroke="#50514f" stroke-miterlimit="10" stroke-width="2"></rect>
            <text transform="translate(241.7 153.5)" font-size="15.71" fill="#50514f" font-family="Adelle Sans" font-weight="700">J</text>
          </g>
          <g id="Key-70">
            <rect x="513.8" y="72.9" width="34.6" height="34.59" fill="none" stroke="#50514f" stroke-miterlimit="10" stroke-width="3"></rect>
            <text transform="translate(520.4 103.2)" font-size="36" fill="#50514f" font-family="Adelle Sans" font-weight="700">F</text>
          </g>
          <g id="Key-68">
            <rect x="266.8" y="14.9" width="34.6" height="34.59" fill="none" stroke="#50514f" stroke-miterlimit="10" stroke-width="3"></rect>
            <text transform="translate(271.4 45.2)" font-size="36" fill="#50514f" font-family="Adelle Sans" font-weight="700">D</text>
          </g>
          <g id="Key-83">
            <rect x="136.9" y="77.3" width="30.1" height="30.1" fill="none" stroke="#50514f" stroke-miterlimit="10" stroke-width="3"></rect>
            <text transform="translate(142.7 103.7)" font-size="31.33" fill="#50514f" font-family="Adelle Sans" font-weight="700">S</text>
          </g>
        </g>
      </svg>
  
      <!-- 所有音频元素 -->
      <audio ref="can1Audio" preload="auto">
    <source :src="audioSources.can1" type="audio/mp3">
  </audio>
  <audio ref="can2Audio" preload="auto">
    <source :src="audioSources.can2" type="audio/mp3">
  </audio>
  <audio ref="can3Audio" preload="auto">
    <source :src="audioSources.can3" type="audio/mp3">
  </audio>
  <audio ref="bucket1Audio" preload="auto">
    <source :src="audioSources.bucket1" type="audio/mp3">
  </audio>
  <audio ref="bucket2Audio" preload="auto">
    <source :src="audioSources.bucket2" type="audio/mp3">
  </audio>
  <audio ref="bucket3Audio" preload="auto">
    <source :src="audioSources.bucket3" type="audio/mp3">
  </audio>
  <audio ref="pot1Audio" preload="auto">
    <source :src="audioSources.pot1" type="audio/mp3">
  </audio>
  <audio ref="pot2Audio" preload="auto">
    <source :src="audioSources.pot2" type="audio/mp3">
  </audio>
  <audio ref="cup1Audio" preload="auto">
    <source :src="audioSources.cup1" type="audio/mp3">
  </audio>
  <audio ref="cup2Audio" preload="auto">
    <source :src="audioSources.cup2" type="audio/mp3">
  </audio>
  <audio ref="lid1Audio" preload="auto">
    <source :src="audioSources.lid1" type="audio/mp3">
  </audio>
    </div>
  </template>
  
  <script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
// 导入所有音频文件
import can1 from "@/assets/audio/bucket-drums/can1.mp3";
import can2 from "@/assets/audio/bucket-drums/can2.mp3";
import can3 from "@/assets/audio/bucket-drums/can3.mp3";
import bucket1 from "@/assets/audio/bucket-drums/bucket1.mp3";
import bucket2 from "@/assets/audio/bucket-drums/bucket2.mp3";
import bucket3 from "@/assets/audio/bucket-drums/bucket3.mp3";
import pot1 from "@/assets/audio/bucket-drums/pot1.mp3";
import pot2 from "@/assets/audio/bucket-drums/pot2.mp3";
import cup1 from "@/assets/audio/bucket-drums/cup2.mp3"; // 注意文件名对应关系
import cup2 from "@/assets/audio/bucket-drums/cup1.mp3"; // 注意文件名对应关系
import lid1 from "@/assets/audio/bucket-drums/lid1.mp3";
// 在模板中使用
const audioSources = {
  can1,
  can2,
  can3,
  bucket1,
  bucket2,
  bucket3,
  pot1,
  pot2,
  cup1,
  cup2,
  lid1
};
// 音频引用
const can1Audio = ref(null);
const can2Audio = ref(null);
const can3Audio = ref(null);
const bucket1Audio = ref(null);
const bucket2Audio = ref(null);
const bucket3Audio = ref(null);
const pot1Audio = ref(null);
const pot2Audio = ref(null);
const cup1Audio = ref(null);
const cup2Audio = ref(null);
const lid1Audio = ref(null);

// 动画时间线
const animations = {
  can1: null,
  can2: null,
  can3: null,
  bucket1: null,
  bucket2: null,
  bucket3: null,
  pot1: null,
  pot2: null,
  cup1: null,
  cup2: null,
  lid1: null
};

// 键盘映射
const keyMap = {
  'Y': 'lid1',
  'H': 'cup2',
  'G': 'cup1',
  'N': 'pot2',
  'B': 'pot1',
  'L': 'bucket3',
  'K': 'bucket2',
  'J': 'bucket1',
  'F': 'can3',
  'D': 'can2',
  'S': 'can1'
};

// 初始化动画
const initAnimations = () => {
  // 罐子1动画 - 弹跳效果
  animations.can1 = gsap.timeline({ paused: true })
    .to('#can-1', { 
      duration: 0.1, 
      scaleX: 1.06, 
      transformOrigin: "50% 50%", 
      ease: "expo.out" 
    })
    .to('#can-1', { 
      duration: 0.1, 
      scaleY: 0.95, 
      transformOrigin: "50% 50%", 
      ease: "expo.out" 
    }, 0)
    .to('#can-1', { 
      duration: 0.2, 
      scale: 1, 
      transformOrigin: "50% 50%", 
      ease: "elastic.out" 
    });

  // 罐子2动画 - 弹跳效果
  animations.can2 = gsap.timeline({ paused: true })
    .to('#can-2', { 
      duration: 0.1, 
      scaleX: 1.06, 
      transformOrigin: "50% 50%", 
      ease: "expo.out" 
    })
    .to('#can-2', { 
      duration: 0.1, 
      scaleY: 0.95, 
      transformOrigin: "50% 50%", 
      ease: "expo.out" 
    }, 0)
    .to('#can-2', { 
      duration: 0.2, 
      scale: 1, 
      transformOrigin: "50% 50%", 
      ease: "elastic.out" 
    });

  // 罐子3动画 - 弹跳效果
  animations.can3 = gsap.timeline({ paused: true })
    .to('#can-3', { 
      duration: 0.1, 
      scaleX: 1.06, 
      transformOrigin: "50% 50%", 
      ease: "expo.out" 
    })
    .to('#can-3', { 
      duration: 0.1, 
      scaleY: 0.95, 
      transformOrigin: "50% 50%", 
      ease: "expo.out" 
    }, 0)
    .to('#can-3', { 
      duration: 0.2, 
      scale: 1, 
      transformOrigin: "50% 50%", 
      ease: "elastic.out" 
    });

  // 桶1动画 - 摇晃效果
  animations.bucket1 = gsap.timeline({ paused: true })
    .to('#bucket-1', { 
      duration: 0.1, 
      rotation: 6, 
      transformOrigin: "50% 50%" 
    })
    .to('#bucket-1', { 
      duration: 0.4, 
      rotation: 0, 
      transformOrigin: "50% 50%", 
      ease: "elastic.out(2.5, 0.3)" 
    });

  // 桶2动画 - 摇晃效果
  animations.bucket2 = gsap.timeline({ paused: true })
    .to('#bucket-2', { 
      duration: 0.1, 
      rotation: 6, 
      transformOrigin: "50% 50%" 
    })
    .to('#bucket-2', { 
      duration: 1, 
      rotation: 0, 
      transformOrigin: "50% 50%", 
      ease: "elastic.out(2.5, 0.3)" 
    });

  // 桶3动画 - 摇晃效果
  animations.bucket3 = gsap.timeline({ paused: true })
    .to('#bucket-3', { 
      duration: 0.1, 
      rotation: 6, 
      transformOrigin: "50% 50%" 
    })
    .to('#bucket-3', { 
      duration: 0.4, 
      rotation: 0, 
      transformOrigin: "50% 50%", 
      ease: "elastic.out(2.5, 0.3)" 
    });

  // 锅1动画 - 弹跳效果
  animations.pot1 = gsap.timeline({ paused: true })
    .to('#pot-1', { 
      duration: 0.1, 
      scaleX: 1.06, 
      transformOrigin: "50% 50%", 
      ease: "expo.out" 
    })
    .to('#pot-1', { 
      duration: 0.1, 
      scaleY: 0.9, 
      transformOrigin: "50% 50%", 
      ease: "expo.out" 
    }, 0)
    .to('#pot-1', { 
      duration: 0.25, 
      scale: 1, 
      transformOrigin: "50% 50%", 
      ease: "elastic.out(2.5, 0.3)" 
    });

  // 锅2动画 - 摇晃效果
  animations.pot2 = gsap.timeline({ paused: true })
    .to('#pot-2', { 
      duration: 0.1, 
      rotation: 6, 
      transformOrigin: "50% 50%" 
    })
    .to('#pot-2', { 
      duration: 1, 
      rotation: 0, 
      transformOrigin: "50% 50%", 
      ease: "elastic.out(2.5, 0.3)" 
    });

  // 杯子1动画 - 摇晃效果
  animations.cup1 = gsap.timeline({ paused: true })
    .to('#cup-1', { 
      duration: 0.1, 
      rotation: 6, 
      transformOrigin: "50% 50%" 
    })
    .to('#cup-1', { 
      duration: 1, 
      rotation: 0, 
      transformOrigin: "50% 50%", 
      ease: "elastic.out(2.5, 0.3)" 
    });

  // 杯子2动画 - 摇晃效果
  animations.cup2 = gsap.timeline({ paused: true })
    .to('#cup-2', { 
      duration: 0.1, 
      rotation: 6, 
      transformOrigin: "50% 50%" 
    })
    .to('#cup-2', { 
      duration: 1, 
      rotation: 0, 
      transformOrigin: "50% 50%", 
      ease: "elastic.out(2.5, 0.3)" 
    });

  // 盖子1动画 - 轻微摇晃效果
  animations.lid1 = gsap.timeline({ paused: true })
    .to('#lid-1', { 
      duration: 0.1, 
      rotation: 3, 
      transformOrigin: "50% 50%" 
    })
    .to('#lid-1', { 
      duration: 0.3, 
      rotation: 0, 
      transformOrigin: "50% 50%", 
      ease: "elastic.out(2.5, 0.3)" 
    });
};

// 播放声音和动画
const playSound = (soundId) => {
  // 播放动画
  if (animations[soundId]) {
    animations[soundId].restart();
    animations[soundId].play();
  }

  // 播放声音
  let audioElement;
  switch(soundId) {
    case 'can1': audioElement = can1Audio.value; break;
    case 'can2': audioElement = can2Audio.value; break;
    case 'can3': audioElement = can3Audio.value; break;
    case 'bucket1': audioElement = bucket1Audio.value; break;
    case 'bucket2': audioElement = bucket2Audio.value; break;
    case 'bucket3': audioElement = bucket3Audio.value; break;
    case 'pot1': audioElement = pot1Audio.value; break;
    case 'pot2': audioElement = pot2Audio.value; break;
    case 'cup1': audioElement = cup1Audio.value; break;
    case 'cup2': audioElement = cup2Audio.value; break;
    case 'lid1': audioElement = lid1Audio.value; break;
    default: return;
  }
  
  if(audioElement) {
    audioElement.currentTime = 0;
    audioElement.play().catch(e => console.log("播放失败:", e));
  }
};

// 键盘按键动画
const animateKey = (keyCode) => {
  const keyElement = document.getElementById(`Key-${keyCode}`);
  if (keyElement) {
    gsap.timeline()
      .to(keyElement, { 
        duration: 0.1, 
        scale: 1.1, 
        transformOrigin: "50% 50%", 
        ease: "expo.out" 
      })
      .to(keyElement, { 
        duration: 0.4, 
        scale: 1, 
        transformOrigin: "50% 50%", 
        ease: "elastic.out" 
      });
  }
};

// 键盘事件处理
const handleKeyDown = (event) => {
  const key = event.key.toUpperCase();
  if(keyMap[key]) {
    // 播放对应的声音和动画
    playSound(keyMap[key]);
    
    // 按键动画
    animateKey(event.keyCode);
  }
};

// 组件挂载时初始化
onMounted(() => {
  // 初始化动画
  initAnimations();
  
  // 添加键盘事件监听
  window.addEventListener('keydown', handleKeyDown);
  
  // 显示键盘提示
  const keyboardKeys = document.getElementById('keyboard');
  if (keyboardKeys) {
    keyboardKeys.classList.remove("hidden");
  }
});

// 组件卸载时清理
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
.bucket-drums-container {
  background: #ffe066;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  touch-action: manipulation;
}

#bucketdrums {
  height: 100vh;
  width: 100vw;
  display: block;
}

/* 所有可点击的乐器元素 */
g[id^="can-"], 
g[id^="bucket-"], 
g[id^="pot-"], 
g[id^="cup-"],
g[id^="lid-"] {
  cursor: pointer;
}

/* 键盘按键样式 */
#keyboard text {
  pointer-events: none;
  user-select: none;
}

.hidden {
  display: none;
}
</style>