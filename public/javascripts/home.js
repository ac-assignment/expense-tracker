const form = document.querySelector('#home form')
const categorySelect = document.getElementById('category')

categorySelect.addEventListener('change', function() {
  form.submit()
})
