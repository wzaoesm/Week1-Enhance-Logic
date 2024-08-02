# Dijkstra’s Algorithm

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
Kalian diminta untuk membuat program algoritma dijkstra untuk menghitung jarak terdekat, terdiri dari 3 parameter yaitu :
- ***Graph***: 

## Tugas:
1. Implementasikan fungsi `shortestPathWeightedGraph` dengan tiga parameter:
- graph (objek): Representasi graph berbobot dalam bentuk objek. Setiap properti dalam objek merepresentasikan sebuah simpul dan memiliki nilai yang merupakan array dari objek-objek yang menyatakan tetangga-tetangganya beserta bobotnya. Contohnya: 'A': [{ node: 'B', weight: 3 }, { node: 'C', weight: 2 }] menyatakan bahwa simpul 'A' terhubung ke simpul 'B' dengan bobot 3 dan ke simpul 'C' dengan bobot 2.
- start (string): Nama simpul awal.
- target (string): Nama simpul tujuan.

2. Fungsi tersebut harus mengembalikan jarak terpendek dari simpul start ke simpul target dalam graph berbobot yang diberikan. Jika tidak ada jalur yang memungkinkan, fungsi harus mengembalikan nilai -1.

Contoh:
Misalkan terdapat graph dengan bobot berikut:

![image](https://github.com/user-attachments/assets/92187d25-b39e-4cf3-991e-352f77febe00)

Graph tersebut dapat direpresentasikan dalam bentuk objek sebagai berikut:
```js
{
  'A': { 'B': 8, 'E': 3 },
  'B': { 'A': 8, 'C': 5, 'E': 2 },
  'C': { 'B': 5, 'D': 1, 'F': 3 },
  'D': { 'C': 1, 'F': 5 },
  'E': { 'A': 3, 'B': 2 },
  'F': { 'C': 3, 'D': 5 }
}
```

Jika kita ingin mencari jarak terpendek dari simpul 'A' ke simpul 'D', maka fungsi harus mengembalikan nilai 4.
Contoh code jawab soal tersebut:

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

function dijkstraExplained(graph, start, end) {
  const distances = {};
  const previous = {};
  const pq = new PriorityQueue();
  const visited = new Set();

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

  console.log("Langkah-langkah Algoritma Dijkstra:");

  while (!pq.isEmpty()) {
      const currentVertex = pq.dequeue();
      
      if (currentVertex === end) {
          console.log(`\nNode tujuan ${end} tercapai. Algoritma selesai.`);
          break;
      }

      if (visited.has(currentVertex)) continue;
      visited.add(currentVertex);

      console.log(`\nMemeriksa node ${currentVertex}:`);

      for (let neighbor in graph[currentVertex]) {
          if (visited.has(neighbor)) continue;

          const distance = distances[currentVertex] + graph[currentVertex][neighbor];
          console.log(`  Tetangga ${neighbor}: jarak saat ini = ${distances[neighbor]}, jarak baru = ${distance}`);

          if (distance < distances[neighbor]) {
              distances[neighbor] = distance;
              previous[neighbor] = currentVertex;
              pq.enqueue(neighbor, distance);
              console.log(`    Memperbarui jarak ke ${neighbor}: ${distance}`);
          } else {
              console.log(`    Tidak ada pembaruan untuk ${neighbor}`);
          }
      }
  }

  return { distances, previous };
}

function getPath(previous, start, end) {
  const path = [];
  let current = end;

  while (current !== null) {
      path.unshift(current);
      if (current === start) break;
      current = previous[current];
  }

  return path;
}

function findShortestPath(graph, start, end) {
  const { distances, previous } = dijkstraExplained(graph, start, end);
  const path = getPath(previous, start, end);

  console.log(`\nJarak terpendek dari ${start} ke ${end}: ${distances[end]}`);
  console.log(`Jalur: ${path.join(' -> ')}`);
}

// Contoh penggunaan
// const startNode = 'B';
// const endNode = 'F';

const graph = {
  'A': { 'B': 8, 'E': 3 },
  'B': { 'A': 8, 'C': 5, 'E': 2 },
  'C': { 'B': 5, 'D': 1, 'F': 3 },
  'D': { 'C': 1, 'F': 5 },
  'E': { 'A': 3, 'B': 2 },
  'F': { 'C': 3, 'D': 5 }
};

// TESTCASE 3
findShortestPath(graph, 'F', 'A'); 
// Jarak terpendek dari B ke F: 8 
// Jalur: B -> C -> F

// TESTCASE 3
findShortestPath(graph, 'A', 'F'); 
// Jarak terpendek dari A ke F: 13
// Jalur: A -> E -> B -> C -> F

// TESTCASE 3
findShortestPath(graph, 'C', 'E');
// Jarak terpendek dari C ke E: 7
// Jalur: C -> B -> E
```

berikut penjelasan dari jawaban tersebut:

1. ***class PriorityQueue*** : Kita mendefinisikan kelas PriorityQueue untuk memprioritaskan node dengan jarak terkecil. terdiri connstructor, enqueue, dequeue, is empty.

```js
class PriorityQueue {
    constructor() {
        this.elements = [];
    }
```

Mendefinisikan kelas PriorityQueue. Constructor menginisialisasi array kosong untuk menyimpan elemen.

```js
enqueue(element, priority) {
        this.elements.push({ element, priority });
        this.elements.sort((a, b) => a.priority - b.priority);
    }
```
Metode untuk menambahkan elemen ke queue dengan prioritas tertentu. Setelah menambahkan, array diurutkan berdasarkan prioritas.

```js
dequeue() {
        return this.elements.shift().element;
    }
```
Metode untuk menghapus dan mengembalikan elemen dengan prioritas tertinggi (di awal array).

```js
isEmpty() {
        return this.elements.length === 0;
    }
}
```
Metode untuk memeriksa apakah queue kosong.


2. ***function dijkstraExplained***: Mengimplementasikan algoritma Dijkstra. Ini menghitung jarak terpendek dari node awal ke semua node lain dan juga menjelaskan tentang cara kerja Dijkstra dari tahap-bertahap .

 ```js
function dijkstraExplained(graph, start, end) {
    const distances = {};
    const previous = {};
    const pq = new PriorityQueue();
    const visited = new Set();
``
Fungsi utama algoritma Dijkstra. Inisialisasi variabel-variabel yang diperlukan.

```js
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
```
Inisialisasi jarak awal dan memasukkan semua node ke dalam priority queue.

```js
console.log("Langkah-langkah Algoritma Dijkstra:");
    while (!pq.isEmpty()) {
        const currentVertex = pq.dequeue();
```
Mulai loop utama algoritma. Ambil node dengan jarak terkecil dari queue.

```js
if (currentVertex === end) {
            console.log(`\nNode tujuan ${end} tercapai. Algoritma selesai.`);
            break;
        }
```
Periksa apakah node tujuan telah dicapai.

```js
if (visited.has(currentVertex)) continue;
        visited.add(currentVertex);
```
Tandai node saat ini sebagai dikunjungi.

```js
const distance = distances[currentVertex] + graph[currentVertex][neighbor];
            console.log(`  Tetangga ${neighbor}: jarak saat ini = ${distances[neighbor]}, jarak baru = ${distance}`);
```
Hitung jarak ke tetangga melalui node saat ini.

```js
if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                previous[neighbor] = currentVertex;
                pq.enqueue(neighbor, distance);
                console.log(`    Memperbarui jarak ke ${neighbor}: ${distance}`);
            } else {
                console.log(`    Tidak ada pembaruan untuk ${neighbor}`);
            }
        }
    }
    return { distances, previous };
}
```

Update jarak jika ditemukan jalur yang lebih pendek.

3. ***funtion getPath***: Fungsi getPath digunakan untuk merekonstruksi jalur dari node awal ke node tujuan.
   
```js
function getPath(previous, start, end) {
    const path = [];
    let current = end;
    while (current !== null) {
        path.unshift(current);
        if (current === start) break;
        current = previous[current];
    }
    return path;
}
```


4. ***function findShortestPath***: function findShortestPath digunakan untuk menemukan jalur terpendek, memanggil dijkstraExplained dan getPath.

```js
function findShortestPath(graph, start, end) {
  const { distances, previous } = dijkstraExplained(graph, start, end);
  const path = getPath(previous, start, end);

  console.log(`\nJarak terpendek dari ${start} ke ${end}: ${distances[end]}`);
  console.log(`Jalur: ${path.join(' -> ')}`);
}
```

```js
const startNode = 'A';
const endNode = 'F';
findShortestPath(graph, startNode, endNode);
```
Menjalankan algoritma dengan node awal 'A' dan node akhir 'F'.

```js
const graph = {
    'A': { 'B': 8, 'E': 3 },
    'B': { 'A': 8, 'C': 5, 'E': 2 },
    'C': { 'B': 5, 'D': 1, 'F': 3 },
    'D': { 'C': 1, 'F': 5 },
    'E': { 'A': 3, 'B': 2 },
    'F': { 'C': 3, 'D': 5 }
};
```
Mendefinisikan struktur graf. Setiap kunci adalah node, dan nilainya adalah objek yang mewakili tetangga dengan bobot edge.
