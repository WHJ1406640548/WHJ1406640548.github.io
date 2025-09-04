<template>
    <div class="drum-kit-container">
      <!-- 架子鼓界面 -->
      <div class="container-drums" :class="{ 'screen-sm-hidden': sequencerVisible }">
        <svg class="drum-svg" viewBox="0 0 1000 790" preserveAspectRatio="xMidYMid meet">
          <!-- 这里放置SVG架子鼓图形 -->
          <g id="Drums">
            <!-- 各个鼓部件的SVG路径 -->
            <!-- 例如Crash、Hi-Hat、Snare等 -->
          </g>
          
          <!-- 键盘按键提示 -->
          <g id="All-Keys" v-show="showKeys">
            <!-- 各个按键的SVG元素 -->
          </g>
        </svg>
      </div>
  
      <!-- 编曲器界面 -->
      <div id="container-sequencer" :class="{ collapse: !sequencerVisible }">
        <div class="sequencer">
          <!-- 各个鼓部件的编曲行 -->
          <div v-for="(drum, index) in drums" :key="index" class="row" :data-target-drum="drum.id">
            <img :src="`./images/${drum.id}.png`" :alt="drum.name">
            <label v-for="(beat, beatIndex) in beats" :key="beatIndex">
              <input type="checkbox" v-model="drum.pattern[beatIndex]">
              <span></span>
            </label>
          </div>
          
          <!-- 编曲器控制 -->
          <div class="sequencer-controls">
            <button class="btn" @click="toggleSequencer" aria-label="Play">
              <i :class="['fa', sequencerOn ? 'fa-pause' : 'fa-play']"></i>
            </button>
            <div class="sequencer-controls-tempo">
              <button class="btn" @click="decreaseBpm" aria-label="Decrease bpm">
                <i class="fa fa-minus"></i>
              </button>
              <input id="bpm-indicator" type="number" min="100" max="300" size="3" v-model.number="bpm" readonly>
              <button class="btn" @click="increaseBpm" aria-label="Increase bpm">
                <i class="fa fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 底部控制按钮 -->
      <footer class="demo-footer">
        <div class="container-btns">
          <button class="btn btn-tooltip btn-sequencer" @click="toggleSequencerVisibility" aria-label="编曲器">
            <i class="fa fa-th"></i>
          </button>
          <button class="btn btn-tooltip btn-keys" @click="toggleKeys" aria-label="按键说明">
            <i class="fa fa-keyboard-o"></i>
          </button>
        </div>
      </footer>
    </div>
  </template>
  
  <script >
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
  import { gsap } from 'gsap';
  import { Howl } from 'howler';
  
  export default {
    setup() {
      // 鼓部件数据
      const drums = ref([
        { id: 'crash', name: 'Crash', pattern: Array(8).fill(false) },
        { id: 'hiHat', name: 'Hi Hat', pattern: Array(8).fill(false) },
        { id: 'snare', name: 'Snare', pattern: Array(8).fill(false) },
        { id: 'rightTom', name: 'Right Tom', pattern: Array(8).fill(false) },
        { id: 'leftTom', name: 'Left Tom', pattern: Array(8).fill(false) },
        { id: 'floorTom', name: 'Floor Tom', pattern: Array(8).fill(false) },
        { id: 'kick', name: 'Kick', pattern: Array(8).fill(false) }
      ]);
  
      // 音频文件
      const sounds = {
        crash: new Howl({ src: ['./sounds/Crash.mp3'] }),
        hiHat: new Howl({ src: ['./sounds/Hi-Hat-Closed.mp3'] }),
        snare: new Howl({ src: ['./sounds/Snare.mp3'] }),
        rightTom: new Howl({ src: ['./sounds/Small-Rack-Tom.mp3'] }),
        leftTom: new Howl({ src: ['./sounds/Big-Rack-Tom.mp3'] }),
        floorTom: new Howl({ src: ['./sounds/Floor-Tom.mp3'] }),
        kick: new Howl({ src: ['./sounds/Kick.mp3'] })
      };
  
      // 状态变量
      const sequencerVisible = ref(false);
      const sequencerOn = ref(false);
      const showKeys = ref(false);
      const bpm = ref(150);
      const currentBeat = ref(1);
      const intervalId = ref(null);
      const beats = Array(8).fill().map((_, i) => i + 1);
  
      // 计算节拍间隔
      const interval = computed(() => 60000 / bpm.value);
  
      // 鼓部件动画函数
      const playDrum = (drumId) => {
        const element = document.getElementById(drumId);
        if (!element) return;
  
        sounds[drumId].stop();
        sounds[drumId].play();
  
        // 根据不同鼓部件设置不同动画
        switch (drumId) {
          case 'crash':
            gsap.fromTo(element, 
              { rotation: 8, transformOrigin: "50% 50%" },
              { 
                rotation: 0, 
                duration: 1.5, 
                ease: "elastic.out(2.5, 0.3)",
                transformOrigin: "50% 50%" 
              }
            );
            break;
          case 'hiHat':
            gsap.fromTo(['#Hi-Hat-Top', '#Hi-Hat-Bottom'], 
              { rotation: -4, transformOrigin: "50% 50%" },
              { 
                rotation: 0, 
                duration: 0.6, 
                ease: "elastic.out(1.5, 0.2)",
                transformOrigin: "50% 50%" 
              }
            );
            break;
          // 其他鼓部件的动画...
          default:
            gsap.fromTo(element, 
              { scale: 1.05, transformOrigin: "50% 50%" },
              { 
                scale: 1, 
                duration: 0.6, 
                ease: "elastic.out(1, 0.3)",
                transformOrigin: "50% 50%" 
              }
            );
        }
      };
  
      // 键盘事件处理
      const handleKeyDown = (e) => {
        const keyMap = {
          'j': 'hiHat',
          'h': 'snare',
          'b': 'kick',
          'g': 'floorTom',
          'f': 'crash',
          't': 'leftTom',
          'y': 'rightTom'
        };
  
        const drumId = keyMap[e.key.toLowerCase()];
        if (drumId) {
          playDrum(drumId);
          animateKey(e.keyCode);
        }
      };
  
      // 按键动画
      const animateKey = (keyCode) => {
        const keyElement = document.getElementById(`Key-${keyCode}`);
        if (keyElement) {
          gsap.fromTo(keyElement, 
            { scale: 1.1, transformOrigin: "50% 50%" },
            { 
              scale: 1, 
              duration: 0.4, 
              ease: "elastic.out(1, 0.3)",
              transformOrigin: "50% 50%" 
            }
          );
        }
      };
  
      // 编曲器逻辑
      const sequencer = () => {
        // 清除所有激活状态
        document.querySelectorAll('.row label').forEach(label => {
          label.classList.remove('active');
        });
  
        // 处理当前节拍
        drums.value.forEach(drum => {
          if (drum.pattern[currentBeat.value - 1]) {
            playDrum(drum.id);
          }
        });
  
        // 更新节拍
        currentBeat.value = currentBeat.value % 8 + 1;
      };
  
      // 开始/停止编曲器
      const toggleSequencer = () => {
        sequencerOn.value = !sequencerOn.value;
        if (sequencerOn.value) {
          intervalId.value = setInterval(sequencer, interval.value);
        } else {
          clearInterval(intervalId.value);
        }
      };
  
      // 调整BPM
      const increaseBpm = () => {
        if (bpm.value < 300) {
          bpm.value += 10;
          if (sequencerOn.value) {
            setTempo();
          }
        }
      };
  
      const decreaseBpm = () => {
        if (bpm.value > 100) {
          bpm.value -= 10;
          if (sequencerOn.value) {
            setTempo();
          }
        }
      };
  
      const setTempo = () => {
        clearInterval(intervalId.value);
        intervalId.value = setInterval(sequencer, interval.value);
      };
  
      // 切换编曲器可见性
      const toggleSequencerVisibility = () => {
        sequencerVisible.value = !sequencerVisible.value;
      };
  
      // 切换键盘提示可见性
      const toggleKeys = () => {
        showKeys.value = !showKeys.value;
      };
  
      // 生命周期钩子
      onMounted(() => {
        window.addEventListener('keydown', handleKeyDown);
        
        // iOS音频预加载
        document.getElementById('sequencer-visible-btn')?.addEventListener('click', () => {
          Object.values(sounds).forEach(sound => {
            sound.play();
            sound.stop();
          });
        }, { once: true });
      });
  
      onBeforeUnmount(() => {
        window.removeEventListener('keydown', handleKeyDown);
        clearInterval(intervalId.value);
      });
  
      return {
        drums,
        beats,
        sequencerVisible,
        sequencerOn,
        showKeys,
        bpm,
        playDrum,
        toggleSequencer,
        increaseBpm,
        decreaseBpm,
        toggleSequencerVisibility,
        toggleKeys
      };
    }
  };
  </script>
  
  <style scoped>
.drum-kit-container {
  font-family: Arial, sans-serif;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
}

.container-drums {
  flex-grow: 1;
  transition: flex-grow 0.3s ease;
}

.drum-svg {
  width: 100%;
  height: auto;
}

.container-sequencer {
  flex-grow: 0;
  overflow: hidden;
  transition: flex-grow 0.3s ease;
}

.container-sequencer.collapse {
  flex-grow: 0;
  width: 0;
}

.sequencer {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 5px;
}

.row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.row img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

label {
  position: relative;
  margin: 0 5px;
  cursor: pointer;
}

label input {
  display: none;
}

label span {
  display: block;
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 3px;
  transition: all 0.2s ease;
}

label input:checked + span {
  background: #eb495d;
  border-color: #eb495d;
}

label.active span {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.sequencer-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.btn {
  background: #eb495d;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn:hover {
  background: #e61c35;
}

.demo-footer {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.container-btns {
  display: flex;
  gap: 10px;
}

.screen-sm-hidden {
  display: none;
}

@media (min-width: 768px) {
  .drum-kit-container {
    display: flex;
  }
  
  .screen-sm-hidden {
    display: block;
  }
}
</style>