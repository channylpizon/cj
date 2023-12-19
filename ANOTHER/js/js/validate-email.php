<?php

$mysqli = require _DIR_ . "/database.php";

if (isset($_GET["email"])) {
    $email = $mysqli->real_escape_string($_GET["email"]);

    $sql = "SELECT * FROM user WHERE email = '$email'";
    
    $result = $mysqli->query($sql);

    if ($result) {
        // Check if any rows are returned
        $is_available = $result->num_rows === 0;
        echo json_encode(["available" => $is_available]);
    } else {
        echo json_encode(["error" => "Query error"]);
    }
} else {
    echo json_encode(["error" => "Email parameter is missing"]);
}

$mysqli->close();