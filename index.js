var placeSearch, autocomplete;

var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'), { types: ['geocode'] });

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    autocomplete.setFields(['address_component']);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);

    autocomplete1 = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete1'), { types: ['geocode'] });
    autocomplete1.setFields(['address_component']);
    autocomplete1.addListener('place_changed', fillInAddress);


}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
        }
    }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle(
                { center: geolocation, radius: position.coords.accuracy });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
$(document).ready(function () {
    $(".repass").blur(function () {
        var pass = $('.pass').val();
        var repass = $('.repass').val();
        console.log(pass);
        console.log(repass);
        // $('.repass').addClass("is-invalid");
        if (pass != repass) {
            $('.repass-fail').text("Паролі не співпадають");
            $('.repass').addClass("is-invalid");
            $('.pass').addClass("is-invalid");
        }
        else {

            $('.repass').removeClass("is-invalid");
            $('.pass').removeClass("is-invalid");
            $('.repass').addClass("is-valid");
            $('.pass').addClass("is-valid");
            $('.repass-fail').text("Паролі співпадають");
        }

    })

    $(".car-type").click(function () {
        //make non active all siblings 
        if (!$(this).hasClass("type-active")) {
            $(this).addClass("type-active").siblings().removeClass("type-active");
        }
        //toggle active/non active
        else {
            $(this).removeClass("type-active");
        }
        
    })
    $(".payment-type").click(function () {
        if (!$(this).hasClass("type-active")) {
            $(this).addClass("type-active").siblings().removeClass("type-active");
        }
        else {
            $(this).removeClass("type-active");
        }
    })


    $(".submit-btn").click(function () {
        $(".payment-type").removeClass("type-active");
        $(".car-type").removeClass("type-active");
    
        var x = $(".snackbar");
        $(".snackbar").addClass("show");

        setTimeout(function () { $(".snackbar").removeClass("show"); }, 3000);
    })
});
