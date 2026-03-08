const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

const API_URL = '/api/v1/chat/invoke';

// Auto-resize textarea
userInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight < 200 ? this.scrollHeight : 200) + 'px';
    if (this.value.trim() === '') {
        sendBtn.disabled = true;
    } else {
        sendBtn.disabled = false;
    }
});

// Submit on Enter (not shift+enter)
userInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatForm.dispatchEvent(new Event('submit'));
    }
});

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = userInput.value.trim();
    if (!text) return;

    // Reset input
    userInput.value = '';
    userInput.style.height = 'auto';
    sendBtn.disabled = true;

    // Add user message to UI
    appendMessage(text, 'user');

    // Show typing indicator
    const typingId = showTypingIndicator();

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                input: { question: text }
            })
        });

        const data = await response.json();
        removeTypingIndicator(typingId);

        if (response.ok && data.output) {
            appendMessage(data.output, 'system');
        } else {
            appendMessage("I apologize, but I'm having trouble connecting to my brain right now. Please ensure the backend server is running and try again.", 'system', true);
        }
    } catch (error) {
        removeTypingIndicator(typingId);
        appendMessage("Connection Lost: I'm currently offline. Please start the backend server to resume our conversation.", 'system', true);
    }
});

function appendMessage(text, sender, isError = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}-message`;

    // Parse Markdown basic (Code Blocks, Inline Code, Newlines)
    let formattedText = escapeHtml(text);

    // Multi-line code blocks
    formattedText = formattedText.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    // Inline code
    formattedText = formattedText.replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.1);padding:3px 6px;border-radius:4px;font-family:monospace;font-size:0.9em;">$1</code>');
    // Bold
    formattedText = formattedText.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    formattedText = formattedText.replace(/\n/g, '<br>');

    if (isError) {
        formattedText = `<span style="color: #ff4d4f;">${formattedText}</span>`;
    }

    const iconStr = sender === 'user' ? '<i class="ph ph-user"></i>' : '<i class="ph ph-sparkle"></i>';

    msgDiv.innerHTML = `
        <div class="avatar">${iconStr}</div>
        <div class="message-content">${formattedText}</div>
    `;

    chatBox.appendChild(msgDiv);
    scrollToBottom();
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function showTypingIndicator() {
    const id = 'typing-' + Date.now();
    const msgDiv = document.createElement('div');
    msgDiv.className = `message system-message`;
    msgDiv.id = id;

    msgDiv.innerHTML = `
        <div class="avatar"><i class="ph ph-sparkle"></i></div>
        <div class="message-content">
            <div class="typing-indicator">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
    `;

    chatBox.appendChild(msgDiv);
    scrollToBottom();
    return id;
}

function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

function scrollToBottom() {
    chatBox.scrollTo({
        top: chatBox.scrollHeight,
        behavior: 'smooth'
    });
}
