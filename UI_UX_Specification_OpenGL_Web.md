# Dokumen Spesifikasi UI/UX: OpenGL Configuration & AI Troubleshooter Generator

Dokumen ini memuat panduan komprehensif, arsitektur informasi, alur pengguna (*user flow*), serta cetak biru (*blueprint*) desain UI/UX untuk web *OpenGL Configuration & AI Troubleshooter*. Desain ini dirancang khusus untuk memberikan pengalaman yang ringkas, interaktif, dan berorientasi sistem, guna memastikan proyek Anda tampil menonjol dan berbeda dari aplikasi *chat bot* konvensional.

---

## 1. Filosofi Desain & Palet Warna

Aplikasi ini menggunakan pendekatan **System-Oriented Dashboard**. Berbeda dengan web *AI EdTech* yang menggunakan elemen kartu (*cards*) atau UI ramah anak, web ini menggunakan visual bergaya *Cyberpunk Industrial* atau *Modern Code Editor* untuk menyesuaikan mentalitas pemrograman tingkat rendah (*low-level programming*).

* **Warna Utama (Background):** `#0d1117` (Deep Obsidian Gray / Gaya GitHub Dark). Memberikan kesan fokus, profesional, dan nyaman di mata untuk *deep work*.
* **Warna Aksen 1 (Terminal & Sukses):** `#238636` atau `#4af626` (Neon Cyber Green). Digunakan untuk teks terminal, status sukses, dan tombol eksekusi utama.
* **Warna Aksen 2 (Sistem & Brand):** `#58a6ff` (Electric Tech Blue). Digunakan untuk komponen dropdown, penanda seleksi, dan tautan dokumentasi.
* **Warna Peringatan (Error/Anomali):** `#f85149` (Crimson Alert Red). Digunakan khusus untuk area visualisasi error dan indikasi *bug*.
* **Tipografi:**
    * Sistem Navigasi & Label: *Inter* atau *Roboto* (Clean Sans-Serif).
    * Area Kode & Terminal: *Fira Code*, *JetBrains Mono*, atau *Courier New* (Monospace) untuk memperkuat estetika lingkungan koding.

---

## 2. Struktur Arsitektur Informasi (Tata Letak Halaman)

Layout halaman dirancang menggunakan sistem **Single Page Application (SPA) / Split-Screen Dashboard** (Tanpa scroll panjang ke bawah, memanfaatkan ruang layar secara efisien mirip dengan IDE seperti VS Code).

```
+-----------------------------------------------------------------------------------------+
| [Icon] OpenGL Setup & AI Troubleshooter Generator                     [Status: 99.99% OK] |
+-----------------------------------------------------------------------------------------+
|                                           |                                             |
|  PANEL KONFIGURASI (KIRI)                 |  PANEL OUTPUT TERMINAL (KANAN)              |
|                                           |                                             |
|  [Select OS: Windows / Linux]             |  +---------------------------------------+  |
|  [Select Compiler: MinGW / GCC / Clang]   |  | $ g++ main.cpp -o main -lglfw3 ...   |  |
|                                           |  |                                       |  |
|  Pilih Libraries:                         |  | [Copy Command]      [Download Script] |  |
|  [x] GLFW   [x] GLAD   [ ] GLEW           |  +---------------------------------------+  |
|                                           |                                             |
|  [x] Sertakan Boilerplate Code (main.cpp) |  PANEL PREVIEW KODE BOILERPLATE (BAWAH)     |
|                                           |  +---------------------------------------+  |
|  +-------------------------------------+  |  | #include <GLFW/glfw3.h>               |  |
|  |     TOMBOL GENERATE CONFIGURATION   |  |  | int main() { glfwInit(); ... }        |  |
|  +-------------------------------------+  |  +---------------------------------------+  |
|                                           |                                             |
+-----------------------------------------------------------------------------------------+
| [Butuh Bantuan? Hubungi AI Montir Log] --> Membuka Floating Chat Overlay di Pojok Kanan |
+-----------------------------------------------------------------------------------------+
```

---

## 3. Komponen Detail UI & Spesifikasi UX

### A. Panel Konfigurasi (Sisi Kiri / Generator Utama)
Ini adalah menu utama dari aplikasi Anda. User melakukan klik-klik interaktif untuk merakit kebutuhan kompilasi mereka.

1.  **Dropdown Sistem Operasi:**
    * *Pilihan:* Windows, Linux, macOS.
    * *UX:* Mengubah opsi compiler secara dinamis. Jika memilih Windows, compiler default otomatis berubah menjadi MinGW. Jika Linux, otomatis menjadi GCC.
2.  **Dropdown Compiler:**
    * *Pilihan:* MinGW (g++), GCC, Clang.
3.  **Grup Checkbox Libraries (Multi-Select):**
    * *Pilihan:* GLFW, GLAD, GLEW, GLM (OpenGL Mathematics).
    * *UX:* Setiap kali *checkbox* di-klik, string perintah link (seperti `-lglfw3 -lopengl32`) akan langsung ter-update secara *real-time* di panel kanan tanpa perlu menekan tombol submit terlebih dahulu.
4.  **Toggle Switch Boilerplate:**
    * *Pilihan:* "Sertakan file testing `main.cpp` (Membuat jendela hitam kosong untuk tes setup)".

### B. Panel Output & Terminal (Sisi Kanan / Hasil Kompilasi)
Berfungsi menampilkan output instan yang siap disalin oleh user.

1.  **Kotak Perintah Kompilasi (Command Line Box):**
    * *Gaya:* Berbentuk blok teks berwarna hitam pekat (`#000000`) dengan font monospace hijau.
    * *Fitur UX:* Tombol **"Copy Command"** yang jika di-klik akan memunculkan efek transisi mikro (*micro-interaction*) berupa ikon centang hijau berdurasi 2 detik dengan teks "Copied!".
2.  **Tombol Unduh Otomatis (Automation Script):**
    * Menyediakan file `.bat` (untuk Windows) atau `.sh` (untuk Linux) sehingga user tinggal melakukan klik ganda di folder lokal mereka untuk melakukan kompilasi otomatis tanpa perlu mengetik manual di CMD/Terminal laptop mereka.

### C. Jaring Pengaman Premium: AI Montir Log (Floating Chat Overlay)
Ini adalah letak keunikan proyek Anda dibanding yang lain. AI diletakkan di dalam kontainer tersembunyi/minimalis, hanya dipanggil sebagai "asisten darurat" ketika terjadi anomali.

1.  **Pemicu (*Trigger*):** Sebuah tombol melayang (*floating action button*) di pojok kanan bawah berbentuk ikon robot mekanik atau ikon roda gigi dengan label: `"Kompilasi Gagal? Konsultasi ke AI Montir"`.
2.  **Metode Input:**
    * Kotak input teks teks area yang luas dengan placeholder: *\"Paste kode error atau log terminal kamu di sini (Contoh: 'g++: error: No such file or directory')...\"*.
3.  **Alur UX Respon AI:**
    * Ketika user mengirimkan log error, AI tidak membalas dengan obrolan basa-basi panjang, melainkan langsung menyajikan struktur jawaban terarah:
        * **Diagnosis Masalah:** (Penjelasan singkat apa yang salah dalam 1-2 kalimat).
        * **Solusi Cepat:** (Langkah instruktif, misalnya: "Tambahkan folder `/include` ke konfigurasi PATH kamu").
        * **Perintah Perbaikan:** (Kotak kode command baru yang siap disalin jika masalahnya ada pada sintaks kompilasi).

---

## 4. Analisis Skrip Pengguna (*User Journey / Alur Mengatasi Anomali*)

Mari kita simulasikan perjalanan seorang user pemula yang selamat dari *gatekeep* alami berkat desain UI/UX web Anda:

1.  **Langkah 1 (Kunjungan Awal):** User masuk ke web Anda, langsung disambut oleh layout dashboard yang bersih tanpa animasi pembuka yang membuang waktu.
2.  **Langkah 2 (Konfigurasi):** User memilih Windows -> MinGW -> Centang GLFW dan GLAD -> Klik Generate.
3.  **Langkah 3 (Eksekusi Lokal):** User menyalin perintah kompilasi yang dihasilkan, lalu menjalankannya di CMD laptop mereka sendiri.
4.  **Langkah 4 (Menghadapi Anomali):** Ternyata komputer user mengalami error karena mereka lupa menginstal paket runtime driver grafik tertentu. CMD mereka memuntahkan teks error yang aneh.
5.  **Langkah 5 (Aktivasi AI):** User kembali ke web Anda, mengeklik tombol *AI Montir Log* di pojok bawah, lalu melakukan *paste* seluruh teks error dari CMD ke kotak AI.
6.  **Langkah 6 (Resolusi Kesembuhan):** AI menganalisis secara instan, memberikan instruksi perbaikan spesifik untuk tipe hardware user tersebut, dan user berhasil memunculkan jendela grafik 3D pertama mereka.

---

## 4. Keunggulan Nilai Proyek di Mata Penguji Kuliah

Dengan menerapkan arsitektur UI/UX di atas, Anda memiliki landasan argumentasi yang sangat kuat saat sesi tanya jawab skripsi/tugas akhir:

* **Bukan Aplikasi Chat Bot Wrapper Biasa:** Antarmuka utama aplikasi adalah sistem generator berbasis logika pemrograman (*deterministic rule-based generator*). AI diletakkan pada porsi yang tepat, yaitu sebagai sistem penangan pengecualian (*exception handling / troubleshooter*) terhadap anomali sistem operasi.
* **Efisiensi Kognitif:** Pengguna tidak perlu melakukan *prompting* berulang kali dengan kata-kata indah ke AI untuk mendapatkan skrip kompilasi dasar. Cukup dengan 3 kali klik *dropdown*, perintah kompilasi presisi langsung didapatkan dalam 0,1 detik.
* **Aksesibilitas Solusi:** Desain *split-screen* memastikan dokumentasi kode (`main.cpp`) dan skrip perintah kompilasi berada dalam satu ruang pandang, meminimalkan gangguan visual bagi pengguna.