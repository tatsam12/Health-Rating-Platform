<?php
// Include database configuration
require_once 'config.php';

// Start session
session_start();

// Check if user is admin
if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get JSON data from request body
$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (!isset($data['name']) || !isset($data['category_id']) || !isset($data['brand_id']) || 
    !isset($data['price']) || !isset($data['health_score']) || !isset($data['description'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Required fields are missing']);
    exit;
}

try {
    // Begin transaction
    $pdo->beginTransaction();
    
    // Insert product
    $stmt = $pdo->prepare('INSERT INTO products (name, description, price, health_score, serving_size, 
                                               ingredients, allergens, category_id, brand_id, created_at) 
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())');
    
    $stmt->execute([
        $data['name'],
        $data['description'],
        $data['price'],
        $data['health_score'],
        $data['serving_size'] ?? null,
        $data['ingredients'] ?? null,
        $data['allergens'] ?? null,
        $data['category_id'],
        $data['brand_id']
    ]);
    
    $productId = $pdo->lastInsertId();
    
    // Insert nutrients
    if (isset($data['nutrients']) && is_array($data['nutrients'])) {
        $nutrientStmt = $pdo->prepare('INSERT INTO product_nutrients (product_id, nutrient_id, amount, daily_value_percentage) 
                                      VALUES (?, ?, ?, ?)');
        
        foreach ($data['nutrients'] as $nutrient) {
            $nutrientStmt->execute([
                $productId,
                $nutrient['id'],
                $nutrient['amount'],
                $nutrient['daily_value'] ?? null
            ]);
        }
    }
    
    // Insert certifications
    if (isset($data['certifications']) && is_array($data['certifications'])) {
        $certStmt = $pdo->prepare('INSERT INTO product_certifications (product_id, certification_id) 
                                  VALUES (?, ?)');
        
        foreach ($data['certifications'] as $certId) {
            $certStmt->execute([$productId, $certId]);
        }
    }
    
    // Insert serving recommendation
    if (isset($data['recommended_serving'])) {
        $servingStmt = $pdo->prepare('INSERT INTO serving_recommendations 
                                     (product_id, min_serving, max_serving, recommended_serving, recommendation_level, notes) 
                                     VALUES (?, ?, ?, ?, ?, ?)');
        
        $servingStmt->execute([
            $productId,
            $data['min_serving'] ?? null,
            $data['max_serving'] ?? null,
            $data['recommended_serving'],
            $data['recommendation_level'],
            $data['recommendation_notes'] ?? null
        ]);
    }
    
    // Commit transaction
    $pdo->commit();
    
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Product added successfully',
        'product_id' => $productId
    ]);
} catch (PDOException $e) {
    // Rollback transaction on error
    $pdo->rollBack();
    
    // Database error
    http_response_code(500);
    echo json_encode(['error' => 'Server error']);
    
    // Log the error (in a real app)
    // error_log($e->getMessage());
}
?>

