const inputcontainer = document.getElementById("inputcontainer")
const countdownform = document.getElementById("countdownform")
const dateEl = document.getElementById("date")

const countdownEl = document.getElementById("countdown")
const countdownElTitle = document.getElementById("countdown-title")
const countdownBtn = document.getElementById("countdown-button")
const timeElements = document.querySelectorAll("span")

const completeEL = document.getElementById("complete")
const completeELInfo = document.getElementById("complete-info")
const completeBtn = document.getElementById("complete-button")

let countdownTitle = ''
let countdownDate = ''
let countdownValue = Date
let countdownActive;
// local storage
let savedCountdown

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24



// Today's date
const today = new Date().toISOString().split("T")[0]
// Prevent user from choosing date in the past
dateEl.setAttribute("min", today)



// Populating countdown and completing UI
function updateDom() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime()
    const distance = countdownValue - now
    
    console.log("distnace:", distance)

    // update distance to days, hours, minutes and seconds
    const days = Math.floor(distance / day)
    const hours = Math.floor((distance % day) / hour)
    const minutes = Math.floor((distance % hour) / minute)
    const seconds = Math.floor((distance % minute) / second)

    console.log(days, hours, minutes, seconds)

    // hide input
    inputcontainer.hidden = true

    // show complete screen once countdown is finished
    if (distance < 0) {
        countdownEl.hidden = true
        clearInterval(countdownActive)
        completeELInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
        completeEL.hidden = false
    } else {
        // show countdown in progress
        countdownElTitle.textContent = `${countdownTitle}`
        timeElements[0].textContent = `${days}`
        timeElements[1].textContent = `${hours}`
        timeElements[2].textContent = `${minutes}`
        timeElements[3].textContent = `${seconds}`

        completeEL.hidden = true
        countdownEl.hidden = false
    }
  }, second)
}
 


// Take values from form input
function updateCountdown(e) {
    e.preventDefault()
    countdownTitle = e.srcElement[0].value
    countdownDate = e.srcElement[1].value



// Local storage
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    } 
    console.log(savedCountdown)
    localStorage.setItem("countdown", JSON.stringify(savedCountdown))

    console.log(countdownTitle, countdownDate)

    // checking date is valid
    if (countdownDate === '') {
        alert("Please select a date")
    } else {
        // Numerical data of current date
    countdownValue = new Date(countdownDate).getTime()
    console.log("countdown value:", countdownValue)

    updateDom()
    }  
}



// reset button
function reset() {
    // hide countdown and show inputs
    countdownEl.hidden = true
    completeEL.hidden = true
    inputcontainer.hidden = false
    // stop countdown
    clearInterval(countdownActive)
    // reset values
    countdownTitle = ''
    countdownDate = ''
}



// restore countdown data
function restorePreviousCountdown() {
    if (localStorage.getItem("countdown")) {
        inputcontainer.hidden = true
        savedCountdown = JSON.parse(localStorage.getItem("countdown"))
        countdownTitle = savedCountdown.title
        countdownDate = savedCountdown.date
        countdownValue = new Date(countdownDate).getTime()
        updateDom()
    }
}



// Event Listeners
countdownform.addEventListener("submit", updateCountdown)
countdownBtn.addEventListener("click", reset)
completeBtn.addEventListener("click", reset)



// check local storage on load
restorePreviousCountdown()