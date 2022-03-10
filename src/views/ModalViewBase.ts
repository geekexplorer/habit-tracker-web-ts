import { ViewBase } from "./ViewBase.js";

export abstract class ModalViewBase extends ViewBase {
  protected data: any;
  protected thinking: boolean = false;

  constructor(parentSelector: string) {
    super(parentSelector);
    this.handleCloseModal();
  }

  public render(data?: any) {
    if (data) this.data = data;
    super.render();
  }

  public abstract generateMarkup(): string;

  public toggleWorking() {
    const thinkingElement = this.parentElement.querySelector(".js-thinking");

    if (thinkingElement) {
      if (this.thinking) {
        this.thinking = false;
        thinkingElement.classList.remove("hidden");
      } else {
        this.thinking = true;
        thinkingElement.classList.add("hidden");
      }
    }
  }

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
