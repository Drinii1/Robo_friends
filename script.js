const searchInput = document.querySelector('#searchInput');
const citySelect = document.querySelector('#citySelect');
const usersContainer = document.querySelector('#usersContainer');
const statusText = document.querySelector('#statusText');

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

    usersContainer.appendChild(card);
  });

  statusText.textContent = `Showing ${list.length} of ${users.length} users.`;
};

const applyFilters = () => {
  const searchValue = searchInput.value.toLowerCase();
  const selectedCity = citySelect.value;

  const filteredUsers = users.filter(user => {
    const matchesName = user.name.toLowerCase().includes(searchValue);
    const matchesCity =
      selectedCity === 'all' || user.address.city === selectedCity;

    return matchesName && matchesCity;
  });

  renderUsers(filteredUsers);
};

searchInput.addEventListener('input', applyFilters);
citySelect.addEventListener('change', applyFilters);

loadUsers()