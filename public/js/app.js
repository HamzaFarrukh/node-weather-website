const weatherForm = document.querySelector('form') // storing form in a variable
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()  // prevent page from refreshing so that below log line stays on log.

    const location = search.value
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => { //localhost URL or Heroku URL followed by query string
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }
        else {
            messageOne.textContent = data.Temperature + "°C " + data.Description
            messageTwo.textContent = data.Location
        }
    })
})
})