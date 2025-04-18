<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style lang="scss">
/* 全局样式 */
page {
  background-color: #1a1a1a;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

/* 隐藏滚动条但保持可滚动 */
::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
}

/* 统一的动画过渡 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 统一的按钮样式 */
button {
  &::after {
    border: none;
  }
  
  &[type="primary"] {
    background: linear-gradient(135deg, #8A2BE2, #4A148C);
    
    &.button-hover {
      background: linear-gradient(135deg, #7B27CC, #3A1070);
    }
  }
}

/* 统一的输入框样式 */
input, textarea {
  background-color: #2a2a2a;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: rgba(255,255,255,0.3);
  }
}

/* 统一的卡片样式 */
.card {
  background-color: #2a2a2a;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
}

/* 统一的阴影效果 */
.shadow {
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

/* 统一的渐变背景 */
.gradient-bg {
  background: linear-gradient(135deg, #8A2BE2, #4A148C);
}

/* 统一的状态颜色 */
.success { color: #27AE60; }
.warning { color: #F2C94C; }
.error { color: #EB5757; }
.info { color: #2D9CDB; }

/* 统一的文字溢出处理 */
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.text-ellipsis-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
