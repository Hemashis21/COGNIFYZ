(() => {
  const loadBtn = document.getElementById('loadBtn');
  const postsContainer = document.getElementById('posts');

  async function fetchPosts() {
    postsContainer.innerHTML = ''; 
    loadBtn.disabled = true;
    loadBtn.textContent = 'Loading...';
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const posts = await response.json();
      renderPosts(posts);
    } catch (error) {
      showError(error.message);
    } finally {
      loadBtn.disabled = false;
      loadBtn.textContent = 'Load Posts';
    }
  }

  function renderPosts(posts) {
    if (!posts.length) {
      postsContainer.innerHTML = '<p>No posts found.</p>';
      return;
    }
    posts.forEach(post => {
      const postEl = document.createElement('article');
      postEl.className = 'post';
      postEl.innerHTML = `
        <h2>${escapeHtml(post.title)}</h2>
        <p>${escapeHtml(post.body)}</p>
      `;
      postsContainer.appendChild(postEl);
    });
  }

  function showError(msg) {
    postsContainer.innerHTML = `<p class="error">Error loading posts: ${escapeHtml(msg)}</p>`;
  }


  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  loadBtn.addEventListener('click', fetchPosts);
})();
