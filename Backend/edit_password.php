<?php
  include 'connect.php';

  $username = "";
  $old_password = "";
  $new_password = "";
  $postdata = file_get_contents("php://input");
  
  if (isset($postdata)){
    $request = json_decode($postdata);
    $username = $request->username;
    $old_password = md5($request->old_password);
    $new_password = md5($request->new_password);
  }

  $query_check = mysqli_query($connect, "SELECT * FROM users WHERE username='$username' AND password='$old_password'");
  if(mysqli_num_rows($query_check)){
    $query_password = mysqli_query($connect, "UPDATE users SET password='$new_password' WHERE username='$username'");
    if($query_password){
      $data =array(
          'message' => 'Password succesfully changed!',
          'status' => 200
      );
    } else {
      $data = array (
        'message' => 'bad password',
        'status' => 400
      );
    }
  } else {
    $data = array (
      'message' => 'bad password',
      'status' => 403
    );
  }

  echo json_encode($data);
 ?>
