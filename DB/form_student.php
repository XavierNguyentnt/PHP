<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
    <title>Thêm sinh viên</title>
</head>

<body>
    <div class="card col-md-6 container-fluid" style="width: 40rem; border: none; position: relative; left: 50px;">
        <h1 class="text-center">Thêm sinh viên mới</h1>
        <form action="insert_student.php" method="post">

            <div class="mb-3">
                <b><label for="studentName" class="form-label">Name</label></b>
                <input type="text" name="name" class="form-control mb-3" id="studentName" placeholder="">
            </div>

            <div class="mb-3">
                <b><label for="studentAge" class="form-label">Age</label></b>
                <input type="number" min="1" name="age" class="form-control mb-3" id="studentAge" placeholder="">
            </div>

            <div class="mb-3">
                <b><label for="studentTelephone" class="form-label">Phone number</label></b>
                <input type="text" name="telephone" class="form-control mb-3" id="studentTelephone" placeholder="">
            </div>

            <div class="button-group mb-3">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
</body>

</html>