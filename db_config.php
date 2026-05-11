<?php
// ============================================
// db_config.php  —  Database connection
// Edit these values to match your WAMP setup
// ============================================

define('DB_HOST',     'localhost');
define('DB_USER',     'root');        // WAMP default username
define('DB_PASS',     '');            // WAMP default password (blank)
define('DB_NAME',     'jacks_vault');
define('DB_CHARSET',  'utf8mb4');

/**
 * Returns a PDO connection. Throws a PDOException on failure.
 */
function get_pdo(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=' . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    }
    return $pdo;
}