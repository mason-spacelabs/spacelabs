
// Open all external links in a new browser window

$('a[href^="http"]').not('a[href^="'+$(location).attr('hostname')+'"]').attr('target', '_blank');

// Set browser Cookies with an expiration

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Get a browser cookie and set it to a variable

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Check for a cookie using the getCookie() function and comparing results with a switch statement

function checkCookie() {
    var ipAddress = getCookie("ipAddress");
    switch (ipAddress) {
        case "US":
            setCookie("modalCheck", false, 1);
        break;
        case "":
            ipAddressCheck();
        break;
        default:
            var modalCheck = getCookie("modalCheck");
            shippingModal(modalCheck);
    }
}

// Activate the shipping modal based on region if the checkCookie() function sets default

function shippingModal(modalCheck){

    switch (modalCheck) {
        case "true":
            $("#shipping_message").css({display: "block"});
        break;
        case "false":
        break;
        default:
            setCookie("modalCheck", true, 1);
    }
}

// Close the shipping modal clicking on the close button and resets the browser cookie to false

function shippingClose() {
    $("#shipping_message").css({display: "none"});
    setCookie("modalCheck", false, 1);
}


// Checks IP Address for all visitors and sets the ipAddress cookie

function ipAddressCheck() {
    $.get("https://ipinfo.io", function(response) {
        var country = response.country;
        setCookie("ipAddress", country, 1);
        checkCookie();
    }, "jsonp");
}

// Run the function when the browser loads for IP Address check

checkCookie(); 

// Form Previous Button

function registerFormPrevious() {
    if ($('#section5').is(':visible')) {
        $('#section4').show();
        $('#section5').hide();
    }else if ($('#section4').is(':visible')) {
        $('#section3').show();
        $('#section4').hide();
        $("#progress").css("width", "66%");
        $("#step4").css("color", "#d8d8d8");
    }else if($('#section3').is(':visible')){
        $('#section2').show(); 
        $('#section3').hide();
        $("#progress").css("width", "33%");
        $("#step3").css("color", "#d8d8d8");
    }else if($('#section2').is(':visible')){
        $('#section1').show(); 
        $('#section2').hide();
        $("#progress").css("width", "0%");
        $("#step2").css("color", "#d8d8d8");
    }
}

// Form page validation before submitting the contact to admin email

$(".next").click(function(){

    var form = $("#contact_form");
    $.validator.messages.required = "";

    form.validate({
        debug: true,
        errorClass: 'error',
        validClass: 'success',
        errorElement: 'label',
        errorPlacement: function(error, element) {
            error.insertAfter(element.parent());
        },
        highlight: function(element, errorClass, validClass) {
        $(element).parents("div.form-field").find(".form-field-input").addClass("form-field-error");
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).parents("div.form-field").find(".form-field-input").removeClass("form-field-error");
            $(element).parents("div.form-field").find( ".error" ).remove(); 
        },
        rules: {
            "contact[Firstname]": {
                required: true,
                maxlength: 50
            },
            "contact[Lastname]": {
                required: true,
                maxlength: 50
            },
            "contact[email]": {
                required: true,
                maxlength: 100,
                email: true
            },
            "contact[Phone]": {
                required: true,
            },
            "contact[Occupation]": {
                required: true
            },
            "contact[BusinessType]": {
                required: true
            },
            "contact[BillingName]": {
                required: true,
                maxlength: 100,
            },
            "contact[BillingAddress]": {
                required: true,
                maxlength: 100,
            },
            "contact[BillingAddressCity]": {
                required: true,
                maxlength: 100,
            },
            "contact[BillingAddressState]": {
                required: true
            },
            "contact[BillingAddressZip]": {
                required: true
            },
            "contact[BillingFullName]": {
                required: true,
                maxlength: 100
            },
            "contact[BillingNumber]": {
                required: true
            },
            "contact[BillingEmail]": {
                required: true,
                maxlength: 100,
                email: true
            },
            "contact[BillingEntity]": {
                required: true,
                maxlength: 20,
            },
            "contact[FederalIdentificationNumber]": {
                required: true,
            },
            "contact[YearBusinessStarted]": {
                required: true,
            },
            "contact[EmployeeNumber]": {
                required: true,
            },
            "contact[StateOfIncorporation]": {
                required: true,
                maxlength: 20,
            },
            "contact[ExportProductsTaxable]": {
                required: true
            },
            "contact[ExportSpacelabsProducts]": {
                required: true
            },
            "contact[DunBradstreetNumber]": {
                required: true,
            },
            "contact[BillingContactName]": {
                required: true,
                maxlength: 100,
            },
            "contact[BillingContactNumber]": {
                required: true
            },
            "contact[BillingContactEmail]": {
                required: true,
                maxlength: 100,
                email: true
            },
            "contact[FacilityName]": {
                required: true,
                minlength:2,
                maxlength: 100
            },
            "contact[FacilityAddress]": {
                required: true,
                minlength:2,
                maxlength: 100
            },
            "contact[FacilityAddressCity]": {
                required: true,
                minlength:2,
                maxlength: 100
            },
            "contact[FacilityAddressState]": {
                required: true
            },
            "contact[FacilityAddressZip]": {
                required: true
            },
            "contact[FacilityHospital]": {
                required: true
            },
            "contact[FacilityContactFullName]": {
                required: true,
                minlength:2,
                maxlength: 100
            },
            "contact[FacilityContactNumber]": {
                required: true,
                minlength:2
            },
            "contact[FacilityContactEmail]": {
                required: true,
                minlength:2,
                maxlength: 100,
                email: true
            },
            "contact[ShippingName]": {
                required: true,
                minlength:2,
            },
            "contact[ShippingAddress]": {
                required: true,
                minlength:2,
                maxlength: 100
            },
            "contact[ShippingAddressCity]": {
                required: true,
                minlength:2,
                maxlength: 100
            },
            "contact[ShippingAddressState]": {
                required: true
            },
            "contact[ShippingAddressZip]": {
                required: true
            },
            "contact[ShippingContactFullName]": {
                required: true,
                minlength:2,
                maxlength: 100
            },
            "contact[ShippingContactNumber]": {
                required: true
            },
            "contact[ShippingContactEmail]": {
                required: true,
                minlength:2,
                maxlength: 100,
                email: true
            },
            "contact[TermsAcknowledgment]": {
                required: true
            }
        },
        submitHandler: function (form) {

            $("#contact_phone").unmask();
            var register_data = $("#contact_form").serialize();

            submitRequest(register_data).then(modifyForm).then(function(res) {

                form.submit(); 

            },function(err) {

            });
        }
    });

    if (form.valid() == true){
        if ($('#section1').is(':visible')) {
            $('#section2').show();
            $('#section1').hide();
            $("#progress").css("width", "33%");
            $("#step2").css("color", "#5cb85c");
        }else if($('#section2').is(':visible')){
            $('#section3').show(); 
            $('#section2').hide();
            $("#progress").css("width", "66%");
            $("#step3").css("color", "#5cb85c");
        }else if($('#section3').is(':visible')){
            $('#section4').show(); 
            $('#section3').hide();
            $("#progress").css("width", "100%");
            $("#step4").css("color", "#5cb85c"); 
        }else if($('#section4').is(':visible')){
            $('#section5').show(); 
            $('#section4').hide();
        }
    }
});




// Copies the Billing Address for the Facility Address

$("#facility_same_as_billing").on("change", function(){
    if (this.checked) {
        $("#contact_facility_name").val($("#contact_billing_name").val());
      $("#contact_facility_address").val($("#contact_billing_address").val());
      $('#contact_facility_city').val($('#contact_billing_city').val());
      $('#contact_facility_state').val($('#contact_billing_state').val());
      $('#contact_facility_zip').val($('#contact_billing_zip').val());
      $('#contact_facility_fullname').val($('#contact_billing_fullname').val());
      $('#contact_facility_number').val($('#contact_billing_number').val());
      $('#contact_facility_email').val($('#contact_billing_email').val());
    }
  });

  // Copies the Billing Address for the Shipping Address

  $("#shipping_same_as_billing").on("change", function(){
    if (this.checked) {
        $("#contact_shipping_name").val($("#contact_billing_name").val());
      $("#contact_shipping_address").val($("#contact_billing_address").val());
      $('#contact_shipping_city').val($('#contact_billing_city').val());
      $('#contact_shipping_state').val($('#contact_billing_state').val());
      $('#contact_shipping_zip').val($('#contact_billing_zip').val());
      $('#contact_shipping_fullname').val($('#contact_billing_fullname').val());
      $('#contact_shipping_number').val($('#contact_billing_number').val());
      $('#contact_shipping_email').val($('#contact_billing_email').val());
    }
  });

  // Custom Modal controls 

  function openModal(modal) {
        
    if(typeof modal === "string"){

        $("#" + modal).addClass("show-modal").fadeIn(300); 
        $("#" + modal).removeClass("hidden-modal");

    }else if(typeof modal === "object"){

        var modal_name = modal.getAttribute("modal");
        $("#" + modal_name).addClass("show-modal").fadeIn(300); 
        $("#" + modal_name).removeClass("hidden-modal");

    }else{

        console.log("There is an issue with the modal");
    }

  }

  // Close modals 

  function closeModal(modal, form) {
    var modal_name = modal.getAttribute("modal");
    $("#" + modal_name).removeClass("show-modal");
    $("#" + modal_name).addClass("hidden-modal").fadeOut(300);
    $("#error-box").empty();

    if(form == true){
        $('#contact_phone').mask('(000) 000-0000');
    }
  }
  // Mask registration form fields

  $('#contact_phone').mask('(000) 000-0000');
  $('#contact_billing_zip').mask('00000-0000');
  $('#contact_billing_fed').mask('00-0000000');
  $("#contact_billing_number").mask(' (000) 000-0000');
  $('#contact_billing_year').mask('0000');
  $('#contact_employee_count').mask('000000000000');
  $('#contact_dun_number').mask('00-000-0000');
  $('#contact_facility_zip').mask('00000-0000');
  $('#contact_facility_number').mask(' (000) 000-0000');
  $('#contact_facility_HIN').mask('AAA-00000-AAAA');
  $('#contact_facility_GLN').mask('0000000000000');
  $('#contact_facility_beds').mask('000000');
  $('#contact_shipping_zip').mask('00000-0000');
  $('#contact_shipping_number').mask(' (000) 000-0000');


  // active tav

  $(function () {
    $('.tabs-nav a').click(function (e) {
        e.preventDefault();
        if (!$(this).hasClass("active-tab")) {
            $('.tabs-nav a').removeClass("active-tab");
            $('.content').hide();

            $('.content-' + $(this).attr("class")).show();
            $(this).addClass("active-tab");
        }
    });
});

// Return customers who login to the same page 

$(document).ready(function() {
    var url =  window.location.href; 
    $("#redirect_url").val(url);
});

// Success registration form modal window

if(window.location.search === "?contact_posted=true"){
    $("#modal-success").addClass("show-modal").fadeIn(300); 
    $("#modal-success").removeClass("hidden-modal");
}

// Form Hospital Trigger Function 

function hospitalTrigger(value) {

    if(value == 'yes'){
        $( ".hospital-questions" ).css( "display", "block" );
    }else{
        $( ".hospital-questions" ).css( "display", "none" );
    }
}  

// Submit AJAX request to the middleware

var submitRequest = function(form) {

    var promise = new Promise(function(resolve, reject){

        $.ajax({
            url: "https://d440487d.ngrok.io/spacelabs/register", 
            type: "POST",
            crossDomain: true,
            data: form,
            dataType: "json",
            success: function(data, textStatus, jQxhr) { 
                resolve(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var modal = "modal-error";
                var error_box = document.getElementById("error-box");

                if(errorThrown != "Unprocessable Entity"){

                    var text_element = document.createElement("p"); 
                    var text = document.createTextNode("404 Error - This is an internal Spacelabs error and your form was unable to be sent. Please contact customer service at 425-396-3300 if the problem continues."); 
                    text_element.appendChild(text);
                    error_box.appendChild(text_element);

                    openModal(modal);
                    return reject(textStatus);

                }else{

                    var text_header_element = document.createElement("p"); 
                    var text_header = document.createTextNode("Errors found on the General Information tab:"); 
                    error_box.appendChild(text_header_element);

                    for(var errors in jqXHR.responseJSON.error.errors){ 
                        var key = errors;
                        var text_element = document.createElement("p"); 
                        var text = document.createTextNode(key + " " + jqXHR.responseJSON.error.errors[key]["0"]); 
                        text_element.appendChild(text);
                        error_box.appendChild(text_element);

                    }
                    openModal(modal);
                    return reject(jqXHR.responseJSON.error.errors);
                }  
            }
        });
    });
    return promise;
 };

 var modifyForm = function(api_reply) {

    var promise = new Promise(function(resolve, reject){

                var customer_id = api_reply.response.Customer;
                var customer_billing = api_reply.response.Billing_Address;
                var customer_facility = api_reply.response.Facility_Address;
                var customer_shipping = api_reply.response.Shipping_Address;

                document.getElementById("customer_id").value = customer_id;
                document.getElementById("shipping_id").value = customer_shipping;
                document.getElementById("billing_id").value = customer_billing;
                document.getElementById("facility_id").value = customer_facility;

                resolve(api_reply); 
    });
    return promise;
 };