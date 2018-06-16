<?php
  include 'connect.php';

  $username = $_GET['username'];

  $query = mysqli_query($connect, "SELECT name, email, username FROM users WHERE username='$username'");
  if(mysqli_num_rows($query)){
    $result_user = array();
    while($result = mysqli_fetch_assoc($query)){
      array_push($result_user, $result);
    }
    $data = array (
      'message' => 'success',
      'data' => $result_user,
      'status' => '200'
    );
  } else {
    $data = array (
      'message' => 'Failed',
      'status' => '404'
    );
  }

  echo json_encode($data);
 ?>
