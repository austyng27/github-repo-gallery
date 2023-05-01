//Profile Info
const overview = document.querySelector(".overview");

//Github username
const username = "austyng27";

//Github API to retrieve user info
const getUserInfo = async function(){
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    console.log(data);
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
};