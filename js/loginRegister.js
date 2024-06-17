import { auth } from "./firebase-sdk.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

document.addEventListener("DOMContentLoaded", function () {
  let botao = document.getElementById("botao");
  let registerButton = document.getElementById("registerButton");
  let input = document.getElementById("pass");
  let flexCheckDefault = document.getElementById("flexCheckDefault");
  let flexCheckDefaultCadastro = document.getElementById("flexCheckDefaultCadastro");

  if (botao && registerButton && input && flexCheckDefault && flexCheckDefaultCadastro) {
    botao.addEventListener("click", login);
    registerButton.addEventListener("click", registerAccount);

    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        login();
      }
    });

    flexCheckDefault.addEventListener("click", showPass);
    flexCheckDefaultCadastro.addEventListener("click", showPassCadastro);
  }

  // Verifica se o usuário está autenticado e redireciona se estiver na página light.html
  const user = auth.currentUser;
  if (user && window.location.pathname.includes("light.html")) {
    localStorage.setItem('authenticated', true);
    location.replace("/pages/light.html");
  }
});

function registerAccount() {
  let password = document.getElementById("passCadastro").value;
  let passwordConfirm = document.getElementById("passConfirm").value;
  let email = document.getElementById("emailRegister").value;

  if (password === passwordConfirm) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Conta cadastrada com sucesso");
        $.ajax({
          url: "http://192.168.26.168/S",
        });
      })
      .catch(handleRegisterError);
  } else {
    alert("As senhas não coincidem. Por favor, tente novamente.");
  }
}

function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("pass").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login realizado com sucesso");
      if (!window.location.pathname.includes("light.html")) {
        location.replace("/pages/light.html");
      }
    })
    .catch(handleLoginError);
}

function handleRegisterError(error) {
  switch (error.code) {
    case "auth/email-already-in-use":
      alert("O e-mail já está em uso. Por favor, use outro e-mail.");
      break;
    case "auth/invalid-email":
      alert("O e-mail fornecido é inválido. Por favor, verifique e tente novamente.");
      break;
    case "auth/weak-password":
      alert("A senha é muito fraca. Por favor, use uma senha mais forte.");
      break;
    default:
      alert("Erro ao cadastrar conta! Código de erro: " + error.code);
  }
}

function handleLoginError(error) {
  switch (error.code) {
    case "auth/user-not-found":
      alert("Usuário não encontrado. Por favor, verifique o e-mail e tente novamente.");
      break;
    case "auth/wrong-password":
      alert("Senha incorreta. Por favor, tente novamente.");
      break;
    case "auth/invalid-email":
      alert("O e-mail fornecido é inválido. Por favor, verifique e tente novamente.");
      break;
    default:
      alert("Erro ao fazer login! Código de erro: " + error.code);
  }
}

function showPass() {
  let pass = document.getElementById("pass");
  pass.type = (pass.type === "password") ? "text" : "password";
}

function showPassCadastro() {
  let pass1 = document.getElementById("passCadastro");
  let pass2 = document.getElementById("passConfirm");
  if (pass1.type === "password" && pass2.type === "password") {
    pass1.type = "text";
    pass2.type = "text";
  } else {
    pass1.type = "password";
    pass2.type = "password";
  }
}

