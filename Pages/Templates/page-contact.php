<?php
// require ORB_SERVICES . '/vendor/autoload.php';

// use PHPMailer\PHPMailer\PHPMailer;

// $msg = '';
// $mail = new PHPMailer;
// $mail->isSMTP();
// $mail->Host = SMTP_HOST;
// $mail->Port = SMTP_PORT;
// $mail->SMTPDebug = 2;
// $mail->SMTPAuth = true;
// $mail->Username = SMTP_USERNAME;
// $mail->Password = SMTP_PASSWORD;
// $mail->setFrom(SMTP_USERNAME, 'Mr. Snuffles');
// $mail->addAddress('jamel.c.lyons@gmail.com', 'Receiver Name');
// if ($mail->addReplyTo(SMTP_USERNAME, 'Contact')) {
//     $mail->Subject = 'PHPMailer contact form';
//     $mail->isHTML(false);
//     $mail->Body = 'It works!';
//     if (!$mail->send()) {
//         $msg = 'Sorry, something went wrong. Please try again later.';
//     } else {
//         $msg = 'Message sent! Thanks for contacting us.';
//     }
// } else {
//     $msg = 'Share it with us!';
// }
?>

<?php get_header();?>

    <?php include ORB_SERVICES . '/includes/main-contact.php';?>

<?php get_footer();?>