<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    
    require '../model/font-group-model.php'; 
    require '../model/font-model.php';
    
    $all_groups = get_group();
    
    $result = array();
    
    foreach ($all_groups as $group) {
        $font_mappings = get_fonts_by_group($group['id']);
        
        $fonts = array();
        
        foreach ($font_mappings as $font_mapping) {
            $font_info = get_font_by_id($font_mapping['font_id']);
            $font_info['name'] = $font_mapping['name'];
            $font_info['price'] = $font_mapping['price'];
            $font_info['size'] = $font_mapping['size'];
            $fonts[] = $font_info;
        }
        
        $result[] = array(
            'id' => $group['id'],
            'name' => $group['name'],
            'fonts' => $fonts,
            'count' => count($fonts)
        );
    }
    
    echo json_encode($result);
?>
