"use strict;"

var apiOne = "";
var apiTwo = "";

function displayApiKeys() {
    console.log(apiOne);
    console.log(apiTwo);
}

$("#submit-api-keys").on("click", function () {
    apiOne = $("#api-key-one").val().trim();
    apiTwo = $("#api-key-two").val().trim();
    displayApiKeys();
});