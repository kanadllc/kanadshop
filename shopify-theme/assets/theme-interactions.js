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
        super();
        this.querySelectorAll('.disclosure').forEach((disclosure) => {
          const button = disclosure.querySelector('button');
          const panel = disclosure.querySelector('ul');
          const input = disclosure.querySelector('input[type="hidden"]');
          if (!button || !panel || !input) return;

          button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
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
      }
    }
  );
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.categories-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
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