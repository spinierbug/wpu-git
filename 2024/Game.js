document.addEventListener('DOMContentLoaded', () => {
    let score = 0;
    let timer;
    let seconds = 0;
    let maxTime = 60; // Batas waktu dalam detik (default)

    let gameActive = true; // Tambahkan deklarasi gameActive

    // Ambil elemen untuk menampilkan skor
    const skorElement = document.getElementById('score');
    const customCursor = document.querySelector('.custom-cursor');
    const bg = document.querySelector('.bg');
    const skor = document.querySelector('.skor');
    const hand = document.querySelector('.hand');
    const square = document.querySelector('.square');
    const image = document.getElementById('randomImage');

    // Array lokasi acak
    const positions = [
        { top: '250px', left: '500px' },
        { top: '30%', left: '50%' },
        { top: '50%', left: '62%' },
        { top: '70%', left: '10%' },
        { top: '20%', left: '60%' },
        { top: '60%', left: '10%' }
    ];

    function startTimer() {
        timer = setInterval(() => {
            seconds++;
            document.getElementById('timer').innerText = `${seconds} detik`;

            if (seconds >= maxTime) {
                clearInterval(timer);
                document.getElementById('timer').innerText = `Waktu Habis!`;
                gameActive = false; // Nonaktifkan permainan
                image.removeEventListener('click', handleImageClick); // Nonaktifkan klik pada gambar
            }
        }, 1000);
    }

    window.onload = function () {
        const urlParams = new URLSearchParams(window.location.search);
        const level = urlParams.get('level');
        const username = urlParams.get('username');
        const handImage = urlParams.get('hand');
        const randomImage = urlParams.get('target');

        // Atur waktu berdasarkan level
        if (level === 'easy') {
            maxTime = 60; // 60 detik untuk level easy
        } else if (level === 'medium') {
            maxTime = 45; // 45 detik untuk level medium
        } else if (level === 'hard') {
            maxTime = 30; // 30 detik untuk level hard
        }

        // Menampilkan informasi pengguna
        document.getElementById('userInfo').innerText = `${username}, Level: ${level}`;
        document.getElementById('playerName').innerText = username;
        document.getElementById('handImage').src = handImage;
        document.getElementById('randomImage').src = randomImage;
        startTimer(); // Memulai timer setelah level diatur
    };

    // Tambahkan event listener untuk klik pada gambar
    if (image) {
        image.addEventListener('click', handleImageClick);
    }

    function handleImageClick() {
        if (!gameActive) return;

        // Pilih posisi acak dari array
        const randomPosition = positions[Math.floor(Math.random() * positions.length)];
        image.style.top = randomPosition.top;
        image.style.left = randomPosition.left;
        console.log('posisi:', randomPosition);
        score += 1; // Tambahkan skor
        skorElement.textContent = score; // Update tampilan skor
    }

    // Pastikan elemen custom-cursor mengikuti posisi kursor
    document.addEventListener('mousemove', (e) => {
        if (customCursor) {
            customCursor.style.top = `${e.clientY}px`;
            customCursor.style.left = `${e.clientX}px`;
        }
    });

    // Tampilkan kursor kustom hanya di dalam elemen .bg
    bg.addEventListener('mouseenter', () => {
        document.body.style.cursor = 'none'; // Sembunyikan kursor default
        if (customCursor) {
            customCursor.style.display = 'block'; // Tampilkan kursor kustom
        }
    });

    bg.addEventListener('mouseleave', () => {
        document.body.style.cursor = 'auto'; // Kembalikan kursor default
        if (customCursor) {
            customCursor.style.display = 'none'; // Sembunyikan kursor kustom
        }
    });

    // Kembalikan kursor default ketika diarahkan ke .skor, .hand, atau .square
    [skor, hand, square].forEach((element) => {
        element.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'auto'; // Kembalikan kursor default
            if (customCursor) {
                customCursor.style.display = 'none'; // Sembunyikan kursor kustom
            }
        });

        element.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'none'; // Sembunyikan kursor default
            if (customCursor) {
                customCursor.style.display = 'block'; // Tampilkan kursor kustom
            }
        });
    });
});