// import FormValidator from "./form-validator.js";
document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');

  const toggleFade = (span) => {
    span.classList.toggle('faded-out');
    return span;
  };

  function appendError(label, message) {
    const span = document.createElement('span');
    span.className = 'faded-out';
    span.textContent = message;
    label.classList.toggle('error');
    label.appendChild(span);
    setTimeout(toggleFade.bind(null, span), 200)
  }

  function showError(field) {
    let message;
    if (field.validity.valueMissing) {
      let labelText = field.closest('label').getAttribute('aria-label')
      message = `${labelText} cannot be empty`;
    }
    if (field.validity.patternMismatch) {
      message = 'Looks like this is not an email';
    }
    appendError(field.parentElement, message);
  }

  form.addEventListener('focus', ({target}) => {
    let parent = target.parentElement;
    if (!parent.classList.contains('error')) return;
    parent.classList.toggle('error');
    toggleFade(parent.querySelector('span')).remove();
  }, true)

  form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (this.checkValidity()) {
        return alert('Thank You!')
      }
      [...this.elements]
        .filter(el => el.tagName === 'INPUT' && !el.checkValidity()).forEach(showError)
    }
  )
  ;

})