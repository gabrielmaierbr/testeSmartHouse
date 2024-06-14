document.addEventListener("DOMContentLoaded", function () {
    let status = document.getElementById("status");
    let openDoorSwitch = document.getElementById("openDoorSwitch");

    let savedStateDoor = localStorage.getItem("openDoorState");
    if (savedStateDoor === "on") {
        openDoorSwitch.checked = true;
        status.innerText = "A porta está destrancada";
        status.style.color = "green";
    } else {
        openDoorSwitch.checked = false;
        status.innerText = "A porta está trancada";
        status.style.color = "red";
    }
    status.style.display = "block";

    openDoorSwitch.addEventListener("change", function () {
        if (this.checked) {
            status.innerText = "A porta está destrancada";
            status.style.color = "green";
            localStorage.setItem("openDoorState", "on");
            $.ajax({
                url: "http://192.168.26.168/TA",
            });
        } else {
            status.innerText = "A porta está trancada";
            status.style.color = "red";
            localStorage.setItem("openDoorState", "off");
            $.ajax({
                url: "http://192.168.26.168/TF",
            });
        }
        setTimeout(function() {
            status.style.display = "none"; 
        }, 2000);
    });
});
