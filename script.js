document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-btn');
    const resultDiv = document.getElementById('result');
    const spaceNameDiv = document.getElementById('space-name');
    
    generateBtn.addEventListener('click', generateSpaceName);
    
    async function generateSpaceName() {
        const lastName = document.getElementById('last_name').value;
        const birthDate = document.getElementById('birth_date').value;
        
        if (!lastName || !birthDate) {
            alert('氏名と生年月日を入力してください');
            return;
        }
        
        try {
            // API URLをローカル変数として設定（より安全な方法があればそちらを使用）
            const apiUrl = 'https://api.dify.ai/v1/chat-messages';
            
            // APIキーは環境変数から取得するようにNetlifyで設定
            const API_KEY = process.env.DIFY_API_KEY || 'YOUR_FALLBACK_API_KEY';
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    inputs: {
                        last_name: lastName,
                        birth_date: birthDate
                    },
                    query: "宇宙ネームを生成してください"
                })
            });
            
            if (!response.ok) {
                throw new Error(`APIエラー: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (data.answer) {
                spaceNameDiv.textContent = data.answer;
                resultDiv.classList.remove('hidden');
            } else {
                throw new Error('APIレスポンスにデータがありません');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`通信エラーが発生しました: ${error.message}`);
        }
    }
});
