// Listen for form submit
document.querySelector('form')?.addEventListener('submit', (e) => {
  // Prevent the form from submitting (page reload) submit is handled by JS
  e.preventDefault();

  // Get the form data
  const formData = new FormData(e.target as HTMLFormElement);

  // Parse the form data
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // Send a request to the server to send an email with the form data
  fetch('http://localhost:3000/api/sendmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      email: email,
      message: message,
    }),
  });
});

export {};
