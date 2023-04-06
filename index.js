const addReviewBtn = document.querySelector('#add-review-btn');
const bookTitleInput = document.querySelector('#book-title');
const bookAuthorInput = document.querySelector('#Book-Author');
const reviewNameInput = document.querySelector('#review-name');
const reviewTextInput = document.querySelector('#review-text');
const searchBox = document.querySelector('#search-box');
const searchBtn = document.querySelector('#search-btn');
const reviewList = document.querySelector('#review-list');

fetch("http://localhost:8000/reviews"
)
.then (response => response.json())
.then(dt => newdata(dt))


function newdata(dt){
    dt.forEach(function(data){
        const container=document.getElementById('review-container')
        const card=document.createElement('div')
        card.id='reviewdetails'
    const author=document.createElement('p')
    author.innerHTML=`author name:${data.author}`
   card.appendChild(author)
    
    const title=document.createElement('p')
    title.innerHTML=`Book Title:${data.title}`
    card.appendChild(title)
    
    const reviewname=document.createElement('p')
    reviewname.innerHTML=`Reveiwer Name:${data.reviewname}`
    card.appendChild(reviewname)
    
    const review=document.createElement('p')
    review.innerHTML=`review:${data.reviewtext}`
    card.appendChild(review)
    
container.appendChild(card)
    })}

    
addReviewBtn.addEventListener("click", function(e) {
    e.preventDefault()
    
    const reviewdata = {
      author: bookAuthorInput.value,
      title: bookTitleInput.value,
      reviewname: reviewNameInput.value,
      reviewtext: reviewTextInput.value
    };
  
    fetch("http://localhost:8000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reviewdata)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));      
  }
  );
