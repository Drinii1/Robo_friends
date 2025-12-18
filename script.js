const nameFilter = document.querySelector('#input_container')
const cityFilter  = document.querySelector('#citySelector')
const boxes = document.querySelector('#section_container')

let users =[]

const  loadUsers = async () =>{
    const response = await fetch('https://jsonplaceholder.typicode.com/users/');

    const data = await response.json();

    usersList = data
    renderUsers(data)

}

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
const renderUsers = (users) =>{
    
}