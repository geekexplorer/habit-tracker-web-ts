import { ViewBase } from "./ViewBase.js";

export abstract class ModalViewBase extends ViewBase {
  protected data: any;

  constructor(parentSelector: string) {
    super(parentSelector);
    this.handleCloseModal();
  }

  public render(data?: any) {
    this.data = data;
    super.render();
  }

  public abstract generateMarkup(): string;

  // Event Handlers

  handleCloseModal() {
    this.parentElement.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("js-close-modal")) {
        e.stopPropagation();
        this.hide();
      }
    });
  }
}
