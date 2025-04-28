const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    // API キーを環境変数から取得
    const apiKey = process.env.DIFY_API_KEY;
    
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API key is not configured' })
      };
    }

    console.log('リクエストボディ:', event.body);
    
    // リクエストボディを解析
    const requestBody = JSON.parse(event.body);
    
    // Dify APIにリクエストを送信（単純化したバージョン）
    const response = await fetch('https://api.dify.ai/v1/chat-messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: event.body
    });
    
    const data = await response.json();
    console.log('Dify APIからのレスポンス:', data);
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('エラー:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};
