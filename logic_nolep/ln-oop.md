# LOGIC NOLEP (OOP.js)

## Selesaikanlah masalah Bank dengan menggunakan structur object

```js
class Bank {
  // Tulis Code Disini
}

class Person {
  // Tulis Code Disini
}

class Member {
  // Tulis Code Disini
}

class Platinum extends Member{
  // Tulis Code Disini
}

class Silver extends Member{
  // Tulis Code Disini
}

class Transaction {
  // Tulis Code Disini
}

// TESTCASE
// TIDAK BOLEH MENGUBAH CODE DI BAWAH INI

let yudhistiraBank = new Bank('Yudhistira Bank')
let nadia = new Person('Nadia')

yudhistiraBank.register(nadia, 'platinum', 5000)
// Saldo awal kurang dari minimum saldo yang ditentukan
yudhistiraBank.register(nadia, 'platinum', 54000)
//Selamat datang ke Yudhistira Bank, Nadia. Nomor Akun anda adalah 6332937. Total saldo adalah 50000

let nadiaAccount = nadia.bankAccount

/* PASTIKAN BAHWA SALDO SELALU BERKURANG ATAU BERTAMBAH UNTUK SETIAP TRANSAKSI */
nadiaAccount.credit(300000)
// Anda sukses menyimpan uang ke dalam bank.

nadiaAccount.credit(1000)
// Belum memenuhi minimal uang yang dapat di setor

nadiaAccount.debet(200000, 'Beli Keyboard')
// Anda sukses menarik uang dari bank

nadiaAccount.debet(130000, 'Beli Keyboard Lagi')
// Saldo minimum anda tidak terpenuhi untuk melakukan transaksi.
nadiaAccount.debet(600000, 'Bisa gak ya lebih besar dari balance ? ')
// Saldo anda tidak cukup

let semmi = new Person('Semmi Verian')
yudhistiraBank.register(semmi, 'silver', 10000000)
let semmiAccount = semmi.bankAccount

nadiaAccount.transfer(semmiAccount, 100000)
// Anda sukses transfer ke Semmi Verian
nadiaAccount.transfer(semmiAccount, 1000000)
// Anda gagal transfer ke Semmi Verian

console.log(semmiAccount)
// Silver {
//   memberName: 'Semmi Verian',
//   accountNumber: 3956725,
//   minimumBalance: 10000,
//   balance: 10100000,
//   transactions: [
//     Transaction {
//       nominal: 100000,
//       status: 'credit',
//       date: 2025-01-28T06:56:51.919Z,
//       note: 'transfer dari akun Semmi Verian'
//     }
//   ],
//   type: 'silver'
// }

console.log(nadiaAccount)
// Platinum {
//   memberName: 'Nadia',
//   accountNumber: 6507671,
//   minimumBalance: 50000,
//   balance: 54000,
//   transactions: [
//     Transaction {
//       nominal: 300000,
//       status: 'credit',
//       date: 2025-01-28T06:56:51.917Z,
//       note: 'nyetor'
//     },
//     Transaction {
//     Transaction {
//       nominal: 200000,
//       status: 'debet',
//       status: 'debet',
//       date: 2025-01-28T06:56:51.918Z,
//       date: 2025-01-28T06:56:51.918Z,
//       note: 'Beli Keyboard'
//       note: 'Beli Keyboard'
//     },
//     },
//     Transaction {
//       nominal: 100000,
//     Transaction {
//       nominal: 100000,
//       status: 'debet',
//       nominal: 100000,
//       status: 'debet',
//       status: 'debet',
//       date: 2025-01-28T06:56:51.919Z,
//       note: 'transfer ke akun Semmi Verian'
//     }
//   ],
//   type: 'platinum'
// }

**Dilarang mengubah code testcase**
