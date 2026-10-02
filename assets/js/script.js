const burgerBtn = document.getElementById('burgerBtn');
const mainNav = document.getElementById('mainNav');

burgerBtn.addEventListener('click', () => {
  mainNav.classList.toggle('is-open');
});

// Menü schließen, sobald ein Link geklickt wird
const navLinks = mainNav.querySelectorAll('a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
  });
});

// Kontaktformular: Anfrage per Web3Forms als E-Mail verschicken
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = contactForm.querySelector('button[type="submit"]');
    button.disabled = true;
    formStatus.className = 'form-status';
    formStatus.textContent = 'Wird gesendet …';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(contactForm)
      });
      const result = await response.json();

      if (result.success) {
        formStatus.classList.add('is-success');
        formStatus.textContent = 'Vielen Dank! Ihre Anfrage ist bei uns eingegangen.';
        contactForm.reset();
      } else {
        formStatus.classList.add('is-error');
        formStatus.textContent = 'Das hat leider nicht geklappt. Bitte rufen Sie uns an.';
      }
    } catch (error) {
      formStatus.classList.add('is-error');
      formStatus.textContent = 'Keine Verbindung. Bitte versuchen Sie es später noch einmal.';
    } finally {
      button.disabled = false;
    }
  });
}
