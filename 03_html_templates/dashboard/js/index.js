const canvas = document.getElementById('performance');
const date = document.getElementById('date');

if (canvas) {
    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Total',
                    data: [6.5, 5.2, 7.8, 6.5, 5.2, 7.8, 6.5],
                    backgroundColor: '#0d6efd',
                    // borderRadius: 9999,
                    // borderWidth: 10
                },
                {
                    label: 'Tracked',
                    data: [5.5, 5.1, 5.9, 5.5, 5.2, 5.9, 5.5],
                    backgroundColor: '#6c757d',
                    // borderRadius: 9999,
                    // borderWidth: 10
                }
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        // obtiene los valores calculados en la coord. y 
                        callback: function(label) {
                            return (`${label} hrs`);
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

if (date) {
    const dateTime = new Date();
    let result = '';
    let prefix = 'AM';
    let hour = dateTime.getHours();
    let minutes = dateTime.getMinutes();

    if (hour >= 12 && hour <= 23) prefix = 'PM';

    result = `${hour}:${minutes < 10 ? ('0' + minutes) : minutes} ${prefix}`;
    date.innerText = result;
}