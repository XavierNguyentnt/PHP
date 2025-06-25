<?php
//Nhận pk
$id = $_GET['id'];
//truy vấn tìm sv theo id
//Step 1: kết nối db
    $host = "localhost";// máy tính của mình luôn
    $user = "root";
    $pass = "root";
    $db_name = "demo_1";
    $conn = new mysqli($host,$user,$pass,$db_name);
    if($conn->connect_error){
        // nếu mà kết nối db lỗi
        die("Connect database failed!");
    }
    // nếu sống sót ra đây thì tức là connect thành công
    // step 2: query
    $sql = "delete from students where id = $id";
    $rs = $conn->query($sql);

    //chuyển hướng về trang danh sách sinh viên
    header("Location: student.php");