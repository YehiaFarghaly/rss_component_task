const postsWrapper = document.querySelector('.posts-wrapper');

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 12;
const SCROLLED_SPACE = 100;
const BASE_URI = 'http://localhost:3000';
let currentPage = 1;
let isLoading = false;
let lastPage;


async function fetchPosts(page = DEFAULT_PAGE, limit = DEFAULT_PAGE_SIZE) {
  isLoading = true;

  try {
    for (let i = 0; i < DEFAULT_PAGE_SIZE; i++) {
      const postCard = document.createElement('div');
      postCard.classList.add('skeleton-post-card', 'animation');
      
      const skeletonH3 = document.createElement('h3');
      postCard.appendChild(skeletonH3);

      const skeletonImg = document.createElement('img');
      postCard.appendChild(skeletonImg);

      const skeletonDate = document.createElement('span');
      postCard.appendChild(skeletonDate);

      const skeletonDescription = document.createElement('p');
      postCard.appendChild(skeletonDescription);

      postsWrapper.appendChild(postCard);
    }


    const response = await fetch(`${BASE_URI}/posts?page=${page}&limit=${limit}`);
    const data = await response.json();
    lastPage = data.totalPages;
    const childElements = postsWrapper.children;

    for (let i = childElements.length - 1; i >= 0; i--) {
      const child = childElements[i];
      if (child.classList.contains('skeleton-post-card')) {
        postsWrapper.removeChild(child);
      }
    }


    data.posts.forEach(post => {
      const postCard = document.createElement('div');
      postCard.classList.add('post-card');

      postCard.innerHTML = `
        <h3>${post.title}</h3>
        <img src="${post.image}" alt="${post.title}">
        <p>${post.description}</p>
        <span>Posted on: ${post.date.substring(0, 10)}</span> <p>  ${post.timeToRead} read time</p> 
      `;

      postCard.addEventListener('click', () => {
        window.open(post.src, '_blank');
      })
      postsWrapper.appendChild(postCard);
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
  } finally {
    isLoading = false;
  }
}


window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - SCROLLED_SPACE && !isLoading && currentPage < lastPage) {
    currentPage++;
    fetchPosts(currentPage);
  }
});

fetchPosts();
