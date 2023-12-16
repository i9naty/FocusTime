document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.content-section');
    const menuLinks = document.querySelectorAll('.navbar a');
    const timerDisplay = document.getElementById('timer');
    let timer = null;

    menuLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            sections.forEach(section => section.style.display = 'none');
            const activeSection = document.querySelector(link.getAttribute('href'));
            if (activeSection) {
                activeSection.style.display = 'block';
            }
        });
    });

    const startButton = document.getElementById('startTimer');
    const stopButton = document.getElementById('stopTimer');
    const resetButton = document.getElementById('resetTimer');

    startButton.addEventListener('click', function () {
        if (timer === null) {
            timer = setInterval(updateTimer, 1000);
        }
    });

    stopButton.addEventListener('click', function () {
        if (timer !== null) {
            clearInterval(timer);
            timer = null;
        }
    });

    resetButton.addEventListener('click', function () {
        clearInterval(timer);
        timer = null;
        timerDisplay.textContent = '00:00:00';
    });

    function updateTimer() {
        let currentTime = timerDisplay.textContent;
        let [hours, minutes, seconds] = currentTime.split(':').map(Number);
        seconds++;
        if (seconds >= 60) {
            minutes++;
            seconds = 0;
        }
        if (minutes >= 60) {
            hours++;
            minutes = 0;
        }
        timerDisplay.textContent = [hours, minutes, seconds].map(unit => String(unit).padStart(2, '0')).join(':');
    }

    const darkModeButton = document.getElementById('darkMode');
    const body = document.body;
    darkModeButton.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        darkModeButton.textContent = body.classList.contains('dark-mode') ? 'Светлый Режим' : 'Тёмный Режим';
    });

    // График Chart.js
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
            datasets: [{
                label: 'Часы в фокусе',
                data: [2, 3, 4, 5, 3, 2, 1], // Пример данных
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
