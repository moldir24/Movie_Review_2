document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("watchlistContainer");
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  
    if (watchlist.length === 0) {
      container.innerHTML = "<p>Your watchlist is empty.</p>";
      return;
    }
  
    watchlist.forEach(movie => {
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
        <img src="${movie.img}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <div class="movie-meta">
          <span class="rating">${movie.rating}</span>
          <span class="runtime">${movie.runtime}</span>
        </div>
      `;
      container.appendChild(card);
    });
  });
  