function validarRegisto() {

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (nome === "" || email === "" || password === "") {

        alert("Todos os campos são obrigatórios.");

        return false;
    }

    if (password.length < 6) {

        alert("A password deve ter pelo menos 6 caracteres.");

        return false;
    }

    return true;
}