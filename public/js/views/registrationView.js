(function () {
  let registrationContainer;

  function showRegistration() {
    if (typeof window === 'object') {
      const RegistrationForm = window.RegistrationForm1;
      document.body.classList.add('body-registration');
      const registrationForm = new RegistrationForm1();
      registrationContainer = document.querySelector('.registration');
      registrationContainer.appendChild(registrationForm.render());
      registrationContainer.style.display = 'inline'; 
    }
  }

  function nextStepRegistration() {
    if (typeof window === 'object') {
      registrationContainer.innerHTML = '';
      const RegistrationForm = window.RegistrationForm2;
      const registrationForm = new RegistrationForm2();
      registrationContainer.appendChild(registrationForm.render());
    }
  }

  function hideRegistration() {
    document.body.classList.remove('body-registration');
    registrationContainer.innerHTML = '';
    registrationContainer.setAttribute('hidden','hidden');
  }

  window.showRegistration = showRegistration;
  window.nextStepRegistration = nextStepRegistration;
  window.hideRegistration = hideRegistration;
}());
