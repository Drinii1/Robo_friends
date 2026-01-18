
const searchInput = document.querySelector('#searchInput');
const citySelect = document.querySelector('#citySelect');
const usersContainer = document.querySelector('#usersContainer');
const statusText = document.querySelector('#statusText');

const modalOverlay = document.getElementById('modalOverlay');
const modal = document.getElementById('modal');
const buttonModal = document.getElementById('closeModal');
const modalContent = document.getElementById('modalContent');

let users = [];

const cities = [
  'Gwenborough',
  'Wisokyburgh',
  'McKenziehaven',
  'South Elvis',
  'Roscoeview',
  'South Christy',
  'Howemouth',
  'Aliyaview',
  'Bartholomebury',
  'Lebsackbury'
];

const loadUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();

  users = data;
  buildCityDropdown();
  renderUsers(users);
};

const buildCityDropdown = () => {
  cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });
};

const renderPosts = async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  const posts = await response.json();

  const postiContainer = document.getElementById('posts');
  postiContainer.innerHTML = posts.slice(0, 3).map(post=> `<p> ${post.title}</p>`).join('');
};

const renderUsers = (list) => {
  usersContainer.innerHTML = '';

  list.forEach(user => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="https://robohash.org/${user.id}?set=set1&size=180x180" />
      <h3>${user.name}</h3>
      <p>${user.address.city}</p>
    `;

    card.addEventListener('click', () => {
      modalContent.innerHTML = `
        <strong>Infos:</strong><br><br><strong>Email:</strong> ${user.email}<br><strong>Username:</strong> ${user.username}<br><strong>Address:</strong> ${user.address.street}<br>
        <strong>Phone:</strong> ${user.phone}<br><strong>Website:</strong> ${user.website}<br><br><strong>Posts:</strong><div id="posts">Loading posts...</div>
      `;

      modalOverlay.style.display = 'flex';
      renderPosts(user.id);
    });

    usersContainer.appendChild(card);
  });

  statusText.textContent = `Showing ${list.length} of ${users.length} users.`;
};

buttonModal.addEventListener('click', () => {
  modalOverlay.style.display = 'none';
});

const applyFilters = () => {
  const searchValue = searchInput.value.toLowerCase();
  const selectedCity = citySelect.value;

  let filteredUsers = users;

  if (searchValue) {
    filteredUsers = filteredUsers.filter(user =>
      user.name.toLowerCase().includes(searchValue)
    );
  }

  if (selectedCity !== 'all') {
    filteredUsers = filteredUsers.filter(user =>
      user.address.city === selectedCity
    );
  }

  renderUsers(filteredUsers);
};

searchInput.addEventListener('input', applyFilters);
citySelect.addEventListener('change', applyFilters);

loadUsers();