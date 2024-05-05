const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", createUser);

const signupFeedback = document.querySelector("#feedback-msg-signup");
const signupModal = new bootstrap.Modal(document.querySelector("#modal-signup"));

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener('submit', loginUser);

const loginFeedback = document.querySelector("#feedback-msg-login");
const loginModal = new bootstrap.Modal(document.querySelector("#modal-login"))


//modal and sweetAlert
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })


function createUser(event){
    
  event.preventDefault();
  const email = signupForm["input-email-signup"].value;
  const password = signupForm["input-password-signup"].value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Register complete',
      }).then((user) => {
        if (user) {
          // var email = user.email;
          // const firebaseRef = firebase.database().ref("Score");
          //   firebaseRef.push({
          //       Email : email,
          //       Score : 0,
          //   })
          console.log('line 40')
          const userName = document.querySelector('#input-userName-signup').value;
          const user = firebase.auth().currentUser;
          user.updateProfile({
            displayName: userName,
          })
          if(user.displayName != null){
            console.log('have Name')
          }
          else{
            console.log('not have Name')
          }
          const email = user.email;
          // const score = Score;
          const emailRef = firebase.database().ref('users/' + user.uid + '/email');
          const scoreRef = firebase.database().ref('users/' + user.uid + '/score');
          const coinRef = firebase.database().ref('users/' + user.uid + '/coin');
          const userRef = firebase.database().ref('users/' + user.uid + '/userName');
          emailRef.set(email);
          scoreRef.set(0);
          coinRef.set(0);
          userRef.set(userName);
          // emailRef.set(score);
        }
        location.href = "menu.html";
      })
      signupFeedback.style = "color : green";
      signupFeedback.innerHTML = "<i class='bi bi-check-circle-fill'></i> Signup complete.";
      
      setTimeout(() => {
          signupModal.hide();             
          // signupForm.reset();
          // signupFeedback.innerHTML = ``;
      }, 1000)
  })
  .catch((error) => {
      signupFeedback.style = "color : crimson";
      signupFeedback.innerHTML = `<i class='bi bi-exclamation-triangle-fill'></i> ${error.message}`
      signupForm.reset();
  })
}

function loginUser(event){
  event.preventDefault();
  
  const email = loginForm["input-email-login"].value;
  const password = loginForm["input-password-login"].value;

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Login complete',
      }).then(() => {
        location.href = "menu.html";
      })
      loginFeedback.style = "color : green";
      loginFeedback.innerHTML = "<i class='bi bi-check-circle-fill'></i> Login complete.";
      setTimeout(() => {
          loginModal.hide();
          // loginForm.reset()
          // loginFeedback.innerHTML = ``;
      }, 1000)
  })
  .catch((error) => {
      loginFeedback.style = "color : crimson";
      loginFeedback.innerHTML = `<i class='bi bi-exclamation-triangle-fill'></i> ${error.message}`
      loginForm.reset();
  })
}

const btnCancels = document.querySelectorAll(".btn-cancel");
btnCancels.forEach((btn) => {
    btn.addEventListener("click",() => {
        // alert('click');
        signupForm.reset();
        signupFeedback.innerHTML = "";
        loginForm.reset();
        loginFeedback.innerHTML = "";
    })
});

// firebase.auth().onAuthStateChanged((user) => {
//     if(user){
//         console.log(user);
//     }
//     else{
//         console.log("Unavailable user");
//     }
// })

// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     const user = firebase.auth().currentUser;
//     const emailRef = firebase.database().ref('users/' + user.uid + '/email');
//     const name = document.querySelector('#name');
//     name.innerHTML = emailRef;
//     // const scoreRef = firebase.database().ref('users/' + user.uid + '/score');
//     // const coinRef = firebase.database().ref('users/' + user.uid + '/coin');
    
//   }
// });

// firebase.auth().onAuthStateChanged((user) => {
//   if(user){
//       console.log("User :",user);
//   }
//   // setupUI(user);
// });



function out(){
  firebase.auth().signOut();
  location.href = "index.html";
}