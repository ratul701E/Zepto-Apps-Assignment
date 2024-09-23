<?php
    require_once 'db.php';    
    require_once 'font-group-mapped-model.php';    

    function add_group($name){
        $db = getDB();
        $stmt = $db->prepare("INSERT INTO groups (name) VALUES (?)");
    
        if ($stmt->execute([$name])) {
            return $db->lastInsertId();
        } else {
            return false;
        }
    }    

    function get_group() {
        $db = getDB();
        $stmt = $db->query("SELECT * FROM groups");
        $groups = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return $groups;
    }

    function get_group_by_id($id) {
        $db = getDB();
        $stmt = $db->query("SELECT * FROM groups where id={$id}");
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    function remove_groups($id) {
        $db = getDB();
        $stmt = $db->prepare("DELETE FROM groups where id = (?)");
        $status = $stmt->execute([$id]);
        remove_fonts_by_group($id);
        return $status;
    }

    function update_group_name($id, $name) {
        $db = getDB();
        $stmt = $db->prepare("UPDATE groups set name = (?) where id = (?)");
        $status = $stmt->execute([$name, $id]);
        return $status;
    }



