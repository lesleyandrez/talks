class CeEditor extends HTMLElement {
    static get observedAttributes() {
        return [];
    }

    connectedCallback() {
        const valueDefault = this.getAttribute('value') || '';

        this.innerHTML = `
            <div class="toolbar">
                <button data-bind="cmd-bold">B</button>
                <button data-bind="cmd-italic" style="font-style: italic;">I</button>
            </div>
            <div contenteditable="true">
                ${valueDefault}
            </div>
        `;

        const $btnBold = this.querySelector('[data-bind="cmd-bold"]');
        const $btnItalic = this.querySelector('[data-bind="cmd-italic"]');

        $btnBold.onclick = () => {
            document.execCommand('bold');
            updateStateButtons();
        };

        $btnItalic.onclick = () => {
            document.execCommand('italic');
            updateStateButtons();
        };

        this.querySelector('[contenteditable="true"]').addEventListener('click', updateStateButtons);
        this.querySelector('[contenteditable="true"]').addEventListener('keyup', updateStateButtons);

        this.addEventListener('keydown', (event) => {
            if ((event.metaKey || event.ctrlKey) && event.keyCode === 'keyB') {
                document.execCommand('bold');
                updateStateButtons();
            }
            if ((event.metaKey || event.ctrlKey) && event.keyCode === 'keyI') {
                document.execCommand('italic');
                updateStateButtons();
            }
        });

        function updateStateButtons() {
            const isBold = document.queryCommandState('bold');
            const isItalic = document.queryCommandState('italic');
            isBold ? $btnBold.classList.add('active') : $btnBold.classList.remove('active');
            isItalic ? $btnItalic.classList.add('active') : $btnItalic.classList.remove('active');
        }
    }

    disconnectedCallback() { }

    adoptedCallback() { }

    attributeChangedCallback(attrName, oldVal, newVal) { }
}

window.customElements.define('ce-editor', CeEditor);