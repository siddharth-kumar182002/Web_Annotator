document.addEventListener('DOMContentLoaded', () => {
    const highlightColorInput = document.getElementById('highlightColor');
    const saveButton = document.getElementById('save');
  
    chrome.storage.sync.get('highlightColor', (data) => {
      highlightColorInput.value = data.highlightColor || '#FFFF00';
    });
  
    saveButton.addEventListener('click', () => {
      const highlightColor = highlightColorInput.value;
      chrome.storage.sync.set({ highlightColor }, () => {
        alert('Settings saved!');
      });
    });
  });
  