$(document).ready(() => {
    $("input[name='display']:checked").parent().addClass("selected");

    $("input[name='display']").change(() => {
        val = $("input[name='display']:checked").val();
        if (val == "Light") {
            $("#lightModeBtn").addClass("selected");
            $("#darkModeBtn").removeClass("selected");
        } else {
            $("#lightModeBtn").removeClass("selected");
            $("#darkModeBtn").addClass("selected");
        }
    })

})

const toggleSwitch = document.getElementById('displayToggle');

const current = localStorage.getItem('theme');

if (localStorage.getItem('theme')) {
    document.documentElement.setAttribute('theme', current);
    if (current == 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('theme', 'light');
        localStorage.setItem('theme', 'light');
    }
    window.location.reload();
}

toggleSwitch.addEventListener('change', switchTheme, false);