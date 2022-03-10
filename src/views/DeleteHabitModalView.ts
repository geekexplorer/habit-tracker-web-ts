import { ModalViewBase } from "./ModalViewBase.js";

export class DeleteHabitModalView extends ModalViewBase {
  private title: string = "Are you sure youw ant to delete";

  constructor(parentSelector: string) {
    super(parentSelector);
  }

  public generateMarkup() {
    return `
    <div class="modal-content border-1">
      <div class="habit-modal__title border-1 drop-shadow are-you-sure">
        ${this.title} your <br> <strong>${this.data.title}</strong> habit?
      </div>
      ${this.generateActionsMarkup()}
    </div>
  `;
  }

  private generateActionsMarkup() {
    return `
      <div class="habit-modal__actions">
        <div class="action border-1 drop-shadow js-confirm-delete" data-habit_id="${this.data.id}">Delete</div>
        <div class="action border-1 drop-shadow js-close-modal">Nevermind</div>
      </div>
      <div class="modal-thinking js-thinking hidden">Thinking...</div>
    `;
  }

  // Event Handlers
  addHandleDelete(handler: (habitId: string) => void) {
    this.parentElement.addEventListener("click", function (e) {
      const target = e.target as HTMLElement;
      if (!target.classList.contains("js-confirm-delete")) return;

      var habitId = target.dataset.habit_id;
      if (!habitId) return;

      handler(habitId);
    });
  }
}
