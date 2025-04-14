document.addEventListener('DOMContentLoaded', () => {
    let score = 0;
    let timer; // Variabel untuk menyimpan interval timer
    let waktu = 0; // Waktu dalam detik
    const batasWaktu = 300; // Batas waktu dalam detik (misalnya 5 menit)

        // Ambil elemen untuk menampilkan skor
    const skorElement = document.getElementById('score');
    const customCursor = document.querySelector('.custom-cursor');
    const bg = document.querySelector('.bg');
    const skor = document.querySelector('.skor');
    const hand = document.querySelector('.hand');
    const square = document.querySelector('.square');

    function formatWaktu(detik) {
        const menit = Math.floor(detik / 60);
        const detikSisa = detik % 60;
        return `${String(menit).padStart(2, '0')}:${String(detikSisa).padStart(2, '0')}`;
    }

    function mulaiTimer() {
        clearInterval(timer); // Hentikan timer sebelumnya jika ada
        timer = setInterval(() => {
            if (waktu >= batasWaktu) {
                clearInterval(timer);
                alert("Waktu habis! Skor akhir: " + score);
            } else {
                waktu++;
                document.getElementById('timer').textContent = formatWaktu(waktu);
            }
        }, 1000); // Update setiap detik
    }

    function hentikanTimer() {
        clearInterval(timer); // Hentikan timer
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

    if (image) {
        image.addEventListener('click', () => {
            // Pilih posisi acak dari array
            const randomPosition = positions[Math.floor(Math.random() * positions.length)];
            image.style.top = randomPosition.top;
            image.style.left = randomPosition.left;
            console.log('posisi:', randomPosition);
            image.style.display = 'block'; // Tampilkan gambar
            score += 1;
            skorElement.textContent = score;// Update tampilan skor
        });
    }
});