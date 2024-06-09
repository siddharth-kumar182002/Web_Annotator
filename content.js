let currentMode = null;
let currentColor = '#FFFF00';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'setMode') {
    currentMode = request.mode;
    currentColor = request.color || '#FFFF00';
    alert(`Tool selected: ${currentMode}`);
  }
});

document.addEventListener('mouseup', () => {
  if (currentMode === 'highlight') {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      const span = document.createElement('span');
      span.className = 'highlight';
      span.style.backgroundColor = currentColor;
      span.textContent = selectedText;
      span.dataset.id = generateId();
      span.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        deleteAnnotation(span.dataset.id);
        span.remove();
      });

      const range = window.getSelection().getRangeAt(0);
      range.deleteContents();
      range.insertNode(span);

      chrome.runtime.sendMessage({
        action: 'saveAnnotation',
        annotation: {
          id: span.dataset.id,
          text: selectedText,
          note: '',
          color: currentColor,
          date: new Date().toISOString(),
          url: window.location.href
        }
      });

      resetMode();
    }
  }
});

document.addEventListener('click', (event) => {
  if (currentMode === 'note') {
    const noteText = prompt('Enter your note:');
    if (noteText) {
      const noteDiv = document.createElement('div');
      noteDiv.className = 'note';
      noteDiv.style.position = 'absolute';
      noteDiv.style.left = `${event.pageX}px`;
      noteDiv.style.top = `${event.pageY}px`;
      noteDiv.style.backgroundColor = '#FFFACD';
      noteDiv.style.border = '1px solid #000';
      noteDiv.style.padding = '5px';
      noteDiv.style.zIndex = '1000';
      noteDiv.textContent = noteText;
      noteDiv.dataset.id = generateId();
      noteDiv.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        deleteAnnotation(noteDiv.dataset.id);
        noteDiv.remove();
      });

      document.body.appendChild(noteDiv);

      chrome.runtime.sendMessage({
        action: 'saveAnnotation',
        annotation: {
          id: noteDiv.dataset.id,
          text: '',
          note: noteText,
          color: '',
          position: { x: event.pageX, y: event.pageY },
          date: new Date().toISOString(),
          url: window.location.href
        }
      });

      resetMode();
    }
  }
});

window.onload = () => {
  chrome.storage.sync.get('annotations', (data) => {
    const annotations = data.annotations || [];
    const currentUrl = window.location.href;
    annotations.forEach(annotation => {
      if (annotation.url === currentUrl) {
        applyAnnotation(annotation);
      }
    });
  });
};

function applyAnnotation(annotation) {
  if (annotation.text) {
    const range = document.createRange();
    const selection = window.getSelection();
    selection.removeAllRanges();
    const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let currentNode;
    while (currentNode = textNodes.nextNode()) {
      const index = currentNode.nodeValue.indexOf(annotation.text);
      if (index !== -1) {
        range.setStart(currentNode, index);
        range.setEnd(currentNode, index + annotation.text.length);
        const span = document.createElement('span');
        span.className = 'highlight';
        span.style.backgroundColor = annotation.color;
        span.textContent = annotation.text;
        span.dataset.id = annotation.id;
        span.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          deleteAnnotation(span.dataset.id);
          span.remove();
        });
        range.deleteContents();
        range.insertNode(span);
        break;
      }
    }
  } else if (annotation.note) {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';
    noteDiv.style.position = 'absolute';
    noteDiv.style.left = `${annotation.position.x}px`;
    noteDiv.style.top = `${annotation.position.y}px`;
    noteDiv.style.backgroundColor = '#FFFACD';
    noteDiv.style.border = '1px solid #000';
    noteDiv.style.padding = '5px';
    noteDiv.style.zIndex = '1000';
    noteDiv.textContent = annotation.note;
    noteDiv.dataset.id = annotation.id;
    noteDiv.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      deleteAnnotation(noteDiv.dataset.id);
      noteDiv.remove();
    });

    document.body.appendChild(noteDiv);
  }
}

function resetMode() {
  currentMode = null;
  alert('Mode reset. You can now interact with the page normally.');
}

function deleteAnnotation(id) {
  chrome.runtime.sendMessage({
    action: 'deleteAnnotation',
    id: id
  });
}

function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
