const apiUrl = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
let copyright = document.querySelector(".copyright");
// Checking function
const showLoader = () => {
    document.getElementById("main").style.display = "none";
    document.querySelector(".load").style.display = "block";
}

const submitSuccess = () => {
  document.getElementById("main").style.display = "block";
  document.querySelector(".load").style.display = "none";
}

const submitFailed = () => {
    alert("Failed to load !");
}
let date = new Date(),
    year = date.getFullYear();

copyright.innerHTML = `&copy; ${year} Boularbah Ismail`;

const getUser = async (username) => {
    showLoader();
    const resp = await fetch(apiUrl + username);
    const respData = await resp.json();
    submitSuccess();
    // Create User Card Component
    createUserCard(respData);
    // Get github profile repositories
    getRepos(username);
}

getUser("boularbahsmail");

const getRepos = async (username) => {
    const resp = await fetch(apiUrl + username + "/repos");
    const respData = await resp.json();
    // Adding repos to User Card Component
    addReposToCard(respData);
}

const createUserCard = (user) => {
    const cardHTML = `
        <div class="card">
          <div class="user-card">
            <div class="user-img">
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" title="${user.name}"/>
                <div class="point" title="Pulse">
                  <div class="mini-point"></div>
                </div>
            </div>
            <div class="user-info">
                <h2 class="User-name">${user.name}</h2>
                <h4>@${user.login}</h4>
                <p>${user.bio}</p>
                <ul class="info">
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Repos</strong></li>
                </ul>
            </div>
          </div>
          <h3>Repositories : <span> (Public repositories) </span></h3>
          <div id="repos" class="repos"></div>
        </div>
    `;

    main.innerHTML = cardHTML;
}

const addReposToCard = (repos) => {
    const reposEl = document.getElementById("repos");

    repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)
        .forEach((repo) => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");

            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;

            reposEl.appendChild(repoEl);
        });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    showLoader();
    const user = search.value;
    if (user) {
      submitSuccess();
      getUser(user);
      search.value = "";
    } else {
      alert('Username is a required field !!');
    }
});
