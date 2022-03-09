import { ViewBase } from "./ViewBase.js";
export class ModalViewBase extends ViewBase {
    constructor(parentSelector) {
        super(parentSelector);
        this.handleCloseModal();
    }
    render(data) {
        this.data = data;
        super.render();
    }
    generateMarkup() {
        return "";
    }
    // Event Handlers
    handleCloseModal() {
        this.parentElement.addEventListener("click", (e) => {
            const target = e.target;
            if (target.classList.contains("js-close-modal")) {
                e.stopPropagation();
                this.hide();
            }
        });
    }
}
//# sourceMappingURL=ModalViewBase.js.map