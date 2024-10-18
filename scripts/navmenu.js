const IP = "10.101.255.254";
var GLOBAL_connected = false;

var pages = {
		"Home": "index.html",
		"Online Player Viewer": "players.html",
		"MHP3rd Database": "https://mhp3db.github.io",
		"[Beta] MHGU Save Manager": "https://silverjolteon.github.io/MHGU/save-manager/index.html",
		"Google Drive": "https://drive.google.com/drive/folders/1037Ry3Yk0akItugNHoXjJ24VW57Zb0fZ?usp=sharing"
};

function openSidenav(){
	document.getElementById("sidenav").style.visibility = "visible";
	document.getElementById("sidenav").style.width = "100vw";
}

function closeSidenav(){
	document.getElementById("sidenav").style.width = "0";
	document.getElementById("sidenav").style.visibility = "hidden";
}

window.addEventListener("load", () => {
	var page = window.location.pathname.split("/").pop();
	if(page === "") page = "index.html";
	var navbar = document.getElementById("navbar");
	navbar.innerHTML = `
		<button type="button" onClick="openSidenav()">
			<svg width="24" height="24">
				<path fill="currentColor" d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"></path>
			</svg>
		</button>
	`;
	
	var sidenav = document.getElementById("sidenav");
	sidenav.innerHTML = `<span onClick="closeSidenav()">&times;</span>`;
	for(title in pages){
		sidenav.innerHTML += `<a href="${pages[title]}">${title}</a>`;
		if(page === pages[title]){
			navbar.innerHTML += `<span onClick="openSidenav()" style="cursor: pointer">${title}</span>`;
		}
	}
	navbar.innerHTML += `<span style="position: fixed; left: 50%; transform: translateX(-50%);">${IP}</span>`;
	navbar.innerHTML += `<span id="connection" style="position: fixed; right; right: 20px; font-size: 12px">Checking connection...</span>`;
	function getStatus(){
		var timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 2000));
		Promise.race([
			fetch(`https://${IP}?_=${new Date().getTime()}`, {mode: "no-cors"}),
			timeout
		])
		.then(r=>{
				GLOBAL_connected = true;
				document.getElementById("connection").innerHTML = `Connected &#128994`;
			})
		.catch(e=>{
			GLOBAL_conencted = false;
			document.getElementById("connection").innerHTML = `Not connected &#128308;`;
		});
	}
	getStatus();
	window.setInterval(getStatus, 200);
});
