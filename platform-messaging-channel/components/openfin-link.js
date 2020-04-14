if (customElements !== undefined) {
  class OpenFinLink extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this._$a = null;
    }
    connectedCallback() {
      const showInFin = (this.getAttribute("show-in-fin") || "true") === "true";
      let href = this.getAttribute("href") || "#";
      const isFin = href.indexOf("fin://") > -1;
      const isFins = href.indexOf("fins://") > -1;

      if (!showInFin && window.fin !== undefined) {
        return;
      }

      if (
        (isFin || isFins) &&
        (href.indexOf(".") === 6 || href.indexOf(".") === 7)
      ) {
        href = href.replace(
          ".",
          window.location.hostname +
            (window.location.port ? ":" + window.location.port : "")
        );

        if (isFin && window.location.protocol === "https:") {
          href = href.replace("fin:", "fins:");
        }

        if (isFins && window.location.protocol === "http:") {
          href = href.replace("fins:", "fin:");
        }
      }

      this.shadowRoot.innerHTML = `
      <a href="${href}">
        <slot></slot>
      </a>
    `;

      if (isFin || isFins) {
        this._$a = this.shadowRoot.querySelector("a");
        this._$a.addEventListener("click", e => {
          let url = e.target.href;
          if (window.fin !== undefined && e.target.href.indexOf(".json" > -1)) {
            e.preventDefault();
            if (url.indexOf("fin://") > -1) {
              url = url.replace("fin://", "http://");
            } else if (url.indexOf("fins://")) {
              url = url.replace("fins://", "https://");
            }

            fin.Application.startFromManifest(url)
              .then(() => console.log("App is running"))
              .catch(err => console.log(err));
          }
        });
      }
    }

    static get observedAttributes() {
      return ["href"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        if (this._$a === null) return;
        this._$a.setAttribute("href", newValue);
      }
    }
  }
  customElements.define("openfin-link", OpenFinLink);
}
