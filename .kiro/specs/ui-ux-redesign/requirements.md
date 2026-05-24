# Requirements Document

## Introduction

Fitur ini adalah peningkatan menyeluruh pada UI/UX situs portfolio personal Athif (React 19 + Vite + Tailwind CSS v4 + Framer Motion) agar tampil lebih polished, profesional, modern, dan berkesan. Fokus utama adalah konsistensi sistem desain, hierarki visual, kualitas animasi, kemudahan navigasi, presentasi project yang lebih kuat, responsivitas yang rapi di semua breakpoint, aksesibilitas dasar (WCAG AA), dan performa visual (lazy loading, animasi yang halus). Redesign ini bersifat front-end only: tidak mengubah data project, tidak mengubah arsitektur backend (tidak ada backend), dan tetap memakai stack yang sudah ada.

## Glossary

- **Portfolio_Website**: Aplikasi React satu-halaman (single-page) yang menampilkan profil, pengalaman, skill, dan project Athif.
- **Visitor**: Pengguna akhir yang membuka Portfolio_Website melalui browser desktop atau mobile.
- **Design_System**: Kumpulan token desain (warna, tipografi, spacing, radius, shadow, motion) dan komponen dasar yang dipakai konsisten di seluruh Portfolio_Website.
- **Navigation_Bar**: Komponen header tetap (fixed) di bagian atas yang berisi tautan antar-section dan kontrol tema.
- **Mobile_Menu**: Panel navigasi yang muncul pada viewport ≤ 768px sebagai pengganti tautan inline di Navigation_Bar.
- **Hero_Section**: Section paling atas (id `home`) yang berisi salam pembuka, headline, deskripsi, CTA utama, dan portrait.
- **About_Section**: Section profil personal (id `about`) berisi narasi, bahasa, dan kartu pendidikan.
- **Experience_Section**: Section pengalaman kerja (id `experience`) berisi timeline + galeri foto kecil.
- **Skills_Section**: Section daftar skill teknis (id `skills`) yang dikelompokkan per kategori.
- **Projects_Section**: Section daftar project (id `projects`) berisi grid Project_Card.
- **Project_Card**: Komponen kartu yang merepresentasikan satu project dengan thumbnail, judul, deskripsi singkat, tech stack, dan tombol galeri.
- **Gallery_Modal**: Modal full-screen yang menampilkan foto-foto Project_Card terpilih beserta caption dan tools.
- **Contact_Footer**: Section penutup (id `contact`) berisi CTA kontak dan tautan sosial.
- **Theme_System**: Mekanisme yang menyimpan dan menerapkan preferensi `light`/`dark` Visitor melalui `localStorage` dan kelas `dark` di `<html>`.
- **Scroll_Engine**: Mekanisme animasi berbasis viewport (IntersectionObserver / Framer Motion `whileInView`) yang memicu transisi masuk komponen.
- **Reduced_Motion_Mode**: Mode di mana `prefers-reduced-motion: reduce` aktif pada sistem Visitor.

## Requirements

### Requirement 1: Sistem Desain yang Konsisten

**User Story:** Sebagai Visitor, saya ingin tampilan setiap section terasa berasal dari satu produk yang sama, sehingga kesan profesional dan terpercaya muncul sepanjang saya menjelajah.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL mendefinisikan token Design_System (warna primer, sekunder, aksen, surface, border, teks, success, warning, danger) sebagai variabel CSS pada `@theme` di `src/index.css`.
2. THE Portfolio_Website SHALL menggunakan maksimal 2 keluarga font: satu untuk teks umum dan satu untuk aksen handwriting, yang dimuat lewat `<link>` di `index.html`.
3. THE Portfolio_Website SHALL menetapkan skala tipografi dengan minimal 6 step (display, h1, h2, h3, body, caption) dan rasio kontras minimal 4.5:1 untuk teks body terhadap background pada mode terang dan mode gelap.
4. THE Portfolio_Website SHALL menggunakan skala spacing berbasis kelipatan 4px (4, 8, 12, 16, 24, 32, 48, 64, 96) untuk margin dan padding antar elemen.
5. THE Portfolio_Website SHALL menggunakan radius sudut yang konsisten dari himpunan {`sm`, `md`, `lg`, `xl`, `2xl`, `full`} untuk semua kartu, tombol, dan modal.
6. WHERE sebuah komponen interaktif (tombol, link, card) ada di layar, THE Portfolio_Website SHALL menampilkan satu gaya hover dan satu gaya focus-visible yang sama secara visual di seluruh aplikasi.

### Requirement 2: Hero Section yang Impactful

**User Story:** Sebagai Visitor, saya ingin dalam 3 detik pertama langsung paham siapa Athif dan apa yang ia kerjakan, sehingga saya tertarik untuk menjelajah lebih jauh.

#### Acceptance Criteria

1. THE Hero_Section SHALL menampilkan nama "Athif Fadheel Atharahman", role utama (Electrical & Software Engineer), dan satu kalimat positioning singkat di atas lipatan layar (above the fold) pada viewport ≥ 1280px.
2. THE Hero_Section SHALL menyediakan minimal 2 call-to-action: satu CTA primer "View My Work" yang men-scroll ke Projects_Section dan satu CTA sekunder "Let's Connect" yang membuka tautan LinkedIn pada tab baru.
3. WHEN Visitor menggerakkan kursor di dalam Hero_Section pada viewport ≥ 1024px, THE Hero_Section SHALL menggeser elemen background blob mengikuti kursor dengan delay halus tidak lebih dari 600ms.
4. WHILE Reduced_Motion_Mode aktif, THE Hero_Section SHALL menonaktifkan animasi blob mengikuti kursor dan menampilkan background statis.
5. THE Hero_Section SHALL menampilkan portrait Athif dengan tinggi maksimal 90% dari tinggi viewport pada semua breakpoint dan tidak menyebabkan horizontal overflow.
6. WHEN Visitor membuka Portfolio_Website pada viewport < 768px, THE Hero_Section SHALL menyusun teks dan portrait secara vertikal dengan teks di atas dan portrait di bawah.

### Requirement 3: Navigation yang Jelas dan Responsif

**User Story:** Sebagai Visitor, saya ingin tahu di section mana saya berada dan bisa berpindah cepat ke section lain, sehingga saya tidak tersesat di halaman panjang.

#### Acceptance Criteria

1. THE Navigation_Bar SHALL tetap terlihat (fixed) di bagian atas selama Visitor men-scroll seluruh halaman.
2. WHEN sebuah section masuk ke dalam 50% bagian atas viewport, THE Navigation_Bar SHALL menandai tautan section tersebut sebagai aktif dengan indikator visual yang berbeda dari tautan tidak-aktif.
3. WHEN Visitor mengklik salah satu tautan di Navigation_Bar, THE Portfolio_Website SHALL men-scroll ke section terkait dengan perilaku `smooth` dan menempatkan section pada offset yang tidak tertutup oleh Navigation_Bar.
4. WHEN viewport lebar < 768px, THE Navigation_Bar SHALL menyembunyikan tautan inline dan menampilkan tombol pembuka Mobile_Menu.
5. WHEN Visitor menekan tombol pembuka Mobile_Menu, THE Mobile_Menu SHALL muncul menutupi minimal 80% tinggi viewport dan menampilkan seluruh tautan section serta kontrol tema.
6. WHEN Mobile_Menu terbuka dan Visitor mengklik salah satu tautan, THE Mobile_Menu SHALL menutup secara otomatis (penutupan menu dan inisiasi scroll dianggap dua aksi independen, urutannya tidak dijamin).
7. WHEN Mobile_Menu terbuka, THE Portfolio_Website SHALL mengunci scroll body sehingga konten di belakang Mobile_Menu tidak ikut bergulir.

### Requirement 4: Animasi Section yang Halus dan Performant

**User Story:** Sebagai Visitor, saya ingin transisi antar section terasa halus dan tidak membuat halaman terasa berat, sehingga pengalaman menjelajah terasa premium.

#### Acceptance Criteria

1. WHEN sebuah section masuk ke viewport pertama kali, THE Scroll_Engine SHALL memicu animasi fade-in + translate-y kurang dari atau sama dengan 40px dengan durasi antara 300ms dan 700ms.
2. THE Scroll_Engine SHALL menjalankan animasi masuk untuk satu section maksimal satu kali per pemuatan halaman (`viewport={{ once: true }}`).
3. WHILE Reduced_Motion_Mode aktif, THE Scroll_Engine SHALL tetap menjalankan animasi fade-in + translate ringan section (animasi non-vestibular ini dianggap esensial untuk hierarki visual dan tetap aktif).
4. THE Portfolio_Website SHALL mempertahankan frame rate ≥ 50 FPS pada semua tipe perangkat target (desktop, tablet, mobile) saat scrolling penuh dari Hero_Section sampai Contact_Footer.
5. IF sebuah animasi gagal dimuat karena `framer-motion` tidak tersedia, THEN THE Portfolio_Website SHALL tetap menampilkan konten section dalam keadaan terlihat penuh tanpa elemen tersembunyi.

### Requirement 5: About Section yang Informatif

**User Story:** Sebagai Visitor, saya ingin memahami latar belakang dan keahlian inti Athif dalam waktu singkat, sehingga saya bisa menilai kesesuaiannya dengan kebutuhan saya.

#### Acceptance Criteria

1. THE About_Section SHALL menampilkan judul section, nama lengkap, role, dan minimal 3 paragraf narasi yang menjelaskan latar belakang dan spesialisasi.
2. THE About_Section SHALL menampilkan portrait sekunder berbentuk lingkaran dengan rasio aspek 1:1 dan border yang konsisten dengan Design_System.
3. THE About_Section SHALL menampilkan kartu pendidikan berisi gelar, institusi, dan nilai akademik (GPA) di posisi yang sejajar dengan portrait sekunder pada viewport ≥ 1024px.
4. THE About_Section SHALL menampilkan blok bahasa berisi daftar bahasa dan tingkat penguasaan, dengan tautan sertifikat (jika ada) yang membuka tab baru.
5. WHEN viewport lebar < 1024px, THE About_Section SHALL menyusun kolom narasi dan kolom portrait/kartu secara vertikal tanpa overflow horizontal.

### Requirement 6: Experience Section dengan Timeline yang Mudah Dibaca

**User Story:** Sebagai Visitor, saya ingin melihat riwayat pengalaman kerja Athif dalam urutan kronologis yang jelas, sehingga saya bisa menilai progresinya.

#### Acceptance Criteria

1. THE Experience_Section SHALL menampilkan setiap pengalaman kerja sebagai entri terpisah berisi rentang tanggal, logo perusahaan, nama perusahaan, peran, dan minimal 3 bullet point pencapaian.
2. THE Experience_Section SHALL menyusun entri pengalaman secara kronologis terbalik (paling baru di atas).
3. THE Experience_Section SHALL menampilkan galeri foto pendukung untuk setiap entri pengalaman dengan grid responsif 3 kolom pada mobile dan 5 kolom pada viewport ≥ 768px.
4. WHEN Visitor mengarahkan kursor ke salah satu foto galeri pengalaman pada viewport ≥ 1024px, THE Experience_Section SHALL menaikkan opacity foto ke 100% dan memperbesar skala foto sebesar 5%-15% selama maksimal 500ms.
5. WHEN Visitor mengklik salah satu foto galeri pengalaman, THE Experience_Section SHALL membuka Gallery_Modal yang menampilkan foto tersebut dalam ukuran besar (mengikuti perilaku Requirement 9).

### Requirement 7: Skills Section yang Terkelompok dan Mudah Di-scan

**User Story:** Sebagai Visitor (terutama recruiter), saya ingin men-scan stack teknis Athif dalam beberapa detik, sehingga saya bisa memutuskan kesesuaiannya dengan posisi yang saya cari.

#### Acceptance Criteria

1. THE Skills_Section SHALL mengelompokkan skill ke dalam minimal 4 kategori bernama (contoh: Software & Backend, Cloud & DevOps, Data & AI, Hardware & Engineering).
2. THE Skills_Section SHALL menampilkan setiap skill sebagai chip/badge berisi ikon dan label nama skill.
3. WHEN Visitor mengarahkan kursor ke sebuah skill chip pada viewport ≥ 1024px, THE Skills_Section SHALL mengubah border chip ke warna aksen kategori dan menambahkan glow shadow yang konsisten dengan Design_System.
4. THE Skills_Section SHALL menampilkan grid kategori dalam 1 kolom pada viewport < 768px dan 2 kolom pada viewport ≥ 768px.
5. THE Skills_Section SHALL menjamin setiap label skill tidak terpotong (no truncation) pada viewport ≥ 360px.

### Requirement 8: Projects Section dengan Presentasi yang Kuat

**User Story:** Sebagai Visitor, saya ingin melihat ringkasan project Athif dengan visual yang menarik dan informasi teknis yang jelas, sehingga saya tertarik untuk eksplorasi lebih dalam.

#### Acceptance Criteria

1. THE Projects_Section SHALL menampilkan seluruh Project_Card dalam grid responsif: 1 kolom pada viewport < 640px, 2 kolom pada 640px–1023px, dan 3 kolom pada viewport ≥ 1024px.
2. THE Project_Card SHALL menampilkan thumbnail, judul, kategori, deskripsi singkat (maksimal 200 karakter), daftar tech stack, dan tombol "Explore Gallery".
3. WHEN Visitor mengarahkan kursor ke sebuah Project_Card pada viewport ≥ 1024px, THE Project_Card SHALL menampilkan efek elevasi (translate-y -4px sampai -8px) dan border aksen selama maksimal 400ms.
4. THE Projects_Section SHALL menyediakan filter kategori yang ketika dipilih, hanya Project_Card dengan kategori tersebut yang ditampilkan, dan opsi "All" yang menampilkan seluruh project.
5. WHEN Visitor mengubah filter kategori, THE Projects_Section SHALL menganimasikan pengurangan dan penambahan Project_Card dengan transisi opacity tidak lebih dari 400ms.
6. THE Project_Card SHALL menampilkan thumbnail dengan rasio aspek konsisten 16:9 atau 4:3 di seluruh kartu sehingga tinggi kartu seragam dalam satu baris grid.
7. THE Project_Card SHALL memuat seluruh thumbnail dengan atribut `loading="lazy"` dan `decoding="async"`, terlepas dari posisi kartu terhadap viewport awal.

### Requirement 9: Gallery Modal yang Nyaman dan Aksesibel

**User Story:** Sebagai Visitor, saya ingin menelusuri foto-foto sebuah project dengan mudah lewat keyboard maupun gestur, sehingga saya bisa mendalami bukti kerja Athif tanpa friksi.

#### Acceptance Criteria

1. WHEN Visitor mengklik tombol "Explore Gallery" pada sebuah Project_Card, THE Gallery_Modal SHALL terbuka dan menampilkan foto pertama project tersebut beserta caption dan daftar tools-nya.
2. WHEN Gallery_Modal terbuka, THE Portfolio_Website SHALL mengunci scroll body sampai Gallery_Modal ditutup.
3. WHEN Visitor menekan tombol panah kanan di keyboard, THE Gallery_Modal SHALL berpindah ke foto berikutnya, dan setelah foto terakhir, kembali ke foto pertama.
4. WHEN Visitor menekan tombol panah kiri di keyboard, THE Gallery_Modal SHALL berpindah ke foto sebelumnya, dan dari foto pertama, melompat ke foto terakhir.
5. WHEN Visitor menekan tombol Escape, THE Gallery_Modal SHALL menutup dan mengembalikan fokus ke tombol "Explore Gallery" yang membukanya.
6. WHEN Visitor menggeser foto secara horizontal pada perangkat sentuh (swipe) lebih dari 50px, THE Gallery_Modal SHALL berpindah ke foto sebelumnya (swipe ke kanan) atau berikutnya (swipe ke kiri).
7. THE Gallery_Modal SHALL menampilkan indikator posisi (contoh: "3 / 7") di pojok kanan atas area foto.
8. THE Gallery_Modal SHALL menampilkan caption dan blok "Active Technologies" yang berubah sesuai foto yang sedang ditampilkan.

### Requirement 10: Contact / Footer yang Mengundang Aksi

**User Story:** Sebagai Visitor, saya ingin tahu cara menghubungi Athif dengan jelas di akhir halaman, sehingga saya bisa langsung mengambil langkah berikutnya.

#### Acceptance Criteria

1. THE Contact_Footer SHALL menampilkan headline ajakan kerja sama dan minimal 3 tautan kontak: Email, LinkedIn, Instagram.
2. THE Contact_Footer SHALL menampilkan tombol CTA primer "Send Email" yang membuka klien email Visitor dengan alamat tujuan terisi.
3. WHEN Visitor mengarahkan kursor ke ikon kontak pada viewport ≥ 1024px, THE Contact_Footer SHALL mengubah background ikon ke warna brand layanan terkait dan menaikkan skala ikon antara 5%-15% selama maksimal 300ms.
4. THE Contact_Footer SHALL menampilkan baris copyright dengan tahun yang dihitung dari `new Date().getFullYear()`.
5. THE Contact_Footer SHALL menampilkan satu tombol "Back to Top" yang ketika diklik men-scroll halaman ke Hero_Section dengan perilaku smooth.

### Requirement 11: Theme System Light/Dark yang Konsisten

**User Story:** Sebagai Visitor, saya ingin bisa membaca portfolio dengan nyaman baik di mode terang maupun mode gelap, dan preferensi saya diingat di kunjungan berikutnya.

#### Acceptance Criteria

1. WHEN Portfolio_Website pertama kali dimuat dan `localStorage` belum berisi kunci `color-theme`, THE Theme_System SHALL menerapkan tema yang cocok dengan `prefers-color-scheme` Visitor.
2. WHEN Visitor menekan tombol toggle tema, THE Theme_System SHALL mengubah kelas `dark` pada elemen `<html>` dan menyimpan nilai `light` atau `dark` ke `localStorage` dengan kunci `color-theme`.
3. THE Portfolio_Website SHALL memastikan setiap section terlihat tanpa teks tak terbaca (kontras < 4.5:1) baik pada tema terang maupun gelap.
4. WHEN Visitor mengganti tema, THE Portfolio_Website SHALL menerapkan transisi warna pada background dan teks dengan durasi tidak lebih dari 400ms.
5. IF nilai `color-theme` di `localStorage` bukan `light` atau `dark`, THEN THE Theme_System SHALL mengabaikan nilai tersebut dan kembali memakai `prefers-color-scheme`.

### Requirement 12: Responsivitas Lintas Perangkat

**User Story:** Sebagai Visitor, saya ingin portfolio terlihat rapi di HP, tablet, maupun layar besar, sehingga saya bisa menjelajah dari perangkat apa pun.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL ditampilkan tanpa horizontal scroll pada lebar viewport antara 360px dan 1920px.
2. THE Portfolio_Website SHALL menggunakan breakpoint Tailwind standar (`sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px) sebagai titik perubahan layout.
3. THE Portfolio_Website SHALL menjamin setiap target sentuh (tombol, link, ikon kontak) berukuran minimal 44px × 44px pada viewport < 768px.
4. WHEN Visitor memutar perangkat dari portrait ke landscape, THE Portfolio_Website SHALL menyesuaikan layout tanpa kehilangan posisi scroll lebih dari 100px.

### Requirement 13: Aksesibilitas Dasar (WCAG 2.1 AA-Oriented)

**User Story:** Sebagai Visitor dengan kebutuhan aksesibilitas (keyboard-only, screen reader, kontras tinggi), saya ingin tetap bisa memahami dan menavigasi seluruh isi portfolio.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL menyediakan atribut `alt` deskriptif untuk setiap elemen `<img>` yang membawa makna dan `alt=""` untuk gambar dekoratif.
2. THE Portfolio_Website SHALL menampilkan indikator focus-visible dengan kontras minimal 3:1 terhadap background di setiap elemen interaktif (tautan, tombol, kontrol modal).
3. WHEN Visitor menavigasi hanya dengan keyboard (Tab, Shift+Tab, Enter, Space), THE Portfolio_Website SHALL menjangkau seluruh tautan navigasi, tombol CTA, kontrol tema, Project_Card, dan kontrol Gallery_Modal dengan urutan logis.
4. THE Portfolio_Website SHALL menambahkan atribut `aria-label` pada tombol ikon yang tidak memiliki teks terlihat (toggle tema, tombol close modal, panah modal).
5. THE Gallery_Modal SHALL menerapkan focus trap selama terbuka sehingga Tab tidak keluar dari modal.
6. WHEN Reduced_Motion_Mode aktif, THE Portfolio_Website SHALL menonaktifkan animasi blob cursor-following pada Hero_Section sebagai satu-satunya animasi yang dimatikan, sementara animasi scroll fade-in dan hover lainnya tetap aktif.

### Requirement 14: Performa Visual dan Pemuatan Aset

**User Story:** Sebagai Visitor pada koneksi sedang, saya ingin halaman cepat terasa siap untuk dijelajah, sehingga saya tidak menunggu lama.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL menggunakan format gambar `.webp` (atau setara modern) untuk seluruh foto project, profil, dan galeri pengalaman.
2. THE Portfolio_Website SHALL memuat gambar di luar viewport awal dengan atribut `loading="lazy"` dan `decoding="async"`.
3. THE Portfolio_Website SHALL membatasi jumlah gambar yang dimuat eager (di luar Hero_Section) tidak lebih dari 2 pada pemuatan awal halaman.
4. WHEN Visitor membuka Portfolio_Website pada koneksi yang dapat diukur sebagai 4G atau lebih cepat, THE Portfolio_Website SHALL mencapai Largest Contentful Paint (LCP) ≤ 2.5 detik diukur dengan Lighthouse pada build production.
5. THE Portfolio_Website SHALL menetapkan `width` dan `height` (atau `aspect-ratio` CSS) eksplisit pada setiap elemen `<img>` utama, terlepas dari hasil pengukuran CLS, dan SHALL menjaga Cumulative Layout Shift (CLS) ≤ 0.1 sebagai outcome terukur.
6. IF sebuah gambar gagal dimuat, THEN THE Portfolio_Website SHALL menampilkan placeholder sederhana (warna surface + ikon fallback) tanpa merusak layout kartu.
