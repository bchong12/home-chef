const input1 = document.getElementById('name')
const welcomeText = document.getElementById('welcome')
input1.addEventListener('submit', (e) => {
    e.preventDefault()
    localStorage.clear()
    if (e.target.elements.input.value === '') {
        localStorage.setItem('name', 'Anonymous')
    } else {
        localStorage.setItem('name', e.target.elements.input.value)
    }
    location.assign('index.html')
})
