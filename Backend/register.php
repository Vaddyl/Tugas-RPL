<?php
  // Always include this line in php file
  include "connect.php";

  $query_select=mysqli_query($connect, "SELECT user_id FROM users ORDER BY user_id DESC");
  $id=mysqli_fetch_assoc($query_select);
  $id= $id['user_id']+1;
  $postdata = file_get_contents("php://input");
  $name = "";
  $username = "";
  $email = "";
  $password = "";
  $phone = "";

  // Getting data from POST with JSON format
  if (isset($postdata)) {
    $request = json_decode($postdata);
    $name = $request->name;
    $username = $request->username;
    $email = $request->email;
    $password = $request->password;
    $phone = $request->phone;
  }

  // Password Encryption because its cool
  $encrypt_password = md5($password);

  // Check if the users already registered
    $query_regis = mysqli_query($connect, "SELECT * FROM users WHERE email='$email' OR username='$username'");
    if(mysqli_num_rows($query_regis)){
      $data =array(
          'message' => "Email or Username Already Taken!",
          'status' => "409"
      );
    }


    else {
        $query_register = mysqli_query($connect, "INSERT INTO users (user_id, username, password, name, email, contact) VALUES ('$id', '$username', '$encrypt_password', '$name', '$email', '$phone')");

        // Check if query executed successfully if not send a 404 status code
        if($query_register){
            $data =array(
                'message' => "Register Success",
                'status' => "200"
            );
        }
        else{
            $data =array(
                'message' => "Register Failed",
                'status' => "404"
            );
        }
    }
    echo json_encode($data);
?>
