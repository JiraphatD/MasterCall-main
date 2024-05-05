console.log("hello")
const UserRef = firebase.database().ref("users");
// console.log("In getData, looking for ",UserRef);
UserRef.on("value", (snapshot) => {
    console.log("hello")
    // show(snapshot);
  const currentUser = firebase.auth().currentUser;
  document.getElementById('name').innerHTML = `Welcome ${currentUser.displayName}`;
  console.log("Displayname : ", currentUser.displayName)
})
// function welcome(snapshot){
//     const currentUser = firebase.auth().currentUser;
//     // console.log(currentUser);
//     snapshot.forEach((data) => {
//       console.log('aaaa')
//         const userInfo = data.val();
//         if(userInfo[key] == currentUser.id)
//       document.getElementById('name') = `Welcome ${userInfo[key]["email"]}`;
//       console.log(currentUser);
//     })
    
// }
// function show(){
//   console.log('aaaa')
//   const currentUser = firebase.auth().currentUser;
//   document.getElementById('name').innerHTML = `Welcome <br><br> ${currentUser.email}`;
//   console.log("[Join] Current user", currentUser.email);
// }

function tutorial(){
  // console.log('Yeeee')
  Swal.fire({
    title: 'How to play',
    text: 'Rule is the same as simple tic-tac-toe, but increases skill.',
    icon: 'question',
    // imageUrl: 'https://unsplash.it/400/200',
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Custom image',
    showDenyButton: true,
    confirmButtonColor: '#4D5054',
    denyButtonColor: '#4D5054',
    cancelButtonText: 'canm',
    denyButtonText: `Random Remove`,
    confirmButtonText: 'Select Remove'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Remove Mark!',
        text: 'You can select area that mark has place and remove them.',
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
        text: 'You can remove opponent mark by random.',
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

  
// window.onload = tutorial();