const searchInput = document.querySelector('#searchInput');
const citySelect = document.querySelector('#citySelect');
const usersContainer = document.querySelector('#usersContainer');
const statusText = document.querySelector('#statusText');

const modalOverlay = document.getElementById('modalOverlay')

const modal = document.getElementById('modal')

const buttonModal = document.getElementById('closeModal')

const modalContent = document.getElementById('modalContent')

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

  const newAPI = async(userId) => {
    const newResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    const newData = await newResponse.json()
    newUsers = newData

}

  

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
    card.addEventListener('click',() => {
      modalContent.innerHTML = `<strong>Infos:</strong> <br>  <br> <strong>Email:</strong>${user.email} <br>
     <strong> Username:</strong>${user.username}  <br> <strong>Address:</strong>${user.address.street} <br> <strong>Phone Number:</strong>${user.phone}  <br> <strong>Website</strong>:${user.website}
      

      `
      
            modalOverlay.style.display = 'flex'
          
            newAPI(user.id)
    })
  });

  statusText.textContent = `Showing ${list.length} of ${users.length} users.`;
};


buttonModal.addEventListener('click', () => {
    modalOverlay.style.display = 'none'

});
// const modalChange = () => {
//     modal.innerHTML = modalOverlay
//      buttonModal.innerHtml = modalOverlay

//      modalContent.innerHTML = `Email:${user.email}`
// }







const applyFilters = () => {
  const searchValue = searchInput.value.toLowerCase();
  const selectedCity = citySelect.value;

  // const filteredUsers = users.filter(user => {
  //   const matchesName = user.name.toLowerCase().includes(searchValue);
  //   const matchesCity =
  //     selectedCity === 'all' || user.address.city === selectedCity;

  //   return matchesName && matchesCity;
  // });
  let filteredUsers = users
  if(searchInput){
    filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(searchValue))
  }
  
  

  
  if(selectedCity !== 'all' ){
   
      filteredUsers = filteredUsers.filter(user => user.address.city === selectedCity)
  }
  renderUsers(filteredUsers);
};



searchInput.addEventListener('input', applyFilters);
citySelect.addEventListener('change', applyFilters);



loadUsers()