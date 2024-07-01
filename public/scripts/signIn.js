
document.getElementById("login").addEventListener("submit", async(e) =>{
    e.preventDefault();
    const user = e.target.children.user.value;
    const password =e.target.children.password.value;

    console.log(e.target.children.user.value);
    console.log(e.target.children.password.value);

    const resp = await fetch("http://localhost:3000/api/singIn",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            user: e.target.children.user.value,
            password: e.target.children.password.value
        })
    })
});