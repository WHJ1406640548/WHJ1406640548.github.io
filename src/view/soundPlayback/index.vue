<template>
  <div class="container">
    <Header></Header>
    <div class="mainContent">
      <!-- 音频录制部分 -->
      <div class="section">
        <h2 class="section-title">音频录制</h2>
        <p>通过麦克风直接录制音频</p>
        <button
          @click="startRecording"
          :disabled="isRecording"
          :class="{ recording: isRecording }"
        >
          {{ isRecording ? "录音中..." : "开始录音" }}
        </button>
        <button @click="stopRecording" :disabled="!isRecording">
          结束录音
        </button>
        <div
          v-if="recordingStatus"
          class="status"
          :class="recordingStatusClass"
        >
          {{ recordingStatus }}
        </div>
        <audio v-if="recordedAudioUrl" :src="recordedAudioUrl" controls></audio>
      </div>

      <!-- 音频上传部分 -->
      <div class="section">
        <h2 class="section-title">音频上传</h2>
        <p>上传本地音频文件 (MP3, WAV等)</p>
        <input
          type="file"
          @change="handleFileUpload"
          accept="audio/*"
          ref="fileInput"
        />
        <div v-if="uploadedFileInfo" class="file-info">
          {{ uploadedFileInfo }}
        </div>
        <audio v-if="uploadedAudioUrl" :src="uploadedAudioUrl" controls></audio>
      </div>

      <!-- 音频倒放部分 -->
      <div class="section">
        <h2 class="section-title">音频倒放</h2>
        <p>将录制的或上传的音频倒放</p>
        <button @click="reverseAudio" :disabled="!canReverseAudio">
          倒放音频
        </button>
        <div
          v-if="processingStatus"
          class="status"
          :class="processingStatusClass"
        >
          {{ processingStatus }}
        </div>
        <audio v-if="reversedAudioUrl" :src="reversedAudioUrl" controls></audio>
      </div>

      <!-- 下载部分 -->
      <div class="section">
        <h2 class="section-title">下载音频</h2>
        <p>下载倒放后的音频文件</p>
        <a
          v-if="downloadUrl"
          :href="downloadUrl"
          :download="downloadFilename"
          class="download-link"
        >
          <button>下载倒放音频</button>
        </a>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// 状态变量
const isRecording = ref(false);
const mediaRecorder = ref(null);
const audioChunks = ref([]);
const audioBlob = ref(null);
const recordedAudioUrl = ref("");
const uploadedAudioUrl = ref("");
const reversedAudioUrl = ref("");
const downloadUrl = ref("");
const downloadFilename = ref("");
const recordingStatus = ref("");
const processingStatus = ref("");
const uploadedFileInfo = ref("");
const fileInput = ref(null);
let audioContext = null;
let audioBuffer = null;

// 计算属性
const canReverseAudio = computed(() => {
  return !!audioBlob.value;
});

const recordingStatusClass = computed(() => {
  return isRecording.value ? "recording-status" : "success-status";
});

const processingStatusClass = computed(() => {
  return processingStatus.value.includes("错误")
    ? "error-status"
    : "success-status";
});

// 1. 音频录制功能
const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.value = new MediaRecorder(stream);
    audioChunks.value = [];

    mediaRecorder.value.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.value.push(event.data);
      }
    };

    mediaRecorder.value.onstop = () => {
      audioBlob.value = new Blob(audioChunks.value, { type: "audio/wav" });
      recordedAudioUrl.value = URL.createObjectURL(audioBlob.value);
      recordingStatus.value = "录音完成！";

      // 停止所有音轨
      mediaRecorder.value.stream.getTracks().forEach((track) => track.stop());
    };

    mediaRecorder.value.start(100); // 每100ms收集一次数据
    isRecording.value = true;
    recordingStatus.value = "正在录音...";
  } catch (error) {
    console.error("录音错误:", error);
    recordingStatus.value = "录音错误: " + error.message;
    isRecording.value = false;
  }
};

const stopRecording = () => {
  if (mediaRecorder.value && mediaRecorder.value.state !== "inactive") {
    mediaRecorder.value.stop();
    isRecording.value = false;
  }
};

// 2. 音频上传功能
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // 显示文件信息
  uploadedFileInfo.value = `文件名: ${file.name} (${(file.size / 1024).toFixed(
    2
  )} KB)`;

  // 创建播放URL
  uploadedAudioUrl.value = URL.createObjectURL(file);

  // 读取文件为Blob用于后续处理
  const reader = new FileReader();
  reader.onload = (e) => {
    audioBlob.value = new Blob([e.target.result], { type: file.type });
  };
  reader.readAsArrayBuffer(file);

  // 重置倒放和下载状态
  reversedAudioUrl.value = "";
  downloadUrl.value = "";
};

// 3. 音频倒放功能
const reverseAudio = async () => {
  if (!audioBlob.value) return;

  processingStatus.value = "正在处理音频...";

  try {
    // 初始化音频上下文
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    // 将Blob转换为ArrayBuffer
    const arrayBuffer = await audioBlob.value.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // 创建倒放音频
    const reversedBuffer = reverseAudioBuffer(audioBuffer);

    // 将倒放音频转换为可播放的Blob
    const reversedBlob = await audioBufferToBlob(reversedBuffer);
    reversedAudioUrl.value = URL.createObjectURL(reversedBlob);

    // 设置下载链接
    const timestamp = new Date().getTime();
    downloadFilename.value = `reversed_audio_${timestamp}.wav`;
    downloadUrl.value = reversedAudioUrl.value;

    processingStatus.value = "音频倒放完成！";
  } catch (error) {
    console.error("音频处理错误:", error);
    processingStatus.value = "处理错误: " + error.message;
  }
};

// 音频倒放函数
const reverseAudioBuffer = (buffer) => {
  const reversedBuffer = audioContext.createBuffer(
    buffer.numberOfChannels,
    buffer.length,
    buffer.sampleRate
  );

  for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    const reversedData = reversedBuffer.getChannelData(channel);

    for (let i = 0; i < channelData.length; i++) {
      reversedData[i] = channelData[channelData.length - 1 - i];
    }
  }

  return reversedBuffer;
};

// 将AudioBuffer转换为Blob
const audioBufferToBlob = (buffer) => {
  return new Promise((resolve) => {
    const numChannels = buffer.numberOfChannels;
    const length = buffer.length;
    const sampleRate = buffer.sampleRate;

    // 创建一个离线音频上下文
    const offlineCtx = new OfflineAudioContext(numChannels, length, sampleRate);
    const bufferSource = offlineCtx.createBufferSource();
    bufferSource.buffer = buffer;

    // 创建一个ScriptProcessorNode来处理音频数据
    const processor = offlineCtx.createScriptProcessor(
      4096,
      numChannels,
      numChannels
    );

    let audioData = [];
    processor.onaudioprocess = (e) => {
      for (let channel = 0; channel < numChannels; channel++) {
        audioData.push(...e.inputBuffer.getChannelData(channel));
      }
    };

    bufferSource.connect(processor);
    processor.connect(offlineCtx.destination);
    bufferSource.start();

    bufferSource.onended = () => {
      // 将PCM数据转换为WAV格式
      const wavBlob = encodeWAV(audioData, numChannels, sampleRate);
      resolve(wavBlob);
    };
  });
};

// 编码为WAV格式
const encodeWAV = (audioData, numChannels, sampleRate) => {
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;

  const buffer = new ArrayBuffer(44 + audioData.length * bytesPerSample);
  const view = new DataView(buffer);

  // WAV头部
  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + audioData.length * bytesPerSample, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true); // 子块大小
  view.setUint16(20, 1, true); // PCM格式
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bytesPerSample * 8, true);
  writeString(view, 36, "data");
  view.setUint32(40, audioData.length * bytesPerSample, true);

  // 写入PCM数据
  const volume = 1;
  let offset = 44;
  for (let i = 0; i < audioData.length; i++) {
    const s = Math.max(-1, Math.min(1, audioData[i] * volume));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    offset += 2;
  }

  return new Blob([view], { type: "audio/wav" });
};

const writeString = (view, offset, string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};
</script>

<style scoped>
.container {
  font-family: "Arial", sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  color: #333;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 80px;
}

h1 {
  color: #2c3e50;
  text-align: center;
}

.section {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.section-title {
  margin-top: 0;
  color: #3498db;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}
.mainContent {
  flex: 1;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
  margin-bottom: 10px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9;
}

button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.recording {
  background-color: #e74c3c;
}

.recording:hover {
  background-color: #c0392b;
}

audio {
  width: 100%;
  margin-top: 10px;
}

.status {
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
}

.recording-status {
  background-color: #ffecec;
  color: #e74c3c;
}

.success-status {
  background-color: #e8f5e9;
  color: #2ecc71;
}

.error-status {
  background-color: #ffebee;
  color: #c62828;
}

.file-info {
  margin: 10px 0;
  font-style: italic;
}

.download-link {
  text-decoration: none;
  display: inline-block;
}

input[type="file"] {
  margin-bottom: 10px;
}

@media (max-width: 600px) {
  .container {
    padding: 10px;
  }

  button {
    display: block;
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
