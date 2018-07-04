<?php
  include "connect.php";

  $postdata = file_get_contents("php://input");
  $username = "";
  $name = "";
  $contact = "";
  $trigger = 0;

  if(isset($postdata)){
    $request = json_decode($postdata);
    $username = $request->username;
    $name = $request->name;
    $contact = $request->phone;
    $query = mysqli_query($connect, "SELECT * FROM users WHERE username='$username'");
    if(mysqli_num_rows($query)){ // Loleeee
      $trigger = 1;
    }
  }

  if($trigger){
    $query_edit = mysqli_query($connect, "UPDATE users SET name='$name', contact='$contact' WHERE username='$username'");
    $data = array (
      'message' => 'success',
      'status' =>  200
    );
  } else {
    $data = array (
      'message' => 'Failed',
      'status' => 404
    );
  }

  echo json_encode($data);
 ?>
