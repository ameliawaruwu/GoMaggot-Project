<?php
session_start();
include __DIR__ . '/../update/koneksi.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = mysqli_prepare($koneksi, "SELECT * FROM pengguna WHERE email = ?");
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($result)) {
        if (password_verify($password, $row['password'])) {
            if ($row['role'] === 'konsumen') {
                $_SESSION['id_pelanggan'] = $row['id_pelanggan'];
                $_SESSION['username'] = $row['username'];
                $_SESSION['email'] = $row['email'];
                $_SESSION['role'] = $row['role'];

                header("Location: ../../pages/home.php"); // naik 2 folder
                exit;
            } else {
                echo "❌ ROLE TIDAK DIIZINKAN LOGIN MELALUI HALAMAN INI.";
                exit;
            }
        } else {
            echo "❌ PASSWORD SALAH!";
            exit;
        }
    } else {
        echo "❌ EMAIL TIDAK DITEMUKAN!";
        exit;
    }
} else {
    echo "⚠️ AKSES TIDAK VALID.";
}
?>
