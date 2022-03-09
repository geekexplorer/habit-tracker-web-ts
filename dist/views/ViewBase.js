export class ViewBase {
    constructor(parentSelector) {
        const element = document.querySelector(parentSelector);
        if (!element) {
            throw Error(`Unable element exists with parentSelector: ${parentSelector}`);
        }
        this.parentElement = element;
    }
    render(data) {
        const markup = this.generateMarkup();
        this.clear();
        this.parentElement.innerHTML = markup;
    }
    clear() {
        this.parentElement.innerHTML = "";
    }
    show() {
        this.parentElement.classList.remove("hidden");
    }
    hide() {
        this.parentElement.classList.add("hidden");
    }
}
//# sourceMappingURL=ViewBase.js.map