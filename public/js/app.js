console.log("Client Side JS Fichier est actif")

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if (data.error){
//             console.log(data.error)
//         }
//         else{
//             console.log(data.address)
//             console.log(data.weather)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = "Loading...Attendre s'il vous plait"
    messageTwo.textContent = ""
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error){
            messageOne.textContent = data.error
            messageTwo.textContent = ''
            console.log(data.error)
        }
        else{
            messageOne.textContent = data.address
            messageTwo.textContent = data.weather
            console.log(data.address)
            console.log(data.weather)
        }
    })
})
})