<?php
// Database configuration
$host = 'localhost';
$db_name = 'qualitybites';
$username = 'root';
$password = 'mysql';
$port = 3306;

// DSN (Data Source Name)
$dsn = "mysql:host=$host;dbname=$db_name;port=$port;charset=utf8mb4";

// Create PDO instance
try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Enable exceptions for errors
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

header('Content-Type: application/json');
?>
