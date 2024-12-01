
document.addEventListener('DOMContentLoaded', function () {
    const toggleZoom = document.getElementById('toggleZoom');
    const toggleLabel = document.getElementById('toggleLabel');

    chrome.storage.local.get('zoomEnabled', function (data) {
        toggleZoom.checked = data.zoomEnabled || false;
        toggleLabel.textContent = toggleZoom.checked ? 'Active' : 'Deactive';
    });

    toggleZoom.addEventListener('change', () => {
        const isEnabled = toggleZoom.checked;
        chrome.storage.local.set({ zoomEnabled: isEnabled });
        toggleLabel.textContent = isEnabled ? 'Active' : 'Deactive';

        chrome.tabs.query({}, (tabs) => {
            for (let tab of tabs) {
                if (tab.url && !tab.url.startsWith('chrome://')) {
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        function: setZoom,
                        args: [isEnabled]
                    });
                }
            }
        });
    });
});

function setZoom(isEnabled) {
    if (isEnabled) {
        document.querySelectorAll('img, video').forEach(media => {
            media.classList.add('zoomable');
        });
    } else {
        document.querySelectorAll('img.zoomable, video.zoomable').forEach(media => {
            media.classList.remove('zoomable');
        });
    }
}
