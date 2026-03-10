const BACKEND_URL = window.location.hostname.includes('onrender.com')
    ? 'https://movie-reviews-b0ek.onrender.com' // producción
    : ''; // local, fetch relativo funciona

document.getElementById("logoutButton").addEventListener("click", async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/users/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            localStorage.removeItem("isLoggedIn");
            console.log("Usuario deslogueado");
            window.location.href = "/login";
        } else {
            console.error("Error al desloguear");
        }
    } catch (error) {
        console.error("Error durante el cierre de sesión:", error);
    }
});
