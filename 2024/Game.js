const button = document.getElementById('showImage');
const image = document.getElementById('randomImage');

// Array lokasi acak
const positions = [
    { top: '10%', left: '20%' },
    { top: '30%', left: '50%' },
    { top: '50%', left: '70%' },
    { top: '70%', left: '10%' },
    { top: '20%', left: '80%' },
    { top: '60%', left: '40%' }
];

button.addEventListener('click', () => {
    // Pilih posisi acak dari array
    const randomPosition = positions[Math.floor(Math.random() * positions.length)];
    image.style.top = randomPosition.top;
    image.style.left = randomPosition.left;
    image.style.display = 'block'; // Tampilkan gambar

    // Tambahkan event listener untuk menghilangkan gambar saat diklik
    image.onclick = () => {
        image.style.display = 'none'; // Sembunyikan gambar saat diklik
    };
});