<?php
// Include database configuration
require_once 'config.php';

// Get query parameters
$category = isset($_GET['category']) ? $_GET['category'] : null;
$brand = isset($_GET['brand']) ? $_GET['brand'] : null;
$search = isset($_GET['search']) ? $_GET['search'] : null;
$sort = isset($_GET['sort']) ? $_GET['sort'] : 'relevance';
$min_price = isset($_GET['min_price']) ? (float)$_GET['min_price'] : 0;
$max_price = isset($_GET['max_price']) ? (float)$_GET['max_price'] : 1000;
$min_health = isset($_GET['min_health']) ? (int)$_GET['min_health'] : 0;
$max_health = isset($_GET['max_health']) ? (int)$_GET['max_health'] : 100;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 12;
$offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;

try {
    // Build the base query
    $sql = "SELECT p.id, p.name, p.description, p.price, p.health_score, 
                   c.name as category, b.name as brand, 
                   (SELECT AVG(rating) FROM reviews WHERE product_id = p.id) as rating
            FROM products p
            JOIN categories c ON p.category_id = c.id
            JOIN brands b ON p.brand_id = b.id
            WHERE p.price BETWEEN :min_price AND :max_price
            AND p.health_score BETWEEN :min_health AND :max_health";
    
    $params = [
        ':min_price' => $min_price,
        ':max_price' => $max_price,
        ':min_health' => $min_health,
        ':max_health' => $max_health
    ];
    
    // Add category filter if provided
    if ($category) {
        $sql .= " AND c.name = :category";
        $params[':category'] = $category;
    }
    
    // Add brand filter if provided
    if ($brand) {
        $sql .= " AND b.name = :brand";
        $params[':brand'] = $brand;
    }
    
    // Add search filter if provided
    if ($search) {
        $sql .= " AND (p.name LIKE :search OR p.description LIKE :search OR c.name LIKE :search OR b.name LIKE :search)";
        $params[':search'] = "%$search%";
    }
    
    // Add sorting
    switch ($sort) {
        case 'price-low':
            $sql .= " ORDER BY p.price ASC";
            break;
        case 'price-high':
            $sql .= " ORDER BY p.price DESC";
            break;
        case 'rating-high':
            $sql .= " ORDER BY rating DESC";
            break;
        case 'health-high':
            $sql .= " ORDER BY p.health_score DESC";
            break;
        default:
            $sql .= " ORDER BY p.id DESC";
    }
    
    // Add pagination
    $sql .= " LIMIT :limit OFFSET :offset";
    $params[':limit'] = $limit;
    $params[':offset'] = $offset;
    
    // Prepare and execute the query
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $products = $stmt->fetchAll();
    
    // Get total count for pagination
    $countSql = str_replace("SELECT p.id, p.name, p.description, p.price, p.health_score, 
                   c.name as category, b.name as brand, 
                   (SELECT AVG(rating) FROM reviews WHERE product_id = p.id) as rating", 
                  "SELECT COUNT(*) as total", $sql);
    $countSql = preg_replace("/LIMIT.*/", "", $countSql);
    
    $countStmt = $pdo->prepare($countSql);
    $countStmt->execute($params);
    $totalCount = $countStmt->fetch()['total'];
    
    // Return products with pagination info
    echo json_encode([
        'success' => true,
        'total' => $totalCount,
        'limit' => $limit,
        'offset' => $offset,
        'products' => $products
    ]);
} catch (PDOException $e) {
    // Database error
    http_response_code(500);
    echo json_encode(['error' => 'Server error']);
    
    // Log the error (in a real app)
    // error_log($e->getMessage());
}
?>

