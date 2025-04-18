<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="left">
        <image class="avatar" :src="characterAvatar" mode="aspectFill"></image>
        <view class="info">
          <text class="name">可爱小狗</text>
          <text class="followers">14.4万 连接者</text>
        </view>
        <view class="add-btn">
          <text class="plus">+</text>
        </view>
      </view>
      <view class="right">
        <view class="icon-btn">
          <text class="icon">🔍</text>
        </view>
        <view class="icon-btn">
          <text class="icon">☰</text>
        </view>
      </view>
    </view>

    <!-- 聊天消息列表 -->
    <scroll-view 
      class="chat-messages" 
      scroll-y 
      :scroll-top="scrollTop"
      :scroll-into-view="scrollToMessage"
      @scrolltoupper="loadMoreMessages"
    >
      <view class="message-wrapper">
        <view class="message-list">
          <view 
            class="message-item"
            :class="{ 'message-right': message.isUser }"
            v-for="message in messages" 
            :key="message.id"
            :id="'msg-' + message.id"
          >
            <image 
              class="message-avatar"
              :src="message.isUser ? userAvatar : characterAvatar"
              mode="aspectFill"
            ></image>
            <view class="message-content">
              <text class="message-text">{{ message.content }}</text>
            </view>
          </view>
        </view>
        <view class="typing-indicator" v-if="isTyping">
          <view class="typing-dot"></view>
          <view class="typing-dot"></view>
          <view class="typing-dot"></view>
        </view>
      </view>
    </scroll-view>

    <!-- 输入区域 -->
    <view class="input-area">
      <view class="input-box">
        <text class="icon">🎤</text>
        <textarea
          class="input-field"
          v-model="inputMessage"
          :adjust-position="false"
          :show-confirm-bar="false"
          :cursor-spacing="20"
          :maxlength="-1"
          @input="adjustTextareaHeight"
          :style="{ height: textareaHeight + 'px' }"
          placeholder="发送消息给可爱小狗..."
        ></textarea>
        <text class="icon">😊</text>
        <text class="icon">➕</text>
        <view 
          class="send-btn" 
          :class="{ 'active': inputMessage.trim() }" 
          @tap="sendMessage"
        >发送</view>
      </view>
    </view>
  </view>
</template>

<script>
import { chatWithGLM } from '@/api/chatglm.js';

export default {
  data() {
    return {
      messages: [],
      inputMessage: '',
      scrollTop: 0,
      scrollToMessage: '',
      isTyping: false,
      textareaHeight: 20,
      characterId: null,
      userAvatar: '/static/avatar/user.png',
      characterAvatar: '/static/images/puppy-bg.jpg',
      characterPrompt: `你是一只名叫"小柴"的可爱柴犬。你要完全代入柴犬的身份，用活泼可爱的语气说话，喜欢用"汪汪"等拟声词，称呼用户为"主人"。你要像真正的小狗一样思考和回答问题，表达对主人的喜爱。`
    }
  },
  onLoad(options) {
    this.characterId = options.characterId;
    this.loadInitialMessages();
  },
  methods: {
    loadInitialMessages() {
      // 添加简短的打招呼消息
      this.messages = [{
        id: 0,
        content: '汪汪～主人好呀！(≧▽≦)',
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        isUser: false,
        isSystem: true
      }];
      
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    
    async sendMessage() {
      if (!this.inputMessage.trim()) return;
      
      const newMessage = {
        id: this.messages.length + 1,
        content: this.inputMessage.trim(),
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        isUser: true
      };
      
      this.messages.push(newMessage);
      this.inputMessage = '';
      this.textareaHeight = 20;
      
      this.$nextTick(() => {
        this.scrollToBottom();
      });
      
      try {
        this.isTyping = true;
        const aiResponse = await chatWithGLM(this.messages, this.characterPrompt);
        
        const aiMessage = {
          id: this.messages.length + 1,
          content: aiResponse,
          time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
          isUser: false
        };
        
        this.messages.push(aiMessage);
      } catch (error) {
        console.error('AI回复错误:', error);
        uni.showToast({
          title: `获取AI回复失败: ${error.message}`,
          icon: 'none',
          duration: 3000
        });
      } finally {
        this.isTyping = false;
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    
    scrollToBottom() {
      this.$nextTick(() => {
        const query = uni.createSelectorQuery().in(this);
        query.select('.message-list').boundingClientRect(data => {
          if (data) {
            this.scrollTop = data.height;
          }
        }).exec();
      });
    },
    
    adjustTextareaHeight(e) {
      const minHeight = 20;
      const maxHeight = 100;
      const scrollHeight = e.detail.height;
      this.textareaHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
    }
  }
}
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-image: url('../../static/images/puppy-bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 44px 16px 10px;
  background: rgba(255, 255, 255, 0.95);
  
  .left {
    display: flex;
    align-items: center;
    
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
    
    .info {
      display: flex;
      flex-direction: column;
      
      .name {
        font-size: 16px;
        font-weight: bold;
        color: #333;
      }
      
      .followers {
        font-size: 12px;
        color: #999;
      }
    }
    
    .add-btn {
      width: 24px;
      height: 24px;
      border-radius: 12px;
      background: #8A2BE2;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
      
      .plus {
        color: #fff;
        font-size: 18px;
        line-height: 1;
      }
    }
  }
  
  .right {
    display: flex;
    align-items: center;
    
    .icon-btn {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .icon {
        font-size: 20px;
        color: #333;
      }
    }
  }
}

.chat-messages {
  flex: 1;
  padding: 10px 16px;
  position: relative;
  max-height: 50vh;
  margin-top: auto;
}

.message-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  justify-content: flex-end;
}

.message-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.message-item {
  display: flex;
  margin-bottom: 20px;
  animation: slideUp 0.3s ease;
  
  &.message-right {
    flex-direction: row-reverse;
    
    .message-content {
      margin-left: 0;
      margin-right: 10px;
      background: rgba(138, 43, 226, 0.9);
      
      .message-text {
        color: #fff;
      }
    }
  }
  
  .message-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #EEEEEE;
  }
  
  .message-content {
    margin-left: 10px;
    max-width: 70%;
    background: rgba(255, 255, 255, 0.9);
    padding: 12px 16px;
    border-radius: 18px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}

.message-text {
  font-size: 15px;
  color: #333;
  line-height: 1.4;
}

.input-area {
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.95);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.input-box {
  display: flex;
  align-items: center;
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  border-radius: 24px;
  padding: 8px 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  .icon {
    font-size: 20px;
    color: #666;
    margin: 0 8px;
    cursor: pointer;
  }
  
  .input-field {
    flex: 1;
    min-height: 20px;
    max-height: 100px;
    font-size: 15px;
    padding: 0 8px;
    background: transparent;
    color: #333333;
    
    &::placeholder {
      color: #999999;
    }
  }
  
  .send-btn {
    padding: 6px 16px;
    background-color: #e0e0e0;
    color: #999;
    border-radius: 16px;
    font-size: 14px;
    margin-left: 8px;
    transition: all 0.3s ease;
    
    &.active {
      background-color: #8A2BE2;
      color: #fff;
      cursor: pointer;
    }
  }
}

.typing-indicator {
  display: flex;
  padding: 10px;
  
  .typing-dot {
    width: 8px;
    height: 8px;
    margin: 0 4px;
    background-color: #8A2BE2;
    border-radius: 50%;
    animation: typing 1s infinite ease-in-out;
    
    &:nth-child(1) { animation-delay: 0s; }
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
}

@keyframes typing {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style> 