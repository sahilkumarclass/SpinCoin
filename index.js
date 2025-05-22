const coin = document.getElementById('coin');
const coinInner = document.querySelector('.coin-inner');
const tossBtn = document.getElementById('toss-button');
const result = document.getElementById('result');
const status = document.getElementById('status');

// Enhanced coin toss function
tossBtn.addEventListener('click', () => {
    tossBtn.disabled = true;
    result.classList.remove('show');
    result.style.opacity = 0;
    status.innerHTML = 'Sending to Telegram <span class="loading"></span>';

    tossCoinFunction();
});

function tossCoinFunction() {
    const randomVal = Math.random();
    const faceCoin = randomVal < 0.5 ? 'Heads' : 'Tails';
    const botToken = '7899132921:AAGufDRuQLC_UGymdo3FW0UgDq9S-I4qczs';
    const chatId = '1990940609';
    const timestamp = new Date().toLocaleTimeString();
    const message = `🪙 Coin Toss Result: ${faceCoin} - ${timestamp}`;

    // Send Telegram message first
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message })
    })
        .then(response => {
            if (!response.ok) throw new Error('Telegram API failed');

            status.textContent = 'Message sent! Tossing coin...';

            // Start coin animation
            coinInner.classList.add('spinning');

            setTimeout(() => {
                // Remove spinning animation and add final flip
                coinInner.classList.remove('spinning');
                coinInner.classList.add('final-flip');

                // Set final position based on result
                const finalRotation = faceCoin === 'Heads' ? 0 : 180;
                coinInner.style.transform = `rotateY(${finalRotation}deg)`;

                setTimeout(() => {
                    // Show result with animation
                    result.textContent = `🎉 Result: ${faceCoin.toUpperCase()}! 🎉`;
                    result.classList.add('show');
                    status.textContent = `Result: ${faceCoin}`;

                    // Add confetti effect
                    createConfetti();

                    // Reset everything
                    setTimeout(() => {
                        coinInner.classList.remove('final-flip');
                        coinInner.style.transform = '';
                        tossBtn.disabled = false;
                    }, 1000);

                }, 800);
            }, 4000);
        })
        .catch(error => {
            console.error("Telegram API Error:", error);
            status.textContent = 'Failed to send to Telegram';
            result.textContent = '❌ Error occurred';
            result.classList.add('show');
            tossBtn.disabled = false;

            setTimeout(() => {
                status.textContent = '';
            }, 3000);
        });
}

// Confetti effect function
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 50);
    }
}

// Add hover effect to coin
coin.addEventListener('mouseenter', () => {
    if (!tossBtn.disabled) {
        coinInner.style.transform = 'rotateY(10deg) rotateX(10deg)';
    }
});

coin.addEventListener('mouseleave', () => {
    if (!tossBtn.disabled) {
        coinInner.style.transform = '';
    }
});