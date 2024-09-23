<?php

require '../model/font-group-model.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

if (isset($_POST['id'])) {

    $font = get_group_by_id($_POST['id']);
    if (!$font) {
        echo 'Font not found with id ' . $_POST['id'];
        exit();
    }

    if (remove_groups($_POST['id']))
        echo true;
    else
        echo false;
} else {
    http_response_code(400);
    echo json_encode(["error" => "missing parameter id"]);
}