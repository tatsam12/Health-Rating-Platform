<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "mysql";
$dbname = "qualitybites";
$port = 3306;

$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed"]));
}

// Retrieve and sanitize form data
$name = trim($_POST['fullname']);
$email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
$password = $_POST['password'];
$confirm_password = $_POST['confirm_password'];

// Validate input
if (empty($name) || empty($email) || empty($password) || empty($confirm_password)) {
    echo json_encode(["success" => false, "message" => "All fields are required"]);
    exit;
}

// Check if passwords match
if ($password !== $confirm_password) {
    echo json_encode(["success" => false, "message" => "Passwords do not match"]);
    exit;
}

// Check if email already exists
$sql = "SELECT id FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Email already exists"]);
    exit;
}

// Hash password before storing it
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Insert user into database
$sql = "INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, NOW())";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $name, $email, $hashedPassword);

// Execute the statement and check for errors
if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "User registered successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Registration failed", "error" => $stmt->error]);
}

// Close connection
$conn->close();
?>
