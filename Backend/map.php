<?php
// Always include this line in php file
include "connect.php";
$postdata = file_get_contents("php://input");

// Getting data from POST with JSON format
/*if (isset($postdata)) {
  $request = json_decode($postdata);
  $lat_awal = $request->lat_awal;
  $lng_awal = $request->lng_awal;
}*/

$query = "SELECT * FROM locations";
$result = mysqli_query($connect, $query);

$id = "";
$name = "";
$address = "";
$contact = "";
$type = "";

$data = array();

if(mysqli_num_rows($result)){
  // Send the JSON marker to App
  $row_array = array();
  while($row = mysqli_fetch_array($result)){
      $row_array['id'] = (int)$row['id'];
      $row_array['name'] = $row['name'];
      $row_array['address'] = $row['address'];
      $row_array['contact'] = $row['contact'];
      $row_array['lat']= (float)$row['lat'];
      $row_array['lng']= (float)$row['lng'];
      $row_array['type']= $row['type'];
      $row_array['review']= (float)$row['review'];
      array_push($data, $row_array);
  }

  } else {
  // Send error
    $data = array(
        'message' => "Failed to load the map",
        'status' => "404"
    );
  }
  echo json_encode($data);
?>
