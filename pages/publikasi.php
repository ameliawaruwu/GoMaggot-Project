
<?php
include '../views/headeradmin.php';

?>


<main>
            <div class="head-title">
                <div class="left">
                    <h1>Artikel</h1>
                    <ul class="breadcrumb">
                        <li><a href="#">Dasboard</a></li>
                        <li><i class='bx bx-chevron-right'></i></li>
                        <li><a class="active" href="#">Artikel</a></li>
                    </ul>
                </div>
                <a href="#" class="btn-download" id="addArtikelBtn">
                    <i class='bx bxs-plus-circle'></i>
                    <span class="text">Add New Artikel</span>
                </a>
            </div>

            <!-- Daftar Artikel -->
            <div class="artikel-container">
                <div class="artikel-list" id="artikelList">
                    <!-- Artikel akan ditampilkan di sini -->
                </div>
            </div>

            <!-- Modal untuk Tambah/Edit Artikel -->
            <div id="artikelModal" class="modal">
                <div class="modal-content">
                    <span class="close-modal" id="closeModalBtn">&times;</span>
                    <h2 id="modalTitle">Tambah Artikel Baru</h2>
                    <form id="artikelForm">
                        <input type="hidden" id="artikelId">
                        <div class="form-group">
                            <label for="judulArtikel">Judul Artikel</label>
                            <input type="text" id="judulArtikel" name="judulArtikel" required>
                        </div>
                        <div class="form-group">
                            <label for="tanggalArtikel">Tanggal</label>
                            <input type="date" id="tanggalArtikel" name="tanggalArtikel" required>
                        </div>
                        <div class="form-group">
                            <label for="gambarArtikel">Gambar Artikel</label>
                            <input type="file" id="gambarArtikel" name="gambarArtikel" accept="image/*">
                        </div>
                        <div class="form-group">
                            <label for="isiArtikel">Isi Artikel</label>
                            <textarea id="isiArtikel" name="isiArtikel" rows="5" required></textarea>
                        </div>
                        <button type="submit" class="btn-submit">Simpan Artikel</button>
                    </form>
                </div>
            </div>
        </main>


<?php
include '../views/footeradmin.php';
?>