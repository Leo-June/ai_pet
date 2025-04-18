// ChatGLM API配置
const API_CONFIG = {
  BASE_URL: 'https://open.bigmodel.cn/api/paas/v4',
  MODEL: 'chatglm_turbo',
  API_KEY: '127c2850302e457f826690f250fa4af1.Vi8wFBOa7CZGWv0f'
};

// 调用ChatGLM API
export const chatWithGLM = async (messages, characterPrompt = '') => {
  try {
    // 构建请求数据
    const requestData = {
      model: API_CONFIG.MODEL,
      messages: [
        {
          role: 'system',
          content: characterPrompt || '你是一个AI助手，性格温柔，说话优雅，富有同理心。'
        },
        ...messages.map(msg => ({
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.content
        }))
      ],
      temperature: 0.7
    };

    console.log('发送请求到ChatGLM API:', requestData);

    const response = await uni.request({
      url: `${API_CONFIG.BASE_URL}/chat/completions`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_CONFIG.API_KEY}`
      },
      data: requestData
    });

    console.log('ChatGLM API响应:', response);

    if (response.statusCode === 200) {
      if (response.data && response.data.choices && response.data.choices[0] && response.data.choices[0].message) {
        return response.data.choices[0].message.content;
      } else {
        console.error('无法识别的响应格式:', response.data);
        throw new Error('API返回数据格式错误，请检查响应数据');
      }
    } else {
      throw new Error(`API请求失败: ${response.statusCode} - ${response.data?.message || '未知错误'}`);
    }
  } catch (error) {
    console.error('ChatGLM API错误:', error);
    if (error.response) {
      console.error('错误响应:', error.response);
    }
    throw error;
  }
}; 