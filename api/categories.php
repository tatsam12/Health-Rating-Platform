<?php
// Include database configuration
require_once 'config.php';

try {
    // Get all categories
    $stmt = $pdo->query("
        SELECT c.id, c.name, COUNT(p.id) as product_count
        FROM categories c
        LEFT JOIN products p ON c.id = p.category_id
        GROUP BY c.id
        ORDER BY c.name
    ");
    $categories = $stmt->fetchAll();

    // Return categories
    echo json_encode([
        'success' => true,
        'categories' => $categories
    ]);
} catch (PDOException $e) {
    // Database error
    http_response_code(500);
    echo json_encode(['error' => 'Server error']);
    
    // Log the error (in a real app)
    // error_log($e->getMessage());
}
?>

