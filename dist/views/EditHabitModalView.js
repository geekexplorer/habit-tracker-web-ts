import { ModalViewBase } from "./ModalViewBase";
import { HabitFormControl } from "./controls/HabitFormControl";
export class EditHabitModalView extends ModalViewBase {
    constructor(parentSelector, title) {
        super(parentSelector);
        this.title = title;
        this.habitFormControl = new HabitFormControl(parentSelector);
    }
    render(data) {
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
    addEditHabitHandler(handler) {
        this.parentElement.addEventListener("click", (e) => {
            const target = e.target;
            if (target.classList.contains("js-confirm-edit"))
                return;
            const title = this.habitFormControl.getHabitTitle();
            if (!title) {
                this.habitFormControl.displayFormError("You must provide a title.");
                return;
            }
            e.stopPropagation();
            this.data.title = title;
            handler(this.data);
        });
    }
}
//# sourceMappingURL=EditHabitModalView.js.map