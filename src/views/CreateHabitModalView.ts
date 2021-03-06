import { HabitData } from "../models/HabitModel.js";
import { HabitFormControl, HabitFormType } from "./controls/HabitFormControl.js";
import { ModalViewBase } from "./ModalViewBase.js";

export class CreateHabitModalView extends ModalViewBase {
  private title: string = "Create Habit";
  private habitFormControl: HabitFormControl;

  constructor(parentSelector: string) {
    super(parentSelector);
    this.habitFormControl = new HabitFormControl(parentSelector);
  }

  public generateMarkup() {
    return `
    <div class="modal-content border-1">
      <div class="habit-modal__title border-1 box-shadow">
        ${this.title}
      </div>
      ${this.habitFormControl.initialize(HabitFormType.CREATE_HABIT)}
      ${this.generateActionsMarkup()}
    </div>
  `;
  }

  private generateActionsMarkup() {
    return `
    <div class="habit-modal__actions">
      <div class="action border-1 drop-shadow js-confirm-create">Create</div>
      <div class="action border-1 drop-shadow js-close-modal">Nope!</div>
    </div>
    <div class="modal-thinking js-thinking hidden">Thinking...</div>`;
  }

  // Event Handlers

  addCreateHabitHandler(handler: (habitData: HabitData) => void) {
    this.parentElement.addEventListener("click", (e) => {
      const target = e!.target as HTMLElement;
      if (!target.classList.contains("js-confirm-create")) return;

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
      const duration = this.habitFormControl.getHabitDuration();

      this.parentElement.querySelector(".js-confirm-create")!.innerHTML = `Create`;

      handler({ title: title, dateStarted: startDate, duration: +duration });
    });
  }
}
