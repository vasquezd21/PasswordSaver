console.log("script running");
var SHA512 = new Hashes.SHA512;

const passwordInput = document.querySelector("#passwordInput");
const accessKeyInput = document.querySelector("#accessKeyInput");
const submitBtn = document.querySelector("#submitBtn");
const burger = document.querySelector('.burger');
const nav = document.querySelector('#'+burger.dataset.target);

burger.addEventListener('click', (e) => {
  burger.classList.toggle('is-active'); //displays the 'x' to close nav burger
  nav.classList.toggle('is-active'); //displays nav-menu.is-active
})

submitBtn.addEventListener('click', (e) => {
    const password = passwordInput.value;
    const accessKey = accessKeyInput.value;

    console.log(password);
    console.log(accessKey);

    //Uses SHA512 hash with hexadecimal hash encoding
    const hashedPass = SHA512.hex(password);
    const hashedKey = SHA512.hex(accessKey);

    //check that passcode contains capital letters & numbers
    if(/\d/g.test(accessKey) && /[A-Z]/g.test(accessKey)) {
        console.log(hashedPass);
        console.log(hashedKey);

        firebase.database().ref().push({
            text: password, //contains both user's password and info
            passcode: hashedKey
        })
        //clear input fields
        passwordInput.value = "";
        accessKeyInput.value = "";
    } else
        alert("Your passcode must contain a capital letter and number");
});