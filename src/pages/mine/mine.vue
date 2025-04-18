<template>
  <view class="container">
    <!-- 顶部用户信息卡片 -->
    <view class="user-card">
      <view class="user-info">
        <image class="avatar" src="/static/avatar/user.png" mode="aspectFill"></image>
        <view class="info">
          <text class="nickname">亲爱的主人</text>
          <text class="id">ID: 888888</text>
        </view>
      </view>
      <view class="stats">
        <view class="stat-item">
          <text class="number">3</text>
          <text class="label">我的宠物</text>
        </view>
        <view class="stat-item">
          <text class="number">28</text>
          <text class="label">互动天数</text>
        </view>
        <view class="stat-item">
          <text class="number">99</text>
          <text class="label">故事收藏</text>
        </view>
      </view>
    </view>

    <!-- 功能列表 -->
    <view class="feature-list">
      <view class="feature-group">
        <view class="feature-item" @tap="navigateTo('/pages/wallet/wallet')">
          <view class="left">
            <text class="icon">💰</text>
            <text class="title">我的钱包</text>
          </view>
          <text class="arrow">></text>
        </view>
        <view class="feature-item" @tap="navigateTo('/pages/collection/collection')">
          <view class="left">
            <text class="icon">⭐</text>
            <text class="title">我的收藏</text>
          </view>
          <text class="arrow">></text>
        </view>
        <view class="feature-item" @tap="navigateTo('/pages/history/history')">
          <view class="left">
            <text class="icon">📝</text>
            <text class="title">互动记录</text>
          </view>
          <text class="arrow">></text>
        </view>
      </view>

      <view class="feature-group">
        <view class="feature-item" @tap="navigateTo('/pages/settings/settings')">
          <view class="left">
            <text class="icon">⚙️</text>
            <text class="title">设置</text>
          </view>
          <text class="arrow">></text>
        </view>
        <view class="feature-item" @tap="navigateTo('/pages/feedback/feedback')">
          <view class="left">
            <text class="icon">📮</text>
            <text class="title">意见反馈</text>
          </view>
          <text class="arrow">></text>
        </view>
        <view class="feature-item" @tap="navigateTo('/pages/about/about')">
          <view class="left">
            <text class="icon">ℹ️</text>
            <text class="title">关于我们</text>
          </view>
          <text class="arrow">></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        nickname: '亲爱的主人',
        id: '888888',
        pets: 3,
        days: 28,
        stories: 99
      }
    }
  },
  methods: {
    navigateTo(url) {
      uni.showToast({
        title: '功能开发中',
        icon: 'none'
      })
    }
  }
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
}

.user-card {
  background: linear-gradient(135deg, #8A2BE2, #9370DB);
  border-radius: 20rpx;
  padding: 40rpx 30rpx;
  color: #fff;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(138, 43, 226, 0.2);

  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: 40rpx;

    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 60rpx;
      border: 4rpx solid rgba(255, 255, 255, 0.8);
    }

    .info {
      margin-left: 30rpx;

      .nickname {
        font-size: 36rpx;
        font-weight: bold;
        margin-bottom: 10rpx;
        display: block;
      }

      .id {
        font-size: 24rpx;
        opacity: 0.8;
      }
    }
  }

  .stats {
    display: flex;
    justify-content: space-around;
    text-align: center;

    .stat-item {
      .number {
        font-size: 40rpx;
        font-weight: bold;
        display: block;
        margin-bottom: 10rpx;
      }

      .label {
        font-size: 24rpx;
        opacity: 0.8;
      }
    }
  }
}

.feature-list {
  .feature-group {
    background-color: #fff;
    border-radius: 20rpx;
    margin-bottom: 30rpx;
    overflow: hidden;
  }

  .feature-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    border-bottom: 2rpx solid #f5f5f5;

    &:last-child {
      border-bottom: none;
    }

    .left {
      display: flex;
      align-items: center;

      .icon {
        font-size: 40rpx;
        margin-right: 20rpx;
      }

      .title {
        font-size: 28rpx;
        color: #333;
      }
    }

    .arrow {
      color: #999;
      font-size: 24rpx;
    }
  }
}
</style> 