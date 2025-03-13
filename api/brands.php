<?php
// Include database configuration
require_once 'config.php';

try {
    // Get all brands
    $stmt = $pdo->query("
        SELECT b.id, b.name, COUNT(p.id) as product_count
        FROM brands b
        LEFT JOIN products p ON b.id = p.brand_id
        GROUP BY b.id
        ORDER BY b.name
    ");
    $brands = $stmt->fetchAll();
    
    // Return brands
    echo json_encode([
        'success' => true,
        'brands' => $brands
    ]);
} catch (PDOException $e) {
    // Database error
    http_response_code(500);
    echo json_encode(['error' => 'Server error']);
    
    // Log the error (in a real app)
    // error_log($e->getMessage());
}
?>

