$(function(){
    const KEY = 'aitucrticProfile';
    let profile = JSON.parse(localStorage.getItem(KEY)) || {
      username: 'hotc-4',
      joined: 'May 2025',
      avatar: '',
      ratings: [],
      watchlist: [],
      lists: [],
      reviews: []
    };
  
    function save() {
      localStorage.setItem(KEY, JSON.stringify(profile));
    }
  
    function renderProfile() {
      $('#usernameDisplay').text(profile.username);
      $('#joinedDate').text('Joined ' + profile.joined);
      if(profile.avatar) {
        $('#profileAvatar').attr('src', profile.avatar);
      }
    }
  
    function renderList(list, countSel, ulSel, formatItem) {
      $(countSel).text('(' + list.length + ')');
      const $ul = $(ulSel).empty();
      list.forEach((item, i) => {
        const $li = $('<li>')
          .addClass('list-group-item')
          .html(formatItem(item));
        const $del = $('<button>')
          .addClass('btn btn-sm btn-outline-light')
          .text('Delete')
          .click(() => {
            list.splice(i, 1);
            save();
            renderAll();
          });
        $li.append($del);
        $ul.append($li);
      });
    }
  
    function renderAll() {
      renderProfile();
      renderList(
        profile.ratings,
        '#ratingsCount',
        '#ratingsList',
        it => `${it.movie} – ${it.score}/10`
      );
      renderList(
        profile.watchlist,
        '#watchlistCount',
        '#watchlistList',
        it => it
      );
      renderList(
        profile.lists,
        '#listsCount',
        '#listsList',
        it => it.title
      );
      renderList(
        profile.reviews,
        '#reviewsCount',
        '#reviewsList',
        it => `${it.movie} – ${it.score}/10<br><small>${it.text}</small>`
      );
    }
  
    // Avatar upload
    $('#changeAvatarBtn').click(() => $('#avatarInput').click());
    $('#avatarInput').change(e => {
      const file = e.target.files[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        profile.avatar = reader.result;
        save();
        renderProfile();
      };
      reader.readAsDataURL(file);
    });
  
    // Name edit
    $('#editNameBtn').click(() => {
      const name = prompt('Enter new username:', profile.username);
      if(name) {
        profile.username = name;
        save();
        renderProfile();
      }
    });
  
    // Add Rating
    $('#addRatingBtn').click(() => {
      const movie = prompt('Movie title:');
      const score = prompt('Rating (1–10):');
      if(movie && score) {
        profile.ratings.push({ movie, score });
        save();
        renderAll();
      }
    });
  
    // Add to Watchlist
    $('#addWatchlistBtn').click(() => {
      const movie = prompt('Movie title to add to watchlist:');
      if(movie) {
        profile.watchlist.push(movie);
        save();
        renderAll();
      }
    });
  
    // Create List
    $('#addListBtn').click(() => {
      const title = prompt('New list title:');
      if(title) {
        profile.lists.push({ title, items: [] });
        save();
        renderAll();
      }
    });
  
    // Add Review
    $('#addReviewBtn').click(() => {
      const movie = prompt('Movie title:');
      const score = prompt('Rating (1–10):');
      const text  = prompt('Your review:');
      if(movie && score && text) {
        profile.reviews.push({ movie, score, text });
        save();
        renderAll();
      }
    });
  
    renderAll();
  });

// …all your existing $(function(){…}) code above…

// === AUTH-LINK SWAP FOR PROFILE PAGE dropdown ===
;(function(){
  console.log('▶ authSwap running on profile');  // for debug

  const user   = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const authLi = document.getElementById('authLink');
  if (!user || !authLi) {
    console.log('no user or no authLi');
    return;
  }

  authLi.classList.add('dropdown');
  authLi.innerHTML = `
    <a class="nav-link dropdown-toggle" href="#" id="profileDropdown"
       role="button" data-bs-toggle="dropdown" aria-expanded="false">
      ${user.name}
    </a>
    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
      <li><a class="dropdown-item" href="profile.html">Your profile</a></li>
      <li><hr class="dropdown-divider"></li>
      <li>
        <a class="dropdown-item" id="signOutBtn" href="#">
          Sign out
        </a>
      </li>
    </ul>
  `;

  document
    .getElementById('signOutBtn')
    .addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      window.location.href = 'login.html';
    });
})();  // ← this closes the IIFE; no extra “)” here
