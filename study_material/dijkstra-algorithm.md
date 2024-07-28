# Dijkstra’s Algorithm | Part 7

Dijkstra's Algorithm adalah algoritma yang digunakan untuk mencari jalur terpendek dari satu simpul ke semua simpul lain dalam graf berbobot. Algoritma ini dinamakan setelah matematikawan Belanda Edsger W. Dijkstra dan merupakan salah satu algoritma yang paling umum digunakan dalam pemrosesan graf.

Prinsip dasar dari algoritma Dijkstra adalah mempertimbangkan semua jalur yang mungkin dari simpul awal ke simpul tujuan, dan secara bertahap memilih jalur terpendek hingga mencapai simpul tujuan. Algoritma ini cocok untuk digunakan pada graf berbobot, di mana setiap sisi memiliki bobot yang mewakili jarak, biaya, atau metrik lainnya.

Berikut adalah langkah-langkah umum dari algoritma Dijkstra:

1. `Inisialisasi`: Atur nilai jarak awal dari simpul awal ke semua simpul lain sebagai tak terbatas (kecuali simpul awal sendiri yang bernilai 0). Buat sebuah himpunan (atau prioritas antrian) yang berisi simpul-simpul yang akan dijelajahi.

2. `Looping`: Selama himpunan tidak kosong, ambil simpul dengan jarak terpendek dari himpunan dan tandai sebagai "dikunjungi". Kemudian, periksa semua tetangga simpul ini yang belum dikunjungi. Jika jarak baru melalui simpul ini lebih pendek dari jarak sebelumnya, perbarui jaraknya.

3. `Berhenti`: Ulangi langkah 2 sampai himpunan kosong atau hingga Kalian mencapai simpul tujuan.


Setelah algoritma selesai, Kalian akan memiliki informasi tentang jarak terpendek dari simpul awal ke semua simpul lain dalam graf.

Contoh penggunaan Dijkstra's Algorithm dalam JavaScript:

```js
function dijkstra(graph, startNode) {
  const distances = {}; // Menyimpan jarak terpendek dari startNode ke setiap simpul
  const visited = new Set(); // Menandai simpul-simpul yang sudah dikunjungi
  const queue = []; // Antrian prioritas untuk simpul-simpul yang akan dieksplorasi

  // Inisialisasi jarak awal dan antrian
  for (const node in graph) {
    distances[node] = node === startNode ? 0 : Infinity;
    queue.push({ node, distance: distances[node] });
  }

  // Looping utama
  while (queue.length > 0) {
    queue.sort((a, b) => a.distance - b.distance);
    const { node } = queue.shift();

    if (visited.has(node)) continue;

    visited.add(node);

    for (const neighbor in graph[node]) {
      const distance = distances[node] + graph[node][neighbor];
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        queue.push({ node: neighbor, distance });
      }
    }
  }

  return distances;
}

// Contoh graf berbobot dalam bentuk objek
const graph = {
  A: { B: 5, C: 2 },
  B: { A: 5, C: 1, D: 3 },
  C: { A: 2, B: 1, D: 8 },
  D: { B: 3, C: 8 }
};

const startNode = 'A';
const shortestDistances = dijkstra(graph, startNode);
console.log(shortestDistances); // Hasil jarak terpendek dari simpul A ke semua simpul lain
```

Kapan kita harus menggunakan Dijkstra's Algorithm?

Dijkstra's Algorithm sangat berguna ketika Kalian perlu mencari jalur terpendek antara dua simpul dalam graf berbobot. Ini dapat digunakan dalam berbagai konteks seperti perutean jaringan, navigasi peta, perencanaan perjalanan, dan lain-lain. Namun, algoritma ini bekerja efisien hanya pada graf yang tidak memiliki bobot negatif. Jika graf Kalian memiliki bobot negatif, Kalian mungkin perlu mempertimbangkan algoritma lain seperti Bellman-Ford Algorithm.

contoh visualisasi langkah demi langkah dari Dijkstra's Algorithm menggunakan contoh graf berikut:

```
      5       2
  A ----- B ----- C
  |  \  /      |  |
  |   \/       |  |
  |   /\       |  |
  |  /  \      |  |
  D ----- E ----- F
       3       8
```
Graf ini memiliki simpul A, B, C, D, E, dan F, serta sisi-sisi dengan bobot yang ditunjukkan di atas masing-masing sisi.

Langkah 1: Inisialisasi
- Jarak awal dari simpul awal (A) ke semua simpul lain adalah tak terbatas, kecuali jarak dari A ke dirinya sendiri adalah 0.
- Kami memasukkan semua simpul ke dalam antrian prioritas, dengan jarak terpendek pertama.

Langkah 2: Iterasi
- Ambil simpul dengan jarak terpendek dari antrian (di sini adalah simpul A).
- Periksa semua tetangga simpul ini (B dan D).
- Hitung jarak baru melalui simpul saat ini ke tetangga. Jika jarak baru lebih pendek dari jarak sebelumnya, perbarui jarak.
- Tandai simpul saat ini sebagai "dikunjungi".
- Ulangi proses untuk simpul-simpul lain dalam antrian.

Berikut adalah visualisasi langkah-langkahnya:

### Langkah 1: Inisialisasi

```
     A (0)
   /   |   \
5 /    |    \ 2
 /     |     \
B (∞) C (∞) D (∞)   E (∞) F (∞)
```

### Langkah 2: Iterasi (Ambil simpul A)
- Jarak terpendek dari A ke B adalah 5.
- Jarak terpendek dari A ke D adalah 3.

```
     A (0)
   /   |   \
5 /    |    \ 2
 /     |     \
B (5)  C (∞) D (3)   E (∞) F (∞)
```

### Langkah 3: Iterasi (Ambil simpul D)
- Jarak terpendek dari A ke D melalui D adalah 3.
- Jarak terpendek dari A ke E adalah ∞ (belum diketahui).
```
     A (0)
   /   |   \
5 /    |    \ 2
 /     |     \
B (5)  C (∞) D (3)   E (∞) F (∞)
            |
            8
```

### Langkah 4: Iterasi (Ambil simpul B)
- Jarak terpendek dari A ke B melalui D adalah 3 + 3 = 6.
- Jarak terpendek dari A ke C adalah ∞ (belum diketahui).
- Jarak terpendek dari A ke E adalah 5 (tidak berubah).

```
     A (0)
   /   |   \
5 /    |    \ 2
 /     |     \
B (5)  C (∞) D (3)   E (5) F (∞)
        |
        8
```

### Langkah 5: Iterasi (Ambil simpul E)
- Jarak terpendek dari A ke E melalui D adalah 3 + 3 + 3 = 9.
- Jarak terpendek dari A ke C adalah ∞ (belum diketahui).

```
     A (0)
   /   |   \
5 /    |    \ 2
 /     |     \
B (5)  C (∞) D (3)   E (5) F (∞)
        |
        8
        |
        8
```

### Langkah 6: Iterasi (Ambil simpul C)
- Jarak terpendek dari A ke C melalui D adalah 3 + 3 = 6.
```
     A (0)
   /   |   \
5 /    |    \ 2
 /     |     \
B (5)  C (6) D (3)   E (5) F (14)
        |
        8
        |
        8
```

### Langkah 7: Iterasi (Ambil simpul F)
- Jarak terpendek dari A ke F melalui D adalah 3 + 3 + 8 = 14.


Hasil akhir adalah jarak terpendek dari A ke semua simpul lain:
A -> A: 0
A -> B: 5
A -> C: 6
A -> D: 3
A -> E: 5
A -> F: 14

```
     A (0)
   /   |   \
5 /    |    \ 2
 /     |     \
B (5)  C (6) D (3)   E (5) F (14)
        |
        8
        |
        8
```

Semoga visualisasi ini membantu Anda memahami cara kerja Dijkstra's Algorithm!

Semoga visualisasi ini membantu Anda memahami cara kerja Dijkstra's Algorithm!

#

# Belajar contoh implementasi Dijkstra’s Algorithm pada soal competitive programming.


