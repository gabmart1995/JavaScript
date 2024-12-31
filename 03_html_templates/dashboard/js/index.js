const canvas = document.getElementById('performance');

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
                    borderRadius: 9999,
                    borderWidth: 10
                },
                {
                    label: 'Tracked',
                    data: [5.5, 5.1, 5.9, 5.5, 5.2, 5.9, 5.5],
                    backgroundColor: '#6c757d',
                    borderRadius: 9999,
                    borderWidth: 10
                }
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
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