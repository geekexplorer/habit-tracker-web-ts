import { HabitModel, HabitData, Day } from "../models/HabitModel.js";
import { ModalViewBase } from "./ModalViewBase.js";
import { HabitFormControl } from "./controls/HabitFormControl.js";

export class EditHabitModalView extends ModalViewBase {
  private habitFormControl: HabitFormControl;

  constructor(parentSelector: string, private title: string) {
    super(parentSelector);
    this.habitFormControl = new HabitFormControl(parentSelector);
  }

  public render(data: HabitModel) {
    this.data = data;
    super.render();
  }

  generateMarkup() {
    return `
      <div class="modal-content border-1">
        <div class="habit-modal__title border-1 box-shadow">
          ${this.title}
        </div>
        ${this.habitFormControl.initialize(this.data)}
        ${this.generateActionsMarkup()}
      </div>
    `;
  }

  generateActionsMarkup() {
    return `
    <div class="habit-modal__actions">
      <div class="action border-1 drop-shadow js-confirm-edit">Edit</div>
      <div class="action border-1 drop-shadow js-close-modal">Nope!</div>
    </div>`;
  }

  // Event Handlers

  addEditHabitHandler(handler: (data: { habitModel: HabitModel; updatedTitle: string }) => void) {
    this.parentElement.addEventListener("click", (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.classList.contains("js-confirm-edit")) return;

      const title = this.habitFormControl.getHabitTitle();
      if (!title) {
        this.habitFormControl.displayFormError("You must provide a title.");
        return;
      }

      e.stopPropagation();

      handler({ habitModel: this.data, updatedTitle: title });
    });
  }
}
