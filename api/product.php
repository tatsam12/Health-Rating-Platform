<?php
// Include database configuration
require_once 'config.php';

// Get product ID from URL
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'Product ID is required']);
    exit;
}

try {
    // Get product details
    $stmt = $pdo->prepare("
        SELECT p.id, p.name, p.description, p.price, p.health_score, p.serving_size,
               c.name as category, b.name as brand, p.ingredients, p.allergens
        FROM products p
        JOIN categories c ON p.category_id = c.id
        JOIN brands b ON p.brand_id = b.id
        WHERE p.id = ?
    ");
    $stmt->execute([$id]);
    $product = $stmt->fetch();
    
    if (!$product) {
        http_response_code(404);
        echo json_encode(['error' => 'Product not found']);
        exit;
    }
    
    // Get product nutrients
    $nutrientsStmt = $pdo->prepare("
        SELECT n.name, pn.amount, n.unit, pn.daily_value_percentage
        FROM product_nutrients pn
        JOIN nutrients n ON pn.nutrient_id = n.id
        WHERE pn.product_id = ?
    ");
    $nutrientsStmt->execute([$id]);
    $nutrients = $nutrientsStmt->fetchAll();
    
    // Get product certifications
    $certStmt = $pdo->prepare("
        SELECT c.name
        FROM product_certifications pc
        JOIN certifications c ON pc.certification_id = c.id
        WHERE pc.product_id = ?
    ");
    $certStmt->execute([$id]);
    $certifications = array_column($certStmt->fetchAll(), 'name');
    
    // Get product reviews
    $reviewsStmt = $pdo->prepare("
        SELECT r.id, u.name as user, r.rating, r.comment, r.created_at
        FROM reviews r
        JOIN users u ON r.user_id = u.id
        WHERE r.product_id = ?
        ORDER BY r.created_at DESC
    ");
    $reviewsStmt->execute([$id]);
    $reviews = $reviewsStmt->fetchAll();
    
    // Calculate average rating
    $ratingStmt = $pdo->prepare("
        SELECT AVG(rating) as avg_rating
        FROM reviews
        WHERE product_id = ?
    ");
    $ratingStmt->execute([$id]);
    $avgRating = $ratingStmt->fetch()['avg_rating'] ?? 0;
    
    // Get similar products
    $similarStmt = $pdo->prepare("
        SELECT p.id, p.name, p.price, b.name as brand,
               (SELECT AVG(rating) FROM reviews WHERE product_id = p.id) as rating
        FROM products p
        JOIN brands b ON p.brand_id = b.id
        WHERE p.category_id = (SELECT category_id FROM products WHERE id = ?)
        AND p.id != ?
        LIMIT 3
    ");
    $similarStmt->execute([$id, $id]);
    $similarProducts = $similarStmt->fetchAll();
    
    // Combine all data
    $productData = [
        'id' => $product['id'],
        'name' => $product['name'],
        'description' => $product['description'],
        'price' => $product['price'],
        'health_score' => $product['health_score'],
        'serving_size' => $product['serving_size'],
        'category' => $product['category'],
        'brand' => $product['brand'],
        'ingredients' => $product['ingredients'],
        'allergens' => $product['allergens'],
        'rating' => round($avgRating, 1),
        'nutrients' => $nutrients,
        'certifications' => $certifications,
        'reviews' => $reviews,
        'similar_products' => $similarProducts
    ];
    
    // Return product data
    echo json_encode([
        'success' => true,
        'product' => $productData
    ]);
} catch (PDOException $e) {
    // Database error
    http_response_code(500);
    echo json_encode(['error' => 'Server error']);
    
    // Log the error (in a real app)
    // error_log($e->getMessage());
}
?>

