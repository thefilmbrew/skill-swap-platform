
// Wait for DOM to load before using
document.addEventListener('DOMContentLoaded', function () {
  // Handle profile form submission
  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const offered = document.getElementById('skillsOffered').value.trim();
      const wanted = document.getElementById('skillsWanted').value.trim();
      const availability = document.getElementById('availability').value.trim();

      if (!name || !offered || !wanted || !availability) {
        alert("Please fill all fields.");
        return;
      }

      const profile = {
        name,
        offered,
        wanted,
        availability,
        timestamp: new Date().toISOString()
      };

      let profiles = JSON.parse(localStorage.getItem('profiles')) || [];
      profiles.push(profile);
      localStorage.setItem('profiles', JSON.stringify(profiles));

      alert('Profile saved successfully!');
      profileForm.reset();
    });
  }

  // Display profiles if on search/browse page
  const profileList = document.getElementById('profileList');
  if (profileList) {
    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];

    if (profiles.length === 0) {
      profileList.innerHTML = "<p>No profiles found. Please add some first.</p>";
    } else {
      profileList.innerHTML = "";
      profiles.forEach(profile => {
        const card = document.createElement('div');
        card.className = "profile-card";
        card.innerHTML = `
          <h3>${profile.name}</h3>
          <p><strong>Skills Offered:</strong> ${profile.offered}</p>
          <p><strong>Skills Wanted:</strong> ${profile.wanted}</p>
          <p><strong>Availability:</strong> ${profile.availability}</p>
        `;
        profileList.appendChild(card);
      });
    }
  }

  // Handle search by skill
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const keyword = searchInput.value.trim().toLowerCase();
      const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
      const filtered = profiles.filter(p =>
        p.offered.toLowerCase().includes(keyword) ||
        p.wanted.toLowerCase().includes(keyword)
      );

      const profileList = document.getElementById('profileList');
      profileList.innerHTML = "";
      if (filtered.length === 0) {
        profileList.innerHTML = "<p>No matching profiles found.</p>";
      } else {
        filtered.forEach(profile => {
          const card = document.createElement('div');
          card.className = "profile-card";
          card.innerHTML = `
            <h3>${profile.name}</h3>
            <p><strong>Skills Offered:</strong> ${profile.offered}</p>
            <p><strong>Skills Wanted:</strong> ${profile.wanted}</p>
            <p><strong>Availability:</strong> ${profile.availability}</p>
          `;
          profileList.appendChild(card);
        });
      }
    });
  }
});
