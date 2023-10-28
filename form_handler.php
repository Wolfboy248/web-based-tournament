<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="phpform.css">
    <title>lmao</title>
</head>
    <body>
        <div class="wrapper">
            <div class="container">
                <image src="images/ffo icon.png" class="icon">
                <h1>Thank you for submitting!</h1>
                <h1>Your submitted vetoed maps are:</h1> <br>
                <?php echo '<span class="p1map-element">' . $_GET["P1map1"] . '</span>'; ?><br>
                <?php echo '<span class="p1map-element">' . $_GET["P1map2"] . '</span>'; ?><br>
                <?php echo '<span class="p1map-element">' . $_GET["P1map3"] . '</span>'; ?><br>
                <?php echo '<span class="p1map-element">' . $_GET["P1map4"] . '</span>'; ?><br>
                <?php echo '<span class="p1map-element">' . $_GET["P1map5"] . '</span>'; ?><br>
            </div>
        </div>
        <?php 
        
        $path = 'maps/vetoesP1.json';
        
        $jsonData = [
                "P1Map1" => $_GET["P1map1"],
                "P1Map2" => $_GET["P1map2"],
                "P1Map3" => $_GET["P1map3"],
                "P1Map4" => $_GET["P1map4"],
                "P1Map5" => $_GET["P1map5"]
            ];

        $jsonString = json_encode($jsonData, JSON_PRETTY_PRINT);

        $fp = fopen($path,"w");
        fwrite( $fp, $jsonString );
        fclose($fp);

        ?>
    </body>
</html>