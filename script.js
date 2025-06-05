 const chatMessages = document.getElementById('chatMessages');
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        const clearBtn = document.getElementById('clearBtn');
        const themeBtn = document.getElementById('themeBtn');
        
        let isTyping = false;
        let currentTheme = 'light';
        
        // Enhanced responses
        const responses = {
            greetings: [
                "Hello there! 👋 I'm ARIA, your friendly AI assistant. How can I brighten your day?",
                "Hi! 🌟 Great to meet you! What would you like to chat about?",
                "Hey! 😊 I'm here and ready to help. What's on your mind?",
                "Greetings! ✨ I'm ARIA, and I'm excited to assist you today!"
            ],
            howAreYou: [
                "I'm functioning perfectly and feeling fantastic! 🚀 Thanks for asking. How are you doing?",
                "I'm doing wonderfully! 💫 Every conversation energizes me. How about you?",
                "Excellent! 🌈 I'm always in a great mood when I get to help people. How's your day going?"
            ],
            jokes: [
                "Why don't scientists trust atoms? Because they make up everything! 😄",
                "I told my computer a joke about UDP... but I'm not sure if it got it! 🤓",
                "Why did the AI go to therapy? It had too many deep learning issues! 🤖",
                "What do you call a programmer from Finland? Nerdic! 😂",
                "Why do programmers prefer dark mode? Because light attracts bugs! 🐛"
            ],
            capabilities: [
                "I'm quite versatile! 🎯 I can chat, tell jokes, answer questions, help with ideas, and engage in conversations. What interests you?",
                "Great question! 🤔 I can assist with conversations, problem-solving, jokes, explanations, and much more!",
                "I have many talents! ✨ From casual chats to helping with topics, telling stories, or being a friendly companion."
            ],
            help: [
                "I'm here to help! 🤝 You can ask me questions, request jokes, have conversations, or just chat. What do you need?",
                "Absolutely! 💪 I can help with information, creative tasks, or just be a friendly chat companion.",
                "Of course! 🌟 Whether you need answers, want to brainstorm, or need cheering up - I'm here!"
            ],
            funFacts: [
                "🌟 Fun fact: Honey never spoils! Archaeologists have found 3,000-year-old honey that's still edible!",
                "🐙 Amazing fact: Octopuses have three hearts and blue blood!",
                "🌍 Cool fact: There are more possible chess games than atoms in the observable universe!",
                "🦋 Beautiful fact: Butterflies taste with their feet!",
                "⭐ Space fact: A day on Venus is longer than its year!"
            ],
            goodbye: [
                "Goodbye! 👋 It was wonderful chatting with you. Come back anytime!",
                "See you later! 🌟 Thanks for the great conversation!",
                "Farewell! ✨ Until next time, take care!",
                "Bye for now! 😊 Have a fantastic day!"
            ],
            default: [
                "That's interesting! 🤔 Could you tell me more about that?",
                "I find that fascinating! 💫 What else would you like to discuss?",
                "Hmm, that's intriguing! 🌟 I'd love to hear more of your thoughts.",
                "That's cool! 💡 What else can I help you with?"
            ]
        };
        
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            for (let i = 0; i < 15; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
                particlesContainer.appendChild(particle);
            }
        }
        
        function addMessage(content, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
            messageDiv.textContent = content;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        function showTypingIndicator() {
            if (isTyping) return;
            isTyping = true;
            
            const typingDiv = document.createElement('div');
            typingDiv.className = 'typing-indicator';
            typingDiv.id = 'typingIndicator';
            typingDiv.innerHTML = `
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            `;
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        function hideTypingIndicator() {
            const typingIndicator = document.getElementById('typingIndicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
            isTyping = false;
        }
        
        function getRandomResponse(category) {
            const categoryResponses = responses[category];
            return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
        }
        
        function processMessage(input) {
            const message = input.toLowerCase().trim();
            
            // Clear welcome message
            const welcomeMsg = document.querySelector('.welcome-message');
            if (welcomeMsg) {
                welcomeMsg.remove();
            }
            
            if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
                return getRandomResponse('greetings');
            } else if (message.includes('how are you')) {
                return getRandomResponse('howAreYou');
            } else if (message.includes('joke') || message.includes('funny')) {
                return getRandomResponse('jokes');
            } else if (message.includes('what can you do') || message.includes('help me')) {
                return getRandomResponse('capabilities');
            } else if (message.includes('help')) {
                return getRandomResponse('help');
            } else if (message.includes('fun fact') || message.includes('fact')) {
                return getRandomResponse('funFacts');
            } else if (message.includes('bye') || message.includes('goodbye')) {
                return getRandomResponse('goodbye');
            } else if (message.includes('thank')) {
                return "You're absolutely welcome! 😊 Anything else I can help with?";
            } else if (message.includes('your name') || message.includes('who are you')) {
                return "I'm ARIA AI! 🤖 Your Advanced Responsive Interactive Assistant!";
            } else if (message.includes('time')) {
                const now = new Date();
                return `It's currently ${now.toLocaleTimeString()}! ⏰ Time flies when having great conversations!`;
            } else if (message.includes('weather')) {
                return "I wish I could check the weather! 🌤️ Hope it's beautiful where you are!";
            } else if (message.includes('love')) {
                return "Aww, that's so sweet! 💕 You're making my AI heart happy!";
            } else {
                return getRandomResponse('default');
            }
        }
        
        function sendMessage() {
            const input = chatInput.value.trim();
            if (!input) return;
            
            addMessage(input, true);
            chatInput.value = '';
            
            showTypingIndicator();
            
            setTimeout(() => {
                hideTypingIndicator();
                const response = processMessage(input);
                addMessage(response);
            }, Math.random() * 1000 + 800);
        }
        
        function sendSuggestion(text) {
            chatInput.value = text;
            sendMessage();
        }
        
        function clearChat() {
            chatMessages.innerHTML = `
                <div class="welcome-message">
                    <div class="welcome-title">Chat Cleared! 🧹</div>
                    <p>Ready for a fresh conversation!</p>
                    <div class="suggestion-chips">
                        <div class="chip" onclick="sendSuggestion('Tell me a joke')">😄 Tell me a joke</div>
                        <div class="chip" onclick="sendSuggestion('What can you do?')">🤖 What can you do?</div>
                        <div class="chip" onclick="sendSuggestion('Help me')">💡 Help me</div>
                        <div class="chip" onclick="sendSuggestion('Fun fact')">🌟 Fun fact</div>
                    </div>
                </div>
            `;
        }
        
        function toggleTheme() {
            const container = document.getElementById('chatContainer');
            const messages = document.getElementById('chatMessages');
            
            if (currentTheme === 'light') {
                container.style.background = 'rgba(31, 41, 55, 0.95)';
                messages.style.background = 'linear-gradient(to bottom, #374151, #1f2937)';
                currentTheme = 'dark';
            } else {
                container.style.background = 'rgba(255, 255, 255, 0.95)';
                messages.style.background = 'linear-gradient(to bottom, #f8fafc, #e2e8f0)';
                currentTheme = 'light';
            }
        }
        
        // Event listeners
        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        clearBtn.addEventListener('click', clearChat);
        themeBtn.addEventListener('click', toggleTheme);
        
        // Initialize
        createParticles();
        chatInput.focus();
        
        // Make sendSuggestion globally available
        window.sendSuggestion = sendSuggestion;