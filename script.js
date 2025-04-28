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
            // テスト用にDify APIを直接呼び出す（本番環境では非推奨）
            const API_KEY = 'あなたのDify APIキーをここに入力'; // 注意：本番環境では公開しないでください
            
            const response = await fetch('https://api.dify.ai/v1/chat-messages', {
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
            
            const data = await response.json();
            
            if (data.answer) {
                spaceNameDiv.textContent = data.answer;
                resultDiv.classList.remove('hidden');
            } else {
                alert('エラーが発生しました：' + JSON.stringify(data));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('通信エラーが発生しました：' + error.message);
        }
    }
});
