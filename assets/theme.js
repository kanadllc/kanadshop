/* theme.js - Kanad Shop Theme */

'use strict';

// ============================================================
// Cart functionality
// ============================================================

class CartManager {
  constructor() {
    this.cartDrawer = document.querySelector('.cart-drawer');
    this.cartOverlay = document.querySelector('.cart-drawer__overlay');
    this.cartCount = document.querySelectorAll('[data-cart-count]');
    this.cartItems = document.querySelector('[data-cart-items]');
    this.cartSubtotal = document.querySelector('[data-cart-subtotal]');

    this.bindEvents();
    this.fetchCart();
  }

  bindEvents() {
    document.querySelectorAll('[data-open-cart]').forEach((btn) => {
      btn.addEventListener('click', () => this.openDrawer());
    });

    if (this.cartOverlay) {
      this.cartOverlay.addEventListener('click', () => this.closeDrawer());
    }

    const closeBtn = document.querySelector('.cart-drawer__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeDrawer());
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.cartDrawer && this.cartDrawer.classList.contains('is-open')) {
        this.closeDrawer();
      }
    });
  }

  openDrawer() {
    if (!this.cartDrawer) return;
    this.cartDrawer.classList.add('is-open');
    if (this.cartOverlay) this.cartOverlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    this.cartDrawer.setAttribute('aria-hidden', 'false');
  }

  closeDrawer() {
    if (!this.cartDrawer) return;
    this.cartDrawer.classList.remove('is-open');
    if (this.cartOverlay) this.cartOverlay.classList.remove('is-visible');
    document.body.style.overflow = '';
    this.cartDrawer.setAttribute('aria-hidden', 'true');
  }

  async fetchCart() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      this.updateCartUI(cart);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  }

  async addItem(variantId, quantity = 1) {
    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: variantId, quantity }),
      });
      const item = await response.json();
      if (item.status) throw new Error(item.description);
      await this.fetchCart();
      this.openDrawer();
      return item;
    } catch (err) {
      console.error('Failed to add item:', err);
      this.showNotification(err.message || 'Could not add item to cart.');
    }
  }

  async updateQuantity(key, quantity) {
    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity }),
      });
      const cart = await response.json();
      this.updateCartUI(cart);
    } catch (err) {
      console.error('Failed to update cart:', err);
    }
  }

  updateCartUI(cart) {
    const count = cart.item_count || 0;
    this.cartCount.forEach((el) => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });

    if (this.cartSubtotal) {
      this.cartSubtotal.textContent = this.formatMoney(cart.total_price);
    }

    if (this.cartItems) {
      if (cart.items && cart.items.length > 0) {
        this.cartItems.innerHTML = cart.items
          .map(
            (item) => `
          <div class="cart-item" data-key="${item.key}">
            <div class="cart-item__image">
              ${item.image ? `<img src="${item.image}" alt="${item.product_title}" loading="lazy">` : ''}
            </div>
            <div class="cart-item__details">
              <div class="cart-item__title">${item.product_title}</div>
              ${item.variant_title ? `<div class="cart-item__variant">${item.variant_title}</div>` : ''}
              <div class="cart-item__price-wrapper">
                <span class="price">${this.formatMoney(item.final_line_price)}</span>
                <div class="product__quantity">
                  <button class="product__quantity-btn" data-action="decrease" data-key="${item.key}">−</button>
                  <input type="number" class="product__quantity-input" value="${item.quantity}" min="0" data-key="${item.key}">
                  <button class="product__quantity-btn" data-action="increase" data-key="${item.key}">+</button>
                </div>
                <button class="cart-item__remove" data-key="${item.key}">Remove</button>
              </div>
            </div>
          </div>
        `
          )
          .join('');

        this.bindCartItemEvents();
      } else {
        this.cartItems.innerHTML = '<div class="cart-drawer__empty"><p>Your cart is empty.</p></div>';
      }
    }
  }

  bindCartItemEvents() {
    this.cartItems.querySelectorAll('[data-action="decrease"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const key = e.target.dataset.key;
        const input = this.cartItems.querySelector(`input[data-key="${key}"]`);
        const qty = Math.max(0, parseInt(input.value) - 1);
        this.updateQuantity(key, qty);
      });
    });

    this.cartItems.querySelectorAll('[data-action="increase"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const key = e.target.dataset.key;
        const input = this.cartItems.querySelector(`input[data-key="${key}"]`);
        const qty = parseInt(input.value) + 1;
        this.updateQuantity(key, qty);
      });
    });

    this.cartItems.querySelectorAll('.cart-item__remove').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const key = e.target.dataset.key;
        this.updateQuantity(key, 0);
      });
    });

    this.cartItems.querySelectorAll('.product__quantity-input').forEach((input) => {
      input.addEventListener('change', (e) => {
        const key = e.target.dataset.key;
        const qty = Math.max(0, parseInt(e.target.value) || 0);
        this.updateQuantity(key, qty);
      });
    });
  }

  formatMoney(cents) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: window.Shopify?.currency?.active || 'USD',
    }).format(cents / 100);
  }

  showNotification(message) {
    let notification = document.querySelector('.notification');
    if (!notification) {
      notification = document.createElement('div');
      notification.className = 'notification';
      document.body.appendChild(notification);
    }
    notification.textContent = message;
    notification.classList.add('is-visible');
    setTimeout(() => {
      notification.classList.remove('is-visible');
    }, 3500);
  }
}

// ============================================================
// Product form
// ============================================================

class ProductForm {
  constructor(element) {
    this.form = element;
    this.variantId = this.form.querySelector('[name="id"]');
    this.quantityInput = this.form.querySelector('.product__quantity-input');
    this.submitBtn = this.form.querySelector('[type="submit"]');

    this.bindEvents();
  }

  bindEvents() {
    // Variant pills
    this.form.querySelectorAll('.variant-pill').forEach((pill) => {
      pill.addEventListener('click', (e) => {
        const variantId = e.target.dataset.variantId;
        if (variantId && !e.target.classList.contains('is-disabled')) {
          this.form.querySelectorAll('.variant-pill').forEach((p) => p.classList.remove('is-active'));
          e.target.classList.add('is-active');
          if (this.variantId) this.variantId.value = variantId;
          this.updatePrice(e.target);
        }
      });
    });

    // Quantity buttons
    const decreaseBtn = this.form.querySelector('[data-action="decrease"]');
    const increaseBtn = this.form.querySelector('[data-action="increase"]');

    if (decreaseBtn && this.quantityInput) {
      decreaseBtn.addEventListener('click', () => {
        const current = parseInt(this.quantityInput.value) || 1;
        this.quantityInput.value = Math.max(1, current - 1);
      });
    }

    if (increaseBtn && this.quantityInput) {
      increaseBtn.addEventListener('click', () => {
        const current = parseInt(this.quantityInput.value) || 1;
        this.quantityInput.value = current + 1;
      });
    }

    // Form submit
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submit();
    });
  }

  updatePrice(pill) {
    const price = pill.dataset.price;
    const comparePrice = pill.dataset.comparePrice;
    const priceEl = document.querySelector('.product__price .price');
    const compareEl = document.querySelector('.product__price .product__price--compare');

    if (priceEl && price) {
      priceEl.textContent = price;
    }
    if (compareEl) {
      if (comparePrice) {
        compareEl.textContent = comparePrice;
        compareEl.style.display = 'inline';
      } else {
        compareEl.style.display = 'none';
      }
    }
  }

  async submit() {
    if (!window.cartManager) return;
    const variantId = this.variantId ? this.variantId.value : null;
    const quantity = this.quantityInput ? parseInt(this.quantityInput.value) || 1 : 1;

    if (!variantId) {
      window.cartManager.showNotification('Please select a variant.');
      return;
    }

    this.submitBtn.disabled = true;
    this.submitBtn.textContent = 'Adding...';

    await window.cartManager.addItem(variantId, quantity);

    this.submitBtn.disabled = false;
    this.submitBtn.textContent = this.submitBtn.dataset.addToCart || 'Add to cart';
  }
}

// ============================================================
// Mobile navigation
// ============================================================

class MobileNav {
  constructor() {
    this.hamburger = document.querySelector('.header__hamburger');
    this.mobileNav = document.querySelector('.mobile-nav');
    this.isOpen = false;

    if (this.hamburger && this.mobileNav) {
      this.hamburger.addEventListener('click', () => this.toggle());
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.mobileNav.classList.toggle('is-open', this.isOpen);
    this.hamburger.setAttribute('aria-expanded', String(this.isOpen));
  }
}

// ============================================================
// Thumbnail gallery
// ============================================================

class ProductGallery {
  constructor() {
    this.mainImage = document.querySelector('.product__main-image img');
    this.thumbnails = document.querySelectorAll('.product__thumbnail');

    this.thumbnails.forEach((thumb) => {
      thumb.addEventListener('click', () => this.setActive(thumb));
    });
  }

  setActive(thumb) {
    const src = thumb.dataset.src;
    const alt = thumb.dataset.alt;
    if (this.mainImage && src) {
      this.mainImage.src = src;
      if (alt) this.mainImage.alt = alt;
    }
    this.thumbnails.forEach((t) => t.classList.remove('is-active'));
    thumb.classList.add('is-active');
  }
}

// ============================================================
// Announcement bar dismiss
// ============================================================

class AnnouncementBar {
  constructor() {
    const closeBtn = document.querySelector('.announcement-bar__close');
    const bar = document.querySelector('.announcement-bar');
    if (closeBtn && bar) {
      closeBtn.addEventListener('click', () => {
        bar.style.display = 'none';
        sessionStorage.setItem('announcement-dismissed', '1');
      });
      if (sessionStorage.getItem('announcement-dismissed')) {
        bar.style.display = 'none';
      }
    }
  }
}

// ============================================================
// Newsletter form
// ============================================================

class NewsletterForm {
  constructor(element) {
    this.form = element;
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();
    const emailInput = this.form.querySelector('input[type="email"]');
    if (!emailInput || !emailInput.value) return;

    const submitBtn = this.form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Subscribing...';
    }

    // The form submission is handled by Shopify's native customer endpoint
    this.form.submit();
  }
}

// ============================================================
// Initialize on DOM ready
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Cart
  window.cartManager = new CartManager();

  // Mobile nav
  new MobileNav();

  // Product forms
  document.querySelectorAll('.product-form').forEach((form) => {
    new ProductForm(form);
  });

  // Product gallery
  if (document.querySelector('.product__thumbnail')) {
    new ProductGallery();
  }

  // Announcement bar
  new AnnouncementBar();

  // Newsletter forms
  document.querySelectorAll('.newsletter-form').forEach((form) => {
    new NewsletterForm(form);
  });

  // Scroll-based header shadow
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    });
  }
});
