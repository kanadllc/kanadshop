if (!customElements.get('predictive-search')) {
  customElements.define(
    'predictive-search',
    class PredictiveSearch extends HTMLElement {
      constructor() {
        super();
        this.input = this.querySelector('input[type="search"]');
        this.results = this.querySelector('[data-predictive-search]');
        if (!this.input || !this.results) return;

        this.input.addEventListener(
          'input',
          this.debounce((event) => {
            this.onInput(event);
          }, 250)
        );
        this.input.addEventListener('blur', () => {
          window.setTimeout(() => this.close(), 150);
        });
      }

      debounce(callback, wait) {
        let timeout;
        return (...args) => {
          window.clearTimeout(timeout);
          timeout = window.setTimeout(() => callback.apply(this, args), wait);
        };
      }

      onInput() {
        const searchTerm = this.input.value.trim();
        if (!searchTerm.length) {
          this.close();
          return;
        }

        const url = `${window.Shopify.routes.root}search/suggest?q=${encodeURIComponent(searchTerm)}&resources[type]=product,collection,page,article,query&resources[limit]=4&section_id=predictive-search`;

        fetch(url)
          .then((response) => {
            if (!response.ok) throw new Error(`${response.status}`);
            return response.text();
          })
          .then((markup) => {
            const documentFragment = new DOMParser().parseFromString(markup, 'text/html');
            const container = documentFragment.querySelector('#shopify-section-predictive-search');
            this.results.innerHTML = container ? container.innerHTML : '';
            this.input.setAttribute('aria-expanded', this.results.innerHTML.trim() ? 'true' : 'false');
            this.results.setAttribute(
              'aria-label',
              this.results.innerHTML.trim()
                ? window.accessibilityStrings?.predictiveSearchResults || 'Search results loaded'
                : window.accessibilityStrings?.predictiveSearchNoResults || 'No search results found'
            );
          })
          .catch(() => {
            this.close();
          });
      }

      close() {
        this.results.innerHTML = '';
        this.input.setAttribute('aria-expanded', 'false');
      }
    }
  );
}

if (!customElements.get('localization-form')) {
  customElements.define(
    'localization-form',
    class LocalizationForm extends HTMLElement {
      constructor() {
        this.onDocumentClick = this.onDocumentClick.bind(this);
        this.onEscape = this.onEscape.bind(this);
        super();
        this.querySelectorAll('.disclosure').forEach((disclosure) => {
          const button = disclosure.querySelector('button');
          const panel = disclosure.querySelector('ul');
          const input = disclosure.querySelector('input[type="hidden"]');
          if (!button || !panel || !input) return;

          button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            this.closeAll();
            button.setAttribute('aria-expanded', String(!isExpanded));
            panel.hidden = isExpanded;
          });

          disclosure.querySelectorAll('a[data-value]').forEach((link) => {
            link.addEventListener('click', (event) => {
              event.preventDefault();
              input.value = link.dataset.value;
              this.querySelector('form').submit();
            });
          });
        });

        document.addEventListener('click', this.onDocumentClick);
        document.addEventListener('keydown', this.onEscape);
      }

      onDocumentClick(event) {
        if (!this.contains(event.target)) {
          this.closeAll();
        }
      }

      onEscape(event) {
        if (event.key === 'Escape') {
          this.closeAll();
        }
      }

      closeAll() {
        this.querySelectorAll('.disclosure').forEach((disclosure) => {
          const button = disclosure.querySelector('button');
          const panel = disclosure.querySelector('ul');
          if (!button || !panel) return;
          button.setAttribute('aria-expanded', 'false');
          panel.hidden = true;
        });
      }
    }
  );
}

function initializeEditorialMotion() {
  const revealElements = Array.from(document.querySelectorAll('[data-editorial-reveal]'));
  const parallaxElements = Array.from(document.querySelectorAll('[data-editorial-parallax]'));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!revealElements.length && !parallaxElements.length) return;

  revealElements.forEach((element) => {
    element.classList.add('is-pending');
  });

  const markVisible = (element) => {
    element.classList.add('is-in-view');
  };

  if (prefersReducedMotion) {
    revealElements.forEach(markVisible);
    return;
  }

  // GSAP is optional. If unavailable, the observer fallback preserves the upgraded UX safely.
  if (window.gsap) {
    const gsap = window.gsap;
    const scrollTrigger = window.ScrollTrigger;

    if (scrollTrigger) {
      gsap.registerPlugin(scrollTrigger);
    }

    revealElements.forEach((element, index) => {
      gsap.fromTo(
        element,
        { autoAlpha: 0, y: 30, scale: 0.985 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          delay: index * 0.04,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: scrollTrigger
            ? {
                trigger: element,
                start: 'top 88%',
                once: true
              }
            : undefined,
          onStart: () => markVisible(element)
        }
      );
    });

    if (scrollTrigger) {
      parallaxElements.forEach((element) => {
        const image = element.querySelector('img, .placeholder-svg');
        if (!image) return;

        gsap.to(image, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });
    }

    return;
  }

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(markVisible);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        markVisible(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.15
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function initializeAIConcierge() {
  const root = document.querySelector('[data-ai-concierge]');
  const config = window.kanadAIConfig;

  if (!root || !config?.enabled) return;

  const toggleButton = root.querySelector('[data-ai-toggle]');
  const closeButton = root.querySelector('[data-ai-close]');
  const panel = root.querySelector('[data-ai-panel]');
  const messagesNode = root.querySelector('[data-ai-messages]');
  const statusNode = root.querySelector('[data-ai-status]');
  const form = root.querySelector('[data-ai-form]');
  const input = root.querySelector('[data-ai-input]');
  const sendButton = root.querySelector('[data-ai-send]');
  const micButton = root.querySelector('[data-ai-mic]');
  const quickActionButtons = root.querySelectorAll('[data-ai-prompt]');

  if (!toggleButton || !closeButton || !panel || !messagesNode || !statusNode || !form || !input || !sendButton) return;

  const SpeechRecognitionApi = window.SpeechRecognition || window.webkitSpeechRecognition;
  const state = {
    busy: false,
    listening: false,
    messages: [
      {
        role: 'assistant',
        content: config.welcomeMessage || 'Hi, how can I help?'
      }
    ]
  };

  let recognition;

  const setUiState = (stateName) => {
    root.dataset.state = stateName;
  };

  const setOpen = (nextOpen) => {
    root.classList.toggle('is-open', nextOpen);
    panel.hidden = !nextOpen;
    toggleButton.setAttribute('aria-expanded', String(nextOpen));
    if (nextOpen) {
      input.focus();
    } else if (recognition && state.listening) {
      recognition.stop();
    }
  };

  const setStatus = (message, stateName = '') => {
    statusNode.textContent = message;
    statusNode.dataset.state = stateName;
  };

  const setBusy = (nextBusy) => {
    state.busy = nextBusy;
    if (nextBusy) {
      setUiState('busy');
    } else if (state.listening) {
      setUiState('listening');
    } else {
      setUiState('ready');
    }
    sendButton.disabled = nextBusy;
    input.disabled = nextBusy;
    if (micButton) {
      micButton.disabled = nextBusy;
    }
  };

  const appendMessage = (role, content) => {
    const item = document.createElement('li');
    const paragraph = document.createElement('p');

    item.className = `ai-concierge__message ai-concierge__message--${role}`;
    paragraph.textContent = content;
    item.appendChild(paragraph);
    messagesNode.appendChild(item);
    messagesNode.scrollTop = messagesNode.scrollHeight;
  };

  const pickVoice = () => {
    if (!window.speechSynthesis || !config.voiceOutputEnabled) return null;

    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;

    if (config.voiceName) {
      const exactVoice = voices.find((voice) => voice.name === config.voiceName);
      if (exactVoice) return exactVoice;
    }

    if (config.voiceLocale) {
      const localeVoice = voices.find((voice) => voice.lang === config.voiceLocale);
      if (localeVoice) return localeVoice;
    }

    return voices[0];
  };

  const speakReply = (content) => {
    if (!window.speechSynthesis || !config.voiceOutputEnabled || !content) return;

    const utterance = new SpeechSynthesisUtterance(content);
    const selectedVoice = pickVoice();

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    } else if (config.voiceLocale) {
      utterance.lang = config.voiceLocale;
    }

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const buildGatewayError = async (response) => {
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const payload = await response.json().catch(() => ({}));
      return payload.error || payload.message || `AI gateway request failed (${response.status}).`;
    }

    const bodyText = await response.text().catch(() => '');
    const trimmedBody = bodyText.trim();

    if (trimmedBody.startsWith('<!DOCTYPE html') || trimmedBody.startsWith('<html')) {
      return 'The AI gateway URL returned an HTML storefront page instead of JSON. Use your real gateway endpoint, for example https://your-domain.com/api/ai/chat or /apps/ai/chat.';
    }

    if (!response.ok) {
      return trimmedBody || `AI gateway request failed (${response.status}).`;
    }

    return trimmedBody ? `AI gateway returned plain text instead of JSON: ${trimmedBody.slice(0, 160)}` : 'AI gateway returned an empty non-JSON response.';
  };

  const postMessage = async (prompt, source = 'text') => {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt || state.busy) return;

    if (!config.gatewayUrl) {
      setStatus('Add an AI gateway endpoint URL in theme settings to activate the assistant.', 'warning');
      return;
    }

    appendMessage('user', trimmedPrompt);
    state.messages.push({ role: 'user', content: trimmedPrompt });
    input.value = '';
    setBusy(true);
    setStatus('Thinking...', 'busy');

    try {
      const response = await fetch(config.gatewayUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          provider: config.provider,
          model: config.model,
          systemPrompt: config.systemPrompt,
          source,
          messages: state.messages.slice(-12),
          context: config.pageContext
        })
      });

      if (!response.ok) {
        throw new Error(await buildGatewayError(response));
      }

      const contentType = response.headers.get('content-type') || '';

      if (!contentType.includes('application/json')) {
        throw new Error(await buildGatewayError(response));
      }

      const payload = await response.json().catch(() => {
        throw new Error('AI gateway returned invalid JSON.');
      });

      const reply = payload.reply || payload.message;

      if (!reply) {
        throw new Error('AI gateway responded but did not include a reply field.');
      }

      appendMessage('assistant', reply);
      state.messages.push({ role: 'assistant', content: reply });
      setStatus(payload.meta?.model ? `${config.assistantName || 'Assistant'} answered with ${payload.meta.model}.` : 'Ready for the next question.', 'ready');
      speakReply(reply);
    } catch (error) {
      setStatus(error.message || 'AI assistant unavailable right now.', 'error');
    } finally {
      setBusy(false);
    }
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    postMessage(input.value, 'text');
  });

  input.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      postMessage(input.value, 'text');
    }
  });

  quickActionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      postMessage(button.dataset.aiPrompt || '', 'quick-action');
      setOpen(true);
    });
  });

  toggleButton.addEventListener('click', () => {
    setOpen(panel.hidden);
  });

  closeButton.addEventListener('click', () => {
    setOpen(false);
  });

  if (micButton) {
    if (!config.voiceInputEnabled || !SpeechRecognitionApi) {
      micButton.hidden = true;
    } else {
      recognition = new SpeechRecognitionApi();
      recognition.lang = config.voiceLocale || 'en-US';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.addEventListener('start', () => {
        state.listening = true;
        setUiState('listening');
        micButton.classList.add('is-listening');
        setStatus('Listening...', 'busy');
      });

      recognition.addEventListener('result', (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0]?.transcript || '')
          .join(' ')
          .trim();

        input.value = transcript;
      });

      recognition.addEventListener('end', () => {
        state.listening = false;
        micButton.classList.remove('is-listening');
        if (!state.busy) {
          setUiState('ready');
        }
        if (!state.busy) {
          setStatus(config.gatewayUrl ? 'Voice ready.' : 'Add an AI gateway endpoint URL to activate voice requests.', 'ready');
        }
      });

      recognition.addEventListener('error', () => {
        state.listening = false;
        setUiState('ready');
        micButton.classList.remove('is-listening');
        setStatus('Voice input is not available in this browser session.', 'error');
      });

      micButton.addEventListener('click', () => {
        if (state.listening) {
          recognition.stop();
        } else {
          recognition.start();
          setOpen(true);
        }
      });
    }
  }

  root.hidden = false;
  setUiState(config.gatewayUrl ? 'ready' : 'warning');
  setStatus(
    config.gatewayUrl
      ? 'Ask about products, policies, shipping, or recommendations.'
      : 'Add an AI gateway endpoint URL in theme settings to activate the assistant.',
    config.gatewayUrl ? 'ready' : 'warning'
  );
}

document.addEventListener('DOMContentLoaded', () => {
  initializeEditorialMotion();
  initializeAIConcierge();

  document.querySelectorAll('.categories-btn').forEach((button) => {
    const menu = document.getElementById(button.getAttribute('aria-controls'));
    const wrapper = button.closest('.header__categories-wrapper');
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const openMenu = () => {
      button.setAttribute('aria-expanded', 'true');
      if (menu) {
        menu.hidden = false;
      }
    };

    const closeMenu = () => {
      button.setAttribute('aria-expanded', 'false');
      if (menu) {
        menu.hidden = true;
      }
    };

    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      if (menu) {
        menu.hidden = expanded;
      }
    });

    if (wrapper && supportsHover) {
      wrapper.addEventListener('mouseenter', openMenu);
      wrapper.addEventListener('mouseleave', closeMenu);
    }

    document.addEventListener('click', (event) => {
      if (wrapper && !wrapper.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });
  });

  document.querySelectorAll('[data-collection-filters], [data-auto-submit-form]').forEach((form) => {
    form.querySelectorAll('[data-auto-submit]').forEach((input) => {
      input.addEventListener('change', () => {
        form.requestSubmit();
      });
    });
  });

  document.querySelectorAll('[data-collection-sort]').forEach((select) => {
    select.addEventListener('change', () => {
      const url = new URL(window.location.href);
      if (select.value) {
        url.searchParams.set('sort_by', select.value);
      } else {
        url.searchParams.delete('sort_by');
      }
      window.location.href = url.toString();
    });
  });

  document.querySelectorAll('[data-product-recommendations]').forEach((container) => {
    const url = container.dataset.url;
    if (!url) return;

    fetch(url)
      .then((response) => response.text())
      .then((markup) => {
        const parsed = new DOMParser().parseFromString(markup, 'text/html');
        const section = parsed.querySelector('[data-product-recommendations-section]');
        if (section) container.replaceWith(section);
      })
      .catch(() => {
        container.remove();
      });
  });
});