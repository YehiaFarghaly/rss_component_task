const postsWrapper = document.querySelector('.posts-wrapper');
const loader = document.querySelector('.loader');

let currentPage = 1;
let isLoading = false;

async function fetchPosts(page = 1, limit = 10) {
  isLoading = true;
  loader.hidden = false;

  try {
    const response = await fetch(`http://localhost:3000/posts?page=${page}&limit=${limit}`);
    const data = await response.json();

    data.posts.forEach(post => {
      const postCard = document.createElement('div');
      postCard.classList.add('post-card');

      postCard.innerHTML = `
        <img src="${post.imageUrl}" alt="${post.title}">
        <h3>${post.title}</h3>
        <p>${post.description}</p>
        <span>Posted on: ${post.date}</span>
      `;

      postsWrapper.appendChild(postCard);
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
  } finally {
    isLoading = false;
    loader.hidden = true;
  }
}

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
    currentPage++;
    fetchPosts(currentPage);
  }
});

fetchPosts();
