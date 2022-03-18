import { HabitModel, HabitData, Day } from "../models/HabitModel.js";
import { ModalViewBase } from "./ModalViewBase.js";
import { HabitFormControl, HabitFormType } from "./controls/HabitFormControl.js";

export class EditHabitModalView extends ModalViewBase {
  private title: string = "Edit Habit";
  private habitFormControl: HabitFormControl;

  constructor(parentSelector: string) {
    super(parentSelector);
    this.habitFormControl = new HabitFormControl(parentSelector);
  }

  public render(data: HabitModel) {
    if (data) this.data = data;
    super.render();
  }

  generateMarkup() {
    return `
      <div class="modal-content border-1">
        <div class="habit-modal__title border-1 box-shadow">
          ${this.title}
        </div>
        ${this.habitFormControl.initialize(HabitFormType.EDIT_HABIT, this.data)}
        ${this.generateActionsMarkup()}
      </div>
    `;
  }

  generateActionsMarkup() {
    return `
    <div class="habit-modal__actions">
      <div class="action border-1 drop-shadow js-confirm-edit">Edit</div>
      <div class="action border-1 drop-shadow js-close-modal">Nope!</div>
    </div>
    <div class="modal-thinking js-thinking hidden">Thinking...</div>`;
  }

  // Event Handlers

  addEditHabitHandler(
    handler: (data: { habitModel: HabitModel; updatedDateStarted: string; updatedTitle: string }) => void
  ) {
    this.parentElement.addEventListener("click", (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.classList.contains("js-confirm-edit")) return;

      const title = this.habitFormControl.getHabitTitle();
      if (!title) {
        this.habitFormControl.displayFormError("You must provide a title.");
        return;
      }

      const startDate = this.habitFormControl.getHabitStartDate();
      if (!startDate) {
        this.habitFormControl.displayFormError("You must provide a start date.");
        return;
      }

      e.stopPropagation();

      handler({ habitModel: this.data, updatedDateStarted: startDate, updatedTitle: title });
    });
  }
}
