<?php
$id = $_POST['id']; // lấy id từ form
$name = $_POST['name'];
$age = $_POST['age'];
$telephone = $_POST['telephone'];
//Chuyển thông tin thành câu SQL và truy vấn DB


//step1: connect db
$host = "localhost";
    $user = "root";
    $pass = "root";
    $db_name = "demo_1";
    $conn = new mysqli($host,$user,$pass,$db_name);
    if($conn->connect_error){
        // nếu mà kết nối db lỗi
        die("Connect database failed!");
    }
    //B2: Viết SQL thêm dữ liệu
$sql = "Update students set name = '$name', age = $age, telephone = '$telephone' where id =$id";
$conn->query($sql);
//chuyển hướng về trang danh sách sinh viên
header("Location: student.php");