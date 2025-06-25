<?php 
   $list = [];
   // lấy được các sinh viên từ table students trong db ra
   //step 1: connect db
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
    $sql = "select * from students";
    $rs = $conn->query($sql);
    if($rs->num_rows > 0){
        // đọc dữ liệu từ $rs ra $list ở trên để sử dụng
        while($row = $rs->fetch_assoc()){
            $list[] = $row;
        }
    }
echo json_encode($list);