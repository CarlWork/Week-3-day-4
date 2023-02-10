



console.log('connected')

const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')
const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('section')

const baseURL = 'http://localhost:4000'

function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}

function clearCharacters() {
  charContainer.innerHTML = ``
}

const getAllCharacters = evt => {
  clearCharacters()
  axios.get(baseURL + '/characters')
  .then((response) => {
    let = {data} = response
    console.log(data)
    data.forEach(charObj => createCharacterCard(charObj))
  })
    .catch(err => console.log(err))
}

getAllBtn.addEventListener('click', getAllCharacters)

const getCharAge = evt => {
  evt.preventDefault()
  clearCharacters()
  let age = ageInput.value
  axios.get(baseURL + `/character?age=${age}`)
  .then(response => {
    console.log(response.data)
    response.data.forEach(charObj => createCharacterCard(charObj))
  })
  .catch(err => console.log(err))
}

const getCharacter = evt => {
  clearCharacters()
  console.log(evt.target)
  let charName = evt.target.id
  axios.get(baseURL + `/character/${charName}`)
  .then(response => {
    console.log(response.data)
    createCharacterCard(response.data)
  })
  .catch(err => console.log(err))
}

const createNewChar = evt => {
  evt.preventDefault()
    clearCharacters()
    let newChar = {
      firstName: newFirstInput.value,
      lastName: newLastInput.value,
      gender: newGenderDropDown.value,
      age: newAgeInput.value,
      likes: newLikesText.value.split(',')
    }
    axios.post(baseURL + '/character', newChar)
    .then(response => {
      console.log(response.data)
      let {data} = response
      data.forEach(charObj => createCharacterCard(charObj))
    })
    .catch(err => console.log(err))
}


for(let i = 0; i < charBtns.length; i++){
  charBtns[i].addEventListener('click', getCharacter)
}


createForm.addEventListener('submit', createNewChar)

ageForm.addEventListener('submit', getCharAge)

