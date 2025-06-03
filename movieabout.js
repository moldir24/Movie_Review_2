document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM fully loaded — movieabout.js running");

  // UI elements
  const reviewForm    = document.querySelector('.add-review form');
  const reviewName    = document.getElementById('reviewName');
  const reviewText    = document.getElementById('reviewText');
  const reviewsSection= document.querySelector('.reviews');
  const ratingContainer = document.getElementById('reviewRating');
  let selectedRating  = 0;

  // Load stored reviews 
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

  // 2. Function to render a single review object into the DOM
  function renderReview({ name, text, rating }) {
    const article = document.createElement('article');
    article.className = 'card bg-dark text-white mb-3';

    const cardBody  = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h6');
    cardTitle.className = 'card-title';
    cardTitle.textContent = name + ' ';

    const ratingSpan = document.createElement('span');
    ratingSpan.className = 'text-warning';

    // stars rating 
    let starsHtml = '';
    for (let i = 1; i <= rating; i++)   starsHtml += '&#9733;';
    for (let i = rating + 1; i <= 5; i++) starsHtml += '&#9734;';
    ratingSpan.innerHTML = starsHtml;
    cardTitle.appendChild(ratingSpan);

    const cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.textContent = text;

    cardBody.append(cardTitle, cardText);
    article.appendChild(cardBody);

    // Insert right after the “Reviews” heading
    const reviewsHeading = reviewsSection.querySelector('h5');
    reviewsSection.insertBefore(article, reviewsHeading.nextSibling);
  }

  // 3. Render all stored reviews on page load
  reviews.forEach(renderReview);

  // ★ Star-rating click handler
  ratingContainer.addEventListener('click', function(e) {
    if (!e.target.classList.contains('star')) return;
    selectedRating = +e.target.dataset.value;
    // update visuals
    ratingContainer.querySelectorAll('.star').forEach(star => {
      star.classList.toggle('selected', +star.dataset.value <= selectedRating);
    });
  });


// sound
const reviewSound = new Audio('images/clicksound.mp3');
reviewSound.preload = 'auto';

reviewForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Play the “send review” sound
  reviewSound.currentTime = 0;
  reviewSound.play();

  const name = reviewName.value.trim();
  const text = reviewText.value.trim();
  if (!name || !text) {
    return alert("Please fill in both your name and review.");
  }
  if (selectedRating === 0) {
    return alert("Please choose a rating.");
  }

  // Build + save + render review 
  const newReview = { name, text, rating: selectedRating };
  reviews.unshift(newReview);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  renderReview(newReview);

  // Reset form + stars
  reviewForm.reset();
  selectedRating = 0;
  ratingContainer.querySelectorAll('.star')
                 .forEach(s => s.classList.remove('selected'));
});
});

document.addEventListener('DOMContentLoaded', () => {
  const reviewsContainer = document.querySelector('.reviews');
  const reviewCards      = Array.from(reviewsContainer.querySelectorAll('.card'));
  const perPage          = 5;
  let   currentPage      = 1;
  const totalPages       = Math.ceil(reviewCards.length / perPage);
  const paginationEl     = document.getElementById('reviewsPagination');

  function renderPage(page) {
    const start = (page - 1) * perPage;
    reviewCards.forEach((card, i) => {
      card.style.display = (i >= start && i < start + perPage) ? 'block' : 'none';
    });
  }

  function buildPagination() {
    paginationEl.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement('li');
      li.className = 'page-item' + (i === currentPage ? ' active' : '');
      const a = document.createElement('a');
      a.className = 'page-link';
      a.href = '#';
      a.textContent = i;
      a.addEventListener('click', e => {
        e.preventDefault();
        currentPage = i;
        renderPage(currentPage);
        updateActive();
      });
      li.appendChild(a);
      paginationEl.appendChild(li);
    }
  }

  function updateActive() {
    Array.from(paginationEl.children).forEach((li, idx) => {
      li.classList.toggle('active', idx + 1 === currentPage);
    });
  }

  // only show pagination if more than one page
  if (totalPages > 1) {
    renderPage(currentPage);
    buildPagination();
  }
});
