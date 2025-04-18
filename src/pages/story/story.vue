<template>
  <view class="container">
    <!-- 顶部标题 -->
    <view class="header">
      <text class="title">我与宠物的故事</text>
      <text class="subtitle">每一个瞬间都值得珍藏</text>
    </view>

    <!-- 故事场景选择 -->
    <scroll-view class="scene-list" scroll-x>
      <view class="scene-item" 
        v-for="(scene, index) in scenes" 
        :key="index"
        :class="{ active: currentScene === index }"
        @tap="selectScene(index)"
      >
        <image class="scene-image" :src="scene.image" mode="aspectFill"></image>
        <text class="scene-name">{{ scene.name }}</text>
      </view>
    </scroll-view>

    <!-- 故事内容展示 -->
    <view class="story-content">
      <view class="story-header">
        <image class="story-bg" :src="currentStory.background" mode="aspectFill"></image>
        <view class="story-info">
          <text class="story-title">{{ currentStory.title }}</text>
          <text class="story-desc">{{ currentStory.description }}</text>
        </view>
      </view>

      <!-- 故事选择项 -->
      <view class="story-choices">
        <view 
          class="choice-item"
          v-for="(choice, index) in currentStory.choices"
          :key="index"
          @tap="makeChoice(index)"
        >
          <text class="choice-text">{{ choice.text }}</text>
          <text class="choice-hint">{{ choice.hint }}</text>
        </view>
      </view>
    </view>

    <!-- 故事进度 -->
    <view class="progress-bar">
      <view class="progress" :style="{ width: progress + '%' }"></view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentScene: 0,
      progress: 0,
      scenes: [
        {
          name: '初次相遇',
          image: '/static/story/scene1.jpg',
          stories: [
            {
              title: '命运的相遇',
              description: '在宠物商店里，一只小柴犬用水汪汪的大眼睛望着你...',
              background: '/static/story/meet.jpg',
              choices: [
                {
                  text: '蹲下来摸摸它',
                  hint: '它会亲昵地蹭你的手'
                },
                {
                  text: '给它一块小饼干',
                  hint: '它会开心地摇尾巾'
                }
              ]
            }
          ]
        },
        {
          name: '温馨日常',
          image: '/static/story/scene2.jpg',
          stories: [
            {
              title: '慵懒的午后',
              description: '阳光正好，小柴在沙发上打盹，突然被外面的声音惊醒...',
              background: '/static/story/daily.jpg',
              choices: [
                {
                  text: '陪它一起晒太阳',
                  hint: '享受温暖时光'
                },
                {
                  text: '带它出去散步',
                  hint: '探索新的风景'
                }
              ]
            }
          ]
        },
        {
          name: '特别时刻',
          image: '/static/story/scene3.jpg',
          stories: [
            {
              title: '下雨的夜晚',
              description: '外面电闪雷鸣，小柴似乎有些害怕...',
              background: '/static/story/special.jpg',
              choices: [
                {
                  text: '抱抱它',
                  hint: '给予安全感'
                },
                {
                  text: '和它一起躲进被窝',
                  hint: '共度温暖时光'
                }
              ]
            }
          ]
        },
        {
          name: '成长记录',
          image: '/static/story/scene4.jpg',
          stories: [
            {
              title: '时光印记',
              description: '不知不觉，小柴已经陪伴你一年了...',
              background: '/static/story/growth.jpg',
              choices: [
                {
                  text: '翻看照片回忆',
                  hint: '记录美好瞬间'
                },
                {
                  text: '准备生日惊喜',
                  hint: '庆祝特别时刻'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  computed: {
    currentStory() {
      return this.scenes[this.currentScene].stories[0]
    }
  },
  methods: {
    selectScene(index) {
      this.currentScene = index
      this.progress = 0
    },
    makeChoice(index) {
      const choice = this.currentStory.choices[index]
      
      // 显示选择结果
      uni.showToast({
        title: choice.hint,
        icon: 'none',
        duration: 2000
      })
      
      // 更新进度
      this.progress += 25
      
      // 如果进度达到100%，显示完成提示
      if (this.progress >= 100) {
        setTimeout(() => {
          uni.showModal({
            title: '故事完成',
            content: '恭喜你完成了一个温馨的故事！要继续探索其他故事吗？',
            confirmText: '继续探索',
            success: (res) => {
              if (res.confirm) {
                this.progress = 0
                this.currentScene = (this.currentScene + 1) % this.scenes.length
              }
            }
          })
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #f8f8f8;
  padding: 30rpx;
}

.header {
  text-align: center;
  margin-bottom: 40rpx;
  
  .title {
    font-size: 40rpx;
    font-weight: bold;
    color: #333;
    display: block;
  }
  
  .subtitle {
    font-size: 24rpx;
    color: #666;
    margin-top: 10rpx;
  }
}

.scene-list {
  white-space: nowrap;
  margin: 0 -30rpx 40rpx;
  padding: 0 30rpx;
  
  .scene-item {
    display: inline-block;
    margin-right: 20rpx;
    width: 200rpx;
    border-radius: 16rpx;
    overflow: hidden;
    position: relative;
    
    &.active {
      transform: scale(1.05);
      box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.15);
      
      .scene-name {
        background: rgba(138, 43, 226, 0.9);
      }
    }
    
    .scene-image {
      width: 200rpx;
      height: 260rpx;
      border-radius: 16rpx;
    }
    
    .scene-name {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 16rpx;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      font-size: 24rpx;
      text-align: center;
    }
  }
}

.story-content {
  background: #fff;
  border-radius: 20rpx;
  overflow: hidden;
  margin-bottom: 40rpx;
  
  .story-header {
    position: relative;
    height: 400rpx;
    
    .story-bg {
      width: 100%;
      height: 100%;
    }
    
    .story-info {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 40rpx 30rpx;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
      
      .story-title {
        font-size: 36rpx;
        color: #fff;
        font-weight: bold;
        margin-bottom: 10rpx;
        display: block;
      }
      
      .story-desc {
        font-size: 28rpx;
        color: rgba(255, 255, 255, 0.9);
        line-height: 1.5;
      }
    }
  }
}

.story-choices {
  padding: 30rpx;
  
  .choice-item {
    background: #f8f8f8;
    border-radius: 16rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    
    &:active {
      background: #f0f0f0;
    }
    
    .choice-text {
      font-size: 32rpx;
      color: #333;
      display: block;
      margin-bottom: 10rpx;
    }
    
    .choice-hint {
      font-size: 24rpx;
      color: #8A2BE2;
    }
  }
}

.progress-bar {
  height: 8rpx;
  background: #eee;
  border-radius: 4rpx;
  overflow: hidden;
  
  .progress {
    height: 100%;
    background: linear-gradient(90deg, #8A2BE2, #9370DB);
    transition: width 0.3s ease;
  }
}
</style> 