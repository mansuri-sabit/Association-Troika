<?php
// Local preview only: mimics .htaccess for PHP's built-in server.
//   npm run build && npm run preview   (php -S 127.0.0.1:8001 -t dist _dev-router.php)
// Never uploaded: it sits outside dist/.

$path = rawurldecode((string) parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$root = __DIR__ . '/dist';

if (preg_match('#\.php$|/\.#', $path)) {
    http_response_code(403);
    exit('Forbidden');
}
$slug = trim($path, '/');
if ($slug !== '' && preg_match('#^[a-z0-9-]+$#', $slug) && is_file("$root/$slug.html")) {
    $path = "/$slug.html";
}
if ($path === '/') {
    $path = '/index.html';
}

$file = realpath($root . $path);
if ($file === false || strpos($file, realpath($root)) !== 0 || !is_file($file)) {
    http_response_code(404);
    exit('Not found');
}
$types = ['html' => 'text/html; charset=utf-8', 'css' => 'text/css', 'js' => 'text/javascript', 'json' => 'application/json',
    'svg' => 'image/svg+xml', 'webp' => 'image/webp', 'png' => 'image/png', 'jpg' => 'image/jpeg', 'jpeg' => 'image/jpeg',
    'ico' => 'image/x-icon', 'woff2' => 'font/woff2', 'woff' => 'font/woff', 'txt' => 'text/plain', 'xml' => 'application/xml'];
$ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
header('Content-Type: ' . ($types[$ext] ?? 'application/octet-stream'));
readfile($file);
