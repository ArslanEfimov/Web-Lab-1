<?php

function check_x($x){
    return $x<=2 and $x>=-2;
}

function check_y($y){
    if(is_numeric($y) and ($y>-3 && $y<3)){
        return 1;
    }
    else return 0;

}

function check_r($r){
    if(is_numeric($r) and ($r>1 and $r<4)){
        return 1;
    } else return 0;
}

function check_in_area($x, $y, $r){
    if($x>0 and $y>0){
        return "<span class='miss'>Промах!</span>";
    }
    if(($x<=0 and $x>=-$r) and ($y<=0 and $y>=-($r/2))){ // Прямоугольник
        return "<span class='hit'>Попадание!</span>";
    }
    if($x >= 0 and $y <= 0 and abs($x) + abs($y) <= $r){ //Треугольник
        return "<span class='hit'>Попадание!</span>";
    }
    if(($x<=0 and $y>=0) and (pow($r/2,2)>= pow($x, 2) + pow($y, 2))){ // Круг
        return "<span class='hit'>Попадание!</span>";
    }
    else return "<span class='miss'>Промах!</span>";

}
session_start();
$time_start = microtime(true);
date_default_timezone_set('Europe/Moscow');
if($_SERVER["REQUEST_METHOD"]=="GET") {
    $x = $_GET["X"];
    $y = $_GET["Y"];
    $r = $_GET["R"];

    if (check_x($x) and check_y($y) and check_r($r)) {
        $result = check_in_area($x, $y, $r);
        $currentTime = date("H:i:s");
        $time = number_format(microtime(true) - $time_start, 10, ".", "")*1000000 . " ms";
        if (!isset($_SESSION["table-value"])) {
            $_SESSION["table-value"] = [$x, $y, $r, $currentTime, $time, $result];
        }
        include 'add_table.php';
        add_table($x, $y, $r, $currentTime, $time, $result);
    } else {
        echo "Данные в запросе введены некорректно!";
        http_response_code(400);
    }
}
?>