<template>
  <view class="container">
    <view class="character-header">
      <image class="character-banner" :src="character.image" mode="aspectFill"></image>
      <view class="character-info">
        <text class="character-name">{{ character.name }}</text>
        <text class="character-desc">{{ character.description }}</text>
      </view>
    </view>
    
    <view class="action-buttons">
      <button class="action-btn chat-btn" @tap="startChat">
        <text class="btn-text">开始对话</text>
      </button>
      <button class="action-btn story-btn" @tap="viewStory">
        <text class="btn-text">查看故事</text>
      </button>
    </view>
    
    <view class="character-details">
      <view class="detail-section">
        <text class="section-title">性格特征</text>
        <view class="tag-list">
          <text class="tag" v-for="(tag, index) in character.traits" :key="index">{{ tag }}</text>
        </view>
      </view>
      
      <view class="detail-section">
        <text class="section-title">背景故事</text>
        <text class="section-content">{{ character.background }}</text>
      </view>
      
      <view class="detail-section">
        <text class="section-title">互动提示</text>
        <view class="interaction-tips">
          <text class="tip" v-for="(tip, index) in character.tips" :key="index">{{ tip }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      character: {
        id: 0,
        name: '',
        description: '',
        image: '',
        traits: [],
        background: '',
        tips: []
      }
    }
  },
  onLoad(options) {
    // 模拟从API获取角色数据
    this.loadCharacterData(options.id)
  },
  methods: {
    loadCharacterData(id) {
      // 模拟API调用
      this.character = {
        id: parseInt(id),
        name: '绮梦',
        description: '被诅咒的艺伎，才艺绝世，渴望自由。你将揭开她优雅外表下的秘密...',
        image: '/static/characters/character1.jpg',
        traits: ['优雅', '神秘', '才艺绝伦', '内心坚强'],
        background: '在一个古老的花街，绮梦以惊人的才艺闻名。然而，她被一个古老的诅咒所困，只能在夜晚展现真实的自己。白天的她必须戴上面具，扮演着完美艺伎的角色。她渴望找到能够解开诅咒的方法，重获真正的自由。',
        tips: [
          '可以请教她关于传统艺术的问题',
          '对她的过去表示好奇会让她更愿意敞开心扉',
          '夜晚是她最放松的时候',
          '她喜欢听别人讲述关于自由的故事'
        ]
      }
    },
    startChat() {
      uni.navigateTo({
        url: `/pages/chat/chat?characterId=${this.character.id}`
      })
    },
    viewStory() {
      uni.navigateTo({
        url: `/pages/story/story?characterId=${this.character.id}`
      })
    }
  }
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #1a1a1a;
}

.character-header {
  position: relative;
  height: 400rpx;
  
  .character-banner {
    width: 100%;
    height: 100%;
  }
  
  .character-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
    
    .character-name {
      font-size: 24px;
      color: #fff;
      font-weight: bold;
      margin-bottom: 10px;
      display: block;
    }
    
    .character-desc {
      font-size: 14px;
      color: rgba(255,255,255,0.8);
      line-height: 1.4;
    }
  }
}

.action-buttons {
  display: flex;
  padding: 20px;
  gap: 15px;
  
  .action-btn {
    flex: 1;
    height: 44px;
    border-radius: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    
    &.chat-btn {
      background: linear-gradient(135deg, #8A2BE2, #4A148C);
    }
    
    &.story-btn {
      background: rgba(255,255,255,0.1);
    }
    
    .btn-text {
      color: #fff;
      font-size: 16px;
    }
  }
}

.character-details {
  padding: 20px;
  
  .detail-section {
    margin-bottom: 30px;
    
    .section-title {
      font-size: 18px;
      color: #fff;
      font-weight: bold;
      margin-bottom: 15px;
      display: block;
    }
    
    .tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      
      .tag {
        padding: 6px 12px;
        background: rgba(138,43,226,0.2);
        border-radius: 15px;
        color: #8A2BE2;
        font-size: 14px;
      }
    }
    
    .section-content {
      color: rgba(255,255,255,0.8);
      font-size: 14px;
      line-height: 1.6;
    }
    
    .interaction-tips {
      .tip {
        display: block;
        color: rgba(255,255,255,0.8);
        font-size: 14px;
        line-height: 1.6;
        margin-bottom: 10px;
        padding-left: 15px;
        position: relative;
        
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: #8A2BE2;
        }
      }
    }
  }
}
</style> 