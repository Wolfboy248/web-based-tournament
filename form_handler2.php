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
                <h1>Thank you for submitting!</h1>
                <h1>Your submitted vetoed maps are:</h1> <br>
                <?php echo '<span class="p1map-element">' . $_GET["P2map1"] . '</span>'; ?><br>
                <?php echo '<span class="p1map-element">' . $_GET["P2map2"] . '</span>'; ?><br>
                <?php echo '<span class="p1map-element">' . $_GET["P2map3"] . '</span>'; ?><br>
                <?php echo '<span class="p1map-element">' . $_GET["P2map4"] . '</span>'; ?><br>
                <?php echo '<span class="p1map-element">' . $_GET["P2map5"] . '</span>'; ?><br>
            </div>
        </div>
        <?php 
        
        $path = 'maps/vetoesP2.json';
        
        $jsonData = [
                "P2Map1" => $_GET["P2map1"],
                "P2Map2" => $_GET["P2map2"],
                "P2Map3" => $_GET["P2map3"],
                "P2Map4" => $_GET["P2map4"],
                "P2Map5" => $_GET["P2map5"]
            ];

        $jsonString = json_encode($jsonData, JSON_PRETTY_PRINT);

        $fp = fopen($path,"w");
        fwrite( $fp, $jsonString );
        fclose($fp);

        ?>
    </body>
</html>