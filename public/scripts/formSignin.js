const mensajeError = document.getElementsByClassName('error')[0];


document.getElementById("login").addEventListener("submit", async(e) =>{
    e.preventDefault();
    const email = e.target.children.email.value;
    const password =e.target.children.password.value;

    console.log(e.target.children.email.value);
    console.log(e.target.children.password.value);

try {
    const respuesta = await fetch("/api/formSignin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    if (!respuesta.ok) {
        mensajeError.classList.toggle("escondido", false);
        return;
    }

    const resJson = await respuesta.json();

    if (resJson.redirect) {
        window.location.href = resJson.redirect;
    }
} catch (error) {
    console.error("Error durante el Sign In:", error);
   
}
}); 