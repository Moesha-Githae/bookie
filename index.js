const bookContainer = document.getElementById('book-container');
const reviewContainer = document.getElementById('review-container');

// Fetch list of books from API
fetch('http://localhost:8000/books')
  .then(response => response.json())
  .then(books => {
    // Display list of books in book container
    const bookList = books.map(book => `<li>${book.title} by ${book.author}</li>`).join('');
    bookContainer.innerHTML = `<ul>${bookList}</ul>`;
  })
  .catch(error => {
    console.error('Error fetching books:', error);
  });

// Add event listener to submit review button
const submitReviewBtn = document.getElementById('submit-review-btn');
submitReviewBtn.addEventListener('click', () => {
  // Get input values from review container
  const bookTitle = document.getElementById('book-title').value;
  const bookAuthor = document.getElementById('book-author').value;
  const reviewerName = document.getElementById('reviewer-name').value;
  const reviewText = document.getElementById('review-text').value;

  // Send POST request to API to add new review
  fetch('http://localhost:8000/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: bookTitle,
      author: bookAuthor,
      reviews: [
        {
          reviewerName,
          review: reviewText
        }
      ]
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add review');
      }
      // Clear input fields and display success message
      document.getElementById('book-title').value = '';
      document.getElementById('book-author').value = '';
      document.getElementById('reviewer-name').value = '';
      document.getElementById('review-text').value = '';
      reviewContainer.innerHTML = '<p>Review submitted successfully!</p>';
    })
    .catch(error => {
      console.error('Error adding review:', error);
      reviewContainer.innerHTML = '<p>Failed to submit review</p>';
    });
});
