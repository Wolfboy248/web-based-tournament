<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>lmao</title>
</head>
    <body>

        Thank you for submitting!<br>
        Your submitted vetoed maps are: <br> <?php echo $_GET["P2map1"]; ?><br>
        <?php echo $_GET["P2map2"]; ?><br>
        <?php echo $_GET["P2map3"]; ?><br>
        <?php echo $_GET["P2map4"]; ?><br>
        <?php echo $_GET["P2map5"]; ?><br>
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