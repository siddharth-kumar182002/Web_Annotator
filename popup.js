document.addEventListener('DOMContentLoaded', () => {
  const annotationList = document.getElementById('annotationList');
  const searchInput = document.getElementById('search');
  const exportButton = document.getElementById('export');
  const importInput = document.getElementById('import');
  const highlightButton = document.getElementById('highlight');
  const noteButton = document.getElementById('note');
  const highlightColorInput = document.getElementById('highlightColor');

  chrome.storage.sync.get('annotations', (data) => {
    const annotations = data.annotations || [];
    displayAnnotations(annotations);
  });

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    chrome.storage.sync.get('annotations', (data) => {
      const annotations = data.annotations || [];
      const filteredAnnotations = annotations.filter(annotation =>
        annotation.text.toLowerCase().includes(query) ||
        annotation.note.toLowerCase().includes(query)
      );
      displayAnnotations(filteredAnnotations);
    });
  });

  exportButton.addEventListener('click', () => {
    chrome.storage.sync.get('annotations', (data) => {
      const blob = new Blob([JSON.stringify(data.annotations)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'annotations.json';
      a.click();
    });
  });

  importInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const annotations = JSON.parse(reader.result);
      chrome.storage.sync.set({ annotations }, () => {
        alert('Annotations imported!');
      });
    };
    reader.readAsText(file);
  });

  highlightButton.addEventListener('change', () => {
    chrome.runtime.sendMessage({
      action: 'setMode',
      mode: 'highlight',
      color: highlightColorInput.value
    });
  });

  noteButton.addEventListener('change', () => {
    chrome.runtime.sendMessage({ action: 'setMode', mode: 'note' });
  });

  function displayAnnotations(annotations) {
    annotationList.innerHTML = '';
    annotations.forEach(annotation => {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.textContent = `${annotation.text || annotation.note} (${annotation.date})`;
      annotationList.appendChild(li);
    });
  }
});
