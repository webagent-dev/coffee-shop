
function getDocument () {
  // preloader
  const ui = new Ui()
  window.addEventListener('load', () => {
    ui.hidePreloader()
  })
  // navBar
  document.querySelector('.nav-btn').addEventListener('click', () => {
    ui.hideNavBar()
  })
  // videoBtn
  document.querySelector('.btn-switch').addEventListener('click', () => {
    ui.videoControl()
  })

  // form validation
  const form = document.querySelector('.drink-form')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = form.name.value
    const lastName = form.lastname.value
    const email = form.email.value
    const value = ui.validate(name, lastName, email)
    if (value) {
      const customer = new Customer(name, lastName, email)
      ui.addCustomer(customer)
      ui.emptyValue('You are Added Sucessfully', 'sucess')
      ui.resetForm()
    } else {
      ui.emptyValue('Some Form Field Are Empty', 'error')
    }
  })
  // model section
  const links = document.querySelectorAll('.work-icon')
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      ui.showModel()
    })
  })

  // hide Model
  document.querySelector('.model-close')
    .addEventListener('click', () => {
      ui.deleteModel()
    })
}

function Ui () {

}
// preloader
Ui.prototype.hidePreloader = function () {
  document.querySelector('.preloader').style.display = 'none'
}
// navBar
Ui.prototype.hideNavBar = function () {
  document.querySelector('.group').classList.toggle('show-nav')
}
// video control
Ui.prototype.videoControl = function () {
  const btn = document.querySelector('.btn-switch')
  if (!btn.classList.contains('slideBtn')) {
    btn.classList.add('slideBtn')
    document.querySelector('.main-video').pause()
  } else {
    btn.classList.remove('slideBtn')
    document.querySelector('.main-video').play()
  }
}
// Validate
Ui.prototype.validate = function (name, lastName, email) {
  let result
  if (name === '' || lastName === '' || email === '') {
    result = false
  } else {
    result = true
  }
  return result
}
// emptyValue
Ui.prototype.emptyValue = function (text, type) {
  const feedBack = document.querySelector('.drink-feedback')
  if (type === 'sucess') {
    feedBack.innerHTML = text
    feedBack.classList.add('sucess')
    this.removeFeedBack('sucess')
  } else if (type === 'error') {
    feedBack.innerHTML = text
    feedBack.classList.add('error')
    this.removeFeedBack('error')
  }
}
// removeFeedback
Ui.prototype.removeFeedBack = function (type) {
  setTimeout(function () {
    document.querySelector('.drink-feedback').classList.remove(type)
  }, 3000)
}
Ui.prototype.addCustomer = function (customer) {
  const image = [1, 2, 3, 4, 5, 6]
  const random = Math.floor(Math.random() * image.length)
  const newEl = document.createElement('div')
  newEl.classList.add('person')
  newEl.innerHTML = `<img src="../image/person-${random}.jpg" alt="img" 
  class="person-image">
   <h4 class="person-name">${customer.name}</h4>
   <h3 class="last-name">${customer.lastName}</h3>`
  document.querySelector('.drink-list')
    .append(newEl)
}
// reset form
Ui.prototype.resetForm = function () {
  const form = document.querySelector('.drink-form')
  form.name.value = ''
  form.lastname.value = ''
  form.email.value = ''
}

// show model
Ui.prototype.showModel = function (e) {
  if (e.target.parentElement.contains('work-icon')) {
    const id = e.target.parentElement.dataset.id

    document.querySelector('.work-model')
      .classList.add('work-model-show')
    document.querySelector('.work-model-item')
      .style.backgroundImage = `url(../image/work-${id}.jpg)`
  }
}

// hide model
Ui.prototype.hideModel = function () {
  document.querySelector('.work-model')
    .classList.remove('work-model-show')
}
getDocument()

function Customer (name, lastName, email) {
  this.name = name
  this.lastName = lastName
  this.email = email
}
