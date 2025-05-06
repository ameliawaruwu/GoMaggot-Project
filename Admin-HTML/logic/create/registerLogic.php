<?php
include __DIR__.'/../update/koneksi.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $role = 'konsumen'; // role default

    // Enkripsi password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // query INSERT dengan role
    $stmt = mysqli_prepare($koneksi, "
        INSERT INTO pengguna (username, email, password, role) 
        VALUES (?, ?, ?, ?)
    ");

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "ssss", $username, $email, $hashed_password, $role);
        mysqli_stmt_execute($stmt);

        // Redirect ke halaman login setelah register
        header('Location: ../../pages/login.php');
        exit;
    } else {
        echo "Gagal menyiapkan statement: " . mysqli_error($koneksi);
    }
}
?>
