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
class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    enqueue(element, priority) {
        this.elements.push({ element, priority });
        this.elements.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.elements.shift().element;
    }

    isEmpty() {
        return this.elements.length === 0;
    }
}

function dijkstra(graph, start) {
    const distances = {};
    const previous = {};
    const pq = new PriorityQueue();

    // Inisialisasi
    for (let vertex in graph) {
        if (vertex === start) {
            distances[vertex] = 0;
            pq.enqueue(vertex, 0);
        } else {
            distances[vertex] = Infinity;
            pq.enqueue(vertex, Infinity);
        }
        previous[vertex] = null;
    }

    while (!pq.isEmpty()) {
        const currentVertex = pq.dequeue();

        for (let neighbor in graph[currentVertex]) {
            const distance = distances[currentVertex] + graph[currentVertex][neighbor];

            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                previous[neighbor] = currentVertex;
                pq.enqueue(neighbor, distance);
            }
        }
    }

    return { distances, previous };
}

function getPath(previous, end) {
    const path = [];
    let current = end;

    while (current !== null) {
        path.unshift(current);
        current = previous[current];
    }

    return path;
}

// Definisi graf
const graph = {
    A: { B: 7, E: 1 },
    B: { A: 7, C: 3, E: 8 },
    C: { B: 3, D: 6, E: 2 },
    D: { C: 6, E: 7 },
    E: { A: 1, B: 8, C: 2, D: 7 }
};

const startNode = 'A';
const { distances, previous } = dijkstra(graph, startNode);

console.log("Jarak terpendek dari node A:");
for (let node in distances) {
    console.log(`Ke ${node}: ${distances[node]}`);
    const path = getPath(previous, node);
    console.log(`  Jalur: ${path.join(' -> ')}`);
}
```

Kapan kita harus menggunakan Dijkstra's Algorithm?

Dijkstra's Algorithm sangat berguna ketika Kalian perlu mencari jalur terpendek antara dua simpul dalam graf berbobot. Ini dapat digunakan dalam berbagai konteks seperti perutean jaringan, navigasi peta, perencanaan perjalanan, dan lain-lain. Namun, algoritma ini bekerja efisien hanya pada graf yang tidak memiliki bobot negatif. Jika graf Kalian memiliki bobot negatif, Kalian mungkin perlu mempertimbangkan algoritma lain seperti Bellman-Ford Algorithm.

contoh visualisasi langkah demi langkah dari Dijkstra's Algorithm dari Node A ke semua node menggunakan contoh graf berikut:

![image](https://github.com/user-attachments/assets/5b10d2f5-74aa-43d9-8123-4d09669352d2)

Graf ini memiliki simpul A, B, C, D, dan E, serta sisi-sisi dengan bobot yang ditunjukkan di atas masing-masing sisi.

## ***Langkah-langkah algoritma Dijkstra dari node A***:

### Langkah 1: Inisialisasi
- Jarak ke A = 0
- Jarak ke B, C, D, E = ∞ (tak terhingga)
- Set node yang belum dikunjungi: {A, B, C, D, E}

![image](https://github.com/user-attachments/assets/d3ed9ea7-8a17-409c-a625-199fd41328e4)

### Langkah 2: Mulai dari node A
- Periksa tetangga A: B (jarak 7) dan E (jarak 1)
- Perbarui jarak: B = 7, E = 1
- Tandai A sebagai dikunjungi
- Set yang belum dikunjungi: {B, C, D, E} dari jarak sebelumnya, perbarui jarak.

![image](https://github.com/user-attachments/assets/4dbf23a8-951a-4e09-a048-33902527c13e)

### Langkah 3: Pilih node dengan jarak terkecil yang belum dikunjungi (E):
- Periksa tetangga E: B (8+1=9), C (2+1=3), D (7+1=8)
- Perbarui jarak: B tetap 7, C = 3, D = 8
- Tandai E sebagai dikunjungi
- Set yang belum dikunjungi: {B, C, D}

![image](https://github.com/user-attachments/assets/67260b16-b807-4691-a4d4-317d1a41b465)

### Langkah 4: Pilih node dengan jarak terkecil yang belum dikunjungi (C):
- Periksa tetangga C: B (3+3=6), D (6+3=9)
- Perbarui jarak: B = 6 (baru), D tetap 8
- Tandai C sebagai dikunjungi
- Set yang belum dikunjungi: {B, D}

![image](https://github.com/user-attachments/assets/33d21a62-9dc5-4ca4-83de-efba1f38db02)

### Langkah 5: Pilih node dengan jarak terkecil yang belum dikunjungi (B):
- Periksa tetangga B: D (tidak perlu diperiksa karena C dan D sudah dikunjungi)
- Tidak ada pembaruan jarak
- Tandai B sebagai dikunjungi
- Set yang belum dikunjungi: {D}

![image](https://github.com/user-attachments/assets/eda8a195-e67a-45ae-bb7c-2b69515fa7fc)

### Langkah 6: Kunjungi node terakhir (D):
- Tidak ada tetangga yang belum dikunjungi
- Tandai D sebagai dikunjungi
- Semua node telah dikunjungi

![image](https://github.com/user-attachments/assets/b79de2f1-ff4d-4e06-a0c5-9bf1f72eb411)

Semoga visualisasi ini membantu Anda memahami cara kerja Dijkstra's Algorithm!

# Belajar contoh implementasi Dijkstra’s Algorithm pada soal competitive programming.

## Deskripsi Soal:
Kalian diminta untuk mengimplementasikan sebuah fungsi shortestPathWeightedGraph yang akan menghitung jarak terpendek antara dua simpul pada sebuah graph berbobot. Graph tersebut akan diwakili oleh objek JavaScript yang memiliki properti-properti sebagai simpul-simpulnya dan nilai-nilai sebagai koneksi antar simpul dengan bobot yang terhubung.

## Tugas:
1. Implementasikan fungsi `shortestPathWeightedGraph` dengan tiga parameter:
- graph (objek): Representasi graph berbobot dalam bentuk objek. Setiap properti dalam objek merepresentasikan sebuah simpul dan memiliki nilai yang merupakan array dari objek-objek yang menyatakan tetangga-tetangganya beserta bobotnya. Contohnya: 'A': [{ node: 'B', weight: 3 }, { node: 'C', weight: 2 }] menyatakan bahwa simpul 'A' terhubung ke simpul 'B' dengan bobot 3 dan ke simpul 'C' dengan bobot 2.
- start (string): Nama simpul awal.
- target (string): Nama simpul tujuan.

2. Fungsi tersebut harus mengembalikan jarak terpendek dari simpul start ke simpul target dalam graph berbobot yang diberikan. Jika tidak ada jalur yang memungkinkan, fungsi harus mengembalikan nilai -1.

Contoh:
Misalkan terdapat graph dengan bobot berikut:
```
A --3-- B --1-- C --2-- D
```

Graph tersebut dapat direpresentasikan dalam bentuk objek sebagai berikut:
```js
{
  'A': [{ node: 'B', weight: 3 }, { node: 'C', weight: 2 }],
  'B': [{ node: 'C', weight: 1 }, { node: 'D', weight: 4 }],
  'C': [{ node: 'D', weight: 2 }],
  'D': []
}
```

Jika kita ingin mencari jarak terpendek dari simpul 'A' ke simpul 'D', maka fungsi harus mengembalikan nilai 4.
Contoh code jawab soal tersebut:

```js
function shortestPathWeightedGraph(graph, start, target) {
  const INF = Number.MAX_SAFE_INTEGER; // Jarak tak terhingga untuk inisialisasi
  const distances = {}; // Menyimpan jarak terpendek dari start ke setiap simpul
  const visited = new Set(); // Menandai simpul yang sudah dikunjungi
  const priorityQueue = []; // Priority queue sederhana

  // Inisialisasi jarak dari start ke semua simpul dengan tak terhingga
  for (const node in graph) {
    distances[node] = INF;
  }

  distances[start] = 0; // Jarak dari start ke start adalah 0
  priorityQueue.push([start, 0]); // Masukkan simpul start ke priority queue dengan jarak 0

  // Loop hingga priority queue kosong
  while (priorityQueue.length > 0) {
    priorityQueue.sort((a, b) => a[1] - b[1]); // Urutkan berdasarkan jarak terpendek
    const [currentNode, currentDistance] = priorityQueue.shift(); // Ambil simpul dengan jarak terpendek dari priority queue

    if (visited.has(currentNode)) {
      continue; // Lewati jika simpul sudah dikunjungi sebelumnya
    }

    visited.add(currentNode); // Tandai simpul sebagai dikunjungi

    // Iterasi melalui tetangga dari simpul saat ini
    for (const { node: neighbor, weight } of graph[currentNode]) {
      const totalDistance = currentDistance + weight;
      // Update jarak terpendek jika totalDistance lebih kecil dari jarak sebelumnya
      if (totalDistance < distances[neighbor]) {
        distances[neighbor] = totalDistance;
        priorityQueue.push([neighbor, totalDistance]); // Masukkan simpul tetangga ke priority queue
      }
    }
  }

  // Kembalikan jarak terpendek dari start ke target, jika tidak ada jalur, kembalikan -1
  return distances[target] !== INF ? distances[target] : -1;
}

// Implementasi Dijkstra's Algorithm dimulai dari fungsi shortestPathWeightedGraph
// yang menerima graph berbobot, simpul awal, dan simpul tujuan. Kode tersebut
// melakukan inisialisasi variabel dan priority queue, lalu iterasi melalui simpul-simpul
// untuk mencari jarak terpendek dari start ke target.
// Setelah selesai, fungsi mengembalikan jarak terpendek atau -1 jika tidak ada jalur.

// Testcase 1
console.log(shortestPathWeightedGraph({
  // Visualisasi graph:
  //   A --3-- B --1-- C --2-- D
  'A': [{ node: 'B', weight: 3 }, { node: 'C', weight: 2 }],
  'B': [{ node: 'C', weight: 1 }, { node: 'D', weight: 4 }],
  'C': [{ node: 'D', weight: 2 }],
  'D': []
}, 'A', 'D')); // Output: 4

// Testcase 2
console.log(shortestPathWeightedGraph({
  // Visualisasi graph:
  //   A --3-- B --1-- C --2-- D
  'A': [{ node: 'B', weight: 3 }, { node: 'C', weight: 2 }],
  'B': [{ node: 'C', weight: 1 }, { node: 'D', weight: 4 }],
  'C': [{ node: 'D', weight: 2 }],
  'D': []
}, 'B', 'D')); // Output: 3

// Testcase 3
console.log(shortestPathWeightedGraph({
  // Visualisasi graph:
  //   A --3-- B --1-- C --2-- D
  'A': [{ node: 'B', weight: 3 }, { node: 'C', weight: 2 }],
  'B': [{ node: 'C', weight: 1 }, { node: 'D', weight: 4 }],
  'C': [{ node: 'D', weight: 2 }],
  'D': []
}, 'A', 'A')); // Output: 0

// Testcase 4
console.log(shortestPathWeightedGraph({
  // Visualisasi graph:
  //   A --3-- B --1-- C --2-- D
  'A': [{ node: 'B', weight: 3 }, { node: 'C', weight: 2 }],
  'B': [{ node: 'C', weight: 1 }, { node: 'D', weight: 4 }],
  'C': [{ node: 'D', weight: 2 }],
  'D': []
}, 'C', 'B')); // Output: -1
```

berikut penjelasan dari jawaban tersebut:

1. Inisialisasi Variabel: Pada awalnya, kode membuat variabel INF yang merepresentasikan jarak tak terhingga, objek distances untuk menyimpan jarak terpendek dari start ke setiap simpul, visited sebagai himpunan untuk menyimpan simpul yang sudah dikunjungi, dan priorityQueue sebagai antrean prioritas sederhana.

2. Inisialisasi Jarak: Loop pertama for (const node in graph) digunakan untuk menginisialisasi jarak dari simpul start ke semua simpul lainnya dengan nilai tak terhingga, kecuali simpul start sendiri yang diinisialisasi dengan 0.

3. Algoritma Dijkstra's: Selanjutnya, algoritma Dijkstra dimulai dengan menggunakan priority queue yang diurutkan berdasarkan jarak terpendek. Ini memastikan bahwa simpul dengan jarak terpendek selalu diambil dari antrian terlebih dahulu.

4. Pengolahan Simpul: Setelah mengambil simpul dengan jarak terpendek dari priority queue, kode memeriksa apakah simpul tersebut sudah dikunjungi sebelumnya. Jika sudah, maka simpul dilewati.

5. Pengolahan Tetangga: Selanjutnya, kode melakukan iterasi melalui tetangga-tetangga dari simpul saat ini. Untuk setiap tetangga, total jarak dari start ke tetangga tersebut dihitung dan dibandingkan dengan jarak sebelumnya. Jika total jarak lebih kecil, maka jarak terpendek diperbarui dan tetangga dimasukkan ke dalam priority queue.

6. Kembali Hasil: Setelah semua simpul telah diproses, hasil akhir ditemukan di objek distances. Jika jarak terpendek dari start ke target tidak berubah (masih tak terhingga), maka dikembalikan nilai -1, menandakan bahwa tidak ada jalur dari start ke target.

7. Testcase dan Implementasi: Di bawah komentar "Testcase 1" dan seterusnya, terdapat pemanggilan fungsi shortestPathWeightedGraph dengan graph dan testcase yang berbeda. Kode ini menguji algoritma Dijkstra dengan contoh kasus dan mencetak hasil ke konsol.

Keseluruhan implementasi di atas menggunakan pendekatan Dijkstra's Algorithm untuk mencari jarak terpendek antara simpul start dan target pada graph berbobot. Komentar pada kode menjelaskan langkah-langkah yang diambil dalam algoritma untuk memastikan pemahaman yang lebih baik.
