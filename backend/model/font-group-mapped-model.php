<?php
    require_once 'db.php';

    function get_fonts_by_group($group_id) {
        $db = getDB();
        $stmt = $db->query("SELECT * FROM group_mapped where group_id = {$group_id};");
        $groups = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $groups;
    }

    function remove_fonts_by_group($group_id) {
        $db = getDB();
        $stmt = $db->prepare("DELETE FROM group_mapped where group_id = (?)");
        $status = $stmt->execute([$group_id]);
        return $status;
    }

    function add_font_to_group($group_id, $font_id, $name, $size, $price) {
        $db = getDB();
        $stmt = $db->prepare("INSERT INTO group_mapped (group_id, font_id, name, size, price) VALUES (?, ?, ?, ?, ?)");
        return $stmt->execute(params: [$group_id, $font_id, $name, $size, $price]);
    }

    function remove_font_by_group_id($group_id, $font_id){
        $db = getDB();
        $stmt = $db->prepare("DELETE FROM group_mapped where group_id = (?) and font_id = (?)");
        $status = $stmt->execute([$group_id, $font_id]);
        return $status;
    }