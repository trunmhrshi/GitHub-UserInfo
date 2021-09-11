const APIURL = "https://api.github.com/users/";



const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");



async function getUser(username) {
  const res = await fetch(APIURL + username);
  const resData = await res.json();

  createUserCard(resData);
  getRepos(username);
}
async function getRepos(username){
  const res = await fetch(APIURL + username +"/repos");
  const resData = await res.json();
  
  addReposToCard(resData);
}

function record(){
  var recognition = new webkitSpeechRecognition();
  recognition.lang = "en-GB";
  recognition.onresult = function(event){
    // console.log(event);
    document.getElementById('search').value = event.results[0][0].transcript.replace(/ /g, '');;
  }
  recognition.start();
}

function createUserCard(user) {
  const cardHTML = `
        
    <div class="card">
    <div class="img-container">
            <img class="avatar" src="${user.avatar_url}" alt="${user.name}">
        </div>
        <div class="user-info">
            <h2 class="name">${user.name}</h2>
            <p>${user.bio}</p>
            <ul class="info">
                
                <li class="num">${user.followers}<strong>Followers</strong></li>
                <li class="num">${user.following}<strong>Following</strong></li>
                <li class="num">${user.public_repos}<strong>Repos</strong></li>
            </ul>
            <h4>Repos:</h4>
            <div id="repos"></div>
        </div>
        </div>
    `;

  main.innerHTML = cardHTML;
}


function addReposToCard(repos) {
    const reposE1 = document.getElementById('repos');

    repos
    .sort((a,b) => b.stargazers_count - a.stargazers_count)
    .slice(0,15)
    .forEach(repo => {
        const repoE1 = document.createElement('a');
        repoE1.classList.add('repo');
        repoE1.href = repo.html_url;
        repoE1.innerText = repo.name;
        repoE1.target = "_blank";
        reposE1.appendChild(repoE1); 
    });
}    


form.addEventListener("submit", (event) => {
  event.preventDefault();

  const user = search.value;

  record(user);

  if (user) {
    getUser(user);
    search.value = "";
  }
});


var icon = document.getElementById("icon");
icon.onclick = function(){
    document.body.classList.toggle("dark-theme");
    if(document.body.classList.contains("dark-theme")){
        icon.src = "dark theme icon/sun.png";
    }else{
        icon.src = "dark theme icon/moon.png";   
    }
}
