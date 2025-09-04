import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../view/home/index.vue"; // 引入组件
import receipt from "../view/receipt/index.vue";
import answerBook from "../view/answerBook/index.vue";
import soup from "../view/soup/index.vue";
import maze from "../view/maze/index.vue";
import woodenFish from "../view/woodenFish/index.vue";
import soundPlayback from "../view/soundPlayback/index.vue";
import firework from "../view/firework/index.vue";
import bucketDrums from "../view/bucketDrums/index.vue";
import durms from "../view/durms/index.vue";
import aiuys from "../view/aiuys/index.vue";
import iframe from "../view/iframe/index.vue";
const routes = [
  { path: "/", component: Home },
  { path: "/receipt", component: receipt },
  { path: "/answerBook", component: answerBook },
  { path: "/soup", component: soup },
  { path: "/maze", component: maze },
  { path: "/woodenFish", component: woodenFish },
  { path: "/soundPlayback", component: soundPlayback },
  { path: "/firework", component: firework },
  { path: "/bucketDrums", component: bucketDrums },
  { path: "/durms", component: durms },
  { path: "/aiuys", component: aiuys },
  { path: "/iframe", component: iframe },
];
const router = createRouter({
  history: createWebHashHistory(), // 使用HTML5 History模式（需服务器配置）
  routes,
});
export default router;
