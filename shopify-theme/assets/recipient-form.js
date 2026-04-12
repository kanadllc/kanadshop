if (!customElements.get('recipient-form')) {
  customElements.define(
    'recipient-form',
    class RecipientForm extends HTMLElement {
      constructor() {
        super();
        this.sectionId = this.dataset.sectionId;
        this.checkbox = this.querySelector(`#Recipient-checkbox-${this.sectionId}`);
        this.controlField = this.querySelector(`#Recipient-control-${this.sectionId}`);
        this.offsetField = this.querySelector(`#Recipient-timezone-offset-${this.sectionId}`);
        this.liveRegion = this.querySelector(`#Recipient-fields-live-region-${this.sectionId}`);
        this.fields = [
          this.querySelector(`#Recipient-email-${this.sectionId}`),
          this.querySelector(`#Recipient-name-${this.sectionId}`),
          this.querySelector(`#Recipient-message-${this.sectionId}`),
          this.querySelector(`#Recipient-send-on-${this.sectionId}`),
          this.offsetField,
        ].filter(Boolean);

        if (!this.checkbox) return;

        this.checkbox.disabled = false;
        if (this.controlField) this.controlField.disabled = true;
        if (this.offsetField) this.offsetField.value = new Date().getTimezoneOffset().toString();
        this.checkbox.addEventListener('change', () => this.onChange());
        this.onChange();
      }

      onChange() {
        const checked = this.checkbox.checked;
        this.fields.forEach((field) => {
          field.disabled = !checked;
          if (!checked && field.tagName !== 'INPUT' && field.tagName !== 'TEXTAREA') return;
          if (!checked) field.value = '';
        });

        if (this.liveRegion) {
          this.liveRegion.innerText = checked
            ? window.accessibilityStrings?.recipientFormExpanded || 'Recipient fields expanded'
            : window.accessibilityStrings?.recipientFormCollapsed || 'Recipient fields collapsed';
        }
      }
    }
  );
}