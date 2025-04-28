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
            // Netlify Functionsを経由してリクエスト
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
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error('エラー:', errorData);
                alert('エラーが発生しました: ' + (errorData.error || response.statusText));
                return;
            }
            
            const data = await response.json();
            
            if (data.answer) {
                spaceNameDiv.textContent = data.answer;
                resultDiv.classList.remove('hidden');
            } else {
                alert('エラーが発生しました: レスポンスに答えがありません');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('通信エラーが発生しました: ' + error.message);
        }
    }
});
