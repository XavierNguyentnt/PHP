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
    $sql = "select * from students where id = $id";
    $rs = $conn->query($sql);
    $student = null;
    if($rs->num_rows > 0){
        // đọc dữ liệu từ $rs ra $list ở trên để sử dụng
        $student = $rs->fetch_assoc();
} else {
    die("404 not found");
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
    <title>Sửa thông tin sinh viên</title>
    <?php include("common/meta.php");?>
</head>

<body>


    <div class="card col-md-6 container-fluid" style="width: 40rem; border: none; position: relative; left: 50px;">
        <h1 class="text-center">Sửa thông tin sinh viên</h1>
        <form action="/update_student.php" method="post">
            <input type="hidden" name="id" value="<?php echo $student['id'];?>">

            <div>
                <b><label for="studentName" class="form-label">Name</label></b>
                <input type="text" name="name" value="<?php echo $student['name'];?>" class="form-control mb-3"
                    id="name" aria-describledby="student name">
            </div>

            <div>
                <b><label for="age" class="form-label">Age</label></b>
                <input type="number" min="1" name="age" value="<?php echo $student['age'];?>" class="form-control mb-3"
                    id="age">
            </div>

            <div>
                <b><label for="telephone" class="form-label">Telephone</label></b>
                <input type="text" name="telephone" value="<?php echo $student['telephone'];?>"
                    class="form-control mb-3" id="telephone">
            </div>


            <button type="submit" class="btn btn-primary">Submit</button>

        </form>
    </div>
    <div class="col"></div>
</body>

</html>