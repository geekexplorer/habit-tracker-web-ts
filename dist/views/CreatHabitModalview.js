import { HabitFormControl, HabitFormType } from "./controls/HabitFormControl.js";
import { ModalViewBase } from "./ModalViewBase.js";
export class CreateHabitModelView extends ModalViewBase {
    constructor(parentSelector, title) {
        super(parentSelector);
        this.title = title;
        this.habitFormControl = new HabitFormControl(parentSelector);
    }
    generateMarkup() {
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
    generateActionsMarkup() {
        return `
    <div class="habit-modal__actions">
      <div class="action border-1 drop-shadow js-confirm-create">Create</div>
      <div class="action border-1 drop-shadow js-close-modal">Nope!</div>
    </div>`;
    }
    // Event Handlers
    addCreateHabitHandler(handler) {
        this.parentElement.addEventListener("click", (e) => {
            const target = e.target;
            if (target.classList.contains("js-confirm-create"))
                return;
            const title = this.habitFormControl.getHabitTitle();
            if (!title) {
                this.habitFormControl.displayFormError("You must provide a title.");
                return;
            }
            e.stopPropagation();
            const duration = this.habitFormControl.getHabitDuration();
            this.parentElement.querySelector(".js-confirm-create").innerHTML = `Create`;
            handler({ title: title, duration: +duration });
        });
    }
}
//# sourceMappingURL=CreatHabitModalview.js.map