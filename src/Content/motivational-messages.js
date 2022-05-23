const motivationalMessages = {
    indonesia: {
        "0": "Selamat datang di layanan pendamping minum obat! Masa depan cerah menantimu 😊",
        "1": "Hallo, ini adalah hari pertama kamu minum obat. Semangat untuk memulai pengobatannya.",
        "2": "Bagaimana perasaan kamu setelah minum obat? Jangan ragu menghubungi pendamping minum obat bila kamu memiliki keluhan.",
        "3": "Jangan lupa minum obat tepat waktu hari ini 😊",
        "4": "Saya tahu minum obat itu sulit, jangan putus asa, tetap semangat",
        "5": "Hello, apakah hari ini kamu sudah minum obat? Jangan ragu untuk menghubungi perawat bila ada gejala ya",
        "6": "Kamu seorang pejuang, lawan penyakit yang ada di tubuhmu dengan minum obat secara teratur",
        "7": "Kamu sudah melewati minggu pertama pengobatan, tetap semangat minum obat dan terimakasih sudah melapor!",
        "8": "Bagaimana kabar kamu hari ini? yakinlah untuk sembuh!",
        "9": "Kawan, banyak yang menunggu kamu untuk sembuh, tetap berjuang ya 😊",
        "10": "Percayalah setiap penyakit ada obatnya, kamu hanya perlu berjuang dan berpikir positif, semangat kawan!",
        "11": "Bagaimana perasaan kamu setelah minum obat? Jangan menyerah minum obat sampai tuntas ya!",
        "12": "Hallo, apa yang kamu rasakan hari ini? Kamu bisa melalui ini semua, percayalah 😊",
        "13": "Hai jangan lupa cek jadwal kunjungan kamu dan persediaan obat",
        "14": "Wow kamu Sudah menjalani dua minggu minum obat, semangat ya kamu pasti bisa",
        "15": "Saya tahu kamu jenuh minum obat dan itu sulit, percayalah kamu berjuang tidak sendiri, ada keluarga yang mendukung mu untuk sembuh!",
        "16": "Jangan lupa untuk bahagia dan minum obat hari ini 😊",
        "17": "Kamu mungkin tidak tahu bahwa kamu dibutuhkan, kamu hebat, ayo semangat untuk minum obat!",
        "18": "Jangan menyerah untuk sembuh dengan minum obat setiap hari!",
        "19": "Saya tahu minum obat setiap hari memang membosankan, tapi yakinlah kamu pasti bisa!",
        "20": "Hai, katakan ini pada diri kamu “saya sehat, saya bisa, saya luar biasa”.",
        "21": "Minggu ketiga minum obat terlewati, kamu hebat saya bangga sama kamu !",
        "22": "Hello sobat, bagaimana perasaan kamu hari ini? jangan lupa minum obat tepat waktu ya 😊",
        "23": "Ayo kawan, perjuangkan kesembuhanmu!",
        "24": "Jangan lupa cek persediaan obat kamu ya!",
        "25": "Jika kamu merasa bosan, ingatlah orang-orang yang kamu cintai sebagai alasan kamu untuk sembuh.",
        "26": "Kesembuhan memang butuh waktu dan kerja keras, salah satunya dengan teratur minum obat, sulit memang, tapi kamu pasti bisa melewatinya.",
        "27": "Hai jangan lupa cek jadwal kunjungan kamu ya 😊",
        "28": "Saya tahu kamu mulai jenuh minum obat, jangan menyerah kamu pasti bisa!",
        "29": "Jangan lupa senyum hari ini, jangan menyerah tetap semangat 😊",
        "30": "Selesai minggu ke-4 pengobatan. Beri penghargaan untuk diri kamu, karena kamu luar biasa sudah melewati 1 bulan pengobatan",
        "31": "Masuk bulan kedua ini, wah tetap semangat ya minum obatnya.",
        "32": "Jaga kesehatanmu, jaga kesehatan orang lain, tetap semangat dan jangan lupa minum obat 😊",
        "33": "Menjadi sakit itu terasa tidak enak, tetapi kamu harus tahu banyak orang yang memikirkan mu dan berdoa untuk kesehatan mu!",
        "34": "Hai, katakan ini pada diri kamu “saya sehat, saya semangat, saya pasti sembuh”.",
        "35": "Hello, semoga hari mu menyenangkan 😊",
        "36": "Jangan menyerah, nikmati hari-hari mu dengan senyum dan tetaplah semangat .",
        "37": "Minggu ke-5 pengobatan terlewati sudah, hai, jangan lupa bersyukur hari ini!",
        "38": "Sabar, jangan menyerah dan terus lawan penyakit mu, semangat.",
        "39": "Hal terpenting dalam sakit adalah jangan pernah berkecil hati dan putus asa, kamu kuat.",
        "40": "Aku tahu hari ini memang bukanlah yang terbaik untukmu, karena kamu harus menelan obat setiap hari, tapi yakinlah bahwa kamu kuat untuk melalui semuanya.",
        "41": "Hai, mulailah hari ini dengan pikiran positif dan tetap semangat 😊",
        "42": "Kamu adalah orang yang paling kuat, semangat dan yakinlah untuk sembuh!",
        "43": "Hai jangan lupa cek jadwal kunjungan kamu ya!",
        "44": "Kamus sudah minum obata selama 6 minggu. Yakinlah! Setiap penyakit ada obatnya",
        "45": "Hai, katakan ini pada dirimu hari ini “saya sehat, saya kuat, saya luar biasa”",
        "46": "Hello, bagaimana kabar kamu hari ini? Jalani pengobatan ini dengan sabar dan selalu tersenyum 😊",
        "47": "Jangan lupa untuk selalu mengecek persediaan obat kamu!",
        "48": "Pengobatan TBC tuntas bukanlah waktu yang singkat, waktu terus berputar, semoga kamu tetap selalu kuat dan sehat!",
        "49": "Hai, jangan lupa minum obat hari ini 😊",
        "50": "Bagaimana suasana hatimu saat ini? Tetaplah berjuang minum obat setiap hari dan yakinlah kamu bisa sembuh!",
        "51": "Minggu ke-7 terlewati sudah, terimakasih sudah melapor",
        "52": "Hello, semoga lekas sembuh ya, minum obat secara teratur hari ini 😊",
        "53": "Kamu itu orang yang kuat, saya yakin kamu bisa cepat sembuh, ayo tetap semangat!",
        "54": "Berjuanglah untuk sembuh!",
        "55": "Jika hari-hari yang menyulitkan akan berlalu tanpa terasa, yakinlah bahwa TBC bisa disembuhkan!",
        "56": "Walaupun sedang menjalani pengobatan yang lama dan tidak mudah, tetaplah selalu bersyukur dan selalu semangat!",
        "57": "Hello, semoga kamu selalu semangat menjalani pengobatan",
        "58": "Hello, apa kabar mu hari ini? jangan lupa minum obat teratur ya, jangan menyerah",
        "59": "Hai jangan lupa cek jadwal kunjungan kamu ya",
        "60": "Minggu ke-8 sudah kamu jalani, kamu luar biasa sudah menyelesaikan pengobatan tahap awal selama 2 bulan",
        "61": "Hello, semoga kamu selalu kuat menjalani pengobatan sampai selesai",
        "62": "Semangat, tak apa sekarang kamu menjalani pengobatan dan minum obat setiap hari, saya yakin kamu bisa melalui semua dan kembali sehat",
        "63": "Saya tahu minum obat TBC selama 6 bulan bukanlah waktu yang singkat, jangan sedih dan takut, ada keluarga yang menunggu mu untuk sehat kembali",
        "64": "Hello, apa kabar? Jangan lupa selalu berdoa untuk kesembuhan mu 😊",
        "65": "Jadilah versi terbaik diri kamu , dengan tekad kuat untuk sembuh, jangan lupa minum obat ya",
        "66": "Hai, semoga kamu lekas sembuh ya, jangan lupa minum obat",
        "67": "Minggu ke-9 minum obat telah terlewati, terimakasih!",
        "68": "Hello jangan lupa senyum hari ini",
        "69": "Hello sobat, bagaimana perasaan kamu hari ini? jangan lupa minum obat tepat waktu ya",
        "70": "Jangan lupa untuk selalu mengecek persediaan obat kamu",
        "71": "Hello, apa yang saat ini kamu rasakan? Kamu bisa menjalani pengobatan ini sampai selesai dan kembali sehat, tetap optimis!",
        "72": "Hai jangan lupa bersyukur hari ini 😊",
        "73": "Hai jangan lupa cek jadwal kunjungan kamu ya",
        "74": "Segera masuk minggu ke-11, terimakasih telah menghargai diri kamu sendiri",
        "75": "Bagaimana kabar kamu hari ini? tetap semangat dan optimis untuk sembuh",
        "76": "Banyak yang membutuhkan mu maka dari itu berjuanglah untuk sembuh, tuntaskan pengobatan",
        "77": "Jangan ragu menghubungi pendamping minum obat bila kamu memiliki keluhan",
        "78": "Jangan lupa melapor hari ini ya 😊",
        "79": "Hai, katakan ini pada diri kamu “saya sehat, saya semangat, saya pasti sembuh”.",
        "80": "Apakah hari ini kamu sudah minum obat?",
        "81": "Tidak terasa akan menjalani minggu ke-12 pengobatan, terimakasih sudah bekerjasama dalam pengobatan",
        "82": "Kamu kuat, kamu hebat yakinlah untuk sembuh 😊",
        "83": "Kamu tidak berjuang sendiri, ada keluarga yang mengharapkan kamu sembuh",
        "84": "Ya, kamu TBC, tetapi percayalah kamu memiliki masa depan karena hidup terus berjalan",
        "85": "Kamu pejuang luar biasa, terimakasih sudah menghargai diri kamu",
        "86": "Jangan lupa cek persediaan obat kamu ya",
        "87": "Hello, semoga hari mu menyenangkan 😊",
        "88": "Hai jangan lupa cek jadwal kunjungan kamu",
        "89": "Apakah kamu sudah minum obat hari ini? Jangan lupa melapor ya",
        "90": "Kamu sudah 12 minggu menjalani pengobatan, kamu luar biasa, sudah melewati pengobatan ini sampai di bulan ketiga, sedikit lagi ayo semangat",
        "91": "Semangat, tak apa sekarang kamu menjalani pengobatan dan minum obat setiap hari, saya yakin kamu bisa melalui semua dan kembali sehat",
        "92": "Tetap semangat, tidak lama lagi kamu melihat ke belakang dan bilang “semuanya sudah saya lalui”, kamu pasti bisa karena kamu kuat",
        "93": "Hai kawan, jangan lupa minum obat dengan teratur",
        "94": "Katakan ini pada diri kamu “saya pejuang yang tangguh untuk bisa sembuh”",
        "95": "Bersyukurlah untuk hari ini, esok dan seterusnya. Walaupun kamu sedang berjuang melawan rasa sakit 😊",
        "96": "Banyak yang membutuhkan mu maka dari itu berjuanglah untuk sembuh, tuntaskan pengobatan!",
        "97": "Masuk minggu ke-14, pastikan kamu melapor setiap hari",
        "98": "Hello sobat, bagaimana perasaan kamu hari ini? jangan lupa minum obat tepat waktu",
        "99": "Walaupun sedang menjalani pengobatan yang lama dan tidak mudah, tetaplah selalu bersyukur dan selalu semangat 😊",
        "100": "Jangan lupa untuk selalu mengecek persediaan obat kamu",
        "101": "Jangan menyerah untuk sembuh dengan minum obat setiap hari 😊",
        "102": "Hai jangan lupa cek jadwal kunjungan kamu",
        "103": "Hello, sudahkah kamu minum obat hari ini?",
        "104": "Masuk minggu ke-15, terimakasih telah berjuang sejauh ini untuk sembuh, saya bangga sama kamu",
        "105": "Jangan menyerah, nikmati hari-harimu dan tetaplah bersemangat 😊",
        "106": "Jangan berhenti berjuang karena ada keluarga yang menunggu mu untuk sembuh",
        "107": "Terimakasih karena memberi laporan minum obat tiap hari",
        "108": "Aku tahu hari ini memang bukanlah yang terbaik untukmu, karena kamu harus menelan obat setiap hari, tapi yakinlah bahwa kamu kuat untuk melalui semuanya",
        "109": "Saat rasa jenuh itu muncul, ingatlah waktu yang sudah kamu lewati untuk sampai di hari ini",
        "110": "Hello sobat, bagaimana perasaan kamu hari ini? jangan lupa minum obat tepat waktu",
        "111": "Masuk minggu ke-16 minum obat, jangan lupa bersyukur hari ini",
        "112": "Kamu seorang pejuang, lawan penyakit yang ada di tubuhmu dengan minum obat secara teratur",
        "113": "Jangan lupa untuk selalu mengecek persediaan obat kamu",
        "114": "Nikmati hari hari mu dengan senyum dan rasa syukur",
        "115": "Kamu kuat, kamu hebat yakinlah untuk sembuh 😊",
        "116": "Hello, apa kabar hari ini? jangan lupa minum obat nya",
        "117": "Katakan ini pada diri kamu “saya pejuang yang tangguh untuk bisa sembuh”",
        "118": "Terimakasih sudah berjuang sampai saat ini untuk sembuh 😊",
        "119": "Hai jangan lupa cek jadwal kunjungan kamu",
        "120": "Minggu ke-16 pengobatan terlampaui, pengobatan kamu sudah masuk bulan ke empat, jangan pantang menyerah",
        "121": "Jadilah kuat, jadilah tak kenal takut dan percayalah kamu bisa melewati ini semua 😊",
        "122": "Bagaimana perasaan kamu hari ini? jangan lupa minum obat tepat waktu",
        "123": "Terimakasih karena sudah melapor minum obat hari ini",
        "124": "Hello, semoga kamu selalu kuat menjalani pengobatan sampai selesai",
        "125": "Hello, jangan ragu untuk menghubungi petugas pendamping minum obat bila kamu ada keluhan",
        "126": "Jangan lupa cek persediaan obat kamu ya",
        "127": "Minggu ke-18 pengobatan, mari terus berjuang untuk sembuh dan sehat",
        "128": "Banyak yang membutuhkan mu maka dari itu berjuanglah untuk sembuh, tuntaskan pengobatan",
        "129": "Apakah kamu sudah minum obat hari ini?",
        "130": "Setiap hari adalah berkat. Kamu harus menemukan hal-hal itu untuk disyukuri 😊",
        "131": "Minum obat teratur dan berpikir positif, kamu pasti sembuh",
        "132": "Hai jangan lupa cek jadwal kunjungan kamu",
        "133": "Semoga setelah menjalani pengobatan ini, kamu semakin membaik dan segera sembuh 😊",
        "134": "Minggu ke-19 minum obat, semangat untuk sembuh",
        "135": "Hello apa kabar hari ini? Jangan lupa untuk memberi laporan minum obat ya",
        "136": "Temukanlah kekuatan mu dengan melihat wajah orang-orang yang menyayangi kamu sebagai motivasi terbesar untuk sembuh",
        "137": "Katakan ini pada diri kamu “saya adalah pejuang yang tangguh untuk bisa sembuh”",
        "138": "Hal terpenting dalam sakit adalah jangan pernah berkecil hati dan putus asa, kamu kuat",
        "139": "Hello, jangan lupa minum obat secara teratur hari ini semoga lekas sembuh",
        "140": "Ayok selesaikan pengobatan samapi tuntas",
        "141": "Hai jangan lupa bersyukur hari ini",
        "142": "Minggu ke-20 minum obat, ayo semangat dan pantang menyerah",
        "143": "Saya bangga sama kamu, kamu luar biasa",
        "144": "Kamu sudah bertahan sejauh ini, jangan menyerah sedikit lagi",
        "145": "Jangan lupa untuk selalu mengecek persediaan obat kamu ya",
        "146": "Hai, katakan ini pada diri kamu “saya sehat, saya semangat, saya pasti sembuh”.",
        "147": "Hello, jangan lupa cek jadwal kunjungan kamu ya",
        "148": "Katakan ini pada diri kamu “saya bisa dan akan sembuh 😊",
        "149": "Jangan lupa untuk melaporkan aktivitas minum obat hari ini",
        "150": "Hari terakhir minggu ke-20 pengobatan, wow luar biasa, pengobatan kamu sudah masuk bulan ke lima, ayo sisa 1 bulan lagi, jangan menyerah",
        "151": "Jangan menyerah untuk sembuh dengan minum obat setiap hari",
        "152": "Hai semoga harimu menyenangkan",
        "153": "Beri apresiasi diri kamu karena sudah bertahan sampai sejauh ini untuk sembuh",
        "154": "Tetap semangat untuk tuntaskan pengobatan kamu ya",
        "155": "Bagaimana perasaan kamu hari ini? jangan lupa minum obat tepat waktu",
        "156": "Jangan lupa minum obat hari ini",
        "157": "Minggu ke-22 minum obat, sedikit lagi ayo semangat",
        "158": "Jangan lupa cek persediaan obat kamu ya",
        "159": "Apakah kamu sudah minum obat hari ini?",
        "160": "Jangan lupa senyum hari ini",
        "161": "Kamu pasti bisa sembuh dan kembali sehat",
        "162": "Hai, jangan lupa cek jadwal kunjungan kamu ya",
        "163": "Jangan lupa laporkan aktivitas minum obat kamu hari ini",
        "164": "Minggu ke-23 minum obat, terimakasih telah menghargai diri kamu",
        "165": "Apakah kamu sudah minum obat hari ini tepat waktu?",
        "166": "Percayalah usaha yang kamu jalani saat ini tidak akan sia-sia",
        "167": "Saya bangga sama kamu karena mau bekerjasama dengan memberi laporan minum obat setiap hari",
        "168": "Teruslah berjuang sampai pengobatan tuntas",
        "169": "Hello, bagaimana kabar kamu hari ini? Jalani pengobatan ini dengan sabar dan selalu tersenyum",
        "170": "Jangan lupa bersyukur hari ini",
        "171": "Minggu ke-24 minum obat, wah kamu luar biasa sudah sejauh ini untuk berjuang",
        "172": "Terimakasih karena kamu selalu memberi laporan aktivitas minum obat",
        "173": "Hello semoga hari menyenangkan",
        "174": "Kamu hebat dan kamu luar biasa",
        "175": "Terimakasih sudah berjuang sampai 6 bulan terakhir ini, kamu hebat",
        "176": "Setiap hari adalah berkat. Kamu harus menemukan hal-hal itu untuk disyukuri 😊",
        "177": "Hai kawan, jangan lupa cek jadwal kunjungan kamu ya",
        "178": "Semoga setelah menjalani pengobatan ini, kamu semakin membaik dan segera sembuh 😊",
        "179": "Bagaimana suasana hatimu saat ini? Tetaplah berjuang minum obat setiap hari dan yakinlah kamu bisa sembuh",
        "180": "Hari terakhir pengobatan, hebat, pengobatan kamu sudah selesai, kamu luar biasa melewati pengobatan ini dengan teratur dan sampai tuntas!",
    }
}

export default motivationalMessages;