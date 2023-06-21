// jQuery(function($) {

//     $('form#contact_form').on('submit', function(e){
  
      
//       var form = $(this).serialize();

//       var formdata = new FormData();

//       formdata.append('contact_form', form);
//       formdata.append('action', 'thfw_email_contact');

//       var ajaxurl = thfw.ajaxurl;

//         $.ajax(ajaxurl, {
//             type: 'POST',
//             data: formdata,
//             processData: false,
//             contentType: false,
//             success: function(res) {
//                 console.log(res);
//             },
//             error: function(err) {
//                 console.log(err);
//             }
//         });

//         e.preventDefault();

//     })
// });