
const crops = ['Rice', 'Wheat', 'Corn', 'Soybean', 'Cotton', 'Sugarcane'];
const mandis = ['Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore', 'Hyderabad'];

let priceData = [];
let chart;

const searchInput = document.getElementById('searchInput');
const voiceSearchBtn = document.getElementById('voiceSearchBtn');
const cropSelect = document.getElementById('cropSelect');
const refreshButton = document.getElementById('refreshButton');
const priceTableBody = document.getElementById('priceTableBody');
const chartTitle = document.getElementById('chartTitle');
const priceChart = document.getElementById('priceChart').getContext('2d');
const englishBtn = document.getElementById('englishBtn');
const hindiBtn = document.getElementById('hindiBtn');


const translations = {
    english: {
        mainTitle: 'Enhanced Indian Mandi Price Tracker',
        searchTitle: 'Search and Filter',
        priceListTitle: 'Price List',
        chartTitle: 'Price Trend',
        searchPlaceholder: 'Search by crop or mandi',
        refreshButton: 'Refresh Data',
        selectCrop: 'Select crop',
        crop: 'Crop',
        mandi: 'Mandi',
        price: 'Price (₹/quintal)',
        lastUpdated: 'Last Updated'
    },
    hindi: {
        mainTitle: 'उन्नत भारतीय मंडी मूल्य ट्रैकर',
        searchTitle: 'खोज और फ़िल्टर',
        priceListTitle: 'मूल्य सूची',
        chartTitle: 'मूल्य प्रवृत्ति',
        searchPlaceholder: 'फसल या मंडी द्वारा खोजें',
        refreshButton: 'डेटा रीफ्रेश करें',
        selectCrop: 'फसल चुनें',
        crop: 'फसल',
        mandi: 'मंडी',
        price: 'मूल्य (₹/क्विंटल)',
        lastUpdated: 'अंतिम अपडेट'
    }
};

let currentLanguage = 'english';


searchInput.addEventListener('input', updateTable);
cropSelect.addEventListener('change', updateChart);
refreshButton.addEventListener('click', fetchPriceData);
voiceSearchBtn.addEventListener('click', startVoiceSearch);
englishBtn.addEventListener('click', () => changeLanguage('english'));
hindiBtn.addEventListener('click', () => changeLanguage('hindi'));

function fetchPriceData() {
    priceData = [];
    for (let i = 0; i < 20; i++) {
        priceData.push({
            id: i,
            crop: crops[Math.floor(Math.random() * crops.length)],
            mandi: mandis[Math.floor(Math.random() * mandis.length)],
            price: Math.floor(Math.random() * (5000 - 1000 + 1) + 1000),
            timestamp: moment().subtract(Math.random() * 7, 'days').format('YYYY-MM-DD HH:mm:ss')
        });
    }
    updateTable();
    updateChart();
}


function updateTable() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = priceData.filter(item =>
        item.crop.toLowerCase().includes(searchTerm) ||
        item.mandi.toLowerCase().includes(searchTerm)
    );

    priceTableBody.innerHTML = '';
    filteredData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.crop}</td>
            <td>${item.mandi}</td>
            <td>₹${item.price.toFixed(2)}</td>
            <td>${moment(item.timestamp).fromNow()}</td>
        `;
        priceTableBody.appendChild(row);
    });
}


function updateChart() {
    const selectedCrop = cropSelect.value || (priceData[0] && priceData[0].crop);
    const chartData = priceData.filter(item => item.crop === selectedCrop);

    chartTitle.textContent = `${translations[currentLanguage].chartTitle}: ${selectedCrop}`;

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(priceChart, {
        type: 'line',
        data: {
            labels: chartData.map(item => item.mandi),
            datasets: [{
                label: translations[currentLanguage].price,
                data: chartData.map(item => item.price),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


function startVoiceSearch() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = currentLanguage === 'english' ? 'en-IN' : 'hi-IN';
    
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        searchInput.value = transcript;
        updateTable();
    };
    
    recognition.start();
}


function changeLanguage(lang) {
    currentLanguage = lang;
    document.getElementById('mainTitle').textContent = translations[lang].mainTitle;
    document.getElementById('searchTitle').textContent = translations[lang].searchTitle;
    document.getElementById('priceListTitle').textContent = translations[lang].priceListTitle;
    chartTitle.textContent = `${translations[lang].chartTitle}: ${cropSelect.value || 'All Crops'}`;
    searchInput.placeholder = translations[lang].searchPlaceholder;
    refreshButton.textContent = translations[lang].refreshButton;
    cropSelect.options[0].text = translations[lang].selectCrop;
    
    const tableHeaders = document.querySelectorAll('#priceTable th');
    tableHeaders[0].textContent = translations[lang].crop;
    tableHeaders[1].textContent = translations[lang].mandi;
    tableHeaders[2].textContent = translations[lang].price;
    tableHeaders[3].textContent = translations[lang].lastUpdated;
    
    englishBtn.classList.toggle('active', lang === 'english');
    hindiBtn.classList.toggle('active', lang === 'hindi');
    
    updateTable();
    updateChart();
}


fetchPriceData();