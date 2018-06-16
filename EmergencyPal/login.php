<?php
  // Always include this line in php file
  include "connect.php";

  $postdata = file_get_contents("php://input");
  $username = "";
  $password = "";

  // Getting data from POST with JSON format
  if (isset($postdata)) {
    $request = json_decode($postdata);
    $username = $request->username;
    $password = $request->password;
  }

  // Password Encryption
  $encrypt_password = md5($password);

  // Check if the users already registered
  $query_login = mysqli_query($connect, "SELECT user_id, name, email, username, contact FROM users WHERE username='$username' AND password='$encrypt_password'");

  if(mysqli_num_rows($query_login)){
    $row=mysqli_fetch_assoc($query_login);
    $data =array(
        'message' => "Login Success",
        'data' => $row,
        'status' => "200"
    );
  }
  else {
      $data =array(
          'message' => "Login Failed, Email or Password Wrong",
          'status' => "404"
      );
  }
  echo json_encode($data);
?>
