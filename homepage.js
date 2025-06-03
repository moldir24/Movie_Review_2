document.addEventListener("DOMContentLoaded", () => {
  const siteName = "AituCritic";
  const el = document.getElementById("visitCountDisplay");

  let visits = parseInt(localStorage.getItem("visitCount") || "0", 10);
  visits++;
  localStorage.setItem("visitCount", visits);
  el.textContent = `${siteName} visit #${visits} — Enjoy!`;
});


document.addEventListener("DOMContentLoaded", () => {
  const banner = document.querySelector(".banner"); 

  if (banner) {
      const slidesContainer = banner.querySelector(".slides");
      const slides = Array.from(banner.querySelectorAll(".slide"));
      const prevArrow = banner.querySelector(".banner-arrow.left");
      const nextArrow = banner.querySelector(".banner-arrow.right");
      let currentIndex = 0;

      if (slidesContainer && slides.length > 0 && prevArrow && nextArrow) {
          const totalSlides = slides.length;
          slidesContainer.style.width = `${100 * totalSlides}%`;

          function updateBannerSlides() {
              slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

              slides.forEach((slide, index) => {
                  if (index === currentIndex) {
                      slide.classList.add('active');
                  } else {
                      slide.classList.remove('active');
                  }
              });
          }

          prevArrow.addEventListener("click", () => {
              currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
              updateBannerSlides();
          });

          nextArrow.addEventListener("click", () => {
              currentIndex = (currentIndex + 1) % totalSlides;
              updateBannerSlides();
          });

          if (totalSlides < 2) {
              prevArrow.style.display = "none";
              nextArrow.style.display = "none";
          }

          updateBannerSlides(); 
      } else {
      }
  } else {
  }
});

function toggleTheme() {
  document.body.classList.toggle('light');
  const icon = document.getElementById('theme-icon');
  const isLight = document.body.classList.contains('light');
  icon.src = isLight ? 'img/icon1.png' : 'img/icon2.png';
}
  
    // ----- Scroll Movies -----
    const movieSections = document.querySelectorAll('.movies-container');
  
    movieSections.forEach(section => {
      const leftArrow = section.querySelector('.movies-arrow.left');
      const rightArrow = section.querySelector('.movies-arrow.right');
      const grid = section.querySelector('.movies-grid');
  
      leftArrow.addEventListener('click', () => {
        grid.scrollBy({
          left: -grid.clientWidth,
          behavior: 'smooth'
        });
      });
  
      rightArrow.addEventListener('click', () => {
        grid.scrollBy({
          left: grid.clientWidth,
          behavior: 'smooth'
        });
      });
    });
  
  
  document.querySelectorAll('.watchlist-btn').forEach(button => {
    button.addEventListener('click', () => {
      const movie = {
        title: button.dataset.title,
        image: button.dataset.image,
        rating: button.dataset.rating,
        runtime: button.dataset.runtime
      };
  
      const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  
      const alreadyExists = watchlist.some(item => item.title === movie.title);
      if (!alreadyExists) {
        watchlist.push(movie);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        alert(`${movie.title} added to your Watchlist!`);
      } else {
        alert(`${movie.title} is already in your Watchlist.`);
      }
    });
  });

window.addEventListener('load', () => {
  setTimeout(() => {
    const gFrame = document.querySelector('.goog-te-banner-frame.skiptranslate');
    if (gFrame) {
      gFrame.parentNode.removeChild(gFrame);
    }
    document.body.style.top = '0px';
  }, 100);
});


// Banner slider
;(function(){
  const $slides      = $(".slide");
  const $container   = $(".slides");
  let   currentIndex = 0;
  const totalSlides  = $slides.length;

  function goTo(idx) {
    $container.css("transform", `translateX(-${idx * 100}%)`);
  }

  $(".banner-arrow.left").on("click", () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    goTo(currentIndex);
  });

  $(".banner-arrow.right").on("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    goTo(currentIndex);
  });
})();


document.querySelectorAll('.trailer-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const url = btn.getAttribute('data-trailer-url');
    document.getElementById('trailerIframe').src = url;
 
    const modal = new bootstrap.Modal(document.getElementById('trailerModal'));
    modal.show();
  });
});

// only wire up the trailer‐modal if it exists
const trailerModalEl = document.getElementById('trailerModal');
if (trailerModalEl) {
  trailerModalEl.addEventListener('hidden.bs.modal', () => {
    const iframe = document.getElementById('trailerIframe');
    if (iframe) iframe.src = '';
  });
}


;(function(){
  function updateAuthLink() {
    const user   = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const authLi = document.getElementById('authLink');
    if (!authLi) return;
    if (user) {
      authLi.classList.add('dropdown');
      authLi.innerHTML = `
        <a class="nav-link dropdown-toggle" href="#" id="profileDropdown"
           role="button" data-bs-toggle="dropdown" aria-expanded="false">
          ${user.name}
        </a>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
          <li>
            <a class="dropdown-item" href="profile.html">
              Your profile
            </a>
          </li>
          <li><hr class="dropdown-divider"></li>
          <li>
            <a class="dropdown-item" href="#" id="signOutBtn">
              Sign out
            </a>
          </li>
        </ul>
      `;
      document.getElementById('signOutBtn').addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
      });
    } else {
      authLi.classList.remove('dropdown');
      authLi.innerHTML = `
        <a class="nav-link" href="login.html">
          Login/Signup
        </a>
      `;
    }
  }

  // Run on DOM ready or immediately if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateAuthLink);
  } else {
    updateAuthLink();
  }
})();
