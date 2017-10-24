const coins = 12;
let isPlayer;

const nextRoundButton = document.getElementById("nextRound");
const coinContainer = document.getElementById("coinContainer");

let playerPresses;

function start(){
    playerPresses = 0;
    isPlayer = true;
    nextRoundButton.innerText = "FINISH";
    nextRoundButton.style.backgroundColor = "#48F216";

    let tempHTML = "<table><tr>";
    for(let i = 0; i < coins; i++){
        tempHTML += "<th><div class=\"coin\"></div></th>"
    }
    tempHTML += "</tr></table>";

    coinContainer.innerHTML = tempHTML;
}

function nextRound(botIsDone){
    isPlayer = !isPlayer;

    if(playerPresses == -1){
        start();
    } else if (isPlayer && botIsDone){
        playerPresses = 0;
        nextRoundButton.innerText = "FINISH";
        nextRoundButton.style.backgroundColor = "#48F216";
    } else if (playerPresses > 0) {
        nextRoundButton.innerText = "PLEASE WAIT...";
        nextRoundButton.style.backgroundColor = "#609551";

        botRemoveCoin(4-playerPresses);
    } else {
        isPlayer = !isPlayer;
    }
}

function botRemoveCoin(count){
    
    setTimeout(function(){

        let done = removeCoin(true);
        if(count > 1){
            botRemoveCoin(--count);
        } else if( !done ) {
            nextRound(true);
        }

    },500);
}

function removeCoin(botPress){
    if(isPlayer && playerPresses < 3 || botPress){
        let allCoins = document.getElementsByClassName("coin");

        if(allCoins.length > 0){
            let c = allCoins[0];
            
            if(c)
                c.parentNode.removeChild(c);
        }
        if(allCoins.length == 0) {
            nextRoundButton.innerText = "YOU LOST";
            nextRoundButton.style.backgroundColor = "#EA2202";
            playerPresses = -1;

            return true;
        }
    }

    if(isPlayer)
        playerPresses++;

    return false;
}

start();