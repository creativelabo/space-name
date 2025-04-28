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
            // ここでは環境変数からAPIキーを読み込む代わりに、Netlify Functionsを使用
            const response = await fetch('/.netlify/functions/dify-proxy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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
                alert('エラーが発生しました。もう一度お試しください。');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('通信エラーが発生しました。インターネット接続を確認してください。');
        }
    }
});
