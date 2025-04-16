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
                console.log('Waktu habis, memanggil showGameOver'); // Debugging
                showGameOver(score); // Tampilkan menu Game Over
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
        const customCursor = document.querySelector('.custom-cursor');
        if (customCursor) {
            customCursor.style.position = 'absolute'; // Pastikan elemen dapat diposisikan
            customCursor.style.top = `${e.clientY}px`; // Atur posisi vertikal
            customCursor.style.left = `${e.clientX}px`; // Atur posisi horizontal
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

    function showGameOver(score) {
        console.log('Game Over dipanggil dengan skor:', score); // Debugging
        const gameOverMenu = document.getElementById('gameOverMenu');
        const finalScore = document.getElementById('finalScore');
        const playerName = document.getElementById('playerName').innerText; // Ambil nama pemain
    
        if (!gameOverMenu || !finalScore) {
            console.error('Elemen gameOverMenu atau finalScore tidak ditemukan!');
            return;
        }
    
        finalScore.innerText = score;
        gameOverMenu.style.display = 'block';
    
        // Perbarui leaderboard
        updateLeaderboard(playerName, score);
    
        console.log('Menu Game Over berhasil ditampilkan'); // Debugging
    }

    // Fungsi untuk mengulang permainan
    document.getElementById('retryButton').onclick = function() {
        document.getElementById('gameOverMenu').style.display = 'none';
        // Tambahkan logika untuk mengulang permainan
        score = 0; // Reset skor
        seconds = 0; // Reset waktu
        document.getElementById('score').textContent = score; // Update tampilan skor
        document.getElementById('timer').innerText = `00:00`; // Reset timer
        gameActive = true; // Aktifkan kembali permainan
        startTimer(); // Mulai timer lagi
        // Reset posisi gambar target
        const randomPosition = positions[Math.floor(Math.random() * positions.length)];
        image.style.top = randomPosition.top;
        image.style.left = randomPosition.left;
        image.addEventListener('click', handleImageClick); // Aktifkan kembali klik pada gambar
    };

    // Fungsi untuk kembali ke menu utama
    document.getElementById('backToMenuButton').onclick = function() {
        document.getElementById('gameOverMenu').style.display = 'none';
        // Tambahkan logika untuk kembali ke menu utama
        // Misalnya, redirect ke halaman menu utama
        window.location.href = 'Login.html'; // Ganti dengan URL menu utama Anda
    };

    function updateLeaderboard(playerName, score) {
        const leaderboard = document.querySelector('.square'); // Elemen leaderboard
        const playerDiv = document.createElement('div'); // Elemen baru untuk pemain
    
        playerDiv.classList.add('player'); // Tambahkan kelas CSS
        playerDiv.innerHTML = `
            <span class="name">${playerName}</span>
            <br>
            <span class="score">Score: ${score}</span>
            <button>Detail</button>
        `;
    
        leaderboard.appendChild(playerDiv); // Tambahkan elemen pemain ke leaderboard
        sortLeaderboard(); // Urutkan leaderboard setelah menambahkan pemain baru
    }

    function sortLeaderboard(order = 'desc') {
        const leaderboard = document.querySelector('.square');
        const players = Array.from(leaderboard.querySelectorAll('.player'));
    
        players.sort((a, b) => {
            const scoreA = parseInt(a.querySelector('.score').innerText.split(': ')[1]);
            const scoreB = parseInt(b.querySelector('.score').innerText.split(': ')[1]);
    
            if (order === 'asc') {
                return scoreA - scoreB; // Urutkan dari skor terendah ke tertinggi
            } else {
                return scoreB - scoreA; // Urutkan dari skor tertinggi ke terendah
            }
        });
    
        // Hapus semua elemen pemain dan tambahkan kembali dalam urutan yang benar
        players.forEach(player => leaderboard.appendChild(player));
    }

    document.querySelector('select').addEventListener('change', (event) => {
        const sortOption = event.target.value;
    
        if (sortOption === 'highest') {
            sortLeaderboard('desc'); // Urutkan dari skor tertinggi ke terendah
        } else if (sortOption === 'lowest') {
            sortLeaderboard('asc'); // Urutkan dari skor terendah ke tertinggi
        }
    });

});