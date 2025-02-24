# Time Complexity

Time complexity adalah konsep dalam analisis algoritma yang digunakan untuk mengukur seberapa efisien sebuah algoritma dalam hal waktu yang dibutuhkan untuk menyelesaikan masalah berdasarkan ukuran inputnya. Dalam kata lain, time complexity mengukur berapa banyak operasi atau langkah yang diperlukan oleh algoritma dalam mengolah inputnya.

Time complexity biasanya diukur dengan notasi `"O besar"` (big O notation), yang memberikan batas atas terhadap pertumbuhan rasio waktu eksekusi algoritma terhadap ukuran inputnya. Beberapa contoh umum dari kompleksitas waktu adalah O(1) (konstan), O(log n) (logaritmik), O(n) (linier), O(n log n) (linierithmic), O(n^2) (kuadratik), dan sebagainya.

berikut adalah contoh lengkap dari beberapa time complexity yang umum : 

## O(1) - Konstan
Algoritma dengan time complexity konstan, di mana waktu eksekusi tidak tergantung pada ukuran input.

```js
function constantExample(array) {
    return array[0]; // Mengambil elemen pertama dari array
}
```

## O(log n) - Logaritmik
Algoritma dengan time complexity logaritmik, biasanya ditemukan dalam algoritma pembagian dan conquering seperti binary search.

```js
function binarySearch(array, target) {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (array[mid] === target) {
            return mid;
        } else if (array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1; // Elemen tidak ditemukan
}
```

## O(n) - Linier
Algoritma dengan time complexity linier, di mana waktu eksekusi tumbuh sebanding dengan ukuran input.

```js
function linearExample(array) {
    for (let i = 0; i < array.length; i++) {
        console.log(array[i]); // Melakukan operasi pada setiap elemen array
    }
}
```

## O(n log n) - Linierithmic
Algoritma dengan time complexity linierithmic, sering ditemukan dalam algoritma pengurutan cepat (quick sort) dan penggabungan (merge sort).

```js
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const pivot = array[0];
    const left = [];
    const right = [];

    for (let i = 1; i < array.length; i++) {
        if (array[i] < pivot) {
            left.push(array[i]);
        } else {
            right.push(array[i]);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}
```

## O(n^2) - Kuadratik
Algoritma dengan time complexity kuadratik, di mana waktu eksekusi tumbuh sebanding dengan kuadrat ukuran input.

```js
function bubbleSort(array) {
    const n = array.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
}
```

![image](https://github.com/user-attachments/assets/eb2944ae-6dd0-4043-a3fd-fab67fb5ecc0)


## Kenapa kita wajib tau Time Complexity ?

1. Dampak Langsung ke Performa Aplikasi:
- Aplikasi yang lambat = pengguna tidak puas
- Biaya server/computing yang lebih tinggi
- Masalah skalabilitas saat data/pengguna bertambah

2. Nilai Professional:
- Kemampuan membuat kode yang efisien adalah skill wajib untuk level senior
- Sering muncul dalam technical interview di perusahaan teknologi
- Menunjukkan pemahaman mendalam tentang fundamental programming

3. Pengambilan Keputusan:
- Membantu memilih algoritma/struktur data yang tepat
- Bisa memperkirakan dampak performa dari solusi yang dibuat
- Lebih mudah mengoptimasi kode yang bermasalah

Intinya, pemahaman Time Complexity membedakan programmer biasa dengan programmer yang berkualitas. Skill ini sangat penting untuk membuat aplikasi yang scalable dan mendapatkan peluang karir yang lebih baik, terutama di perusahaan teknologi besar.
