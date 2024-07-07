document.getElementById("logoutButton").addEventListener("click", async () => {
    try {
        const response = await fetch("/api/users/logout", {
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
