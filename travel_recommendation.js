document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    document.getElementById('results').innerText = `You searched for: ${query}`;
});

document.getElementById('reset-button').addEventListener('click', function() {
    document.getElementById('search-input').value = '';
    document.getElementById('results').innerText = '';
});
document.getElementById('search-button').addEventListener('click', function() {
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = ''; // Clear previous results
            data.forEach(item => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                resultItem.innerHTML = `
                    <h3>${item.name}</h3>
                    <img src="${item.imageUrl}" alt="${item.name}">
                `;
                resultsContainer.appendChild(resultItem);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

document.getElementById('reset-button').addEventListener('click', function() {
    document.getElementById('search-input').value = '';
    document.getElementById('results').innerHTML = '';
});
document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value.toLowerCase();
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = ''; // Clear previous results
            const filteredData = data.filter(item => {
                return item.keywords.some(keyword => keyword.toLowerCase().includes(query));
            });
            if (filteredData.length > 0) {
                filteredData.forEach(item => {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'result-item';
                    resultItem.innerHTML = `
                        <h3>${item.name}</h3>
                        <img src="${item.imageUrl}" alt="${item.name}">
                    `;
                    resultsContainer.appendChild(resultItem);
                });
            } else {
                resultsContainer.innerHTML = '<p>No results found.</p>';
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});

document.getElementById('reset-button').addEventListener('click', function() {
    document.getElementById('search-input').value = '';
    document.getElementById('results').innerHTML = '';
});
const recommendations = {
    beach: [
        {
            name: "Bondi Beach",
            image: "https://example.com/bondi.jpg",
            description: "A popular beach in Sydney, Australia, known for its golden sands and great surfing conditions."
        },
        {
            name: "Waikiki Beach",
            image: "https://example.com/waikiki.jpg",
            description: "A famous beach in Honolulu, Hawaii, known for its beautiful views and vibrant nightlife."
        }
    ],
    temple: [
        {
            name: "Angkor Wat",
            image: "https://example.com/angkorwat.jpg",
            description: "A massive temple complex in Cambodia, known for its stunning architecture and historical significance."
        },
        {
            name: "Kinkaku-ji",
            image: "https://example.com/kinkakuji.jpg",
            description: "Also known as the Golden Pavilion, this Zen Buddhist temple in Kyoto, Japan, is famous for its beautiful golden exterior."
        }
    ],
    country: [
        {
            name: "Japan",
            image: "https://th.bing.com/th/id/R.e8e2514d5a525d1cba58438e7cca738a?rik=MdZy6yyJe90w6w&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2015%2f12%2fKoriyama-Castle-Yamatokoriyama-Japan-pond-pond-spring-park-trees-cherry-reflection-lights-wallpaper-background.jpg&ehk=j0PtxF5wFPfZ1FMS9hpvvZ37Bysi%2f9GJ5V%2b1MCLQMXc%3d&risl=&pid=ImgRaw&r=0",
            description: "An island nation in East Asia, known for its rich culture, advanced technology, and beautiful landscapes."
        },
        {
            name: "Italy",
            image: "https://example.com/italy.jpg",
            description: "A European country known for its historic cities, delicious cuisine, and stunning art and architecture."
        }
    ]
};
function fetchRecommendations() {
    const keyword = document.getElementById('keyword').value.toLowerCase();
    const container = document.getElementById('recommendations');
    container.innerHTML = '';

    if (recommendations[keyword]) {
        recommendations[keyword].forEach(place => {
            const recommendationDiv = document.createElement('div');
            recommendationDiv.className = 'recommendation';

            const img = document.createElement('img');
            img.src = place.image;
            img.alt = place.name;

            const description = document.createElement('p');
            description.textContent = `${place.name}: ${place.description}`;

            recommendationDiv.appendChild(img);
            recommendationDiv.appendChild(description);
            container.appendChild(recommendationDiv);
        });
    } else {
        container.innerHTML = '<p>No recommendations found for this keyword.</p>';
    }
    function fetchJSONData() {
        fetch('travel_recommendation_api.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const container = document.getElementById('recommendations');
                data.places.forEach(place => {
                    const placeDiv = document.createElement('div');
                    placeDiv.innerHTML = `<h2>${place.name}</h2><p>${place.location}</p>`;
                    container.appendChild(placeDiv);
                });
            })
            .catch(error => console.error('Unable to fetch data:', error));
    }

    // Call the function to fetch data
    fetchJSONData();
    const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const newYorkTime = new Date().toLocaleTimeString('en-US', options);
    console.log("Current time in New York:", newYorkTime);
}