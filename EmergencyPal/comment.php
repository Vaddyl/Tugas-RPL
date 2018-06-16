<?php
  // Always include this line in php file
  include "connect.php";

  $postdata = file_get_contents("php://input");
  $user_id = "";
  $name = "";
  $post_id = "";
  $comment = "";

  // Getting data from POST with JSON format
  if (isset($postdata)) {
    $request = json_decode($postdata);
    $user_id = $request->user_id;
    $name = $request->name;
    $post_id = $request->post_id;
    $comment = $request->comment;
  }

  $query = mysqli_query($connect, "INSERT INTO comment (user_id, username, post_id, comment_text) VALUES ('$user_id', '$name', '$post_id', '$comment')");

    // Check if query executed successfully if not send a 404 status code
        if($query){
            $data =array(
                'message' => "Register Success",
                'status' => "200"
            );
        } else {
            $data =array(
                'message' => "Register Failed",
                'status' => "404"
            );
        }

    echo json_encode($data);
?>
