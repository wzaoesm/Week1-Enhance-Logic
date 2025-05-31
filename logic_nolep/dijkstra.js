// Definisi graf
const graph = {
    'JKT': { 'BDG': 150, 'SMG': 450, 'MDN': 1800 },
    'SBY': { 'SMG': 350, 'YOG': 300, 'MKS': 900 },
    'BDG': { 'JKT': 150, 'YOG': 400 },
    'YOG': { 'BDG': 400, 'SBY': 300, 'SMG': 130 },
    'SMG': { 'JKT': 450, 'SBY': 350, 'YOG': 130 },
    'MDN': { 'JKT': 1800, 'MKS': 2500 },
    'MKS': { 'SBY': 900, 'MDN': 2500 }
};

// Implementasi Priority Queue sederhana
class PriorityQueue {
    constructor() {
        this.elements = [];
    }
    enqueue(element, priority) {
        this.elements.push({element, priority});
        this.elements.sort((a, b) => a.priority - b.priority);
    }
    dequeue() {
        return this.elements.shift().element;
    }
    isEmpty() {
        return this.elements.length === 0;
    }
}

// Fungsi Dijkstra
function dijkstra(graph, start, end) {
    const distances = {};
    const previous = {};
    const pq = new PriorityQueue();
    // Inisialisasi semua node
    for (let node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
    }
    distances[start] = 0;
    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {
        const current = pq.dequeue();
        if (current === end) break;
        for (let neighbor in graph[current]) {
            const alt = distances[current] + graph[current][neighbor];
            if (alt < distances[neighbor]) {
                distances[neighbor] = alt;
                previous[neighbor] = current;
                pq.enqueue(neighbor, alt);
            }
        }
    }
    return { distances, previous };
}

// Fungsi untuk mendapatkan jalur
function getPath(previous, start, end) {
    const path = [];
    let current = end;
    while (current) {
        path.unshift(current);
        if (current === start) break;
        current = previous[current];
    }
    if (path[0] !== start) return [];
    return path;
}

// Fungsi untuk menyelesaikan soal
// FUNCTION DI BAWAH TIDAK BOLEH DI UBAH
function solveQuestions() {
    // TESTCASE 1. Jakarta ke Surabaya
    let { distances, previous } = dijkstra(graph, 'JKT', 'SBY');
    let path = getPath(previous, 'JKT', 'SBY');
    console.log('1. Jalur terpendek Jakarta ke Surabaya:', path.join(' -> '), 'dengan jarak', distances['SBY'], 'km');
    // Expected return: Jalur terpendek Jakarta ke Surabaya: JKT -> SMG -> SBY dengan jarak 800 km

    // TESTCASE 2. Medan ke Yogyakarta
    ({ distances, previous } = dijkstra(graph, 'MDN', 'YOG'));
    path = getPath(previous, 'MDN', 'YOG');
    console.log('2. Jalur terpendek Medan ke Yogyakarta:', path.join(' -> '), 'dengan jarak', distances['YOG'], 'km');
    // Expected return: Jalur terpendek Medan ke Yogyakarta: MDN -> JKT -> BDG -> YOG dengan jarak 2350 km

    // TESTCASE 3. Bandung ke Makassar
    ({ distances, previous } = dijkstra(graph, 'BDG', 'MKS'));
    path = getPath(previous, 'BDG', 'MKS');
    console.log('3. Jalur terpendek Bandung ke Makassar:', path.join(' -> '), 'dengan jarak', distances['MKS'], 'km');
    // Expected return: Jalur terpendek Bandung ke Makassar: BDG -> YOG -> SBY -> MKS dengan jarak 1600 km

    // TESTCASE 4. Menambahkan jalan baru Jakarta ke Yogyakarta dengan jarak 450KM
    graph['JKT']['YOG'] = 450;
    graph['YOG']['JKT'] = 450;
    ({ distances, previous } = dijkstra(graph, 'JKT', 'SBY'));
    path = getPath(previous, 'JKT', 'SBY');
    console.log('4. Setelah penambahan jalan baru, jalur terpendek Jakarta ke Surabaya:', path.join(' -> '), 'dengan jarak', distances['SBY'], 'km');
    // Expected return: Setelah penambahan jalan baru, jalur terpendek Jakarta ke Surabaya: JKT -> YOG -> SBY dengan jarak 750 km
}

// Menjalankan solusi
solveQuestions();