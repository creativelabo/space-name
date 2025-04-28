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
            // 環境変数またはフォールバックからAPIキーを取得
            // 環境変数またはフォールバックからAPIキーを取得
const API_KEY = 'a381c806-c608-4be2-8431-d794e75cd5c2';
            
const apiUrl = 'https://api.dify.ai/v1/chat-messages';
            
const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`  // 変数を使用
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
