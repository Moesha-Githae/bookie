const bookContainer = document.getElementById("book-container");
const reviewsContainer = document.getElementById("reviews-container");

// Fetch books from API and display in list
fetch("http://localhost:8000/books")
  .then((response) => response.json())
  .then((books) => {
    const listItems = books.map((book) => `<li>${book.title}</li>`);
    bookContainer.innerHTML = `<ul>${listItems.join("")}</ul>`;
    
    // Add event listener to each book title to display reviews
    const bookTitles = document.querySelectorAll("#book-container li");
    bookTitles.forEach((title) => {
      title.addEventListener("click", () => {
        displayReviews(title.innerText);
      });
    });
  });

// Function to display reviews for selected book
function displayReviews(bookTitle) {
  fetch(`http://localhost:8000/reviews?book=${bookTitle}`)
    .then((response) => response.json())
    .then((reviews) => {
      const listItems = reviews.map((review) => `
        <li>
          <h4>${review.reviewerName}</h4>
          <p>${review.review}</p>
          <button class="delete-btn" data-reviewid="${review.id}">Delete</button>
          <div class="comments-container" data-reviewid="${review.id}">
            <h5>Comments:</h5>
          </div>
          <form class="comment-form" data-reviewid="${review.id}">
            <input type="text" placeholder="Name" required>
            <textarea placeholder="Comment" required></textarea>
            <button type="submit">Post Comment</button>
          </form>
        </li>
      `);
      reviewsContainer.innerHTML = `<h3>${bookTitle} Reviews:</h3><ul>${listItems.join("")}</ul>`;
      
      // Add event listener to delete review button
      const deleteBtns = document.querySelectorAll(".delete-btn");
      deleteBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const reviewId = btn.dataset.reviewid;
          deleteReview(reviewId);
        });
      });
      
      // Add event listener to comment form submission
      const commentForms = document.querySelectorAll(".comment-form");
      commentForms.forEach((form) => {
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          const reviewId = form.dataset.reviewid;
          const commenterName = form.querySelector("input").value;
          const comment = form.querySelector("textarea").value;
          postComment(reviewId, commenterName, comment);
          form.reset();
        });
      });
      
      // Display comments for each review
      const commentsContainers = document.querySelectorAll(".comments-container");
      commentsContainers.forEach((container) => {
        const reviewId = container.dataset.reviewid;
        displayComments(reviewId, container);
      });
    });
}

// Function to display comments for selected review
function displayComments(reviewId, container) {
  fetch(`http://localhost:8000/comments?reviewId=${reviewId}`)
    .then((response) => response.json())
    .then((comments) => {
      const listItems = comments.map((comment) => `
        <div>
          <h5>${comment.commenterName}</h5>
          <p>${comment.comment}</p>
          <button class="delete-btn" data-commentid="${comment.id}">Delete</button>
        </div>
      `);
      container.innerHTML += listItems.join("");
      
      // Add event listener to delete comment button
      const deleteBtns = container.querySelectorAll(".delete-btn");
      deleteBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const commentId = btn.dataset.commentid;
          deleteComment(commentId);
          btn.parentElement.remove();
        });
      });
    });
}
