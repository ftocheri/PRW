$.fn.greenify = function() {
    this.css("color", "green");
};

$.fn.notify = function() {
    this.css("display", "block");
};

$.fn.clearNotify = function() {
    this.css("display", "none");
}

$.fn.alertColor = function() {
    this.css("background-color", "rgba(0, 0, 255, 0.7)");
};

$.fn.successColor = function() {
    this.css("background-color", "rgba(0, 128, 0, 0.7)");
};

$.fn.errorColor = function() {
    this.css("background-color", "rgba(255, 0, 0, 0.7)");
};

$.fn.warningColor = function() {
    this.css("background-color", "rgba(255, 165, 0, 0.7)");
};