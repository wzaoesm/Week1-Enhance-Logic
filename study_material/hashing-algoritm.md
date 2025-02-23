# Hashing Algorithm 

Hashing merupakan praktek keamanan yang menggunakan algoritma untuk memetakan data-data dalam beberapa ukuran untuk menetepkan panjangnya. Dengan mengubah data input yang panjang menjadi value output dengan ukuran yang telah ditentukan sebelumnya, ini’lah yang disebut sebagai hash value. Fungsi hash umumnya meliputi lapisan dan skema terminasi yang berkerja sama dengan fungsi itu sendiri untuk menghasilkan value keamanan yang lebih hebat lagi.

Fungsi hash yang baik memiliki beberapa karakteristik penting:
1. Deterministik: Input yang sama selalu menghasilkan hash yang sama.
2. Efisien: Proses hashing harus cepat.
3. Distribusi merata: Hash harus terdistribusi secara merata di seluruh ruang output.
4. Tahan terhadap collision: Sulit menemukan dua input berbeda yang menghasilkan hash yang sama.
5. Efek avalanche: Perubahan kecil pada input harus menghasilkan perubahan besar pada hash..

Hashing biasanya digunakan untuk:
- Verifikasi integritas data
- Penyimpanan password
- Pengecekan cepat kesamaan data

Berikut adalah contoh sederhana dari hashing algorithm menggunakan JavaScript:

```js
function simpleHash(input) {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return hash;
}

// Contoh penggunaan
const text = "Hello, World!";
console.log(simpleHash(text)); // Output akan berupa angka integer
```

Fungsi ini menggunakan algoritma hashing sederhana yang disebut "djb2". Perlu diingat bahwa ini bukan algoritma kriptografis yang aman dan tidak boleh digunakan untuk tujuan keamanan.

# Hashing pada Blockchain

Hashing memainkan peran krusial dalam teknologi blockchain. Pada blockchain, hashing digunakan untuk beberapa tujuan utama:

1. Integritas Data: Setiap blok dalam blockchain berisi hash dari blok sebelumnya. Ini menciptakan rantai yang tidak dapat diubah, karena mengubah satu blok akan mengubah semua blok berikutnya.
2. Proof of Work (PoW): Dalam banyak blockchain seperti Bitcoin, hashing digunakan dalam proses mining. Miners harus menemukan nilai nonce yang, ketika digabungkan dengan data blok, menghasilkan hash dengan jumlah nol awal tertentu.
3. Identifikasi Transaksi dan Blok: Hash digunakan sebagai identifikator unik untuk transaksi dan blok.
4. Merkle Trees: Struktur data yang menggunakan hashing untuk memverifikasi integritas dan konsistensi data transaksi dalam blok.

Algoritma hashing yang umum digunakan dalam blockchain adalah SHA-256 (Secure Hash Algorithm 256-bit). Ini menghasilkan hash 64 karakter heksadesimal.

Implementasi Sederhana Blockchain menggunakan JavaScript:

```js
const crypto = require('crypto');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return crypto.createHash('sha256').update(
            this.index + 
            this.previousHash + 
            this.timestamp + 
            JSON.stringify(this.data) + 
            this.nonce
        ).digest('hex');
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2024", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

// Penggunaan
let myCoin = new Blockchain();

console.log("Mining block 1...");
myCoin.addBlock(new Block(1, "02/08/2024", { amount: 4 }));

console.log("Mining block 2...");
myCoin.addBlock(new Block(2, "03/08/2024", { amount: 10 }));

console.log("Is blockchain valid? " + myCoin.isChainValid());

// Mencoba memanipulasi blok
myCoin.chain[1].data = { amount: 100 };
console.log("Is blockchain valid? " + myCoin.isChainValid());
```

Penjelasan kode:

1. `Block` class: Merepresentasikan sebuah blok dalam blockchain. Setiap blok memiliki index, timestamp, data, hash dari blok sebelumnya, hash sendiri, dan nonce (digunakan untuk mining).
2. `calculateHash()`: Menghitung hash blok menggunakan SHA-256.
3. `mineBlock()`: Implementasi sederhana dari Proof of Work. Blok di-mine dengan mencari hash yang dimulai dengan sejumlah nol tertentu.
4. `Blockchain class`: Merepresentasikan keseluruhan blockchain.
5. `createGenesisBlock()`: Membuat blok pertama (genesis) dalam blockchain.
6. `addBlock()`: Menambahkan blok baru ke blockchain setelah di-mine.
7. isChainValid()`: Memeriksa integritas seluruh blockchain.


Kode ini mendemonstrasikan konsep dasar blockchain:

- Setiap blok terhubung ke blok sebelumnya melalui previousHash.
- Mining blok menggunakan Proof of Work sederhana.
- Validasi integritas seluruh chain.

ini adalah implementasi sangat sederhana dan tidak mencakup banyak fitur yang ada pada blockchain sebenarnya seperti manajemen transaksi, konsensus terdistribusi, atau keamanan jaringan. karna hashing merupakan fundamental yg penting dalam blockchain oleh karena itu lebih baik kalian mengetahui dasarnya

# Hashing Bcrypt untuk Autentikasi

Bcrypt adalah algoritma hashing yang dirancang khusus untuk password hashing dengan mempertimbangkan keamanan. Berikut adalah breakdown detail cara kerjanya:

### 1. Salt Generation
- Bcrypt secara otomatis menggenerate random salt untuk setiap password
- Salt adalah string random yang ditambahkan ke password sebelum hashing
- Panjang salt default adalah 16 bytes
- Salt disimpan bersama dengan hash (terintegrasi dalam output hash)

### 2. Key Setup (Cost Factor)
- Menggunakan parameter cost/work factor (biasanya dilambangkan sebagai rounds)
- Work factor menentukan berapa kali algoritma akan mengulang proses hashing
- Default rounds biasanya 10, berarti 2^10 iterasi
- Semakin tinggi rounds, semakin lama proses hashing dan semakin aman

### 3. Proses Hashing
1. Password + Salt digabungkan
2. Menggunakan modifikasi algoritma Blowfish untuk enkripsi
3. Melakukan iterasi sesuai work factor
4. Menghasilkan string 60 karakter yang berisi:
   - Algorithm version identifier ($2a$, $2b$, atau $2y$)
   - Cost factor (contoh: 10)
   - Salt (22 karakter)
   - Hash (31 karakter)

### 4. Format Output Hash
```
$2b$10$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LegdxQh5GxXoQhJDu
| |  |  |                                                    |
| |  |  |                                                    Hash
| |  |  Salt (22 chars)
| |  Rounds
| Algorithm version
Algorithm identifier
```

## Implementasi dalam Kode

Berikut contoh implementasi menggunakan Node.js:

```javascript
const bcrypt = require('bcrypt');

// Konfigurasi
const SALT_ROUNDS = 10; // work factor

// Function untuk hashing password
async function hashPassword(plainPassword) {
    try {
        // Generate salt dan hash dalam satu langkah
        const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}

// Function untuk verifikasi password
async function verifyPassword(plainPassword, hashedPassword) {
    try {
        // Membandingkan password plain dengan hash
        const isValid = await bcrypt.compare(plainPassword, hashedPassword);
        return isValid;
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
}

// Contoh penggunaan dalam authentication system
class AuthService {
    async register(username, password) {
        // 1. Hash password
        const hashedPassword = await hashPassword(password);
        
        // 2. Simpan username dan hashed password ke database
        await db.users.create({
            username,
            password: hashedPassword
        });
    }

    async login(username, password) {
        // 1. Ambil user dari database
        const user = await db.users.findOne({ username });
        if (!user) throw new Error('User not found');

        // 2. Verifikasi password
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) throw new Error('Invalid password');

        // 3. Generate session/token
        return generateToken(user);
    }
}
```

## Keunggulan Bcrypt

1. **Slow Hashing**: Sengaja dibuat lambat untuk mencegah brute force attack
2. **Adaptive**: Bisa disesuaikan kecepatannya seiring perkembangan hardware
3. **Built-in Salt**: Menangani generate dan storage salt secara otomatis
4. **Time-tested**: Sudah terbukti aman sejak 1999

## Best Practices

1. Gunakan minimal SALT_ROUNDS = 10 (default)
2. Selalu gunakan async version untuk performa lebih baik
3. Tangani errors dengan proper try-catch
4. Jangan pernah simpan plain password
5. Gunakan HTTPS untuk transmisi password
6. Implementasikan rate limiting untuk mencegah brute force

Hashing bcrypt ini akan sangat berguna sekali pada pembelajaran kalian di phase 1, karena pembuatan server backend itu membutuhkan yang namanya fitur Autentikasi. Hashing password adalah fundamental yang wajib dipelajari bagi para backend developer, Untuk melindungi data penting users yang memakai server backend kita.

Selain itu, masih ada beberapa alternative library untuk hashing password selain bcrypt :

1. **Argon2**
- Pemenang Password Hashing Competition (PHC) 2015
- Lebih baru dan dianggap lebih aman dari bcrypt
- Bisa mengoptimalkan penggunaan memory, CPU, dan parallelism
- Cocok untuk sistem modern dengan resources besar
- Contoh implementasi:
```javascript
const argon2 = require('argon2');

async function hashPassword(password) {
    try {
        return await argon2.hash(password, {
            type: argon2.argon2id,
            memoryCost: 2048,
            timeCost: 3,
            parallelism: 1
        });
    } catch (err) {
        throw err;
    }
}
```

2. **PBKDF2**
- Direkomendasikan oleh NIST
- Sudah teruji waktu dan banyak digunakan
- Lebih sederhana dari bcrypt/Argon2
- Bagus untuk sistem dengan resource terbatas
```javascript
const crypto = require('crypto');
const util = require('util');

const pbkdf2Promise = util.promisify(crypto.pbkdf2);

async function hashPassword(password) {
    const salt = crypto.randomBytes(16);
    const iterations = 100000;
    const hash = await pbkdf2Promise(password, salt, iterations, 64, 'sha512');
    return `${salt.toString('hex')}:${hash.toString('hex')}`;
}
```

3. **Scrypt**
- Dirancang oleh pembuat Tarsnap
- Fokus pada memory-hardness
- Lebih tahan terhadap hardware-based attacks
- Cocok untuk sistem dengan memory besar
```javascript
const crypto = require('crypto');
const util = require('util');

const scryptPromise = util.promisify(crypto.scrypt);

async function hashPassword(password) {
    const salt = crypto.randomBytes(16);
    const keyLength = 64;
    const hash = await scryptPromise(password, salt, keyLength);
    return `${salt.toString('hex')}:${hash.toString('hex')}`;
}
```

Perbandingan:

1. **Keamanan**:
- Argon2 > Scrypt > bcrypt > PBKDF2
- Namun semua masih dianggap aman untuk penggunaan saat ini

2. **Performa**:
- PBKDF2 paling ringan
- Argon2 dan Scrypt membutuhkan lebih banyak memory
- bcrypt seimbang antara CPU dan memory

3. **Ease of Use**:
- bcrypt paling mudah digunakan (built-in salt handling)
- PBKDF2 tersedia di banyak standard library
- Argon2 memerlukan konfigurasi lebih detail

4. **Penggunaan**:
- bcrypt: Masih standard de facto untuk web apps
- Argon2: Semakin populer untuk aplikasi baru
- PBKDF2: Banyak digunakan di sistem legacy
- Scrypt: Populer di cryptocurrency

Yang terpenting adalah:
- Gunakan library yang teruji dan ter-maintain
- Jangan membuat implementasi sendiri
- Update parameter sesuai perkembangan hardware
- Selalu gunakan HTTPS untuk transmisi password
- Terapkan rate limiting dan security best practices lainnya

