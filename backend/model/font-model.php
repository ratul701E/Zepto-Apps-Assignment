<?php
    require_once 'db.php';

    function add_font($name, $path){
        $db = getDB();
        $stmt = $db->prepare("INSERT INTO font (name, path) VALUES (?, ?)");
        return $stmt->execute([$name, $path]);
    }

    function get_fonts() {
        $db = getDB();
        $stmt = $db->query("SELECT * FROM font");
        $fonts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return $fonts;
    }

    function get_font_by_id($id) {
        $db = getDB();
        $stmt = $db->query("SELECT * FROM font where id={$id}");
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    function remove_fonts($id) {
        $db = getDB();
        $stmt = $db->prepare("DELETE FROM font where id = (?)");
        $status = $stmt->execute([$id]);
        return $status;
    }

