function formatRupiah(input) {
    const originalValueInput = document.getElementById("original-value");
  
    const max = parseInt(input.max, 10); // Ambil nilai max dari atribut
    const min = parseInt(input.min, 10); // Ambil nilai min dari atribut
  
    // Simpan nilai sebelum perubahan
    const previousValue = input.dataset.previousValue || "";
  
    // Hapus angka awal 0 (kecuali angka 0 saja)
    let value = input.value.replace(/^0+(?!$)/, "");
    let originalValue;
  
    // Hapus karakter non-numerik (untuk berjaga-jaga jika ada)
    value = value.replace(/\D/g, "");
  
    // Jika melebihi max, kembalikan ke nilai sebelumnya
    if (value && parseInt(value, 10) > max) {
      value = previousValue;
    }
  
    // Jika kurang dari min, set ke min
    if (value && parseInt(value, 10) < min) {
      value = min.toString();
    }
  
    // Perbarui nilai input dan simpan nilai sebelumnya

    input.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Format angka dengan titik
    input.dataset.previousValue = value; // Simpan nilai terbaru sebagai referensi
  
    // Update nilai asli tanpa format ke input tersembunyi
    originalValueInput.value = value;
  }  