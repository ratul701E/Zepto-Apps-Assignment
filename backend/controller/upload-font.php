<?php

require '../model/font-model.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

if (isset($_FILES['fontFile'])) {
    $file = $_FILES['fontFile'];
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);

    if ($extension !== 'ttf') {
        http_response_code(400); 
        echo json_encode(["error" => "Invalid file type. Only .ttf files are allowed."]);
        exit;
    }

    $uploadDir = '../uploads/fonts/';
    $filePath = $uploadDir . basename($file['name']);

    if (move_uploaded_file($file['tmp_name'], $filePath)) {
        $status = add_font($file['name'], $filePath);
        if ($status) {
            echo json_encode(["success" => "Font uploaded successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Database upload failed"]);
        }
    } else {
        http_response_code(500);
        echo json_encode(["error" => "File upload failed"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "No file uploaded"]);
}
