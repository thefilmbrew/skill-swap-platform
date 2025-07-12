// Save profile to localStorage
document.addEventListener('DOMContentLoaded', () => {
  const profileForm = document.getElementById('profile-form');
  const userList = document.getElementById('user-list');
  const requestList = document.getElementById('request-list');
  const search = document.getElementById('search');

  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const profile = {
        name: document.getElementById('name').value,
        skillsOffered: document.getElementById('skillsOffered').value.split(','),
        skillsWanted: document.getElementById('skillsWanted').value.split(','),
        availability: document.getElementById('availability').value
      };
      localStorage.setItem('myProfile', JSON.stringify(profile));
      alert('Profile saved!');
    });
  }

  if (userList) {
    const myProfile = JSON.parse(localStorage.getItem('myProfile')) || {};
    const users = JSON.parse(localStorage.getItem('users')) || [myProfile];
    localStorage.setItem('users', JSON.stringify(users));

    const displayUsers = (filter = '') => {
      userList.innerHTML = '';
      users.forEach((user, index) => {
        if (!user.name || (filter && !user.skillsOffered.join(',').toLowerCase().includes(filter.toLowerCase()))) return;
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Skills Offered:</strong> ${user.skillsOffered.join(', ')}</p>
          <p><strong>Skills Wanted:</strong> ${user.skillsWanted.join(', ')}</p>
          <p><strong>Availability:</strong> ${user.availability}</p>
          <button onclick="sendRequest(${index})">Request Swap</button>
        `;
        userList.appendChild(div);
      });
    };

    displayUsers();
    if (search) {
      search.addEventListener('input', () => {
        displayUsers(search.value);
      });
    }
  }

  if (requestList) {
    const requests = JSON.parse(localStorage.getItem('requests')) || [];
    requestList.innerHTML = requests.map((req, i) => `
      <div class="card">
        <p><strong>To:</strong> ${req.to}</p>
        <p><strong>Message:</strong> ${req.message}</p>
        <p><strong>Status:</strong> ${req.status}</p>
      </div>
    `).join('');
  }
});

function sendRequest(index) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const myProfile = JSON.parse(localStorage.getItem('myProfile')) || {};
  const requests = JSON.parse(localStorage.getItem('requests')) || [];
  const to = users[index].name;
  const message = `Hi ${to}, would you like to swap skills?`;
  requests.push({ to, from: myProfile.name, message, status: 'Pending' });
  localStorage.setItem('requests', JSON.stringify(requests));
  alert('Swap request sent!');
}