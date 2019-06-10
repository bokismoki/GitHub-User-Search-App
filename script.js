const search = document.querySelector("input");
const outputs = document.querySelector(".outputs");
const repos = document.querySelector(".repos");

search.addEventListener("keyup", () => {

    const user = search.value;
    repos.style.display = "none";
    repos.innerHTML = ``;

    getUser(user)
        .then(data => {

            if (user === "") {

                outputs.style.display = "none";
                repos.style.display = "none";

            } else {

                if (data.message === "Not Found") {
                    outputs.innerHTML = `
                        <div class="not-found">User Doesn't Exist!</div>
                    `;
                } else {
                    console.log(data);
                    outputs.style.display = "block";
                    outputs.innerHTML = `
                    <h2 class="h2">Username:</h2>
                    <div class="username-output">${data.login}</div>
                    <a href="${data.html_url}" target="_blank"><img src="${data.avatar_url}" alt="Profile Image" class=""></a>
                    <h2 class="h2">Followers:</h2>
                    <div class="followers-output">${data.followers}</div>
                    <h2 class="h2">Repositories:</h2>
                    <div class="repositories-output">${data.public_repos}</div>
                    <button class="show-repos-btn">Show Repositories</button>
                    `;

                }
            }

        })
        .catch(err => console.log(err));

});


const getUser = async user => {

    const client_id = "";
    const client_secret = "";

    const response = await fetch(`https://api.github.com/users/${user}?client_id=${client_id}&
    client_secret=${client_secret}`);
    const data = await response.json();

    return data;

};


outputs.addEventListener("click", e => {

    const user = search.value;
    const showReposBtn = document.querySelector(".show-repos-btn");

    if (e.target.className === "show-repos-btn" && e.target.innerHTML === "Show Repositories") {

        repos.style.display = "block";

        getRepos(user)
            .then(data => {

                data.forEach(dat => {

                    repos.innerHTML += `
                        <h2 class="h2-repos">${dat.name} / ID: ${dat.id}</h2>
                        <a href="${dat.html_url}" target="_blank"<p>${dat.html_url}</p></a>
                    `;

                })

                showReposBtn.innerHTML = "Hide Repositories";
            })
            .catch(err => console.log(err));

    }

    if (e.target.className === "show-repos-btn" && e.target.innerHTML === "Hide Repositories") {

        const showReposBtn = document.querySelector(".show-repos-btn");
        showReposBtn.innerHTML = "Show Repositories";
        repos.innerHTML = ``;
        repos.style.display = "none";
       

    }

});

const getRepos = async user => {

    const client_id = "";
    const client_secret = "";

    const response = await fetch(`https://api.github.com/users/${user}/repos?per_page=3&client_id=${client_id}&client_secret=${client_secret}`);
    const data = await response.json();

    return data;

};