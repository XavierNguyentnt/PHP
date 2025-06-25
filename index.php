<?php 
// code php here
$x = 10;
$x++;
$x = "hello";
echo $x;
$y = 5;

if($y>=5){
    echo "A";
}else if($y>=0){
    echo "B";
}else if($y>=10){
    echo "C";
}else{
    echo "D";
}

for($i=0;$i<10;$i++){
    echo "i= ".$i;
}

$a = [];
$a[] = 15; // $a[0] = 15;
$a[] = "Quang Hoa"; // $a[1] = "Quang Hoa";

$student = [];
$student["name"] = "Bùi Như Lạc";
$student["age"] = 19;
$student["telephone"] = "0988777666";

echo $a[1];
echo $student["name"];
function total($a,$b){
    // echo $a+$b;
    return $a+$b;
}
total(6,5);
total(a: 6,b: 5);