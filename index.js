const successMsg = document.querySelector(".success");
const firstName = document.querySelector("#firstnameInput");
const lastName = document.querySelector("#lastnameInput");
const email = document.querySelector("#emailInput");
const queryOptions = document.querySelectorAll(".queryItem");
const messageInput = document.querySelector("#messageInput");
const submitBtn = document.querySelector(".submitBtn");
const messageError = document.querySelector(".messageError");
const queryError = document.querySelector(".queryError");
const nameError = document.querySelectorAll(".nameError");
const emailError = document.querySelector(".emailError");
const consentError = document.querySelector(".consentError");
const consentText = document.querySelector(".consentText");
const consentChecked = document.querySelector(".checked");
const customCheck = document.querySelector(".check");
const radios = document.querySelectorAll(".radio");



//event listeners

submitBtn.addEventListener("click", required)
firstName.addEventListener("change", ()=>{
    nameError[0].textContent = ""
    firstName.style.border = "1px solid hsl(186, 15%, 59%)"
})
lastName.addEventListener("change", ()=>{
    nameError[1].textContent = ""
    lastName.style.border = "1px solid hsl(186, 15%, 59%)"
})
email.addEventListener("change", ()=>{
    emailError.textContent = ""
    email.style.border = "1px solid hsl(186, 15%, 59%)"
})
radios.forEach(radio => {
    radio.addEventListener("change", ()=>{
        if(radio.style.display === "none"){
            queryError.textContent = "";
        }
    })
})
messageInput.addEventListener("change", ()=>{
    messageError.textContent = ""
    messageInput.style.border = "1px solid hsl(186, 15%, 59%)"
});

consentText.addEventListener("click", () => {
    if (customCheck.style.display !== "none") {
    customCheck.style.display = "none";
    consentChecked.style.display = "inline-block";
    } else {
    customCheck.style.display = "inline-block";
    consentChecked.style.display = "none";
    }
    consentError.textContent =""
});






//button submit function

function required(e){
    e.preventDefault()
    const isFNameValidated = nameValidate(firstName.value, nameError[0], firstName);
    const isLNameValidated = nameValidate(lastName.value, nameError[1], lastName);
    const isEmailValidated = emailValidate(email.value, email);
    const isMessageValidated = messageValidate(messageInput.value, messageError, messageInput);
    const isQueryValidated = queryValidate();
    const isConsentValidated = consentValidate();
    if (isFNameValidated && isLNameValidated && isEmailValidated && isMessageValidated && isQueryValidated && isConsentValidated){
        successMsg.style.display = "block"
    } else {
        successMsg.style.display = "none"
    }
  
}




// first and last name validator

function nameValidate(value, errorEl, nameInput){
    const regEx = /^[a-zA-Z\s]{3,}$/;

    if(!regEx.test(value)){
        errorEl.textContent = "This field is required";
        errorEl.style.display = "block";
        nameInput.style.border = "1px solid hsl(0, 66%, 54%)"
    } else{
        errorEl.textContent = "";
        errorEl.textContent = "";
        nameInput.style.border = "1px solid hsl(186, 15%, 59%)"
        return true;
    }
    value.textContent = ""
}


// email validator

function emailValidate(value, nameInput){
    const regEx = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

    if(!regEx.test(value)){
        emailError.textContent= "Please enter a valid email address";
        nameInput.style.border = "1px solid hsl(0, 66%, 54%)"
        return;
    } else {
        emailError.textContent = "";
        emailError.style.display = "none";
        nameInput.style.border = "1px solid hsl(186, 15%, 59%)"
        return true
  }
}


// message validator

function messageValidate(value, errorEl, nameInput) {
  const regEx = /^.{10,}$/;

  if (!regEx.test(value)) {
    errorEl.textContent = "Message must be at least 10 characters long";
    errorEl.style.display = "block";
    nameInput.style.border = "1px solid hsl(0, 66%, 54%)"
  } else {
    errorEl.textContent = "";
    errorEl.style.display = "none";
    nameInput.style.border = "1px solid hsl(186, 15%, 59%)"
    return true;
  }
}


//query selector

queryOptions.forEach(queryItem =>{
    const radio = queryItem.querySelector(".radio");
    const radioImg = queryItem.querySelector(".picked");
    queryItem.addEventListener("click", (e)=>{
        document.querySelector(".queryFocus")?.classList.remove("queryFocus");
        document.querySelectorAll(".picked").forEach(img => img.style.display = "none")
        e.currentTarget.classList.add("queryFocus");
        radioImg.style.display = "inline-block";
        queryError.textContent = "";
        queryOptions.forEach(options => options.style.border = "1px solid hsl(186, 15%, 59%)")
        
    });

});


// query validator

function queryValidate(){
    let isSelected = false;
    Array.from(queryOptions).some(item => {
       if (item.classList.contains("queryFocus")){
            isSelected = true
       } 
       
    });
    
  
    if(!isSelected){
        queryError.textContent = "This field is required";
        queryError.style.display = "block";
        queryOptions.forEach(queries => queries.style.border = "1px solid hsl(0, 66%, 54%)")
        return false;
    } else {
        queryError.textContent = "";
        queryError.style.display = "none";
        queryOptions.forEach(queries => queries.style.border = "1px solid hsl(186, 15%, 59%)")
        return true;
    }

}

//consentValidation

function consentValidate() {
    let isChecked = false;
    if (consentChecked.style.display === "inline-block"){
        isChecked = true;
    }
    if(!isChecked){
        consentError.textContent = "To submit this form, please consent to being contacted";
        consentError.style.display = "block" 
    } else {
        consentError.textContent = "";
        consentError.style.display = "none"
        return true;
    }
}