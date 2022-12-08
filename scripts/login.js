$("#login-form").submit(function (e) {
    if (!validate()) {
        e.preventDefault(e);   
        return;
    }
});

function validate() {
    let message = "";
    if ($('input#username').val() == "") {
        message += "Please enter your username\n";
    }
    if ($('input#password').val() == "") {
        message += "Please enter your password";
    }
    if (message != "") {
        alert(message);
        return false;
    }
    return true;
}