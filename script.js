// Function to load groups and links from localStorage
function loadGroups() {
  const groups = JSON.parse(localStorage.getItem('tabGroups')) || {};
  const groupsContainer = document.getElementById('groups-container');
  groupsContainer.innerHTML = ''; // Clear the current content

  // Display groups
  for (const [group, links] of Object.entries(groups)) {
    const groupDiv = document.createElement('div');
    groupDiv.classList.add('group');
    const header = document.createElement('h3');
    header.textContent = group;
    groupDiv.appendChild(header);

    links.forEach((link) => {
      const linkElement = document.createElement('a');
      linkElement.href = link.url;
      linkElement.target = '_blank';
      linkElement.textContent = link.title || link.url;
      groupDiv.appendChild(linkElement);
    });

    groupsContainer.appendChild(groupDiv);
  }
}

// Function to add a new link to a group
document.getElementById('add-link').addEventListener('click', () => {
  const url = document.getElementById('new-link-url').value.trim();
  const group = document.getElementById('new-link-group').value.trim();

  if (url && group) {
    // Get current groups from localStorage
    const groups = JSON.parse(localStorage.getItem('tabGroups')) || {};

    // Create a new group if it doesn't exist
    if (!groups[group]) {
      groups[group] = [];
    }

    // Add the new link to the group
    groups[group].push({ url, title: getTitleFromUrl(url) });

    // Save the updated groups to localStorage
    localStorage.setItem('tabGroups', JSON.stringify(groups));

    // Clear input fields
    document.getElementById('new-link-url').value = '';
    document.getElementById('new-link-group').value = '';

    // Reload groups display
    loadGroups();
  }
});

// Function to extract the title from a URL
function getTitleFromUrl(url) {
  const link = document.createElement('a');
  link.href = url;
  return link.hostname;
}

// Initial load of groups
loadGroups();
