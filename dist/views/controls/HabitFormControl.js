export var HabitFormType;
(function (HabitFormType) {
    HabitFormType[HabitFormType["CREATE_HABIT"] = 0] = "CREATE_HABIT";
    HabitFormType[HabitFormType["EDIT_HABIT"] = 1] = "EDIT_HABIT";
})(HabitFormType || (HabitFormType = {}));
export class HabitFormControl {
    constructor(parentSelector) {
        this.parentSelector = parentSelector;
    }
    initialize(type, data) {
        this.data = data;
        this.formType = type;
        this.parentElement = document.querySelector(this.parentSelector);
        if (type === HabitFormType.CREATE_HABIT) {
            this.handleDurationSliderInput();
        }
        return this.generateControlMarkup();
    }
    generateControlMarkup() {
        var _a, _b;
        return `
    <div class="habit-form">
      <div class="habit-form__error border-1 box-shadow hidden">
      </div>
      <div class="habit-form__label">
        Title
      </div>
      <div class="habit-form__input">
        <input type="text" class="habit-form__title-input js-habit-title border-1 box-shadow" size="50" value="${(_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : ""}"/>
      </div>
      ${this.formType === HabitFormType.CREATE_HABIT ? this.generateDurationMarkup() : ""}
      </div>
  `;
    }
    generateDurationMarkup() {
        return `
    <div class="habit-form__duration-container">
      <div class="habit-form__label">
        Days
      </div>
      <div class="habit-form__label js-duration-value">
        30
      </div>
    </div>
    <div>
      <div class="habit-form__input">
        <input type="range" class="habit-form__duration-slider js-habit-duration" min="7" max="60" value="30" />
      </div>
    </div>
  `;
    }
    displayFormError(message) {
        var _a;
        const errorElement = (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector(".habit-form__error");
        errorElement.classList.remove("hidden");
        errorElement.innerHTML = message;
    }
    getHabitTitle() {
        var _a;
        return ((_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector(".js-habit-title")).value;
    }
    getHabitDuration() {
        var _a;
        return ((_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector(".js-habit-duration")).value;
    }
    // Event Handlers
    handleDurationSliderInput() {
        var _a;
        (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.addEventListener("input", (e) => {
            var _a;
            const target = e.target;
            if (!target.classList.contains("js-habit-duration"))
                return;
            e.stopPropagation();
            const durationValueElement = (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector(".js-duration-value");
            durationValueElement.innerHTML = target.value;
        });
    }
}
//# sourceMappingURL=HabitFormControl.js.map