<?php
    $menu = [];
    $menu[] = "Phở Thìn";
    $menu[] = "Lẩu Tứ Xuyên";
    $menu[] = "Vịt quay Bắc Kinh";
    $menu[] = "Sườn om nấm";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo Page</title>
</head>
<body>
    <?php $class_name = "T2502E"; 
        // viet gi thi viet
    ?>
    <h1>Xin chào các bạn lớp <?php echo $class_name;?>  </h1>
    <h2>Mời các bạn chọn món ăn theo thực đơn sau:</h2>
    <ul>
        <?php for($i=0;$i<4;$i++):?>
            <li><?php echo $menu[$i];?></li>
        <?php endfor;?>    
    </ul>
    <ul>
        <?php foreach($menu as $item):?>
           <li><?php echo $item;?></li>
        <?php endforeach;?> 
    </ul>
</body>
</html>