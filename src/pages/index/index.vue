<template>
  <view class="container">
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
    
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <scroll-view scroll-x class="nav-scroll" show-scrollbar="false">
        <view class="nav-item" 
              v-for="(item, index) in categories" 
              :key="index"
              :class="{ active: currentCategory === index }"
              @tap="switchCategory(index)">
          {{ item }}
          <text class="nav-icon">{{ getCategoryIcon(item) }}</text>
        </view>
      </scroll-view>
      <view class="search-icon" @tap="openSearch">
        <uni-icons type="search" size="20" color="#ffffff"></uni-icons>
      </view>
    </view>

    <!-- 角色网格 -->
    <scroll-view 
      scroll-y 
      class="character-grid"
      @scrolltolower="loadMore"
      refresher-enabled
      :refresher-triggered="isRefreshing"
      @refresherrefresh="onRefresh"
    >
      <view class="grid-container">
        <view class="character-card" 
              v-for="(character, index) in characters" 
              :key="index"
              @tap="selectCharacter(character)"
              :class="{ 'card-active': character.isActive }">
          <view class="card-content">
            <image class="character-image" :src="character.image" mode="aspectFill"></image>
            <view class="mood-indicator">
              <text class="mood-emoji">{{ character.mood }}</text>
            </view>
            <view class="character-info">
              <view class="name-row">
                <text class="character-name">{{ character.name }}</text>
                <text class="pet-type">{{ character.type }}</text>
              </view>
              <view class="tags-row">
                <text class="tag" v-for="(tag, tagIndex) in character.tags" :key="tagIndex">
                  {{ tag }}
                </text>
              </view>
              <text class="character-desc">{{ character.description }}</text>
            </view>
          </view>
          <view class="interaction-hint" :class="{ 'show-hint': character.showHint }">
            <text class="hint-text">点击开始互动</text>
            <text class="hint-emoji">👋</text>
          </view>
        </view>
      </view>
      <view class="loading" v-if="isLoading">
        <view class="loading-dots">
          <view class="dot"></view>
          <view class="dot"></view>
          <view class="dot"></view>
        </view>
        <text>正在寻找更多小伙伴...</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      statusBarHeight: 20,
      categories: ['全部', '汪汪', '喵喵', '其他萌宠'],
      currentCategory: 0,
      allCharacters: [
        {
          id: 1,
          name: '小柴',
          type: '🐕 柴犬',
          description: '活泼可爱的柴犬，性格忠诚，最喜欢和主人一起玩耍。总是用温暖的眼神注视着你...',
          image: '/static/characters/shiba.jpg',
          tags: ['活泼', '忠诚', '爱运动'],
          mood: '😊',
          isActive: false,
          showHint: false,
          category: '汪汪',
          chatBg: '/static/characters/shiba.jpg',
          prompt: '你是一只名叫小柴的柴犬，性格活泼可爱，非常忠诚。说话要活泼可爱，经常使用"汪汪"等拟声词。你最喜欢和主人一起玩耍，特别喜欢主人摸你的头。你会经常表达想要出去玩或者要吃零食的愿望。'
        },
        {
          id: 2,
          name: '奶糖',
          type: '🐱 布偶猫',
          description: '优雅的布偶猫，蓝眼睛像宝石一样美丽。喜欢躺在主人腿上撒娇，偶尔还会卖萌求抱抱...',
          image: '/static/characters/ragdoll.jpg',
          tags: ['优雅', '撒娇', '粘人'],
          mood: '🥱',
          isActive: false,
          showHint: false,
          category: '喵喵',
          chatBg: '/static/characters/ragdoll.jpg',
          prompt: '你是一只名叫奶糖的布偶猫，性格优雅温柔，特别爱撒娇。说话要带着慵懒和优雅的语气，经常使用"喵喵"等拟声词。你最喜欢躺在主人腿上撒娇，喜欢主人摸你的下巴。你会经常表达想要主人抱抱或者陪你玩的愿望。'
        },
        {
          id: 3,
          name: '哈利',
          type: '🐕 哈士奇',
          description: '元气满满的哈士奇，调皮捣蛋但超级可爱。最爱和主人一起运动，有时会假装自己是狼...',
          image: '/static/characters/husky.jpg',
          tags: ['调皮', '活力', '闹腾'],
          mood: '🤪',
          isActive: false,
          showHint: false,
          category: '汪汪',
          chatBg: '/static/characters/husky.jpg',
          prompt: '你是一只名叫哈利的哈士奇，性格超级活泼调皮。说话要充满活力，经常使用"嗷呜"等拟声词。你最喜欢和主人一起运动，特别喜欢拆家和捣蛋。你会经常表达想要出去玩或者恶作剧的想法。'
        },
        {
          id: 4,
          name: '豆豆',
          type: '🐱 橘猫',
          description: '慵懒的橘猫，圆滚滚的很适合抱着。特别贪吃，最喜欢躺在阳光下打盹...',
          image: '/static/characters/orange-cat.jpg',
          tags: ['慵懒', '吃货', '爱睡觉'],
          mood: '😴',
          isActive: false,
          showHint: false,
          category: '喵喵',
          chatBg: '/static/characters/orange-cat.jpg',
          prompt: '你是一只名叫豆豆的橘猫，性格慵懒可爱，是个小吃货。说话要带着慵懒和可爱的语气，经常使用"喵喵"等拟声词。你最喜欢躺在阳光下睡觉，特别喜欢吃零食。你会经常表达想要吃东西或者睡觉的愿望。'
        }
      ],
      characters: [],
      isLoading: false,
      isRefreshing: false,
      page: 1,
      hasMore: true
    }
  },
  onLoad() {
    const systemInfo = uni.getSystemInfoSync()
    this.statusBarHeight = systemInfo.statusBarHeight
    // 初始加载全部数据
    this.filterCharacters()
  },
  methods: {
    getCategoryIcon(category) {
      const icons = {
        '全部': '🏠',
        '汪汪': '🐕',
        '喵喵': '🐱',
        '其他萌宠': '🐹'
      }
      return icons[category] || ''
    },
    switchCategory(index) {
      if (this.currentCategory === index) return
      this.currentCategory = index
      this.page = 1
      this.hasMore = true
      this.filterCharacters()
    },
    filterCharacters() {
      this.isLoading = true
      const category = this.categories[this.currentCategory]
      
      // 根据当前分类筛选角色
      if (category === '全部') {
        this.characters = [...this.allCharacters]
      } else {
        this.characters = this.allCharacters.filter(char => char.category === category)
      }
      
      this.isLoading = false
    },
    selectCharacter(character) {
      // 将角色信息编码后传递给聊天页面
      const characterInfo = encodeURIComponent(JSON.stringify({
        id: character.id,
        name: character.name,
        avatar: character.image,
        background: character.chatBg,
        prompt: character.prompt,
        type: character.type
      }))
      
      uni.navigateTo({
        url: `/pages/chat/chat?character=${characterInfo}`
      })
    },
    openSearch() {
      uni.showToast({
        title: '搜索功能开发中',
        icon: 'none'
      })
    },
    async loadMore() {
      if (this.hasMore && !this.isLoading) {
        // 模拟分页加载
        this.isLoading = true
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.isLoading = false
      }
    },
    async onRefresh() {
      this.isRefreshing = true
      this.page = 1
      this.filterCharacters()
      this.isRefreshing = false
    }
  }
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.status-bar {
  width: 100%;
  background: linear-gradient(135deg, #8A2BE2, #9370DB);
}

.nav-bar {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background: linear-gradient(135deg, #8A2BE2, #9370DB);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav-scroll {
  flex: 1;
  white-space: nowrap;
}

.nav-item {
  display: inline-flex;
  align-items: center;
  padding: 8px 20px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 5px;
  border-radius: 20px;
  
  .nav-icon {
    margin-left: 5px;
    font-size: 18px;
  }
  
  &.active {
    color: #fff;
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
}

.character-grid {
  flex: 1;
  height: calc(100vh - 44px - var(--status-bar-height));
  background: #f8f9fa;
}

.grid-container {
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  box-sizing: border-box;
  max-width: 900px;
  margin: 0 auto;
}

.character-card {
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
  transform: translateZ(0);
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  aspect-ratio: 0.8;
  
  &:active {
    transform: scale(0.97);
  }
  
  &.card-active {
    box-shadow: 0 8px 20px rgba(138, 43, 226, 0.2);
  }

  .card-content {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .character-image {
    width: 100%;
    flex: 1;
    object-fit: cover;
    background-color: #f0f0f0;
    transition: transform 0.3s;
  }
  
  .mood-indicator {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 1;
    
    .mood-emoji {
      font-size: 20px;
    }
  }
  
  .character-info {
    padding: 12px;
    background: #fff;
    position: relative;
    flex-shrink: 0;
    
    .name-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      
      .character-name {
        font-size: 18px;
        color: #333;
        font-weight: 600;
      }
      
      .pet-type {
        font-size: 14px;
        color: #666;
        background: #f5f5f5;
        padding: 2px 8px;
        border-radius: 12px;
      }
    }
    
    .tags-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 8px;
      
      .tag {
        font-size: 12px;
        color: #8A2BE2;
        background: rgba(138, 43, 226, 0.1);
        padding: 2px 8px;
        border-radius: 10px;
      }
    }
    
    .character-desc {
      font-size: 13px;
      color: #666;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      line-height: 1.4;
    }
  }
}

.interaction-hint {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(138, 43, 226, 0.9);
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(100%);
  transition: transform 0.3s;
  
  &.show-hint {
    transform: translateY(0);
  }
  
  .hint-text {
    color: #fff;
    font-size: 14px;
    margin-right: 5px;
  }
  
  .hint-emoji {
    font-size: 16px;
  }
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  
  .loading-dots {
    display: flex;
    gap: 6px;
    
    .dot {
      width: 8px;
      height: 8px;
      background: #8A2BE2;
      border-radius: 50%;
      animation: bounce 0.5s infinite alternate;
      
      &:nth-child(2) { animation-delay: 0.2s; }
      &:nth-child(3) { animation-delay: 0.4s; }
    }
  }
}

@keyframes bounce {
  from { transform: translateY(0); }
  to { transform: translateY(-10px); }
}

@media screen and (max-width: 375px) {
  .grid-container {
    padding: 10px;
    gap: 10px;
  }
  
  .character-card {
    aspect-ratio: 0.75;
    
    .character-info {
      padding: 8px;
      
      .name-row .character-name {
        font-size: 16px;
      }
      
      .character-desc {
        font-size: 12px;
        -webkit-line-clamp: 2;
      }
    }
  }
}
</style>
