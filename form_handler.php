<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>lmao</title>
</head>
    <body>

        Thank you for submitting!<br>
        Your submitted vetoed maps are: <br> <?php echo $_POST["P1map1"]; ?><br>
        <?php echo $_POST["P1map2"]; ?><br>
        <?php echo $_POST["P1map3"]; ?><br>
        <?php echo $_POST["P1map4"]; ?><br>
        <?php echo $_POST["P1map5"]; ?><br>
        <?php 
        
        $path = 'maps/vetoesP1.json';
        
        $jsonData = [
                "P1Map1" => $_POST["P1map1"],
                "P1Map2" => $_POST["P1map2"],
                "P1Map3" => $_POST["P1map3"],
                "P1Map4" => $_POST["P1map4"],
                "P1Map5" => $_POST["P1map5"]
            ];

        $jsonString = json_encode($jsonData, JSON_PRETTY_PRINT);

        $fp = fopen($path,"w");
        fwrite( $fp, $jsonString );
        fclose($fp);

        ?>
        
    </body>
</html>