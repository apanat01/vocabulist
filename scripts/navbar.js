$(document).ready(function() {
    $('a').each(function(){
        if ($(this).prop('href') == window.location.href) {
            $(this).addClass('current');
            $(this).find("div").addClass('current');
            $(this).find("p").addClass('current');
        }
    });
});