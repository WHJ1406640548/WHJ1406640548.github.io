<template>
    <div class="maze-generator">
    
      <Header></Header>
      <div class="controls">
        <label for="size">迷宫尺寸:</label>
        <select id="size" v-model="selectedSize" @change="handleSizeChange">
          <option value="10">小 (10x10)</option>
          <option value="20" selected>中 (20x20)</option>
          <option value="30">大 (30x30)</option>
          <option value="40">超大 (40x40)</option>
          <option value="custom">自定义</option>
        </select>
        
        <span v-if="showCustomSize" class="custom-size">
          <label for="width">宽度:</label>
          <input type="number" id="width" v-model.number="customWidth" min="5" max="100">
          <label for="height">高度:</label>
          <input type="number" id="height" v-model.number="customHeight" min="5" max="100">
        </span>
        
        <button @click="generateMaze">生成迷宫</button>
        <button @click="downloadMaze">下载迷宫</button>
      </div>
  
      <div class="maze-container">
        <canvas ref="mazeCanvas"></canvas>
      </div>

      <div class="am-panel-bd markdown-body">
        <p>这是一个在线的随机迷宫生成工具，它可以帮助用户快速生成各种不同的迷宫图形。用户可以通过选择不同的迷宫尺寸来生成不同类型的迷宫。</p>
        <p>该工具使用了随机算法来生成迷宫图形，因此<strong>每次生成的迷宫都是独一无二的</strong>。在生成迷宫的过程中，工具会自动检测和修复生成的迷宫中的错误和不连通部分，确保生成的迷宫图形是完整和有效的。</p>
        <p>生成的迷宫图形可以保存为 PNG 格式，方便用户进行后续的编辑和使用。无论是作为游戏素材还是学习工具，这个在线迷宫生成工具都十分实用。</p>
        <blockquote>
          <p>如果生成的迷宫在手机上无法下载保存，请直接在迷宫的图像上通过长按保存到相册</p>
        </blockquote>
        <h3>随机迷宫生成原理</h3>
        <p>使用深度优先搜索算法来构建迷宫。具体来说，该算法首先将起始格子加入栈中，然后重复以下步骤，直到栈为空为止：</p>
        <p>1、从栈中弹出一个格子作为当前格子，将当前格子标记为已访问；</p>
        <p>2、随机选择一个未访问的邻居格子进行访问，将邻居格子与当前格子之间的墙拆除，并将邻居格子加入栈中。</p>
      </div>
      <Footer></Footer>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  // 响应式数据
  const selectedSize = ref('20');
  const showCustomSize = ref(false);
  const customWidth = ref(25);
  const customHeight = ref(25);
  const mazeCanvas = ref(null);
  
  // 生命周期钩子
  onMounted(() => {
    generateMaze();
  });
  
  // 方法
  const handleSizeChange = () => {
    showCustomSize.value = selectedSize.value === 'custom';
    if (selectedSize.value !== 'custom') {
      generateMaze();
    }
  };
  
  const generateMaze = () => {
    let width, height;
    
    if (selectedSize.value === 'custom') {
      width = customWidth.value;
      height = customHeight.value;
    } else {
      width = height = parseInt(selectedSize.value);
    }
    
    // 调整canvas大小
    const cellSize = Math.min(500 / Math.max(width, height), 20);
    mazeCanvas.value.width = width * cellSize;
    mazeCanvas.value.height = height * cellSize;
    
    // 创建迷宫数据
    const maze = createMaze(width, height);
    
    // 绘制迷宫
    drawMaze(maze, width, height, cellSize);
  };
  
  const createMaze = (width, height) => {
    // 初始化网格，所有墙都存在
    const grid = [];
    for (let y = 0; y < height; y++) {
      grid[y] = [];
      for (let x = 0; x < width; x++) {
        grid[y][x] = {
          top: true,
          right: true,
          bottom: true,
          left: true,
          visited: false
        };
      }
    }
    
    // 从随机位置开始
    const startX = Math.floor(Math.random() * width);
    const startY = Math.floor(Math.random() * height);
    const stack = [[startX, startY]];
    grid[startY][startX].visited = true;
    
    // 定义方向
    const directions = [
      { dx: 0, dy: -1, wall: 'top', opposite: 'bottom' },    // 上
      { dx: 1, dy: 0, wall: 'right', opposite: 'left' },     // 右
      { dx: 0, dy: 1, wall: 'bottom', opposite: 'top' },     // 下
      { dx: -1, dy: 0, wall: 'left', opposite: 'right' }      // 左
    ];
    
    while (stack.length > 0) {
      const [x, y] = stack[stack.length - 1];
      const cell = grid[y][x];
      
      // 获取未访问的邻居
      const neighbors = [];
      for (const dir of directions) {
        const nx = x + dir.dx;
        const ny = y + dir.dy;
        
        if (nx >= 0 && nx < width && ny >= 0 && ny < height && !grid[ny][nx].visited) {
          neighbors.push(dir);
        }
      }
      
      if (neighbors.length > 0) {
        // 随机选择一个未访问的邻居
        const dir = neighbors[Math.floor(Math.random() * neighbors.length)];
        const nx = x + dir.dx;
        const ny = y + dir.dy;
        
        // 拆除墙
        cell[dir.wall] = false;
        grid[ny][nx][dir.opposite] = false;
        
        // 标记为已访问并加入栈
        grid[ny][nx].visited = true;
        stack.push([nx, ny]);
      } else {
        // 没有未访问的邻居，回溯
        stack.pop();
      }
    }
    
    return grid;
  };
  
  const drawMaze = (grid, width, height, cellSize) => {
    const ctx = mazeCanvas.value.getContext('2d');
    
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, mazeCanvas.value.width, mazeCanvas.value.height);
    
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const cell = grid[y][x];
        const xPos = x * cellSize;
        const yPos = y * cellSize;
        
        if (cell.top) {
          ctx.beginPath();
          ctx.moveTo(xPos, yPos);
          ctx.lineTo(xPos + cellSize, yPos);
          ctx.stroke();
        }
        
        if (cell.right) {
          ctx.beginPath();
          ctx.moveTo(xPos + cellSize, yPos);
          ctx.lineTo(xPos + cellSize, yPos + cellSize);
          ctx.stroke();
        }
        
        if (cell.bottom) {
          ctx.beginPath();
          ctx.moveTo(xPos, yPos + cellSize);
          ctx.lineTo(xPos + cellSize, yPos + cellSize);
          ctx.stroke();
        }
        
        if (cell.left) {
          ctx.beginPath();
          ctx.moveTo(xPos, yPos);
          ctx.lineTo(xPos, yPos + cellSize);
          ctx.stroke();
        }
      }
    }
    
    // 添加入口和出口
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, cellSize, cellSize);
    
    ctx.fillStyle = 'red';
    ctx.fillRect(
      mazeCanvas.value.width - cellSize, 
      mazeCanvas.value.height - cellSize, 
      cellSize, 
      cellSize
    );
  };
  
  const downloadMaze = () => {
    const link = document.createElement('a');
    link.download = 'maze-' + new Date().getTime() + '.png';
    link.href = mazeCanvas.value.toDataURL('image/png');
    link.click();
  };
  </script>
  
  <style scoped>
  .maze-generator {
    font-family: 'Arial', sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    line-height: 1.6;
  }
  
  .controls {
    margin: 20px 0;
    padding: 15px;
    background: #f5f5f5;
    border-radius: 5px;
    margin-top: 50px;
  }
  
  .maze-container {
    margin: 20px 0;
    text-align: center;
  }
  
  canvas {
    border: 1px solid #ddd;
    max-width: 100%;
  }
  
  button {
    padding: 8px 15px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
  }
  
  button:hover {
    background: #45a049;
  }
  
  select, input {
    padding: 8px;
    margin-right: 10px;
  }
  
  .am-panel-bd {
    margin-bottom: 20px;
  }
  
  blockquote {
    border-left: 4px solid #ddd;
    padding-left: 15px;
    color: #666;
  }
  
  .custom-size {
    display: inline-block;
    margin-left: 10px;
  }
  </style>