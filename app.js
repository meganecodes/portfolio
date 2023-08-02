


// Image slider
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildren = [...carousel.children];

let isDragging = false, startX, startScrollLeft, timeoutId; //"startX, startScrollLeft" - cards are sliding according to the direction

// Getting the number of card that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// inserts copy of last cards to beginning for infinite scrolling
carouselChildren.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
})


// inserts copy of first cards to beginning for infinite scrolling
carouselChildren.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
})



// arrow buttons to scroll left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
})

const dragStart = (e) => {
    isDragging = true;
    /* Disable text being selected when dragging */
    carousel.classList.add("dragging");
    // records cursor and scroll position of carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return; //if dragging is false return
    // updates scroll position of carousel
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;

    carousel.classList.remove("dragging");
}


// make slider auto play on desktop
const autoPlay = () => {
    if(window.innerWidth < 800) return;
    // auto play after every 2500ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

const infiniteScroll = () => {
    // scrolls to the end if at the beginning
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft =carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    } 
    // scrolls to the beginning if at the end
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
// clears timeout and starts autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

   
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
// stop cards from sliding when mouse is released
document.addEventListener("mouseup", dragStop);
// loop on slider so it's an infinite scroll
carousel.addEventListener("scroll", infiniteScroll);
// slider continues to autoplay when you stop hovering over carousel
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);






// NAV ACTIVE SCROLL - attempt 1
/*const sections = document.querySelectorAll("section[id]");

// add event listener 
window.addEventListener("scroll", navHighlighter);
function navHighlighter() {

    // Get current scroll position
    let scrollY = window.pageYOffset; */
    
      // Loop through sections to get height, top and ID values for each
        /*sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute("id");
        /*
    - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
    - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
    */

    /*
    if (
        scrollY > sectionTop &&
        scrollY <= sectionTop + sectionHeight
      ){
        document.querySelector(".navbar a[href*=" + sectionId + "]").classList.add("active");
    } else {
      document.querySelector(".navbar a[href*=" + sectionId + "]").classList.remove("active");
    }
  });
}


*/


// NAV ACTIVE SCROLL - attempt 2
/*let sections = document.querySelectorAll('main section')
let navLinks = document.querySelectorAll('header nav a')

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY
        let offset = sec.offsetTop - 550
        let height = sec.offsetHeight
        let id = sec.getAttribute('id')

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active')
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active')
            })
        }
    })
}
*/
      





