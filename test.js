const gameRef = firebase.database().ref("Game");
const UserRef = firebase.database().ref("users");
var start = false
// const cells = document.querySelectorAll('td');
var turnObject = document.getElementById('currentPlay');
let UserCoin = 0;
let Userscore = 0;
var current_key = null;
var thisPlayer = "";
var Player_X ="";
var Player_O = "";
var count = 0;
var joined;
var win;
let can = true;
var enter = false;
let currentPlayer = 'X';
let notcurrentPlayer = 'O';
let increasePointX = 0;
let increasePointO = 0;
const cells = document.querySelectorAll('td');
const skillPointX = document.getElementById("pointSkillX");
const skillPointO = document.getElementById("pointSkillO");
var btnJoinX = document.querySelector('#btnJoin-X');
var btnJoinO = document.querySelector('#btnJoin-O');
document.getElementById('swapBtnRan').disabled = true;
// const currentUser = firebase.auth().currentUser;
// console.log(currentUser)
// console.log('----------------------------')

document.getElementById("swapBtnX").disabled = true;
document.getElementById("swapBtnO").disabled = true;

gameRef.on("value", (snapshot) => {
  if(!enter){
    // console.log("bingshiling")
    JoinGame(snapshot);
    enter = true
  }
  // console.log("John")
  getGameInfo(snapshot);
})

UserRef.on("value", (snapshot) => {
  getUserInfo(snapshot);
})

function tutorial(){
  // console.log('Yeeee')
  Swal.fire({
    title: 'How to play',
    text: `Rule is the same as simple tic-tac-toe, but increases skill. At start turn you can use skill`,
    icon: 'question',
    // imageUrl: 'https://unsplash.it/400/200',
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Custom image',
    showCloseButton: true,
    showDenyButton: true,
    confirmButtonColor: '#4D5054',
    denyButtonColor: '#4D5054',
    cancelButtonText: 'canm',
    denyButtonText: `Random`,
    confirmButtonText: 'Remove'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Remove Mark!',
        text: `Use 3 skill point, You can select area that mark has place and remove them.`,
        icon: 'info',
        // confirmButtonColor: '#4D5054',
        // 'Remove Mark!',
        // 'You can select area that mark has place and remove them',
        // 'info'
      }
      )
    }
    else if (result.isDenied) {
      Swal.fire({
        title: 'Random Remove Mark!',
        text: 'Use 1 skill point, You can remove any mark(include your mark) by random.',
        icon: 'info',
        // confirmButtonColor: '#4D5054',
      }
        // 'Random Remove Mark!',
        // 'You can remove opponent mark by random',
        // 'info'
      )
    }
  })
}

function getUserInfo(snapshot){
  const currentUser = firebase.auth().currentUser;
  // console.log('line 54 : '+ key)

  Object.keys(snapshot.val()).forEach((key) => {
    
  //   console.log("c2 : ")
    
      if(key == currentUser.uid){
        
        UserCoin = snapshot.val()[key][`coin`];
        Userscore = snapshot.val()[key][`score`];
        // console.log('line 52 : in')
      }
      // console.log('line 54 : '+ userInfo[key])
      // console.log('line 54 : '+ key)
  })
}

function removeonly(){
  console.log('-----------------------')
  window.location.href = "menu.html";
  const nodeRef = firebase.database().ref(`Game/${current_key}`);
  
  

  // Delete the node using the remove() method
  nodeRef.remove()
  // .then((result) => {
  //   Swal.fire({
  //     title: 'How to play',
  //     text: 'Rule is the same as simple tic-tac-toe, but increases skill.',
  //     icon: 'info',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       window.location.href = "menu.html";
  //     }
  //   })
  // })
  
}

function JoinGame(snapshot){
  const currentUser = firebase.auth().currentUser;
  if(currentUser){
    console.log(snapshot.val())
      if(snapshot.val() != null){
          Object.keys(snapshot.val()).forEach((key) => {
            if(snapshot.val()[key][`user-X-email`] == currentUser.email){
              current_key = key
              thisPlayer = 'X';
              document.getElementById("swapBtnO").hidden = true
              document.getElementById(`nameX`).innerHTML = currentUser.displayName
              // console.log("u find me")
            }else if((snapshot.val()[key][`user-O-email`] == currentUser.email)){
              current_key = key
              thisPlayer = 'O';
              document.getElementById("swapBtnX").hidden = true
              document.getElementById(`nameO`).innerHTML = currentUser.email
              // console.log("u find me OOOO")  
            }
          });
          Object.keys(snapshot.val()).forEach((key) => {
            if(current_key == null){
              console.log("i'm in")
              if(((snapshot.val()[key][`user-X-email`] == null))){
                  thisPlayer = 'X';
                  current_key = key; 
                  console.log(current_key)
                  console.log('X')
              }else if(((snapshot.val()[key][`user-O-email`] == null))){
                thisPlayer = 'O';
                current_key = key;
                console.log(current_key)
                console.log('O')
              }
            }
          });
          if(thisPlayer != ""){
                const playerForm = document.getElementById(`name${thisPlayer}`);
                let tmpID = `user-${thisPlayer}-id`;
                let tmpEmail = `user-${thisPlayer}-email`;
                let tmpuserName = `user-${thisPlayer}-userName`;
                gameRef.child(current_key).update({
                    [tmpID]: currentUser.uid,
                    [tmpEmail]: currentUser.email,
                    [tmpuserName]: currentUser.displayName,
                });
                console.log(currentUser.email + "added to "+ thisPlayer+"." );
                // console.log('none')
          }else{
              const playerForm = document.getElementById(`nameX`);
                let tmpID = `user-X-id`;
                let tmpEmail = `user-X-email`;
                let tmpuserName = `user-X-userName`;
                var created_key = gameRef.push({
                    [tmpID]: currentUser.uid,
                    [tmpEmail]: currentUser.email,
                    [tmpuserName]: currentUser.displayName,
                })
                current_key = created_key.key
                console.log(currentUser.email + "added to X." );
                console.log('none NameX')
          }
        }else{
              const playerForm = document.getElementById(`nameX`);
              let tmpID = `user-X-id`;
              let tmpEmail = `user-X-email`;
              let tmpuserName = `user-X-userName`;
              var created_key =  gameRef.push({
                  [tmpID]: currentUser.uid,
                  [tmpEmail]: currentUser.email,
                  [tmpuserName]: currentUser.displayName,
              })
              current_key = created_key.key
              console.log("new Room Create" );
              console.log(currentUser.email + "added to X." );
              console.log('newR')
        }  
  }

}
function getGameInfo(snapshot){
  const currentUser = firebase.auth().currentUser;
  let numPlayers = 0;
    Object.keys(snapshot.val()).forEach((key) => {
      if((currentUser.email == snapshot.val()[key][`user-X-email`])|| (snapshot.val()[key][`user-O-email`] == currentUser.email)){
        current_key = key;
      }
      if(key == current_key){
        // console.log("+999 " +  key)
        const PlayerX = document.getElementById(`nameX`);
        Player_X = snapshot.val()[key][`user-X-email`];
        PlayerX.innerHTML = snapshot.val()[key][`user-X-userName`]
        console.log(PlayerX.innerHTML)
        if(snapshot.val()[key]["win"] == 'X'){
          const user = firebase.auth().currentUser;
          const coinRef = firebase.database().ref('users/' + user.uid + '/coin');
          const IDRef = firebase.database().ref('users/'+user.uid)
          if(snapshot.val()[key][`user-X-email`] == currentUser.email){
            console.log(win+"+++++++")
            console.log(Userscore)
            UserCoin = UserCoin +   10 ;
            Userscore = Userscore + 1;
            IDRef.update({
            coin: UserCoin,
            score: Userscore,
            })
            console.log(Userscore)
          }
          Swal.fire({
          icon: 'info',
          title: 'X Win!!',
          }).then((result) => {
              if (result.isConfirmed) {
                // resetGame()
                
                removeonly()
              }
            })
          
          //  alert('X wins!');
          
        }else if(snapshot.val()[key]["win"] == 'O'){
          const user = firebase.auth().currentUser;
          const coinRef = firebase.database().ref('users/' + user.uid + '/coin');
          const IDRef = firebase.database().ref('users/'+user.uid)
          if(snapshot.val()[key][`user-O-email`] == currentUser.email){
            console.log(win+"+++++++")
            console.log(Userscore)
            UserCoin = UserCoin +   10 ;
            Userscore = Userscore + 1;
            IDRef.update({
            coin: UserCoin,
            score: Userscore,
            })
          }
            console.log(Userscore)
            Swal.fire({
            icon: 'info',
            title: 'O Win!!',
          }).then((result) => {
            if (result.isConfirmed) {
              // resetGame()
              // window.location.href = "menu.html";
              removeonly()
            }
          })
            //  alert(`O wins!`);
          // resetGame();
        }else if(snapshot.val()[key]["win"] == 'Tie'){
            Swal.fire({
            icon: 'info',
            title: 'It Tie!!!',
          }).then((result) => {
            if (result.isConfirmed) {
              // resetGame()
              // window.location.href = "menu.html";
              removeonly()
            }
          })
            //  alert(`Tie`);
          // resetGame();
        }
        // console.log("key : ",snapshot.val()[key]["skilpoint-O"])
        
        if(snapshot.val()[key]["turn"] != null){
            currentPlayer = snapshot.val()[key]["turn"];
            turnObject.innerHTML = "Turn: " + currentPlayer;
            console.log("CP : ",currentPlayer)
        }

        if(snapshot.val()[key]["skilpoint-X"] != null){
          increasePointX = snapshot.val()[key]["skilpoint-X"];
          console.log('poinX : ',increasePointX)
        }
        if(snapshot.val()[key]["skilpoint-O"] != null){
          increasePointO = snapshot.val()[key]["skilpoint-O"];
          console.log('poinO : ',increasePointO)
        }

        if(snapshot.val()[key]["table"] != null){for(let i=0;i<9;i++){
          if(snapshot.val()[key]["table"][`cell-${i}`] != null){
          document.getElementById(`${i}`).innerHTML = snapshot.val()[key]["table"][`cell-${i}`]
         }
        }}
      if(currentUser.email == snapshot.val()[key][`user-${notcurrentPlayer}-email`] && snapshot.val()[key][`user-${currentPlayer}-email`] != null &&
      snapshot.val()[key]["turn"] == notcurrentPlayer && snapshot.val()[key]["win"] == null){
        console.log('win' + snapshot.val()[key]["win"])
          console.log(snapshot.val()[key]["turn"] +':::::::::' + currentPlayer)
          console.log('line 324 this guy')
          Swal.fire({
            icon: 'warning',
            title: `Turn : ${notcurrentPlayer}`,
            showConfirmButton: false,
            timer: 1500
          })
          .then(() =>{
            if(snapshot.val()[key][`skilpoint-O`] != "undefined" && snapshot.val()[key][`skilpoint-O`] != null){
              console.log('poinO : ',snapshot.val()[key][`skilpoint-O`])
              if(eval(snapshot.val()[key][`skilpoint-${currentPlayer}`]) >= 3){
                Swal.fire({
          
                  icon: 'warning',
                  title: `Use skill phase`,
                  showCloseButton: true,
                  showDenyButton: true,
                  showConfirmButton: true,
                  denyButtonText: `Remove`,
                  confirmButtonText: 'Random',
                  position: 'bottom',
                  customClass: {
                    confirmButton: 'my-confirm-button-class'
                  },
                  // timer: 1500
                }).then((result) => {
                  if (result.isConfirmed) {
                    useRandom()
                    Swal.fire({
                      icon: 'warning',
                      title: `Mark Phase`,
                      showConfirmButton: false,
                      timer: 1500
                    })
                  }
                  if (result.isDenied) {
                    useSkill()
                  }
                  if(result.isDismissed){
                    Swal.fire({
                      icon: 'warning',
                      title: `Mark Phase`,
                      showConfirmButton: false,
                      timer: 1500
                    })
                  }
                })
                
              }

              if(eval(snapshot.val()[key][`skilpoint-${currentPlayer}`]) >= 1 && eval(snapshot.val()[key][`skilpoint-${currentPlayer}`]) < 3){
                Swal.fire({
          
                  icon: 'warning',
                  title: `Use skill phase`,
                  showCloseButton: true,
                  showDenyButton: false,
                  showConfirmButton: true,
                  denyButtonText: `Remove`,
                  confirmButtonText: 'Random',
                  position: 'bottom',
                  customClass: {
                    confirmButton: 'my-confirm-button-class'
                  },
                  // timer: 1500
                }).then((result) => {
                  if (result.isConfirmed) {
                    useRandom()
                      Swal.fire({
                        icon: 'warning',
                        title: `Mark Phase`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                  }
                  if (result.isDenied) {
                    useSkill()
                    
                  }
                  if(result.isDismissed){
                    Swal.fire({
                      icon: 'warning',
                      title: `Mark Phase`,
                      showConfirmButton: false,
                      timer: 1500
                    })
                  }
                })
                
              }
              
              
            }
            
          })
          
          console.log('-------------------------------')
        }
              Player_O = document.getElementById(`nameO`);
        const PlayerO = document.getElementById(`nameO`);
        if(snapshot.val()[key][`user-O-email`] != "undefined" && snapshot.val()[key][`user-O-email`] != null)
        {
          PlayerO.innerHTML = snapshot.val()[key][`user-O-userName`]
          if(snapshot.val()[key][`start?`] == "undefined" || snapshot.val()[key][`start?`] == null){
            gameRef.child(current_key).update({
              [`start?`]: "yes",
            })
            Swal.fire({
              icon: 'warning',
              title: `Start!`,
              showConfirmButton: false,
              timer: 1500
            }).then(() =>{
              if(snapshot.val()[key][`user-X-email`] == currentUser.email){
                Swal.fire({
                  icon: 'warning',
                  title: `Turn : X`,
                  showConfirmButton: false,
                  timer: 1500
                })
              }
            })
            
          }
          // console.log('not undi')
        }
        console.log(PlayerO.innerHTML)
      }
    })

    skillPointX.innerHTML = "PointSkill X: " + increasePointX;
    skillPointO.innerHTML = "PointSkill O: " + increasePointO;
    notcurrentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (eval(`increasePoint${currentPlayer}`) >= 3 && data[`user-${currentPlayer}-email`] == currentUser.email){
      document.getElementById(`swapBtn${currentPlayer}`).disabled = false;
      console.log("line: 246")
    }
    else{
      document.getElementById(`swapBtn${notcurrentPlayer}`).disabled = true;
    }
    if (eval(`increasePoint${currentPlayer}`) >= 1 && data[`user-${currentPlayer}-email`] == currentUser.email){
      document.getElementById(`swapBtnRan`).disabled = false;
      console.log("line: 253")
      can = true;
    }
    else{
      document.getElementById(`swapBtnRan`).disabled = true;
    }

  }
  if(firebase.database().ref(`Game/${current_key}`)){
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  }
  

  function handleCellClick(event) {
    console.log('click')
    const cell = event.target;
    gameRef.child(current_key).once("value", snapshot => {
      data = snapshot.val()
      currentUser = firebase.auth().currentUser
      id = event.currentTarget.id
    })
    // console.log(cell.textContent == '' && data[`user-${currentPlayer}-email`] == currentUser.email)
    // console.log(data[`user-${currentPlayer}-email`])
    if (cell.textContent == '' && data[`user-${currentPlayer}-email`] == currentUser.email && (data[`user-X-email`] != null) && (data[`user-O-email`] != null)) {
      console.log('click in if')
      cell.textContent = currentPlayer;
      let dbcell = `cell-${cell.id}`;
      gameRef.child(current_key+"/table").update({
                [dbcell]: cell.textContent,
      });
      Swal.fire({
        icon: 'warning',
        title: `End Phase`,
        showConfirmButton: false,
        timer: 1500
      })
      if (checkWin()) {
          win = currentPlayer
          let dbwin = `win`;
          gameRef.child(current_key).update({
              [dbwin]: currentPlayer,
          });
          
        }else if (checkTie()) {
        let dbwin = `win`;
        gameRef.child(current_key).update({
                [dbwin]: "Tie",
        });
      }else {
        if(currentPlayer == 'X'){
          console.log("in current")
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          increasePointX = increasePointX + 1;
          // skillPointX.innerHTML = "PointSkill X: " + increasePointX;
          gameRef.child(current_key).update({
            [`skilpoint-X`]: increasePointX,
            [`turn`]: currentPlayer,
          });

        }
        else{
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          increasePointO = increasePointO + 1;
          // skillPointO.innerHTML = "PointSkill O: " + increasePointO;
          gameRef.child(current_key).update({
            [`skilpoint-O`]: increasePointO,
            [`turn`]: currentPlayer,
          });

        }
      }
    }
  }
  

  function removedata(){
    const nodeRef = firebase.database().ref('Game');

    // Delete the node using the remove() method
    nodeRef.remove()
    .then(() => {
        console.log('Node deleted successfully');
    })
    .catch((error) => {
        console.error('Error deleting node:', error);
    });
}

  function checkWin() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];
    return winPatterns.some(pattern =>
      pattern.every(index => cells[index].textContent === currentPlayer)
    );
  }
  function resetGame() {
    gameRef.child(current_key+"/table").update({
      ["cell-1"]: null,["cell-2"]: null,["cell-3"]: null,
      ["cell-4"]: null,["cell-5"]: null,["cell-6"]: null,
      ["cell-7"]: null,["cell-8"]: null,["cell-0"]: null,
    });
    gameRef.child(current_key).update({
    ["win"]:null,
    ["turn"]:"X",
    [`skilpoint-O`]: null,
    [`skilpoint-X`]: null,
    });
    // }
    [...cells].forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    turnObject.innerHTML = "Turn: " + currentPlayer;
    increasePointX = 0;
    increasePointO = 0;
  }
  function checkTie() {
    return [...cells].every(cell => cell.textContent !== '');
  }
  function useSkill(){
    let can = true;
    console.log('useSkill')
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (can){
              if(currentPlayer == 'X'){
                if(increasePointX < 3){
                    console.log("not enough sp")
                    // document.getElementById("swapBtn").disabled = true;
                  }else{
                    if (cell.textContent !== '') {
                      cell.textContent = '';
                      let dbcell = `cell-${cell.id}`;
                      gameRef.child(current_key+"/table").update({
                          [dbcell]: cell.textContent,
                      });
                      can = false;
                      increasePointX = increasePointX - 3;
                      gameRef.child(current_key).update({
                        [`skilpoint-X`]: increasePointX,
                      });
                      skillPointX.innerHTML = "PointSkill X: " + increasePointX;
                      console.log('useSkil remain:'+ increasePointX);
                      Swal.fire({
                        icon: 'warning',
                        title: `Mark Phase`,
                        showConfirmButton: false,
                        timer: 1500
                      })
                   } 
                }
              }else{
                  if(increasePointO < 3){
                    console.log("not enough sp")
                    // document.getElementById("swapBtn").disabled = true;
                  }
                  else{
                    if(cell.textContent !== '') {
                      cell.textContent = '';
                      let dbcell = `cell-${cell.id}`;
                      gameRef.child(current_key+"/table").update({
                          [dbcell]: cell.textContent,
                    });
                      can = false;  
                      increasePointO = increasePointO - 3;
                      gameRef.child(current_key).update({
                        [`skilpoint-O`]: increasePointO,
                    });
                    skillPointO.innerHTML = "PointSkill O: " + increasePointO;
                    console.log('useSkil remain' + increasePointO);
                    Swal.fire({
                      icon: 'warning',
                      title: `Mark Phase`,
                      showConfirmButton: false,
                      timer: 1500
                    })
                  }
                }
              }
            }
          });
      });
    }
//   window.onload = tutorial();
// console.log(eval(`increasePoint${currentPlayer}`)-1)
function useRandom(){
  const boxes = document.querySelectorAll('td')
  console.log('useRandom')
  const emptyBoxes = Array.from(boxes).filter(box => box.textContent != '');
  console.log(emptyBoxes.length)
			if (emptyBoxes.length < 9) {
        console.log('lower 9')
        if(can){
          if(currentPlayer == 'X'){
            if(increasePointX < 1){
                console.log("not enough sp")
                // document.getElementById("swapBtn").disabled = true;
              }else{
                const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
                  console.log("box",randomBox.id)				
                  randomBox.textContent = null;
                  let ranCell = `cell-${randomBox.id}`;
                  gameRef.child(current_key+"/table").update({
                    [ranCell] : randomBox.textContent,
                  });
                  can = false;
                  increasePointX = increasePointX - 1;
                  gameRef.child(current_key).update({
                    [`skilpoint-X`]: increasePointX,
                  });
                  skillPointX.innerHTML = "PointSkill X: " + increasePointX;
                  document.getElementById(`swapBtnRan`).disabled = true;
            }
          }else{
              if(increasePointO < 1){
                console.log("not enough sp")
                // document.getElementById("swapBtn").disabled = true;
              }
              else{
                const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
                  console.log("box",randomBox.id)				
                  randomBox.textContent = null;
                  let ranCell = `cell-${randomBox.id}`;
                  gameRef.child(current_key+"/table").update({
                    [ranCell] : randomBox.textContent,
                  });
                  can = false;
                  increasePointO = increasePointO - 1;
                  gameRef.child(current_key).update({
                    [`skilpoint-O`]: increasePointO,
                  });
                  skillPointO.innerHTML = "PointSkill O: " + increasePointO;
                  document.getElementById(`swapBtnRan`).disabled = true;
            }
          }
        }
				
    }
  }
function Surrender(){

  gameRef.child(current_key).once("value", snapshot => {
      data = snapshot.val()
      currentUser = firebase.auth().currentUser
      id = event.currentTarget.id
    })

  const x_mail = firebase.database().ref(`Game/${current_key}/user-X-email`)
  console.log("xXXXXxxx: "+Player_X)
  if((data[`user-X-email`] != null) && (data[`user-O-email`] != null)){
    if(firebase.auth().currentUser.email == Player_X){
      win = "O"
      console.log("win" + win)
    }else{
      win = "X"
      console.log("win" + win)
    }
    gameRef.child(current_key).update({
      [`win`]: win   
    })
  }
  else{
    console.log('can not surrender')
    Swal.fire({
      title: 'No one else',
      text: `You are only one player in here`,
      icon: 'info',
    })
    
  }
  
}