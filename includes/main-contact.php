<main>
    <div class="contact-card card">
        <p class="contact-form-message" id="contact_form_message"></p>
        <form name="contact_form" id="contact_form" method="post" action="">

            <label for="name">Name</label>
            <input name="contact_name" type="text" id="contact_name" class="input">

            <label for="email">Email Address</label>
            <input name="contact_email" type="email" id="contact_email" class="input">

            <label for="subject">Subject</label>
            <input name="contact_subject" type="text" id="contact_subject" class="input" />

            <label for="message">Message</label>
            <textarea name="contact_message" type="text" id="contact_message"></textarea>

            <input type="hidden" name="action" value="thfw_email_contact">
            <button class="sendmsg" id='contact_submit' name='submit' type='submit' value='submit'>
                <h3>SEND</h3>
            </button>
        </form>
    </div>
</main>
<script>
    var errorEmpty = "<?php echo $errorEmpty ?>";
    var errorEmail = "<?php echo $errorEmail ?>";

    if (errorEmpty == true) {
        $("#contact_name, #contact_email, #contact_subject, #contact_message").addClass('input-error');
    }

    if (errorEmail == true) {
        $('#contact_email').addClass('input-error');
    }
</script>