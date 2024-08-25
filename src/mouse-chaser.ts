import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('mouse-chaser')
export class MouseChaserElement extends LitElement {
  @property({ type: Number })
  offset = 10;

  @state()
  dynamicStyle = { left: '0px', top: '0px' };

  @state()
  throttle = 0;

  static styles = css`
    div#mouse-chaser-container {
      position: absolute;
    }
  `;

  render() {
    return html`
      <div id="mouse-chaser-container" style=${styleMap(this.dynamicStyle)}>
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('mousemove', this.handleMouseMove, {
      passive: true,
    });
  }

  disconnectedCallback() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    super.disconnectedCallback();
  }

  private handleMouseMove = (e: MouseEvent) => {
    let now = Date.now();
    if (now - this.throttle < 50) {
      return;
    }
    this.throttle = now;

    const { clientX, clientY } = e;
    this.dynamicStyle = {
      left: `${clientX + this.offset}px`,
      top: `${clientY + this.offset}px`,
    };
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'mouse-chaser': MouseChaserElement;
  }
}
