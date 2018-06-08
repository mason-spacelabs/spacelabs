// Open all external links in a new browser window

$('a[href^="http"]').not('a[href^="'+$(location).attr('hostname')+'"]').attr('target', '_blank');

// Set browser Cookies with an expiration

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";";
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

// Close the shipping modal clicking on the close button and resets the browser cookie to false


function cookiesModal() {

    $("#cookie_message").css({display: "none"});
    var date = new Date();
    date.setTime(date.getTime()+(30*24*60*60*1000));
    var expires = "expires=" + date.toGMTString() + ";"; 
    document.cookie = "spacelabsCookie=true;" + expires + "path=/"; 
}

function cookiesCheck() {

    var modalCheck = getCookie("spacelabsCookie");

    if(modalCheck){
        switch (modalCheck) {
            case "true":

            break;
            case "false":
                $("#cookie_message").css({display: "block"});
                document.cookie = "spacelabsCookie=false;path=/";
            break;
            default:
                document.cookie = "spacelabsCookie=false;path=/";
        }
    }else{
        document.cookie = "spacelabsCookie=false;path=/";
        cookiesCheck();
    }
}


// Checks IP Address for all visitors and sets the ipAddress cookie

function shippingClose() {
    $("#shipping_message").css({display: "none"});
    document.cookie = "regionCheck=true;path=/";
}

var regionCheck = function() {

    var promise = new Promise(function(resolve, reject){

        var region_check = getCookie("regionCheck");
        
        if(!region_check){
            
            $.get("https://ipinfo.io", function(response) {

            var country = response.country;
            var date = new Date();
            date.setTime(date.getTime()+(1*24*60*60*1000));
            var expires = "expires=" + date.toGMTString() + ";"; 
            document.cookie = "spacelabsRegion=" + country + ";" + expires + "path=/"; 
            resolve(response); 

            }, "jsonp"); 

            }else if(region_check != "true"){
                $("#shipping_message").css({display: "block"}); 
            }else{

            }       
    });
    return promise;
 };

 function RegionCookie() {

    var ipAddress = getCookie("spacelabsRegion");

    if(ipAddress){
        switch (ipAddress) {

            case "US":
                document.cookie = "regionCheck=true;path=/"; 
            break;
            default: 
                $("#shipping_message").css({display: "block"});
                document.cookie = "regionCheck=check;path=/"; 
        }
    }
}

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

// Contact Page Form Validation

$(function() {

    $.validator.addMethod(
      'email',
      function(value, element){
          return this.optional(element) || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$/i.test(value);
      },
      'Verify you have a valid email address.'
    );

    $.validator.messages.required = "";

    $("#contact_form").validate({
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
            "contact[name]": {
                required: true
            },
            "contact[email]": {
                required: true,
                email: true
            },
            "contact[message]": {
                required: true
            },
        },

      submitHandler: function(form) {
        form.submit();
      }
    });
  });

// Form page validation before submitting the contact to admin email

$(".next").click(function(){

    var form = $("#contact_register");

    $.validator.addMethod(
        "notEqualTo",
        function(elementValue,element,param) {
          return elementValue != param;
        },
        "Value cannot be {0}"
      );
      $.validator.addMethod( //override email with django email validator regex - fringe cases: "user@admin.state.in..us" or "name@website.a"
      'email',
      function(value, element){
          return this.optional(element) || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$/i.test(value);
      },
      'Verify you have a valid email address.'
  );

    $.validator.messages.required = "";

    form.validate({
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
                maxlength: 20,
            },
            "contact[FederalIdentificationNumber]": {
                required: false,
            },
            "contact[YearBusinessStarted]": {
                required: false,
            },
            "contact[EmployeeNumber]": {
                required: false,
            },
            "contact[StateOfIncorporation]": {
                required: false,
                maxlength: 20,
            },
            "contact[ExportProductsTaxable]": {
                required: true
            },
            "contact[ExportSpacelabsProducts]": {
                required: true
            },
            "contact[DunBradstreetNumber]": {
                required: false,
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
                required: true,
                notEqualTo: " "
                
            },
            "contact[FacilityAddressZip]": {
                required: true
            },
            "contact[FacilityHospital]": {
                required: true,
            },
            "contact[FacilityContactNumber]": {
                required: false,
            },
            "contact[FacilityContactEmail]": {
                required: false,
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
                required: true,
                notEqualTo: " "
            },
            "contact[ShippingAddressZip]": {
                required: true
            },
            "contact[ShippingContactNumber]": {
                required: false,
            },
            "contact[ShippingContactEmail]": {
                required: false,
            },
            "contact[TermsAcknowledgment]": {
                required: true
            }
        },
        submitHandler: function (form) {

            $("#contact_phone").unmask();
            var register_data = $("#contact_register").serialize();

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
        $('#contact_facility_state').val($('#contact_billing_state').val()).attr("selected","selected");
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
        $('#contact_shipping_state').val($('#contact_billing_state').val()).attr("selected","selected");
        $('#contact_shipping_zip').val($('#contact_billing_zip').val());
        $('#contact_shipping_fullname').val($('#contact_billing_fullname').val());
        $('#contact_shipping_number').val($('#contact_billing_number').val());
        $('#contact_shipping_email').val($('#contact_billing_email').val());
    }
  });

  // Custom Modal controls 

  function openModal(modal) {
        
    $('html, body').css('position', 'fixed');
    if(typeof modal === "string"){

        $("#" + modal).addClass("show-modal").fadeIn(300); 
        $("#" + modal).removeClass("hidden-modal");

    }else if(typeof modal === "object"){

        var modal_name = modal.getAttribute("modal");
        $("#" + modal_name).addClass("show-modal").fadeIn(300); 
        $("#" + modal_name).removeClass("hidden-modal");

    }else{

    }

  }

  function stateChange() {
    setTimeout(function () {

        var pricing_hidden = document.querySelectorAll('#pricing-hidden');
        var pricing_article = document.querySelectorAll('#pricing-error-article');
        var pricing_loading = document.querySelectorAll('#pricing-loading-article');
        var pricing_checkout = document.querySelectorAll('#pricing-error-checkout');
        var error_static = document.querySelectorAll('#modal-error-static');
        var error_custom = document.querySelectorAll('#modal-error-custom');

        error_custom[0].classList.add('hidden');
        pricing_hidden[0].classList.add('hidden');
        pricing_article[0].classList.add('hidden');
        pricing_checkout[0].classList.add('hidden');
        pricing_loading[0].classList.remove('hidden');
        error_static[0].classList.remove('hidden');

    }, 1000);
}
  // Close modals 

  function closeModal(modal, form) {

    $('html, body').css('position', 'static');

    var modal_name = modal.getAttribute("modal");
    $("#" + modal_name).removeClass("show-modal");
    $("#" + modal_name).addClass("hidden-modal").fadeOut(300);
    $("#error-box").empty();

    if(form == true){
        $('#contact_phone').mask('(000) 000-0000');
    }

    stateChange();

  }
  // Mask registration form fields

  $('#contact_phone').mask('(000) 000-0000');
  $('#contact_phone_alt').mask('(000) 000-0000');
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

// Success registration form modal window

if(window.location.search === "?contact_posted=true"){

    if(window.location.pathname === "/pages/contact"){
        
        $("#modal-success-contact").addClass("show-modal").fadeIn(300); 
        $("#modal-success-contact").removeClass("hidden-modal");

    }else{

    $("#modal-success").addClass("show-modal").fadeIn(300); 
    $("#modal-success").removeClass("hidden-modal");

    }
}

// Form Hospital Trigger Function 

function hospitalTrigger(value) {

    if(value == 'yes'){
        $( ".hospital-questions" ).css( "display", "block" );
    }else{
        $( ".hospital-questions" ).css( "display", "none" );
    }
}  

function cartCheckout(pricing_data) {

    var meta_array = pricing_data.meta_information.details.split(",").join(":").split(":");
    var query_string = meta_array[1].slice(1, meta_array[1].length) + "&";

    var ShopifyCustomer = {};
    ShopifyCustomer.RequestString = "";
    ShopifyCustomer.CheckoutPage = pricing_data.checkout_page;
    ShopifyCustomer.ShopifyBillingNumber = meta_array[5].slice(1, meta_array[5].length);
    ShopifyCustomer.ShopifyCustomerNumber = pricing_data.customer_information;
    ShopifyCustomer.ShopifyFacilityNumber = meta_array[1].slice(1, meta_array[1].length);
    ShopifyCustomer.ShopifyShippingNumber = meta_array[7].slice(1, meta_array[7].length);
    ShopifyCustomer.Variants = {};

    for(var items in pricing_data.cart_information){
        query_string += pricing_data.cart_information[items].sku + ",";
        var product_sku = pricing_data.cart_information[items].sku;

        ShopifyCustomer.Variants[product_sku] = pricing_data.cart_information[items].id;
    }

    ShopifyCustomer.RequestString = query_string;
    if(query_string.length > 10){

        openModal("modal-pricing-error");
        pricingQuery(ShopifyCustomer); 

    }else{
        openModal("modal-cart-error");
    }
};

var pricingQuery = function(parameters) {
    $.ajax({
        url: "/apps/ecommerce/pricing", 
        type: "POST",
        data: parameters,
        dataType: "json",
        success: function(data, textStatus, jQxhr) {
            
            if(parameters.CheckoutPage){
                $("#hidden-submit").click();
            }else{
                document.cookie = "shopifyPricing=true;path=/"; 
                window.location.href ='/cart';
            }
                  
        },
        error: function(jqXHR, textStatus, errorThrown) {
            
            var pricing_hidden = document.querySelectorAll('#pricing-hidden');
            var pricing_article = document.querySelectorAll('#pricing-error-article');
            var pricing_loading = document.querySelectorAll('#pricing-loading-article');
            var pricing_checkout = document.querySelectorAll('#pricing-error-checkout');

            if(parameters.CheckoutPage){

                pricing_hidden[0].classList.remove('hidden');
                pricing_checkout[0].classList.remove('hidden');
                pricing_loading[0].classList.add('hidden');

            }else{
            
                pricing_hidden[0].classList.remove('hidden');
                pricing_article[0].classList.remove('hidden');
                pricing_loading[0].classList.add('hidden');

            }

        }
    });
};

// Submit AJAX request to the middleware

var submitRequest = function(form) {

    var modal = "modal-error";
    var error_static = document.querySelectorAll('#modal-error-static');
    var error_custom = document.querySelectorAll('#modal-error-custom');

    openModal(modal);

    var promise = new Promise(function(resolve, reject){

        $.ajax({
            url: "/apps/ecommerce/register",  
            type: "POST",
            data: form,
            dataType: "json",
            success: function(data, textStatus, jQxhr) {

                resolve(data);

            }, 
            error: function(jqXHR, textStatus, errorThrown) {

                var error_box = document.querySelectorAll("#error-box"); 
                
                if(jqXHR.status === 502){ 

                    error_box[0].innerHTML = "<h3 class='error-title'>502 Error - Spacelabs Healthcare</h3><p>This is an internal Spacelabs error and your form was unable to be sent. Please contact customer service at 1-800-522-7025 (Option 1) if the problem continues.</p>";

                }else if(jqXHR.status === 504){

                    error_box[0].innerHTML = "<h3 class='error-title'>504 Error - Spacelabs Healthcare</h3><p>This is an internal Spacelabs error and your form was unable to be sent. Please contact customer service at 1-800-522-7025 (Option 1) if the problem continues.</p>";

                }else if(jqXHR.status === 404){ 
                    
                    error_box[0].innerHTML = "<h3 class='error-title'>404 Error - Spacelabs Healthcare</h3><p>This is an internal Spacelabs error and your form was unable to be sent. Please contact customer service at 1-800-522-7025 (Option 1) if the problem continues.</p>";

                }else{
                    error_box[0].innerHTML = jqXHR.responseJSON.response; 
                }

                error_static[0].classList.add('hidden');
                error_custom[0].classList.remove('hidden'); 

                reject();

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

function continueCheckout(){ 

    $("#hidden-submit").click(); 
    
};

 function staticCartCheck(pricing_data){

    jQuery.getJSON('/cart.js', function(cart) {
     
     var cart_information = cart.items;
     pricing_data.cart_information = cart_information;
 
     cartCheckout(pricing_data);
 
 } );
 };

function checkCart(pricing_data){
    var banner_close = document.querySelectorAll('#flyoutClose');
    banner_close[1].click();
  
   jQuery.getJSON('/cart.js', function(cart) {
    
    var cart_information = cart.items;
    pricing_data.cart_information = cart_information;

    cartCheckout(pricing_data);

} );
};
// Document ready function 

 $(document).ready(function() {

    var url =  window.location.href; 
    $("#redirect_url").val(url);

    thumbnail_button = $('.product-gallery--navigation > button');
    thumbnails = $('.thumbnail-selector');

    if (thumbnails.length) {
        thumbnail_button.bind('click', function() {

        var arrImage = $("img", this).attr('src').split('?')[0].split('.');
        var strExtention = arrImage.pop();
        var strRemaining = arrImage.pop().replace(/_[a-zA-Z0-9@]+$/,'');
        var strNewImage = arrImage.join('.')+"."+strRemaining+"."+strExtention;
        if (typeof variantImages[strNewImage] !== 'undefined') {
            productOptions.forEach(function (value, i) {
             optionValue = variantImages[strNewImage]['option-'+i];
            $('.image-selector:eq('+i+')').val(optionValue).trigger('change');             
          });
        }
      });
    }
});

function clearPricingData(customer_info) {

    var meta_array = customer_info.account_information.details.split(",").join(":").split(":");

    var ShopifyCustomer = {};
    ShopifyCustomer.ShopifyBillingNumber = meta_array[5].slice(1, meta_array[5].length);
    ShopifyCustomer.ShopifyCustomerNumber = customer_info.customer_information;
    ShopifyCustomer.ShopifyFacilityNumber = meta_array[1].slice(1, meta_array[1].length);
    ShopifyCustomer.ShopifyShippingNumber = meta_array[7].slice(1, meta_array[7].length);

    $.ajax({
        url: "/apps/ecommerce/customer",
        type: "POST",
        data: ShopifyCustomer,
        dataType: "json"
    });
}

window.onload = function() {
    
    cookiesCheck();
    regionCheck().then(function(response) {
        
        RegionCookie();
    
    },function(error) {
        
    });
};
