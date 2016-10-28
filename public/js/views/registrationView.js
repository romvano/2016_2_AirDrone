(function () {
  const RegistrationForm1 = window.RegistrationForm1;
  const RegistrationForm2 = window.RegistrationForm2;

  function showRegistration() {
    if (typeof window === 'object') {
      document.body.classList.add('body-registration');
      const registrationForm = new RegistrationForm1();
      let registrationContainer = document.querySelector('.registration');
      registrationContainer.appendChild(registrationForm.render());
      registrationContainer.style.display = 'inline';
    }
  }

  function nextStepRegistration() {
    if (typeof window === 'object') {
      let registrationContainer = document.querySelector('.registration');
      registrationContainer.innerHTML = '';
      const registrationForm = new RegistrationForm2();
      registrationContainer.appendChild(registrationForm.render());
    }
  }

  function hideRegistration() {
    document.body.classList.remove('body-registration');
    let registrationContainer = document.querySelector('.registration');
    registrationContainer.innerHTML = '';
    registrationContainer.style.display = 'none';
  }

  window.showRegistration = showRegistration;
  window.nextStepRegistration = nextStepRegistration;
  window.hideRegistration = hideRegistration;
}());
