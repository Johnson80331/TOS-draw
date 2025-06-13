let totalDraws = 0
let cardPool = [];
fetch('data/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        cardPool = data;
    })
    .catch(error => {
        console.error('Error fetching the JSON data:', error);
    });
function getRandomCard() {
    const Rand = Math.floor(Math.random() * 1000) + 1;
    let total = 0;
    for (const card of cardPool) {
        total += card.probability;
        if (Rand <= total) return card;
    }
}
function drawCards(count) {
    const container = document.getElementById('results');
    container.innerHTML = '';
    container.classList.toggle('single', count === 1);

    for (let i = 0; i < count; i++) {
        totalDraws++;
        let card = getRandomCard();
        if (totalDraws%35 === 0) card = cardPool[0];

        const imgSrc = `data/images/${card.id}.png`;

        const cardDiv = document.createElement('div');
        cardDiv.className = `card ${card.rarity}`;

        const img = document.createElement('img');
        img.src = imgSrc;

        cardDiv.appendChild(img);
        container.appendChild(cardDiv);
    }

    document.getElementById('drawNumber').textContent = 35 - totalDraws % 35;
    // drawCountEl.textContent = `抽卡數: ${rarity}`;
}
