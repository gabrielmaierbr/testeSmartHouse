document.addEventListener("DOMContentLoaded", function () {
  let status = document.getElementById("status");
  let alarmSwitch = document.getElementById("alarmSwitch");

  let savedStateAlarm = localStorage.getItem("alarmState");
  if (savedStateAlarm === "on") {
    alarmSwitch.checked = true;
    status.innerText = "O alarme está ligado";
    status.style.color = "green";
  } else {
    alarmSwitch.checked = false;
    status.innerText = "O alarme está desligado";
    status.style.color = "red";
  }
  status.style.display = "block";

  alarmSwitch.addEventListener("change", function () {
    if (this.checked) {
      status.innerText = "O alarme está ligado";
      status.style.color = "green";
      localStorage.setItem("alarmState", "on");
      $.ajax({
        url: "http://192.168.26.168/LA",
      });
    } else {
      status.innerText = "O alarme está desligado";
      status.style.color = "red";
      localStorage.setItem("alarmState", "off");
      $.ajax({
        url: "http://192.168.26.168/DA",
      });
    }
    setTimeout(function () {
      status.innerText = ""; 
    }, 2000);
  });
});
