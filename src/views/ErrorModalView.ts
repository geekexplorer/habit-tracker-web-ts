import { ModalViewBase } from "./ModalViewBase.js";

export class ErrorModalView extends ModalViewBase {
  private message?: string = "There was an unexpected error.";

  render(message: string) {
    this.message = message;
    super.render();
  }

  public generateMarkup() {
    return `
      <div class="modal-content border-1">
      
        <div class="habit-modal__title border-1 box-shadow">
          ${this.message}
        </div>
        <div class="error-modal__actions">
          <div class="action border-1 drop-shadow js-close-modal">Ok</div>
        </div>
      </div>
    `;
  }
}
