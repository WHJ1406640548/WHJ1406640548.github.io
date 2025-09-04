<template>
  <main>
    <div id="ui">
      <div class="row">
        <div class="column column-80 column-offset-10">
          <h1 class="svelte-1ei4wt">
            <img
              class="alipay-logo svelte-1ei4wt"
              src="@/assets/image/alipay.png"
            />
          </h1>
          <h4 class="svelte-1ei4wt">输入金额，即刻“到账”</h4>
        </div>
      </div>
      <input
        id="money-input"
        type="number"
        :max="MAX_VALUE"
        :min="MIN_VALUE"
        v-model.number="money"
      />
      <div class="control-btns">
        <a href="#" @click.prevent="randomize">
          <span>
            <Tooltip tooltip="随机">
              <svg
                t="1753422932355"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="10425"
                width="28"
                height="28"
              >
                <path
                  d="M938.564677 674.864298c-17.494443-6.970762-50.019207 4.588505-56.662511 21.329794-57.777915 145.668661-195.888436 239.792365-351.854627 239.792365-208.768791 0-378.60999-170.817434-378.60999-380.744607 0-209.945593 169.8412-380.742561 378.60999-380.742561 70.90284 0 139.999544 19.808138 199.849654 57.290821 1.119497 0.690732 2.317789 1.158383 3.475148 1.706875l-99.30368 35.979446c-16.84362 6.094812-28.03859 34.619472-21.964244 51.541887 4.77577 13.286608 24.604374 26.493397 37.871539 26.493397 3.654226 0 12.290931-0.63138 15.926738-1.951445l182.092221-80.756255c8.492418-3.089361 15.462157-9.447163 19.299555-17.675568 3.840468-8.228405 4.287653-17.674545 1.218758-26.228361L803.747155 40.168862c-6.399757-17.838274-22.246677-41.829687-48.595788-37.868469-18.628266 2.803859-31.835056 28.544103-25.435299 46.381353l35.898605 100.178607c-72.305793-43.638893-155.01247-66.86078-239.851717-66.86078-257.404488 0-466.803635 210.576973-466.803635 469.424322 0 258.866792 209.399147 469.463208 466.803635 469.463208 192.290491 0 362.559433-116.04497 433.787684-295.639301C966.538799 707.633632 956.057073 681.893388 938.564677 674.864298z"
                  fill="#2c2c2c"
                  p-id="10426"
                ></path>
              </svg>
            </Tooltip>
          </span>
        </a>
        <a v-if="audio" href="#" @click.prevent="togglePlay">
          <span>
            <Tooltip :tooltip="playing ? '暂停' : '播放'">
                <svg t="1753423308695" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19365" width="28" height="28"><path d="M512 85.319111c-235.633778 0-426.666667 191.032889-426.666667 426.666667 0 235.633778 191.032889 426.666667 426.666667 426.666666 235.633778 0 426.666667-191.032889 426.666667-426.666666 0-235.633778-191.032889-426.666667-426.666667-426.666667m0 85.333333c188.202667 0 341.333333 153.130667 341.333333 341.333334 0 188.216889-153.130667 341.333333-341.333333 341.333333s-341.333333-153.116444-341.333333-341.333333c0-188.202667 153.130667-341.333333 341.333333-341.333334" fill="#000000" p-id="19366"></path><path d="M449.848889 296.177778c-41.315556 0-80.071111 32.682667-80.071111 79.914666v271.786667c0 47.232 38.755556 79.914667 80.071111 79.914667a78.648889 78.648889 0 0 0 47.445333-16.028445l181.802667-135.893333c42.666667-31.900444 42.666667-95.872 0-127.772444l-181.802667-135.893334a78.648889 78.648889 0 0 0-47.431111-16.028444m5.248 91.022222l166.926222 124.785778L455.111111 636.757333V387.2" fill="#000000" p-id="19367"></path></svg>
            </Tooltip>
          </span>
        </a>
        <a
          v-if="download"
          :href="download.link"
          :download="download.name"
          id="download-url"
        >
          <Tooltip tooltip="下载">
            <svg t="1753423098727" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13719" width="28" height="28"><path d="M552 586.178l60.268-78.53c13.45-17.526 38.56-20.83 56.085-7.38s20.829 38.56 7.38 56.085l-132 172c-16.012 20.863-47.454 20.863-63.465 0l-132-172c-13.45-17.526-10.146-42.636 7.38-56.085 17.525-13.45 42.635-10.146 56.084 7.38L472 586.177V152c0-22.091 17.909-40 40-40s40 17.909 40 40v434.178zM832 512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 61.856-50.144 112-112 112H224c-61.856 0-112-50.144-112-112V512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 17.673 14.327 32 32 32h576c17.673 0 32-14.327 32-32V512z" fill="#333333" p-id="13720"></path></svg>
          </Tooltip>
        </a>
      </div>

      <p class="tips">
        如果无法下载，请更换浏览器再试<br />
        工具仅供娱乐，请勿用于非法用途
      </p>
    </div>

    <div ref="audioContainer" hidden />
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { alipay } from "./lib/tts";
import { parse } from "./lib/parser";
import merger from "./lib/audio-merger";
//   import Icon from "./Icon.vue";
import Tooltip from "./Tooltip.vue";

const MAX_VALUE = 9999_9999_9999;
const MIN_VALUE = 1;

const money = ref(0);
const audioContainer = ref(null);
const download = ref(null);
const audio = ref(null);
const playing = ref(false);

const clampedMoney = computed({
  get: () => money.value,
  set: (val) => {
    money.value = Math.max(Math.min(val, MAX_VALUE), MIN_VALUE);
  },
});

onMounted(() => {
  randomize();
  window.playMoney = playMoney;
});

const randomize = () => {
  money.value = Math.round(Math.random() * 999999999) / 100.0;
};

const removeAllChildren = (el) => {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};

const updateAudio = async (moneyValue) => {
  try {
    const tokens = parse(moneyValue);
    console.debug(tokens, merger, "merger");
    const merged = await merger.concat(
      ...alipay.begin(),
      ...tokens.map((token) => alipay.use(token)),
      ...alipay.end()
    );
    const { element, url } = await merger.export(merged);
    removeAllChildren(audioContainer.value);
    download.value = {
      link: url,
      name: `alipay_${moneyValue.toFixed(2).replace(".", "_")}.mp3`,
    };
    audioContainer.value.appendChild(element);
    audio.value = element;
    // 确保音频元素正确加载
    element.onerror = () => {
      console.error("音频加载失败");
    };
    audio.value.onplaying = () => {
      playing.value = true;
    };
    audio.value.onpause = () => {
      playing.value = false;
    };
  } catch (error) {
    console.error("生成音频失败:", error);
  }
};

const playMoney = async (moneyValue, callback) => {
  const tokens = parse(moneyValue);
  console.debug(tokens);
  const merged = await merger.concat(
    ...alipay.begin(),
    ...tokens.map((token) => alipay.use(token)),
    ...alipay.end()
  );
  const { element, url } = await merger.export(merged);
  removeAllChildren(audioContainer.value);
  download.value = {
    link: url,
    name: `alipay_${moneyValue.toFixed(2).replace(".", "_")}.mp3`,
  };
  audioContainer.value.appendChild(element);
  element.play();

  if (callback) {
    callback({
      player: element,
      download: download.value,
    });
  }
};

const togglePlay = async () => {
  if (playing.value) {
    audio.value.pause();
    audio.value.currentTime = 0;
  } else {
    audio.value.play();
  }
};

watch(
  money,
  (newVal) => {
    updateAudio(newVal);
    console.log(newVal, "newVale");
  },
  { immediate: true }
);
</script>

<style>
main {
  text-align: center;
  margin: 0 auto;
  margin-top: 25vh;
  width: 100%;
  color: #606c76;
}

@media (min-width: 960px) {
  main {
    max-width: 50%;
  }
}

#ui > input {
  margin: 0;
  padding: 0.8em 0;
  display: inline-block;
  width: 100%;
  max-width: 300px;
  text-align: center;
  margin-bottom: 20px;
  font-family: consolas;
  font-size: 30px;
  color: #000;
  height: 3.8rem;
}

.control-btns > a {
  display: inline-block;
  background: #eee;
  padding: 0.25em 0.4em 0.1em;
  border-radius: 8px;
  margin: 0.5em;
  line-height: 1em;
}
.alipay-logo.svelte-1ei4wt {
  max-width: 160px;
}
h4 {
  font-size: 2.2rem;
  letter-spacing: -0.08rem;
  line-height: 1.35;
  color: #606c76;
  font-weight: 300;
}
h4.svelte-1ei4wt {
  margin-bottom: 9vh;
}
.tips {
  font-size: 0.8em;
  margin-top: 1em;
}
</style>
