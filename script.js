

// get forms
const form = document.forms[0];

const inputElem = form.elements.namedItem('name');

// get container list friends
const listFriends = document.getElementById('list-friends');



//// Functions

function saveFriend(event) {
  // prevent
  event.preventDefault();

  // get value form input user
  const nameFriend = inputElem.value;

  let friend = {
    name: nameFriend, 
  };

  // Store
  addStore(friend);

  // Add to ui
  addToUi()

  // log
  console.log(inputElem);
}


function addToUi() {

  // get data from localStorage
  const getNames = JSON.parse(localStorage.getItem('friends'));

  if(listFriends.innerHTML == '' && getNames.length === 0 || getNames.length == null) {
    const pictEmpty = document.createElement('div');
    pictEmpty.className = 'row';
    pictEmpty.innerHTML = `
    <div class="col-12 col-sm-8 col-md-7 col-lg-5 mx-auto">
      <img src="wait.svg" class="img-fluid">
    </div>`;

    listFriends.append(pictEmpty);
  } else {

    // gunanya untuk reset ketika manggil ulang
    listFriends.innerHTML = '';

    getNames.forEach((item, i) => {

      // create elem
      let newli = document.createElement('li');
      // add class
      newli.className = 'list-group-item text-capitalize d-flex justify-content-between align-items-center';
      newli.innerHTML =  `${item.name} <button type="button" class="btn btn-danger btn-sm ms-5" id="btn-hapus">Hapus</button>`;

      listFriends.append(newli);

    })
  }
  

  
  

  console.log(listFriends.innerHTML);
}


function addStore(data) {
  if(localStorage.getItem('friends') === null) {

    let friends = [];
    friends.push(data);

    localStorage.setItem('friends', JSON.stringify(friends));
  }else {
    
    let friends = JSON.parse(localStorage.getItem('friends'));

    friends.push(data);

    localStorage.setItem('friends', JSON.stringify(friends));
  }
}


function deleteFriends(event) {
  
  if(event.target.id === 'btn-hapus') {
    
    let data = event.target.parentElement.firstChild.textContent.trim();

    deleteFriend(data);
    
    // call ui
    addToUi();
    
  }


  // console.log();

}

function deleteFriend(data) {

  // get data from localStorage
  const getNames = JSON.parse(localStorage.getItem('friends'));

  getNames.forEach((item, i) => {

    if(data == item.name) {

      getNames.splice(i, 1);

      localStorage.setItem("friends", JSON.stringify(getNames));

    }

  })

  // call add ui
  addToUi();

  // log
  // console.log(getNames);

}


function removeDisabled(event) {
  const btnAdd = document.getElementById('btn-add');
 
  if(form.elements.namedItem('name').value === "") {
    btnAdd.disabled = true;
  } else {
    btnAdd.disabled = false;
    btnAdd.style.cursor = "";
    document.querySelector('.button-field').style.cursor = "";
  }

  // log
  // console.log(document.querySelector('.button-field'));
}



/// events

document.addEventListener("DOMContentLoaded", addToUi);

form.addEventListener('submit', saveFriend);

inputElem.addEventListener('keyup', removeDisabled);

listFriends.addEventListener('click', deleteFriends)




