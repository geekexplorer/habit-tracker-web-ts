import { HabitModel } from "../../models/HabitModel.js";

export enum HabitFormType {
  CREATE_HABIT,
  EDIT_HABIT,
}

export class HabitFormControl {
  private parentSelector: string;
  private parentElement?: HTMLDivElement;
  private formType?: HabitFormType;
  private data?: HabitModel;

  constructor(parentSelector: string) {
    this.parentSelector = parentSelector;
  }

  public initialize(type: HabitFormType, data?: HabitModel) {
    this.data = data;
    this.formType = type;
    this.parentElement = document.querySelector(this.parentSelector)!;

    if (type === HabitFormType.CREATE_HABIT) {
      this.handleDurationSliderInput();
    }

    return this.generateControlMarkup.bind(this)();
  }

  private generateControlMarkup() {
    return `
    <div class="habit-form">
      <div class="habit-form__error border-1 box-shadow hidden">
      </div>
      <div class="habit-form__label">
        Title
      </div>
      <div class="habit-form__input">
        <input type="text" class="habit-form__title-input js-habit-title border-1 box-shadow" size="50" value="${
          this.data?.title ?? ""
        }"/>
      </div>
      <div class="habit-form__label">
        Start Date
      </div>
      <div class="habit-form__input">
        <input type="date" class="habit-form__title-input border-1 box-shadow js-habit-startDate"></input>
      </div>
      ${this.formType === HabitFormType.CREATE_HABIT ? this.generateDurationMarkup() : ""}
      </div>
  `;
  }

  private generateDurationMarkup() {
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

  public displayFormError(message: string) {
    const errorElement = this.parentElement?.querySelector(".habit-form__error")!;
    errorElement.classList.remove("hidden");
    errorElement.innerHTML = message;
  }

  public getHabitTitle() {
    return (this.parentElement?.querySelector(".js-habit-title")! as HTMLInputElement).value;
  }

  public getHabitDuration() {
    return (this.parentElement?.querySelector(".js-habit-duration")! as HTMLInputElement).value;
  }

  public getHabitStartDate() {
    const dateString = (this.parentElement?.querySelector(".js-habit-startDate")! as HTMLInputElement).value;
    return dateString.split("-").join("/");
  }

  // Event Handlers

  private handleDurationSliderInput() {
    this.parentElement?.addEventListener("input", (e) => {
      const target = e.target as HTMLInputElement;
      if (!target.classList.contains("js-habit-duration")) return;

      e.stopPropagation();

      const durationValueElement = this.parentElement?.querySelector(".js-duration-value")!;
      durationValueElement.innerHTML = target.value;
    });
  }
}
