<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
require '../model/font-group-model.php';

if (isset($_POST['group_title']) && isset($_POST['rows']) && isset($_POST['group_id'])) {
    $title = trim($_POST['group_title']);
    $rows = json_decode($_POST['rows'], true);
    $group_id = $_POST['group_id'];

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

    remove_fonts_by_group($group_id);

    foreach ($rows as $row) {
        add_font_to_group($group_id, $row['font'], $row['name'], $row['size'], $row['price']);
    }

    update_group_name($group_id, $title);

    echo json_encode(["success" => true, "group_id" => $group_id]);

} else {
    http_response_code(400);
    echo json_encode(["error" => "Group title, rows data or group ID missing."]);
}
