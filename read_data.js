// window.onload = readName;
var scorekeep = [];

let scoreboard = firebase.database().ref('users').orderByChild('score').once('value',

    function(AllRecords){
        
        AllRecords.forEach(
            function(CurrentRecord){
                // var username = CurrentRecord.val().Username;
                var user = CurrentRecord.val().userName;
                var score = CurrentRecord.val().score;
                let tempkeep = [user, score]
                scorekeep.push(tempkeep);
                console.log(scorekeep)
            }
        );
        // console.log(AllRecords)
            for(let i = scorekeep.length - 1;i >= 0;i--){
                    AddItemToTable(scorekeep[i][0],scorekeep[i][1]);
                    
            }
            // scorekeep.forEach((item)=>{
            //     // console.log("it"+item[0])  
            //     if(item[0] == currentUser.email){
            //         console.log(currentUser.email)
                    
            //     }
            
            // })
            
    }
)

// scorekeep.forEach((item)=>{
//     console.log("it"+item)  
//     if(item[0] == currentUser.email){
//         console.log('Yeee')
//     }

// })

// function SelecAllData(){
    
// }

// window.onload = SelecAllData;

var stdNo = 0;
function AddItemToTable(user, score){
    const currentUser = firebase.auth().currentUser;
    console.log("[Join] Current user", currentUser.email);
    var tbody = document.getElementById('tbody1');
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    // var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    if(user == currentUser.displayName){
        console.log(currentUser.email)
        trow.style.backgroundColor = 'azure';
        trow.style.color = '#1C2833';
    }
    td1.innerHTML = ++stdNo;
    // td2.innerHTML = username;
    td3.innerHTML = user;
    td4.innerHTML = score;
    trow.appendChild(td1);
    // trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    tbody.appendChild(trow);
    // console.log(td3.innerHTML);
    
}


function score(){
    console.log('click scoreboard');
    location.href = "scoreboard.html";
}
function back(){
    
    location.href = "menu.html";
}



function selec(){
    location.href = "playmode.html";
}
// function logout(){
    
//     location.href = "index.html";
// }

let setupUI = (user) => {
    if (user){
        document.querySelector("#name").innerHTML = user.email;
    }
}