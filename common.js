// Shared helpers used across PDFforBiz tool pages
function formatSize(bytes){
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024*1024) return (bytes/1024).toFixed(0) + ' KB';
  return (bytes/(1024*1024)).toFixed(1) + ' MB';
}

function setupDropzone(zoneEl, inputEl, onFiles){
  zoneEl.addEventListener('click', () => inputEl.click());
  inputEl.addEventListener('change', e => { onFiles(e.target.files); inputEl.value = ''; });
  ['dragover','dragenter'].forEach(evt =>
    zoneEl.addEventListener(evt, e => { e.preventDefault(); zoneEl.classList.add('drag'); })
  );
  ['dragleave','drop'].forEach(evt =>
    zoneEl.addEventListener(evt, e => { e.preventDefault(); zoneEl.classList.remove('drag'); })
  );
  zoneEl.addEventListener('drop', e => {
    e.preventDefault();
    zoneEl.classList.remove('drag');
    onFiles(e.dataTransfer.files);
  });
}

function downloadBlob(blob, filename){
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
