<?php
require_once __DIR__ . '/../update/koneksi.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $token = bin2hex(random_bytes(50));

    // Simpan token ke database
    $stmt = mysqli_prepare($koneksi, "UPDATE pengguna SET reset_token=? WHERE email=?");
    mysqli_stmt_bind_param($stmt, "ss", $token, $email);
    mysqli_stmt_execute($stmt);

    if (mysqli_stmt_affected_rows($stmt) > 0) {
        $reset_link = "http://localhost/MAGGOT/pages/reset_password.php?token=$token";
        echo "🔗 Link reset password: <a href='$reset_link'>$reset_link</a>";
    } else {
        echo "❌ Email tidak ditemukan.";
    }
}
?>
