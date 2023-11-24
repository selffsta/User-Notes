document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const signupEmail = document.getElementById('signupEmail');
    const signupPassword = document.getElementById('signupPassword');
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
  
    // Check if there are saved credentials in local storage
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
  
    // Show login form if there are stored credentials, otherwise show signup form
    if (storedEmail && storedPassword) {
      loginForm.classList.remove('hidden');
      signupForm.classList.add('hidden');
    } else {
      loginForm.classList.add('hidden');
      signupForm.classList.remove('hidden');
    }
  
    // Event listener for signup form submission
    signupForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const email = signupEmail.value;
      const password = signupPassword.value;
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      loginForm.classList.remove('hidden');
      signupForm.classList.add('hidden');
    });
  
    // Event listener for login form submission
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const enteredEmail = loginEmail.value;
      const enteredPassword = loginPassword.value;
      if (enteredEmail === storedEmail && enteredPassword === storedPassword) {
        alert('Login successful!');
        // Redirect to another page or perform other actions after successful login
      } else {
        alert('Invalid email or password!');
      }
    });
  
    const createButton = document.getElementById('createButton');
    const savedNotesButton = document.getElementById('savedNotesButton');
    const createNotesForm = document.getElementById('createNotesForm');
    const savedNotesList = document.getElementById('savedNotesList');
    const notesList = document.getElementById('notesList');
    const noteContentDisplay = document.getElementById('noteContentDisplay');
    const saveNoteButton = document.getElementById('saveNoteButton');
    const noteNameInput = document.getElementById('noteName');
    const noteContentInput = document.getElementById('noteContent');
    const selectedNoteContent = document.getElementById('selectedNoteContent');
  
    createButton.addEventListener('click', function () {
      createNotesForm.classList.remove('hidden');
      savedNotesList.classList.add('hidden');
      noteContentDisplay.classList.add('hidden');
    });
  
    savedNotesButton.addEventListener('click', function () {
      createNotesForm.classList.add('hidden');
      savedNotesList.classList.remove('hidden');
      noteContentDisplay.classList.add('hidden');
      // Fetch saved notes from localStorage
      renderSavedNotes();
    });
  
    saveNoteButton.addEventListener('click', function () {
      const noteName = noteNameInput.value;
      const noteContent = noteContentInput.value;
      if (noteName && noteContent) {
        localStorage.setItem(noteName, noteContent);
        noteNameInput.value = '';
        noteContentInput.value = '';
        createNotesForm.classList.add('hidden');
        savedNotesList.classList.remove('hidden');
        renderSavedNotes();
      } else {
        alert('Please enter both note name and content.');
      }
    });
  
    function renderSavedNotes() {
      notesList.innerHTML = '';
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = key;
        link.href = '#';
        link.dataset.fileName = key;
        link.addEventListener('click', function (event) {
          event.preventDefault();
          const fileName = event.target.dataset.fileName;
          const fileContent = localStorage.getItem(fileName);
          selectedNoteContent.textContent = fileContent;
          noteContentDisplay.classList.remove('hidden');
        });
        listItem.appendChild(link);
        notesList.appendChild(listItem);
      }
    }
  });
  
