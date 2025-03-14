<?php
// Include database configuration
require_once 'config.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get JSON data from request body
$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (!isset($data['email']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Email and password are required']);
    exit;
}

$email = $data['email'];
$password = $data['password'];

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email format']);
    exit;
}

try {
    // Prepare SQL statement
    $stmt = $pdo->prepare('SELECT id, name, email, password, is_admin FROM users WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    // Check if user exists and verify password
    if ($user && password_verify($password, $user['password'])) {
        // Remove password from response
        unset($user['password']);

        // Create a token (You can use JWT or any other method)
        $token = bin2hex(random_bytes(16));  // Replace this with actual token generation if necessary

        // Return success response with the token and user data
        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'token' => $token,  // Include the token
            'user' => $user
        ]);
    } else {
        // Invalid credentials
        http_response_code(401);
        echo json_encode(['error' => 'Invalid email or password']);
    }
} catch (PDOException $e) {
    // Database error
    http_response_code(500);
    echo json_encode(['error' => 'Server error ' . $e->getMessage()]);


    // Log the error (in a real app)
    // error_log($e->getMessage());
}
?>
