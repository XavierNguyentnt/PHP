<?php
$name = $_POST['name'];
$age = $_POST['age'];
$telephone = $_POST['telephone'];

$host = "localhost";// máy tính của mình luôn
    $user = "root";
    $pass = "root";
    $db_name = "demo_1";
    $conn = new mysqli($host,$user,$pass,$db_name);
    if($conn->connect_error){
        // nếu mà kết nối db lỗi
        die("Connect database failed!");
    }
    //B2: Viết SQL thêm dữ liệu
$sql = "INSERT INTO students(name, age, telephone) VALUES ('$name', $age, '$telephone')";
$conn->query($sql);
// chuyển hướng về trang danh sách sinh viên
header("Location: student.php");