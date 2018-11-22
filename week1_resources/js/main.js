$("p").greenify();

$("button").on("click", function() {
    $(".notify").clearNotify();
});

$("#alertButton").on("click", function() {
    $(".alert").notify();
    $(".alert").alertColor();
});

$("#successButton").on("click", function() {
    $(".success").notify();
    $(".success").successColor();
});

$("#errorButton").on("click", function() {
    $(".error").notify();
    $(".error").errorColor();
});

$("#warningButton").on("click", function() {
    $(".warning").notify();
    $(".warning").warningColor();
});