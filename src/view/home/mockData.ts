// types.ts
export interface Tool {
  title: string;
  url?: string;
  icon: string;
  description: string;
  disabled?: boolean;
  iframe?: boolean;
}

export interface ToolCategory {
  id: string;
  name: string;
  items: Tool[];
}
/** 摸鱼工具 */
const moyuItems: Tool[] = [
  {
    title: "聆 · 音",
    url: "https://toolwa.com/relax/",
    icon: "/favicon/relax.png",
    iframe: true,
    description: "让白噪音放松你的心情",
  },
  // {
  //   title: "煎 · 蛋",
  //   url: "https://jandan.net/treehole",
  //   iframe: true,
  //   icon: "https://jandan.net/wp-content/themes/jandan2025/images/logo2025.png",
  //   description: "每个人都需要一个树洞，存放那些无法言说的秘密和情绪",
  // },
  {
    title: "头 · 像",
    url: "https://vue-color-avatar.leoku.dev/",
    iframe: true,
    icon: "/favicon/avatar.png",
    description: "给自己捏个脸",
  },
  {
    title: "古诗文起名",
    url: "https://xiaosang.net/gushi_namer/",
    icon: "/favicon/takeName.png",
    iframe: true,
    description: "古诗文起名: 利用诗经 楚辞 唐诗 宋词等给小朋友起名字",
  },
  {
    title: "景深模拟器",
    url: "https://dofsimulator.net/en/",
    iframe: true,
    icon: "/favicon/dofsimulator.ico",
    description:
      "可视化展示景深范围和背景虚化效果，帮助摄影师预判实际拍摄效果。",
  },
  {
    title: "全历史",
    url: "https://www.allhistory.com/",
    icon: "/favicon/allhistory.ico",
    iframe: true,
    description:
      "全历史(Allhistory）以AI知识图谱为核心引擎，通过高度时空化、关联化数据的方式构造及展现数字人文内容，尤其是历史知识。让用户沉浸在纵横开阔、左图右史的（历史、人文、社科等）知识海洋中。",
  },
  {
    title: "合同示范文本库",
    url: "https://htsfwb.samr.gov.cn/",
    icon: "/favicon/samr.png",
    iframe: false,
    description: "国家市场监督管理总局，合同示范文本库",
  },
  {
    title: "钢琴演奏",
    url: "https://pianochord.io/chord/C/C-major",
    icon: "/favicon/pianoChord.png",
    description: "大师级模拟钢琴演奏",
  },
  {
    title: "中华古诗词",
    url: "https://awesome-poetry.top/huajianji/",
    icon: "/favicon/poetry.ico",
    description: "最全中华古诗词数据库，古诗词爱好者的摸鱼宝库",
  },
  {
    title: "装逼生成器",
    // url: "https://c.tianhezulin.com/",
    iframe: false,
    icon: "/favicon/logo2.jpg",
    description: "装逼生成器,装逼制图神器",
  },
  {
    title: "几枝",
    url: "https://toolwa.com/jizhi/",
    icon: "/favicon/jizhi.png",
    iframe: true,
    description: "经典诗词搭配中国传统色的层叠波浪动画",
  },
  {
    title: "全景故宫",
    url: "https://pano.dpm.org.cn/",
    icon: "/favicon/qiniandian.png",
    iframe: false,
    description: "足不出户，在线游览故宫",
  },
  {
    title: "手鼓猫",
    url: "https://toolwa.com/bongocat/",
    iframe: true,
    icon: "/favicon/bongocat.png",
    description:
      "超魔性超可爱的手鼓猫在线版，可以演奏手鼓、电子琴、马林巴琴等乐器！",
  },
  {
    title: "Mikutap",
    url: "https://toolwa.com/mikutap/",
    iframe: true,
    icon: "/favicon/mikutap.png",
    description: "初音未来主题的互动网页，通过点击/触摸播放声音并出现变化图案",
  },
  {
    title: "音乐生成器",
    url: "https://toolwa.com/blossom/",
    iframe: true,
    icon: "/favicon/blossom.png",
    description: "生成动听的音乐，只需要轻点几下",
  },
  {
    title: "Windows XP 模拟器",
    url: "https://xp.ur1.fun/",
    icon: "/favicon/xp.png",
    description: "在浏览器里体验 Windows XP",
  },
  {
    title: "魔法键盘",
    url: "https://toolwa.com/magic-keyboard/",
    iframe: true,
    icon: "/favicon/magic-keyboard.png",
    description: "酷炫黑客风格键盘",
  },
  {
    title: "声控弹力球",
    url: "https://toolwa.com/bouncy-balls/",
    iframe: true,
    icon: "/favicon/bouncy-balls.png",
    description: "小球会随着声音的变化而跳动，可以用来监测噪音强度",
  },
  {
    title: "氛围频谱",
    url: "https://toolwa.com/pp/",
    iframe: true,
    icon: "/favicon/pp.png",
    description: "环境声音可视化频谱显示",
  },
  {
    title: "声音倒放",
    url: "/#/soundPlayback",
    iframe: false,
    icon: "/favicon/rs.png",
    description: "在线录音或上传一段音频，将音频内容倒放",
  },
  {
    title: "摸头杀生成器",
    url: "https://toolwa.com/petpet/",
    iframe: true,
    icon: "/favicon/petpet.png",
    description: "万物皆可摸头",
  },
  {
    title: "支付宝到账音效生成器",
    url: "./#/receipt",
    iframe: false,
    icon: "/favicon/receipt.png",
    description: "生成任意金额的支付宝到账音效，可以下载用于通知或者闹钟铃声",
  },
  {
    title: "电子木鱼",
    url: "/#/woodenFish/",
    iframe: false,
    icon: "/favicon/wooden-fish.png",
    description: "随时随地刷功德",
  },
  {
    title: "架子鼓模拟器",
    url: "https://toolwa.com/durms/",
    iframe: true,
    icon: "/favicon/durms.png",
    description: "架子鼓是一套以鼓为主的组合性打击乐器",
  },
  {
    title: "锅碗瓢盆打击乐",
    url: "/#/bucketDrums/",
    iframe: false,
    icon: "/favicon/bucket-drums.png",
    description: "由水桶、锅、锅盖、茶杯等构成的组合乐器",
  },
  {
    title: "烟花模拟器",
    url: "/#/firework/",
    iframe: false,
    icon: "/favicon/firework.png",
    description: "愿你所有的烦恼都能随着烟花一同消散",
  },
  {
    title: "个人数据泄漏检测",
    // url: "/#/aiuys/",
    icon: "/favicon/aiuys.ico",
    iframe: false,
    description:
      "QQ / 手机号 / 身份证号 / 邮箱 / 微博UID，检测隐私状态，保护个人隐私",
    disabled: true,
  },
  {
    title: "捏泡泡模拟器",
    url: "https://toolwa.com/bubble/",
    iframe: true,
    icon: "/favicon/bubble.png",
    description: "超解压的捏泡泡模拟器，在线捏泡泡纸！",
  },
  {
    title: "在线空调",
    url: "https://toolwa.com/ac/",
    iframe: true,
    icon: "/favicon/ac.png",
    description: "清凉的在线便携小空调，即开即用，环保，功耗低。缺点是没有风~",
  },
  {
    title: "云壁炉",
    url: "https://toolwa.com/fireplace/",
    iframe: true,
    icon: "/favicon/fireplace.png",
    description: "希望能带给你一丝温暖",
  },
  {
    title: "云吸猫模拟器",
    url: "https://toolwa.com/cat/",
    iframe: true,
    icon: "/favicon/cat.png",
    description: "一只会发出呼噜声音的猫",
  },
  {
    title: "喵语翻译",
    url: "https://toolwa.com/miao/",
    iframe: true,
    icon: "/favicon/miao.png",
    description: "将人类语言翻译为喵语言",
  },
  {
    title: "兽音译者",
    url: "https://toolwa.com/beast/",
    iframe: true,
    icon: "/favicon/beast.png",
    description: "将人类语言翻译为兽语",
  },
  {
    title: "答案之书",
    url: "./#/answerBook",
    iframe: false,
    icon: "/favicon/book-of-answers.png",
    description: "来这里寻找答案",
  },
  {
    title: "冥想",
    url: "https://toolwa.com/mx/",
    iframe: true,
    icon: "/favicon/mx.png",
    description: "通过 60 秒的冥想帮助你走出困境",
  },
  // {
  //   title: "摸鱼办日历提醒",
  //   url: "https://toolwa.com/myb/",
  //   iframe: true,
  //   icon: "/favicon/myb.png",
  //   description: "摸鱼必备神器",
  // },
  {
    title: "迷宫生成器",
    url: "/#/maze/",
    iframe: false,
    icon: "/favicon/maze.png",
    description: "一个在线的随机迷宫生成工具，它可以快速生成各种不同的迷宫图形",
  },
  {
    title: "流体模拟器",
    url: "https://toolwa.com/fluid-simulation/",
    iframe: true,
    icon: "/favicon/fluid-simulation.png",
    description: "生成绚丽的流体效果",
  },
  {
    title: "藏头诗生成器",
    url: "https://toolwa.com/cts/",
    iframe: true,
    icon: "/favicon/cts.png",
    description: "输入您的文字、姓名、网名、宣言，我们将免费为您在线生成藏头诗",
  },
  {
    title: "舔狗日记",
    url: "https://toolwa.com/dog/",
    iframe: true,
    icon: "/favicon/dog.png",
    description: "舔狗舔狗，舔到最后一无所有",
  },
  {
    title: "毒鸡汤",
    url: "/#/soup/",
    iframe: false,
    icon: "/favicon/soup.png",
    description: '句句"治愈"人心，只为了帮你更好的看清人生认识自己',
  },
  {
    title: "营销号生成器",
    url: "https://toolwa.com/yxh/",
    iframe: true,
    icon: "/favicon/yxh.png",
    description:
      "营销号是什么？营销号究竟是什么梗？营销号是如何火起来的？这个工具帮你解答！",
  },
  {
    title: "彩虹屁生成器",
    url: "https://toolwa.com/chp/",
    iframe: true,
    icon: "/favicon/chp.png",
    description: "喜欢上你这件事，我想用一生说给你听",
  },
  {
    title: "狗屁不通文章生成器",
    url: "https://akira-cn.github.io/bullshit-generator-js/",
    iframe: true,
    icon: "/favicon/bullshit.png",
    description:
      '本工具用于生成一篇狗屁不通的"长篇大论"，可用于 GUI 开发时测试文本渲染',
  },
  {
    title: "互联网黑话生成器",
    url: "https://toolwa.com/bullshit-internet/",
    iframe: true,
    icon: "/favicon/bullshit-internet.png",
    description:
      '一款能熟练应用"赋能、抓手、闭环、沉淀、打通"等词汇的文章生成器',
  },
  {
    title: "让我帮你百度一下",
    url: "https://btfy.ur1.fun",
    icon: "/favicon/baidu.png",
    description: "遇到伸手党怎么办？让我帮你百度一下吧~",
  },
  {
    title: "程序员求签",
    url: "https://toolwa.com/code-divine/",
    iframe: true,
    icon: "/favicon/code-divine.png",
    description: '通过求签了解自己的"编程运势"',
  },
];

// const utilityItems: Tool[] = [
//   {
//     title: "Whois 查询工具",
//     url: "https://toolwa.com/whois/",
//     iframe: true,
//     icon: "/favicon/whois.png",
//     description: "用来查询域名是否已经被注册，以及注册域名的详细信息",
//   },
//   {
//     title: "Apppc 网站世界排名查询",
//     url: "https://toolwa.com/apppc/",
//     iframe: true,
//     icon: "/favicon/apppc.png",
//     description:
//       "网站 Apppc 排名（Apppc 世界排名）排名查询、网站流量查询、网站访问量查询、网站页面浏览量查询",
//   },
//   {
//     title: "域名微信拦截检测",
//     url: "https://toolwa.com/check-weixin/",
//     iframe: true,
//     icon: "/favicon/check-weixin.png",
//     description: "检查域名在微信中是否被拦截或禁止访问",
//   },
//   {
//     title: "域名备案查询",
//     url: "https://toolwa.com/beian/",
//     iframe: true,
//     icon: "/favicon/beian.png",
//     description: "查询域名的工信部/公安部备案，域名备案号",
//   },
//   {
//     title: "Punycode 编码解码",
//     iframe: true,
//     url: "https://toolwa.com/punycode/",
//     icon: "/favicon/punycode.png",
//     description: "Punycode 与字符串互相转换，中文域名编码解码",
//   },
//   {
//     title: "URL 解析拆分",
//     url: "https://toolwa.com/url-parser/",
//     iframe: true,
//     icon: "/favicon/url-parser.png",
//     description: "解析拆解出域名里的各个部分，分解域名参数",
//   },
//   {
//     title: "搜索下拉词查询获取",
//     url: "https://toolwa.com/dropdown-word/",
//     iframe: true,
//     icon: "/favicon/dropdown-word.png",
//     description: "搜索引擎下拉词获取，支持百度、必应、搜狗、360搜索、头条搜索",
//   },
//   {
//     title: "定时刷新网页",
//     url: "https://toolwa.com/timed-refresh/",
//     iframe: true,
//     icon: "/favicon/timed-refresh.png",
//     description: "定时刷新网页，网页浏览压力测试，网页刷浏览量",
//   },
//   {
//     title: "多合一网页缩略图",
//     iframe: true,
//     url: "https://toolwa.com/responsive/",
//     icon: "/favicon/responsive.png",
//     description: "多合一网页响应式缩略图生成，网站响应式效果预览",
//   },
//   {
//     title: "UserAgent 分析",
//     url: "https://toolwa.com/ua/",
//     iframe: true,
//     icon: "/favicon/ua.png",
//     description: "从 UA 中分析出操作系统及浏览器的相关信息",
//   },
//   {
//     title: "浏览器信息查询",
//     url: "https://toolwa.com/browserinfo/",
//     iframe: true,
//     icon: "/favicon/browserinfo.png",
//     description: "精准地获取当前客户端的操作系统信息和浏览器信息",
//   },
//   {
//     title: "Favicon 图标制作",
//     url: "https://toolwa.com/favicon/",
//     iframe: true,
//     icon: "/favicon/chrome.png",
//     description: "将 jpg、png、gif 等格式的图片转换成 favicon ico 图标",
//   },
//   {
//     title: "WebSocket 在线测试",
//     url: "https://toolwa.com/websocket/",
//     iframe: true,
//     icon: "/favicon/websocket.png",
//     description: "与 WebSocket 建立连接，测试 WebSocket 通讯",
//   },
//   {
//     title: "unix 时间戳与文本转换",
//     url: "https://toolwa.com/timestamp/",
//     iframe: true,
//     icon: "/favicon/timestamp.png",
//     description: "unix 时间戳与时间文本相互转换",
//   },
// ];
/** 游戏工具 */
const gameItems: Tool[] = [
  {
    title: "小黑屋",
    url: "https://game.ur1.fun/adarkroom/",
    iframe: true,
    icon: "/favicon/adarkroom.png",
    description: "一款经典耐玩的文字冒险游戏",
  },
  {
    title: "AI 五子棋",
    url: "https://game.ur1.fun/gomoku/",
    iframe: true,
    icon: "/favicon/gomoku.png",
    description: "试试你能打得过 AI 吗",
  },
  {
    title: "俄罗斯方块游戏机",
    url: "https://game.ur1.fun/tetris/",
    iframe: true,
    icon: "/favicon/tetris.png",
    description: "8090后的童年回忆",
  },
  {
    title: "纸牌",
    url: "https://game.ur1.fun/poker/",
    iframe: true,
    icon: "/favicon/poker.png",
    description: "Windows 纸牌游戏同款玩法",
  },
  {
    title: "像素小鸟",
    url: "https://game.ur1.fun/flappy-bird/",
    iframe: true,
    icon: "/favicon/flappy-bird.png",
    description:
      "游戏中玩家必须控制一只胖乎乎的小鸟，跨越由各种不同长度水管组成的障碍",
  },
  {
    title: "压扁小鸟",
    url: "https://game.ur1.fun/flaser-bird/",
    iframe: true,
    icon: "/favicon/flaser-bird.png",
    description: "跳不过就压扁！",
  },
  {
    title: "3D 魔方",
    url: "https://game.ur1.fun/cube/",
    iframe: true,
    icon: "/favicon/cube.png",
    description: "魔方与华容道、法国的独立钻石棋并称为智力游戏界的三大不可思议",
  },
  {
    title: "积木切切乐",
    url: "https://game.ur1.fun/menja/",
    iframe: true,
    icon: "/favicon/menja.png",
    description: "通过滑动鼠标切碎积木块",
  },
  {
    title: "looptap",
    url: "https://game.ur1.fun/looptap/",
    iframe: true,
    icon: "/favicon/looptap.png",
    description: "消磨时间的小游戏，把球停在有颜色区域",
  },
  {
    title: "飞机大战",
    url: "https://game.ur1.fun/plane-wars/",
    iframe: true,
    icon: "/favicon/plane-wars.png",
    description: "微信经典飞机大战",
  },
  {
    title: "恐龙快跑",
    url: "https://game.ur1.fun/dinosaur/",
    icon: "/favicon/dinosaur.png",
    iframe: true,
    description: "谷歌浏览器断网时的恐龙小彩蛋",
  },
  {
    title: "更多游戏",
    url: "https://www.yikm.net/",
    iframe: true,
    icon: "/favicon/game.png",
    description: "在哪里能玩到更多小游戏呢",
  },
];

// data.ts
export const toolCategories: ToolCategory[] = [
  {
    id: "moyuItems",
    name: "摸鱼工具",
    items: moyuItems,
  },
  // {
  //   id: "moyuItems",
  //   name: "便民工具",
  //   items: [],
  // },
  {
    id: "moyuItems",
    name: "娱乐工具",
    items: [],
  },
  // {
  //   id: "moyuItems",
  //   name: "实用工具",
  //   items: [],
  // },
  {
    id: "gameItems",
    name: "游戏工具",
    items: gameItems,
  },
];
