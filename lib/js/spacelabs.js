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

// Run the function when the browser loads.

checkCookie(); 