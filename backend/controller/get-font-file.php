<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    if (isset($_GET['filename'])) {
        $filename = basename($_GET['filename']);
        $file = "../uploads/fonts/" . $filename;
        echo $file;

        if (file_exists($file)) {
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename="' . $filename . '"');
            header('Content-Length: ' . filesize($file));

            readfile($file);
            exit;
        } else {
            http_response_code(400);
            echo json_encode(["error" => "File not found."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "missing parameter filename"]);
    }
?>