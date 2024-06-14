document.addEventListener("DOMContentLoaded", function () {
  let status = document.getElementById("status");
  let switchElement = document.getElementById("turnOnAirConditioningSwitch");

  let savedState = localStorage.getItem("airConditioningState");
  if (savedState === "on") {
    switchElement.checked = true;
    status.innerText = "O ar-condicionado está ligado";
    status.style.color = "green";
  } else {
    switchElement.checked = false;
    status.innerText = "O ar-condicionado está desligado";
    status.style.color = "red";
  }
  status.style.display = "block";

  switchElement.addEventListener("change", function () {
    if (this.checked) {
      status.innerText = "O ar-condicionado está ligado";
      status.style.color = "green";
      localStorage.setItem("airConditioningState", "on");
      $.ajax({
        url: "http://192.168.26.168/VL",
      });
    } else {
      status.innerText = "O ar-condicionado está desligado";
      status.style.color = "red";
      localStorage.setItem("airConditioningState", "off");
      $.ajax({
        url: "http://192.168.26.168/VD",
      });
    }
    setTimeout(function () {
      status.innerText = ""; 
    }, 2000);
  });
});
