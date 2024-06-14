document.addEventListener("DOMContentLoaded", function () {
  let status = document.getElementById("status");

  function restoreState(
    switchElement,
    stateKey,
    onMessage,
    offMessage,
    onUrl,
    offUrl
  ) {
    let savedState = localStorage.getItem(stateKey);
    if (savedState === "on") {
      switchElement.checked = true;
      status.innerText = onMessage;
      status.style.color = "green";
    } else {
      switchElement.checked = false;
      status.innerText = offMessage;
      status.style.color = "red";
    }
    status.style.display = "block";
  }

  function addSwitchListener(
    switchElement,
    stateKey,
    onMessage,
    offMessage,
    onUrl,
    offUrl
  ) {
    switchElement.addEventListener("change", function () {
      if (this.checked) {
        status.innerText = onMessage;
        status.style.color = "green";
        localStorage.setItem(stateKey, "on");
        $.ajax({ url: onUrl });
      } else {
        status.innerText = offMessage;
        status.style.color = "red";
        localStorage.setItem(stateKey, "off");
        $.ajax({ url: offUrl });
      }
      setTimeout(function () {
        status.innerText = "";
      }, 2000);
    });
  }

  // Luz da Sala
  let switchSala = document.getElementById("turnOnLightSwitchSala");
  restoreState(
    switchSala,
    "lightSalaState",
    "A luz da sala está acesa",
    "A luz da sala está apagada",
    "http://192.168.26.168/LS",
    "http://192.168.26.168/DS"
  );
  addSwitchListener(
    switchSala,
    "lightSalaState",
    "A luz da sala está acesa",
    "A luz da sala está apagada",
    "http://192.168.26.168/LS",
    "http://192.168.26.168/DS"
  );

  let switchCozinha = document.getElementById("turnOnLightSwitchCozinha");
  restoreState(
    switchCozinha,
    "lightCozinhaState",
    "A luz da cozinha está acesa",
    "A luz da cozinha está apagada",
    "http://192.168.26.168/LV",
    "http://192.168.26.168/DV"
  );
  addSwitchListener(
    switchCozinha,
    "lightCozinhaState",
    "A luz da cozinha está acesa",
    "A luz da cozinha está apagada",
    "http://192.168.26.168/LV",
    "http://192.168.26.168/DV"
  );

  let switchQuarto = document.getElementById("turnOnLightSwitchQuarto");
  restoreState(
    switchQuarto,
    "lightQuartoState",
    "A luz do quarto está acesa",
    "A luz do quarto está apagada",
    "http://192.168.26.168/LQ",
    "http://192.168.26.168/DQ"
  );
  addSwitchListener(
    switchQuarto,
    "lightQuartoState",
    "A luz do quarto está acesa",
    "A luz do quarto está apagada",
    "http://192.168.26.168/LQ",
    "http://192.168.26.168/DQ"
  );
});
