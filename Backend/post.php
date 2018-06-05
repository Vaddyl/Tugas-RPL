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

$query = "SELECT * FROM p3k";
$result = mysqli_query($connect, $query);

$id = 0;
$img = "";
$title = "";
$wording = "";
$link = "";
$sponsor = "";

$data = array();

if(mysqli_num_rows($result)){
  // Send the JSON marker to App
  $data_post = array();
  $row_array = array();
  while($row = mysqli_fetch_array($result)){
      $row_array['post_id'] = (int)$row['post_id'];
      $row_array['img'] = $row['img'];
      $row_array['title'] = $row['title'];
      $row_array['wording'] = $row['wording'];
      $row_array['link_ref']= $row['link_ref'];
      $row_array['sponsor']= $row['sponsor'];
      array_push($data_post, $row_array);
    }
    $data = array(
        'data' => $data_post,
        'message' => "Success",
        'status' => "200"
    );
  } else {
  // Send error
    $data = array(
        'message' => "Failed to load the map",
        'status' => "404"
    );
  }
  echo json_encode($data);
?>
