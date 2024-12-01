
chrome.storage.local.get('zoomEnabled', function (data) {
    if (data.zoomEnabled) {
        document.querySelectorAll('img, video').forEach(media => {
            media.classList.add('zoomable');
        });
    }
});

document.addEventListener('mouseover', function (e) {
    if (e.target.classList.contains('zoomable')) {
        if (e.target.tagName === 'IMG') {
            showImagePreview(e.target);
        } else if (e.target.tagName === 'VIDEO') {
            showVideoPreview(e.target);
        }
    }
});

document.addEventListener('mouseout', function (e) {
    if (e.target.classList.contains('zoomable')) {
        hidePreview();
    }
});

function showImagePreview(img) {
    hidePreview(); // Önceki önizlemeyi kaldır
    const preview = document.createElement('div');
    preview.className = 'media-preview';

    const clonedImg = img.cloneNode();
    clonedImg.style.width = '100%';
    clonedImg.style.height = '100%';
    clonedImg.style.objectFit = 'contain';
    clonedImg.style.transition = 'transform 0.3s ease';

    preview.appendChild(clonedImg);
    document.body.appendChild(preview);

    const rect = img.getBoundingClientRect();
    const scaleFactor = Math.min(1.5, window.innerWidth / rect.width, window.innerHeight / rect.height);
    preview.style.top = `${Math.max(0, rect.top + window.scrollY)}px`;
    preview.style.left = `${Math.max(0, rect.left + window.scrollX)}px`;
    preview.style.width = `${rect.width * scaleFactor}px`;
    preview.style.height = `${rect.height * scaleFactor}px`;
    preview.style.zIndex = '10000';

    setTimeout(() => {
        clonedImg.style.transform = 'scale(1.1)';
    }, 0);
}

function showVideoPreview(video) {
    hidePreview(); // Önceki önizlemeyi kaldır
    const preview = document.createElement('div');
    preview.className = 'media-preview';

    const clonedVideo = video.cloneNode(true);
    clonedVideo.style.width = '100%';
    clonedVideo.style.height = '100%';
    clonedVideo.style.objectFit = 'contain';
    clonedVideo.muted = true;
    clonedVideo.autoplay = true;
    clonedVideo.loop = true;
    clonedVideo.controls = false;

    preview.appendChild(clonedVideo);
    document.body.appendChild(preview);

    const rect = video.getBoundingClientRect();
    const scaleFactor = Math.min(1.5, window.innerWidth / rect.width, window.innerHeight / rect.height);
    preview.style.top = `${Math.max(0, rect.top + window.scrollY)}px`;
    preview.style.left = `${Math.max(0, rect.left + window.scrollX)}px`;
    preview.style.width = `${rect.width * scaleFactor}px`;
    preview.style.height = `${rect.height * scaleFactor}px`;
    preview.style.zIndex = '10000';
}

function hidePreview() {
    const preview = document.querySelector('.media-preview');
    if (preview) {
        preview.remove();
    }
}
