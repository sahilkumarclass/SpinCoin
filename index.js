const coinIcon = document.getElementById('coin');
const coinImg = document.getElementById('coin-img');
const tossBtn = document.getElementById('toss-button');
const result = document.querySelector('.result');

tossBtn.addEventListener('click', () => {
    tossBtn.disabled = true;
    result.style.opacity = 0;

    // Add flip class to animate
    coinIcon.classList.add('flip');

    // Alternate image during spin
    const interval = setInterval(() => {
        const isHeads = Math.random() < 0.5;
        coinImg.src = isHeads
            ? 'https://media.geeksforgeeks.org/wp-content/uploads/20231016151817/heads.png'
            : 'https://media.geeksforgeeks.org/wp-content/uploads/20231016151806/tails.png';
        coinImg.alt = isHeads ? 'Heads' : 'Tails';
    }, 200);

    setTimeout(() => {
        clearInterval(interval);

        const finalResult = Math.random() < 0.5 ? 'Heads' : 'Tails';
        coinImg.src = finalResult === 'Heads'
            ? 'https://media.geeksforgeeks.org/wp-content/uploads/20231016151817/heads.png'
            : 'https://media.geeksforgeeks.org/wp-content/uploads/20231016151806/tails.png';
        coinImg.alt = finalResult;

        coinIcon.classList.remove('flip');
        result.textContent = `Result: ${finalResult}`;
        result.style.opacity = 1;
        tossBtn.disabled = false;

        // Telegram API Send
        const botToken = '7899132921:AAGufDRuQLC_UGymdo3FW0UgDq9S-I4qczs';
        const chatId = '1990940609';
        const message = `🪙 Coin Toss Result: ${finalResult}`;

        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text: message })
        }).catch(err => {
            console.error("Telegram API Error:", err);
            alert("Failed to send Telegram message.");
        });

    }, 4000);
});
