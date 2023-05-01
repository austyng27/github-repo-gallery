//Profile Info
const overview = document.querySelector(".overview");
//Github username
const username = "austyng27";
//Repo Display List Element
const repoList = document.querySelector(".repo-list");
//Section where repo info appears
const repoInfoElement = document.querySelector(".repos");
//Section with repo data display
const repoDataElement = document.querySelector(".repo-data");

//Github API to retrieve user info
const getUserInfo = async function(){
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    userInfoDisplay(data);
};
getUserInfo();

//Display user info on the web page
const userInfoDisplay = function(data){
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`;
  overview.append(div);
  getRepos();
};

//API to retrieve public repos
const getRepos = async function(){
    const repoResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoResponse.json();
    displayRepos(repoData);
};

//Display info about each repo
const displayRepos = function(repos){
    for(const repo of repos){
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

//Event listener for click of repo list item
repoList.addEventListener("click", function(e){
    if (e.target.matches("h3")){
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

//Fetch specific repo info
const getRepoInfo = async function(repoName){
    const repoInfoRequest = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await repoInfoRequest.json();
    console.log(repoInfo);
    //get languages 
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    //add each language to an array and make a list of lang
    const languages = [];
    for (const language in languageData){
        languages.push(language);
    }
    repoInfoDisplay(repoInfo, languages);  
};

//Display the repo info
const repoInfoDisplay = function(repoInfo, languages){
    repoDataElement.innerHTML = "";
    repoDataElement.classList.remove("hide");
    repoInfoElement.classList.add("hide");
    const infoDiv = document.createElement("div");
    infoDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoDataElement.append(infoDiv);
};