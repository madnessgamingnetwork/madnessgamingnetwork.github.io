var enabled = false;

function checkStatus(){
	var iframe = document.getElementById("window");
	var sts = document.getElementById("status");
	if(GLOBAL_connected === true){
		if(!enabled){
			iframe.src = `https://${IP}`;
			iframe.style.visibility = "visible";
		}
		enabled = true;
	}
	else{
		if(enabled){
			iframe.src = "";
			iframe.style.visibility = "hidden";
		}
		enabled = false;
		sts.innerHTML = `<a href="https://discord.com/channels/718348931133603841/719423185996480593/1287629052647051356" style="color: #FFFFFF">Connect to Netmaker to view</a>`;
	}
}

window.setInterval(checkStatus, 2000);
