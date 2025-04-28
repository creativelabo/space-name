// netlify/functions/dify-proxy.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // OPTIONSリクエストの処理（CORS対応）
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  try {
    // リクエストボディを解析
    const requestBody = JSON.parse(event.body);
    
    // APIキーを環境変数から取得
    const apiKey = process.env.DIFY_API_KEY;
    
    if (!apiKey) {
      console.error('APIキーが設定されていません');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'APIキーが設定されていません' })
      };
    }

    console.log('リクエストボディ:', requestBody);
    
    // Dify APIにリクエストを転送
    const response = await fetch('https://api.dify.ai/v1/chat-messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });
    
    // ステータスコードを確認
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Dify APIエラー:', errorData);
      return {
        statusCode: response.status,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          error: 'Dify APIエラー', 
          details: errorData,
          status: response.status
        })
      };
    }
    
    const data = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('サーバーエラー:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};
