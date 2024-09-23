<?php
    header("Access-Control-Allow-Origin: *");
    require '../model/font-model.php';
    echo json_encode(get_fonts());
    