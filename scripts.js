document.addEventListener('DOMContentLoaded', function() {
    const API_KEY = '8P1TBRI52PFGLE4F'; 
    const CHANNEL_ID = '2576551'; 
    const FIELD_ROOM_ID = 'field1'; 
    const FIELD_STUDENT_NAME = 'field2';
    function fetchData() {
        const url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${API_KEY}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector('#dataLog tbody');
                tableBody.innerHTML = ''; // Clear existing data

                const sortedFeeds = data.feeds.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                const limitedFeeds = sortedFeeds.slice(0, 20);

                limitedFeeds.forEach(feed => {
                    const row = document.createElement('tr');
                    const timeCell = document.createElement('td');
                    const roomIDCell = document.createElement('td');
                    const studentNameCell = document.createElement('td');

                    const date = new Date(feed.created_at);
                    timeCell.textContent = date.toLocaleString();
                    roomIDCell.textContent = feed[FIELD_ROOM_ID];
                    studentNameCell.textContent = feed[FIELD_STUDENT_NAME];

                    row.appendChild(timeCell);
                    row.appendChild(roomIDCell);
                    row.appendChild(studentNameCell);
                    tableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    fetchData(); // Fetch data when the page loads

    // Optional: Auto-refresh data every 30 seconds
    setInterval(fetchData, 300);
});
