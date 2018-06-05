<?php
// Always include this line in php file
include "connect.php";
$postdata = file_get_contents("php://input");

if (isset($postdata)){
  $request = json_decode($postdata);
  $post_id = $request->post_id;
}

$query = "SELECT * FROM comment WHERE post_id = '$post_id'";
$result = mysqli_query($connect, $query);

$data = array();

if(mysqli_num_rows($result)){
  // Send the JSON comment to App
  $row_array = array();
    while($row = mysqli_fetch_array($result)){
        $row_array['name'] = $row['username'];
        $row_array['comment'] = $row['comment_text'];
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
