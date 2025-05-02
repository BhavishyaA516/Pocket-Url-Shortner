document.addEventListener('DOMContentLoaded', () => {
    const shortenBtn = document.getElementById('shortenBtn');
    const urlInput = document.getElementById('urlInput');
    const resultDiv = document.getElementById('result');
    const shortUrl = document.getElementById('shortUrl');
    const copyBtn = document.getElementById('copyBtn');
    const message = document.getElementById('message');
    const spinner = document.getElementById('spinner');

    shortenBtn.addEventListener('click', async () => {
        const longUrl = urlInput.value.trim();
        if (!longUrl) {
            showMessage('Please enter a URL.', 'error');
            return;
        }

        spinner.classList.remove('hidden');
        resultDiv.classList.add('hidden');
        message.classList.add('hidden');

        try {
            const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
            const shortLink = await response.text();

            if (shortLink.startsWith('http')) {
                shortUrl.href = shortLink;
                shortUrl.textContent = shortLink;
                resultDiv.classList.remove('hidden');
                showMessage('URL successfully shortened!', 'success');
            } else {
                showMessage('Failed to shorten URL. Try again.', 'error');
            }
        } catch (error) {
            console.error(error);
            showMessage('An unexpected error occurred.', 'error');
        } finally {
            spinner.classList.add('hidden');
        }
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(shortUrl.href)
            .then(() => showMessage('Short URL copied to clipboard!', 'success'))
            .catch(err => {
                console.error(err);
                showMessage('Failed to copy the URL.', 'error');
            });
    });

    function showMessage(text, type) {
        message.textContent = text;
        message.className = `message ${type}`;
        message.classList.remove('hidden');
        setTimeout(() => {
            message.classList.add('hidden');
        }, 3000);
    }
});
