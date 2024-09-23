<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
require '../model/font-group-model.php';

if (isset($_POST['group_title']) && isset($_POST['rows'])) {
    $title = trim($_POST['group_title']);
    $rows = json_decode($_POST['rows'], true);

    if (empty($title)) {
        http_response_code(400);
        echo json_encode(["error" => "Group title is required."]);
        exit;
    }

    if (!is_array($rows) || empty($rows)) {
        http_response_code(400); 
        echo json_encode(["error" => "Rows data is invalid or empty."]);
        exit;
    }

    foreach ($rows as $row) {
        if (
            !isset($row['font']) || empty(trim($row['font'])) || 
            !isset($row['name']) || empty(trim($row['name'])) || 
            !isset($row['size']) || !is_numeric($row['size']) || 
            !isset($row['price']) || !is_numeric($row['price'])
        ) {
            http_response_code(400); 
            echo json_encode(["error" => "One or more fields in rows are invalid."]);
            exit;
        }
    }

    $group_id = add_group($title);
    if ($group_id) {
        foreach ($rows as $row) {
            add_font_to_group($group_id, $row['font'], $row['name'], $row['size'], $row['price']);
        }
        echo json_encode(["success" => true, "group_id" => $group_id]);
    } else {
        http_response_code(500); 
        echo json_encode(["error" => "Failed to create group."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "Group title or rows data missing."]);
}
