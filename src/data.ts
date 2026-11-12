export type Category = 'Seminar' | 'Workshop' | 'Pelatihan' | 'Webinar'
export type EventStatus = 'Pendaftaran Dibuka' | 'Kuota Penuh' | 'Draf' | 'Berlangsung' | 'Selesai'

export type EventItem = {
  id: string
  title: string
  category: Category
  organizer: string
  date: string
  day: string
  month: string
  time: string
  location: string
  mode: 'Luring' | 'Daring'
  quota: number
  registered: number
  attended: number
  image: string
  imageAlt: string
  summary: string
  description: string
  speakers: { name: string; role: string }[]
  agenda: { time: string; title: string }[]
  status: EventStatus
  benefits: string[]
}

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080`

export const img = (url: string, w = 1080) => url.replace('w=1080', `w=${w}`)

export const photos = {
  auditorium: u('1778877035014-98c41b7c1460'),
  hall: u('1778876088509-982115d463ef'),
  hallStanding: u('1778876091364-1747994fe24d'),
  team: u('1522071820081-009f0129c71c'),
  macbook: u('1531545514256-b1400bc00f31'),
  laughing: u('1522202176988-66273c2fd55f'),
  pointing: u('1531538606174-0f90ff5dce83'),
  laptopMen: u('1523240795612-9a054b0db644'),
  umbrellas: u('1743529056865-1024577ee619'),
  campusTrees: u('1743529056611-2b7b01658893'),
  campusGrass: u('1763890498955-13f109b2fbd7'),
}

export const currentUser = {
  name: 'Alya Putri Ramadhani',
  nim: '2203141027',
  prodi: 'Teknik Lingkungan',
  fakultas: 'Fakultas Teknik',
  email: 'alya.ramadhani@mhs.unusa.ac.id',
  initials: 'AR',
}

export const university = 'Universitas Nusantara'

export const events: EventItem[] = [
  {
    id: 'green-campus-2026',
    title: 'Seminar Nasional Green Campus 2026: Menuju Kampus Net Zero',
    category: 'Seminar',
    organizer: 'BEM Universitas Nusantara',
    date: 'Rabu, 18 November 2026',
    day: '18',
    month: 'Nov',
    time: '08.00 – 12.00 WIB',
    location: 'Auditorium Utama, Gedung Rektorat',
    mode: 'Luring',
    quota: 400,
    registered: 342,
    attended: 0,
    image: photos.auditorium,
    imageAlt: 'Mahasiswa memenuhi auditorium kampus',
    summary: 'Strategi kampus menuju emisi nol bersih bersama praktisi energi, akademisi, dan pemangku kebijakan.',
    description:
      'Seminar nasional tahunan yang membahas peta jalan dekarbonisasi perguruan tinggi: efisiensi energi gedung, transportasi rendah emisi, pengelolaan sampah, hingga digitalisasi administrasi. Peserta akan mendapatkan wawasan praktis yang dapat diterapkan oleh organisasi mahasiswa dalam kegiatan sehari-hari.',
    speakers: [
      { name: 'Dr. Ir. Ratna Wulandari, M.T.', role: 'Pakar Energi Terbarukan, ITB' },
      { name: 'Bima Aditya, S.T.', role: 'Sustainability Lead, PLN Icon Plus' },
      { name: 'Prof. Hendra Gunawan', role: 'Wakil Rektor Bidang Sarana' },
    ],
    agenda: [
      { time: '07.30', title: 'Registrasi ulang dengan pindai QR' },
      { time: '08.00', title: 'Pembukaan dan sambutan rektor' },
      { time: '08.30', title: 'Keynote: Peta jalan kampus net zero' },
      { time: '09.45', title: 'Diskusi panel: Aksi iklim organisasi mahasiswa' },
      { time: '11.15', title: 'Tanya jawab dan penutupan' },
    ],
    status: 'Pendaftaran Dibuka',
    benefits: ['E-sertifikat 3 SKP', 'Materi digital', 'Relasi nasional'],
  },
  {
    id: 'workshop-uiux',
    title: 'Workshop UI/UX: Desain Produk Digital Berkelanjutan',
    category: 'Workshop',
    organizer: 'HIMA Sistem Informasi',
    date: 'Minggu, 22 November 2026',
    day: '22',
    month: 'Nov',
    time: '09.00 – 15.00 WIB',
    location: 'Lab Komputer FTI Lt. 3',
    mode: 'Luring',
    quota: 60,
    registered: 58,
    attended: 0,
    image: photos.macbook,
    imageAlt: 'Mahasiswa berdiskusi di depan laptop',
    summary: 'Praktik langsung merancang aplikasi hemat energi dan ramah pengguna dengan Figma.',
    description:
      'Workshop intensif satu hari yang memperkenalkan prinsip sustainable UX: desain ringan, mode gelap hemat daya, dan alur yang efisien. Peserta akan membuat prototipe aplikasi dari nol bersama mentor.',
    speakers: [
      { name: 'Nadia Kusuma', role: 'Product Designer, Gojek' },
      { name: 'Rizky Pratama', role: 'UX Researcher, Tokopedia' },
    ],
    agenda: [
      { time: '09.00', title: 'Pengantar sustainable UX' },
      { time: '10.30', title: 'Studi kasus dan riset pengguna' },
      { time: '13.00', title: 'Praktik prototipe di Figma' },
      { time: '14.30', title: 'Presentasi dan umpan balik' },
    ],
    status: 'Pendaftaran Dibuka',
    benefits: ['E-sertifikat 2 SKP', 'Template Figma', 'Mentoring'],
  },
  {
    id: 'lkmm-td',
    title: 'Pelatihan Kepemimpinan Organisasi Mahasiswa (LKMM-TD)',
    category: 'Pelatihan',
    organizer: 'Biro Kemahasiswaan',
    date: '29 – 30 November 2026',
    day: '29',
    month: 'Nov',
    time: '08.00 – 16.00 WIB',
    location: 'Gedung Student Center',
    mode: 'Luring',
    quota: 120,
    registered: 96,
    attended: 0,
    image: photos.laughing,
    imageAlt: 'Mahasiswa tertawa bersama saat diskusi',
    summary: 'Latihan manajemen organisasi, perencanaan program kerja, dan kepemimpinan kolaboratif.',
    description:
      'Pelatihan dua hari bagi pengurus organisasi mahasiswa untuk memperkuat kemampuan merencanakan program, mengelola tim, dan mengambil keputusan berbasis data. Seluruh materi, presensi, dan sertifikat diberikan secara digital.',
    speakers: [
      { name: 'Drs. Agus Salim, M.Si.', role: 'Kepala Biro Kemahasiswaan' },
      { name: 'Maya Anggraini', role: 'Fasilitator Indonesia Mengajar' },
    ],
    agenda: [
      { time: 'Hari 1', title: 'Manajemen organisasi dan perencanaan program' },
      { time: 'Hari 1', title: 'Simulasi rapat dan pengambilan keputusan' },
      { time: 'Hari 2', title: 'Kepemimpinan kolaboratif' },
      { time: 'Hari 2', title: 'Penyusunan rencana aksi organisasi' },
    ],
    status: 'Pendaftaran Dibuka',
    benefits: ['E-sertifikat 4 SKP', 'Modul digital', 'Syarat ormawa'],
  },
  {
    id: 'webinar-iklim',
    title: 'Webinar: Literasi Iklim dan Karier Hijau untuk Gen Z',
    category: 'Webinar',
    organizer: 'KSM Eco Ranger',
    date: 'Kamis, 3 Desember 2026',
    day: '03',
    month: 'Des',
    time: '19.00 – 21.00 WIB',
    location: 'Zoom Meeting',
    mode: 'Daring',
    quota: 1000,
    registered: 712,
    attended: 0,
    image: photos.pointing,
    imageAlt: 'Peserta menunjuk layar laptop saat sesi daring',
    summary: 'Mengenal peluang karier di sektor energi bersih, ESG, dan ekonomi sirkular.',
    description:
      'Webinar interaktif yang memetakan peluang karier hijau di Indonesia, keterampilan yang dibutuhkan, dan cara memulai dari bangku kuliah. Presensi dilakukan otomatis melalui tautan unik di e-tiket.',
    speakers: [
      { name: 'Sarah Hutapea', role: 'ESG Analyst, Indika Energy' },
      { name: 'Dimas Wicaksono', role: 'Founder, Waste4Change Muda' },
    ],
    agenda: [
      { time: '19.00', title: 'Pembukaan' },
      { time: '19.10', title: 'Lanskap karier hijau di Indonesia' },
      { time: '20.00', title: 'Cerita dari lapangan' },
      { time: '20.40', title: 'Tanya jawab' },
    ],
    status: 'Pendaftaran Dibuka',
    benefits: ['E-sertifikat', 'Rekaman sesi', 'Info lowongan'],
  },
  {
    id: 'ewaste',
    title: 'Workshop Daur Ulang Elektronik dan Pengelolaan E-Waste',
    category: 'Workshop',
    organizer: 'UKM Pecinta Alam',
    date: 'Senin, 7 Desember 2026',
    day: '07',
    month: 'Des',
    time: '13.00 – 16.00 WIB',
    location: 'Plaza Hijau, Taman Kampus Barat',
    mode: 'Luring',
    quota: 80,
    registered: 41,
    attended: 0,
    image: photos.umbrellas,
    imageAlt: 'Mahasiswa duduk di bawah payung hijau di taman kampus',
    summary: 'Belajar memilah, membongkar, dan menyalurkan limbah elektronik dengan aman.',
    description:
      'Workshop luar ruang tentang siklus hidup perangkat elektronik. Peserta belajar mengenali komponen berbahaya, cara membongkar dengan aman, dan jalur penyaluran ke pusat daur ulang resmi.',
    speakers: [{ name: 'Fajar Nugroho, S.Si.', role: 'Peneliti Pusat Studi Lingkungan' }],
    agenda: [
      { time: '13.00', title: 'Mengenal e-waste' },
      { time: '14.00', title: 'Praktik pemilahan' },
      { time: '15.15', title: 'Aksi pengumpulan bersama' },
    ],
    status: 'Pendaftaran Dibuka',
    benefits: ['E-sertifikat', 'Kit pemilahan', 'Poin relawan'],
  },
  {
    id: 'sociopreneur',
    title: 'Seminar Kewirausahaan Sosial: Membangun Bisnis Berdampak',
    category: 'Seminar',
    organizer: 'HIMA Manajemen',
    date: 'Sabtu, 12 Desember 2026',
    day: '12',
    month: 'Des',
    time: '09.00 – 12.00 WIB',
    location: 'Aula Fakultas Ekonomi dan Bisnis',
    mode: 'Luring',
    quota: 250,
    registered: 188,
    attended: 0,
    image: photos.hall,
    imageAlt: 'Peserta duduk di aula perkuliahan',
    summary: 'Kisah wirausaha muda yang menyelesaikan masalah sosial dan lingkungan.',
    description:
      'Seminar yang menghadirkan pendiri usaha sosial untuk berbagi model bisnis, pendanaan hibah, dan cara mengukur dampak. Cocok bagi mahasiswa yang ingin memulai usaha sejak kuliah.',
    speakers: [
      { name: 'Andini Lestari', role: 'Co-founder, Sukkha Citta' },
      { name: 'Yusuf Maulana, M.B.A.', role: 'Dosen Kewirausahaan' },
    ],
    agenda: [
      { time: '09.00', title: 'Pembukaan' },
      { time: '09.20', title: 'Model bisnis berdampak' },
      { time: '10.30', title: 'Mengukur dampak sosial' },
      { time: '11.30', title: 'Tanya jawab' },
    ],
    status: 'Pendaftaran Dibuka',
    benefits: ['E-sertifikat 2 SKP', 'Materi digital'],
  },
  {
    id: 'python-data',
    title: 'Pelatihan Data Analytics dengan Python untuk Pemula',
    category: 'Pelatihan',
    organizer: 'HIMA Statistika',
    date: 'Selasa, 15 Desember 2026',
    day: '15',
    month: 'Des',
    time: '08.30 – 15.30 WIB',
    location: 'Lab Data FMIPA',
    mode: 'Luring',
    quota: 50,
    registered: 50,
    attended: 0,
    image: photos.laptopMen,
    imageAlt: 'Tiga mahasiswa tertawa sambil melihat laptop',
    summary: 'Dasar Python, pandas, dan visualisasi data dengan studi kasus data lingkungan kampus.',
    description:
      'Pelatihan praktik untuk pemula: pengenalan Python, pengolahan data dengan pandas, dan visualisasi. Studi kasus menggunakan data konsumsi listrik dan sampah kampus.',
    speakers: [{ name: 'Larasati Dewi, M.Stat.', role: 'Data Scientist, BPS' }],
    agenda: [
      { time: '08.30', title: 'Dasar Python' },
      { time: '10.30', title: 'Pengolahan data dengan pandas' },
      { time: '13.00', title: 'Visualisasi dan studi kasus' },
    ],
    status: 'Kuota Penuh',
    benefits: ['E-sertifikat 3 SKP', 'Notebook latihan'],
  },
  {
    id: 'webinar-jurnal',
    title: 'Webinar: Menulis Karya Ilmiah dan Publikasi Jurnal Bereputasi',
    category: 'Webinar',
    organizer: 'LPPM Universitas Nusantara',
    date: 'Sabtu, 19 Desember 2026',
    day: '19',
    month: 'Des',
    time: '13.00 – 15.30 WIB',
    location: 'Google Meet',
    mode: 'Daring',
    quota: 500,
    registered: 233,
    attended: 0,
    image: photos.team,
    imageAlt: 'Sekelompok mahasiswa bekerja dengan laptop',
    summary: 'Panduan menyusun artikel, memilih jurnal, dan menghindari jurnal predator.',
    description:
      'Webinar untuk mahasiswa tingkat akhir dan asisten peneliti tentang struktur artikel ilmiah, strategi memilih jurnal bereputasi, dan proses peninjauan sejawat.',
    speakers: [{ name: 'Prof. Dr. Sri Handayani', role: 'Editor Jurnal Terindeks Scopus' }],
    agenda: [
      { time: '13.00', title: 'Anatomi artikel ilmiah' },
      { time: '14.00', title: 'Memilih jurnal bereputasi' },
      { time: '15.00', title: 'Tanya jawab' },
    ],
    status: 'Pendaftaran Dibuka',
    benefits: ['E-sertifikat', 'Template artikel'],
  },
]

export const getEvent = (id: string) => events.find((e) => e.id === id)

export type Ticket = {
  code: string
  eventId: string
  seat: string
  issuedAt: string
  status: 'Aktif' | 'Sudah digunakan'
}

export const myTickets: Ticket[] = [
  { code: 'NKT-GC26-0342', eventId: 'green-campus-2026', seat: 'Bebas, Sektor B', issuedAt: '2 Nov 2026, 10.14', status: 'Aktif' },
  { code: 'NKT-UX26-0057', eventId: 'workshop-uiux', seat: 'Meja 12', issuedAt: '4 Nov 2026, 21.03', status: 'Aktif' },
  { code: 'NKT-WI26-0698', eventId: 'webinar-iklim', seat: 'Daring', issuedAt: '6 Nov 2026, 08.47', status: 'Aktif' },
]

export type PastEvent = {
  id: string
  title: string
  category: Category
  organizer: string
  date: string
  hours: number
  certificate: 'Tersedia' | 'Menunggu evaluasi'
  certNo: string
}

export const pastEvents: PastEvent[] = [
  {
    id: 'p1',
    title: 'Seminar Energi Terbarukan untuk Kampus Mandiri Energi',
    category: 'Seminar',
    organizer: 'HIMA Teknik Elektro',
    date: '24 Oktober 2026',
    hours: 4,
    certificate: 'Tersedia',
    certNo: 'NKT/SRT/2026/10/0412',
  },
  {
    id: 'p2',
    title: 'Pelatihan Public Speaking dan Moderator Acara',
    category: 'Pelatihan',
    organizer: 'UKM Debat',
    date: '11 Oktober 2026',
    hours: 6,
    certificate: 'Tersedia',
    certNo: 'NKT/SRT/2026/10/0188',
  },
  {
    id: 'p3',
    title: 'Workshop Fotografi Dokumenter Isu Lingkungan',
    category: 'Workshop',
    organizer: 'UKM Fotografi',
    date: '27 September 2026',
    hours: 5,
    certificate: 'Tersedia',
    certNo: 'NKT/SRT/2026/09/0731',
  },
  {
    id: 'p4',
    title: 'Webinar Zero Waste Lifestyle untuk Mahasiswa Kos',
    category: 'Webinar',
    organizer: 'KSM Eco Ranger',
    date: '30 Oktober 2026',
    hours: 2,
    certificate: 'Menunggu evaluasi',
    certNo: '—',
  },
]

export type Participant = {
  id: string
  name: string
  nim: string
  prodi: string
  email: string
  registeredAt: string
  status: 'Hadir' | 'Terdaftar' | 'Batal'
  checkIn?: string
  certificate: 'Terkirim' | 'Belum' | '—'
}

export const participants: Participant[] = [
  { id: '1', name: 'Alya Putri Ramadhani', nim: '2203141027', prodi: 'Teknik Lingkungan', email: 'alya.ramadhani@mhs.unusa.ac.id', registeredAt: '2 Nov 2026', status: 'Hadir', checkIn: '07.42', certificate: 'Terkirim' },
  { id: '2', name: 'Muhammad Fikri Hidayat', nim: '2101051133', prodi: 'Teknik Elektro', email: 'fikri.hidayat@mhs.unusa.ac.id', registeredAt: '2 Nov 2026', status: 'Hadir', checkIn: '07.45', certificate: 'Terkirim' },
  { id: '3', name: 'Siti Nurhaliza Putri', nim: '2304021009', prodi: 'Manajemen', email: 'siti.nurhaliza@mhs.unusa.ac.id', registeredAt: '3 Nov 2026', status: 'Hadir', checkIn: '07.51', certificate: 'Belum' },
  { id: '4', name: 'Rizal Ardiansyah', nim: '2202111045', prodi: 'Sistem Informasi', email: 'rizal.ardiansyah@mhs.unusa.ac.id', registeredAt: '3 Nov 2026', status: 'Terdaftar', certificate: '—' },
  { id: '5', name: 'Dewi Kartika Sari', nim: '2103091021', prodi: 'Biologi', email: 'dewi.kartika@mhs.unusa.ac.id', registeredAt: '3 Nov 2026', status: 'Hadir', checkIn: '07.58', certificate: 'Belum' },
  { id: '6', name: 'Bagas Prakoso', nim: '2205141078', prodi: 'Teknik Sipil', email: 'bagas.prakoso@mhs.unusa.ac.id', registeredAt: '4 Nov 2026', status: 'Hadir', checkIn: '08.02', certificate: 'Belum' },
  { id: '7', name: 'Nabila Zahra Aulia', nim: '2304061114', prodi: 'Ilmu Komunikasi', email: 'nabila.zahra@mhs.unusa.ac.id', registeredAt: '4 Nov 2026', status: 'Terdaftar', certificate: '—' },
  { id: '8', name: 'Kevin Christian Wijaya', nim: '2201031056', prodi: 'Arsitektur', email: 'kevin.wijaya@mhs.unusa.ac.id', registeredAt: '5 Nov 2026', status: 'Batal', certificate: '—' },
  { id: '9', name: 'Intan Permatasari', nim: '2102081092', prodi: 'Statistika', email: 'intan.permata@mhs.unusa.ac.id', registeredAt: '5 Nov 2026', status: 'Hadir', checkIn: '08.07', certificate: 'Belum' },
  { id: '10', name: 'Fadhil Akbar Maulana', nim: '2203121067', prodi: 'Teknik Kimia', email: 'fadhil.akbar@mhs.unusa.ac.id', registeredAt: '6 Nov 2026', status: 'Terdaftar', certificate: '—' },
  { id: '11', name: 'Putri Ayu Lestari', nim: '2305011030', prodi: 'Akuntansi', email: 'putri.ayu@mhs.unusa.ac.id', registeredAt: '6 Nov 2026', status: 'Hadir', checkIn: '08.11', certificate: 'Belum' },
  { id: '12', name: 'Galih Saputra', nim: '2104071015', prodi: 'Fisika', email: 'galih.saputra@mhs.unusa.ac.id', registeredAt: '7 Nov 2026', status: 'Terdaftar', certificate: '—' },
  { id: '13', name: 'Anisa Rahmawati', nim: '2203141088', prodi: 'Teknik Lingkungan', email: 'anisa.rahma@mhs.unusa.ac.id', registeredAt: '7 Nov 2026', status: 'Hadir', checkIn: '08.15', certificate: 'Belum' },
  { id: '14', name: 'Yoga Pratama Putra', nim: '2201011102', prodi: 'Informatika', email: 'yoga.pratama@mhs.unusa.ac.id', registeredAt: '8 Nov 2026', status: 'Terdaftar', certificate: '—' },
]

/* ---------- Organizer ---------- */

export const organizer = {
  name: 'BEM Universitas Nusantara',
  admin: 'Raka Mahendra',
  role: 'Koordinator Acara',
  initials: 'RM',
}

export type ManagedEvent = {
  id: string
  title: string
  category: Category
  date: string
  location: string
  registered: number
  quota: number
  attended: number
  status: EventStatus
}

export const managedEvents: ManagedEvent[] = [
  { id: 'green-campus-2026', title: 'Seminar Nasional Green Campus 2026', category: 'Seminar', date: '18 Nov 2026', location: 'Auditorium Utama', registered: 342, quota: 400, attended: 0, status: 'Pendaftaran Dibuka' },
  { id: 'workshop-uiux', title: 'Workshop UI/UX: Desain Produk Digital Berkelanjutan', category: 'Workshop', date: '22 Nov 2026', location: 'Lab Komputer FTI', registered: 58, quota: 60, attended: 0, status: 'Pendaftaran Dibuka' },
  { id: 'lkmm-td', title: 'Pelatihan Kepemimpinan LKMM-TD', category: 'Pelatihan', date: '29 Nov 2026', location: 'Student Center', registered: 96, quota: 120, attended: 0, status: 'Pendaftaran Dibuka' },
  { id: 'dies-natalis', title: 'Talkshow Dies Natalis ke-45: Kampus Berdaya', category: 'Seminar', date: '10 Nov 2026', location: 'Gedung Serbaguna', registered: 286, quota: 300, attended: 214, status: 'Berlangsung' },
  { id: 'python-data', title: 'Pelatihan Data Analytics dengan Python', category: 'Pelatihan', date: '15 Des 2026', location: 'Lab Data FMIPA', registered: 50, quota: 50, attended: 0, status: 'Kuota Penuh' },
  { id: 'energi', title: 'Seminar Energi Terbarukan untuk Kampus', category: 'Seminar', date: '24 Okt 2026', location: 'Aula FT', registered: 318, quota: 350, attended: 291, status: 'Selesai' },
  { id: 'zero-waste', title: 'Webinar Zero Waste Lifestyle', category: 'Webinar', date: '30 Okt 2026', location: 'Zoom Meeting', registered: 640, quota: 800, attended: 552, status: 'Selesai' },
  { id: 'mentoring', title: 'Workshop Mentoring Proposal PKM 2027', category: 'Workshop', date: 'Belum dijadwalkan', location: '—', registered: 0, quota: 100, attended: 0, status: 'Draf' },
]

export const registrationTrend = [
  { week: 'Mg 1', pendaftar: 120, hadir: 98 },
  { week: 'Mg 2', pendaftar: 186, hadir: 151 },
  { week: 'Mg 3', pendaftar: 164, hadir: 140 },
  { week: 'Mg 4', pendaftar: 242, hadir: 205 },
  { week: 'Mg 5', pendaftar: 298, hadir: 251 },
  { week: 'Mg 6', pendaftar: 276, hadir: 238 },
  { week: 'Mg 7', pendaftar: 351, hadir: 302 },
  { week: 'Mg 8', pendaftar: 412, hadir: 356 },
]

export const recentCheckins = [
  { name: 'Intan Permatasari', event: 'Talkshow Dies Natalis ke-45', time: '2 menit lalu' },
  { name: 'Bagas Prakoso', event: 'Talkshow Dies Natalis ke-45', time: '4 menit lalu' },
  { name: 'Dewi Kartika Sari', event: 'Talkshow Dies Natalis ke-45', time: '5 menit lalu' },
  { name: 'Siti Nurhaliza Putri', event: 'Talkshow Dies Natalis ke-45', time: '9 menit lalu' },
  { name: 'Muhammad Fikri Hidayat', event: 'Talkshow Dies Natalis ke-45', time: '12 menit lalu' },
]

/* ---------- Environmental impact ---------- */

// Asumsi: 1 lembar A4 80 gsm ≈ 5 g kertas ≈ 4,6 g CO2e (produksi + cetak);
// 1 dokumen digital ≈ 0,3 g CO2e; 1 pohon ≈ 8.333 lembar; ≈ 10 L air per lembar.
export const impact = {
  totalEvents: 48,
  totalParticipants: 6240,
  digitalDocs: 18590,
  sheetsSaved: 18590,
  paperKg: 92.95,
  reams: 37.2,
  trees: 2.2,
  waterL: 185900,
  co2Conventional: 85.5,
  co2Digital: 18.0,
  co2Ops: 12.4,
}

export const monthlyCo2 = [
  { month: 'Jan', konvensional: 4.2, digital: 1.3 },
  { month: 'Feb', konvensional: 5.1, digital: 1.4 },
  { month: 'Mar', konvensional: 7.8, digital: 1.7 },
  { month: 'Apr', konvensional: 9.4, digital: 1.9 },
  { month: 'Mei', konvensional: 6.3, digital: 1.5 },
  { month: 'Jun', konvensional: 8.9, digital: 1.8 },
  { month: 'Jul', konvensional: 10.6, digital: 2.1 },
  { month: 'Agu', konvensional: 9.8, digital: 2.0 },
  { month: 'Sep', konvensional: 11.2, digital: 2.1 },
  { month: 'Okt', konvensional: 12.2, digital: 2.2 },
]

export const categorySavings = [
  { name: 'Tiket cetak', sheets: 6240, co2: 28.7, color: '#059669' },
  { name: 'Sertifikat', sheets: 5410, co2: 24.9, color: '#10b981' },
  { name: 'Name tag', sheets: 4980, co2: 22.9, color: '#14b8a6' },
  { name: 'Poster & pamflet', sheets: 1440, co2: 6.6, color: '#84cc16' },
  { name: 'Daftar hadir', sheets: 520, co2: 2.4, color: '#bef264' },
]

export const opsFootprint = [
  { name: 'Server & hosting', value: 7.8, color: '#047857' },
  { name: 'Notifikasi email', value: 2.9, color: '#14b8a6' },
  { name: 'Penyimpanan berkas', value: 1.7, color: '#a3e635' },
]

export const processComparison = [
  { step: 'Pendaftaran', conventional: 'Formulir kertas, rekap manual ± 3 hari', paperless: 'Formulir online, rekap otomatis real-time', gain: '−3 hari' },
  { step: 'Tiket', conventional: '1 lembar cetak per peserta', paperless: 'E-tiket QR Code di email dan akun', gain: '−100% kertas' },
  { step: 'Presensi', conventional: 'Tanda tangan daftar hadir, ± 45 detik/orang', paperless: 'Pindai QR Code, ± 3 detik/orang', gain: '15× lebih cepat' },
  { step: 'Sertifikat', conventional: 'Cetak dan tanda tangan basah, 1–2 minggu', paperless: 'E-sertifikat terverifikasi QR, < 24 jam', gain: '−13 hari' },
  { step: 'Publikasi', conventional: '± 30 poster cetak per acara', paperless: 'E-poster dan tautan acara', gain: '−30 lembar' },
  { step: 'Name tag', conventional: 'Cetak dan laminasi plastik', paperless: 'Identitas tampil di e-tiket', gain: '−plastik' },
]
