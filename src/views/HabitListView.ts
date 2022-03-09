import { ViewBase } from "./ViewBase.js";
import { Day, HabitModel } from "../models/HabitModel.js";

export class HabitListView extends ViewBase {
  private title: string;

  private data: HabitModel[] = [];

  constructor(parentSelector: string, title: string) {
    super(parentSelector);
    this.title = title;
  }

  public override render(data: HabitModel[]): void {
    this.data = data;
    super.render();
  }

  public generateMarkup(): string {
    return `
      ${this.generateTitleMarkup()}
      ${this.generateHabitListMarkup()}
      ${this.generateListActionsMarkup()}
    `;
  }

  private generateTitleMarkup(): string {
    return `
    <div class="habit-list-view__title title-border-1 box-shadow">${this.title}</div> 
  `;
  }

  private generateHabitListMarkup(): string {
    return `
      <div class="habit-list">
        ${this.data.reduce((prev, habit) => {
          return prev + this.generateHabitMarkup(habit);
        }, "")}
      </div>
    `;
  }

  private generateHabitMarkup(habit: HabitModel): string {
    return `
    <div class="habit-list__habit js-habit-list__habit border-1 box-shadow " data-habit-id=${habit.id}>
      <div class="habit-details">
        <div class="habit-details__title">${habit.title}</div>
        <div class="habit-details__start-date">started ${new Date(habit.dateStarted).toLocaleDateString()}</div>
        ${this.generateHabitActionsMarkup(habit.id!)}
      </div>
      ${this.generateHabitDaysMarkup(habit)}
    </div>
  `;
  }

  private generateHabitActionsMarkup(habitId: string): string {
    return `
    <div class="habit-details__actions">
      <div>
        <i class="fa-regular fa-pen-to-square action js-edit-habit"></i>
      </div>
      <div>
        <i class="fa-regular fa-trash-can action js-delete-habit"></i>
      </div>
    </div>`;
  }

  private generateHabitDaysMarkup(habit: HabitModel): string {
    return `
      <div class="habit-days">
      ${habit.days.reduce((prev, day, _) => {
        return prev + this.generateHabitDayMarkup(day);
      }, "")}
      </div>
    `;
  }

  private generateHabitDayMarkup(day: Day): string {
    const date = new Date(day.date);
    return `
    <div class="habit-day js-habit-day" data-date="${day.date}" data-completed="${day.completed}">
      <div>
        ${
          day.completed
            ? '<i class="fa-regular fa-circle-check day-complete action"></i>'
            : '<i class="fa-regular fa-circle day-incomplete action"></i>'
        }
      </div>
     
      <div class="day-date">
        ${date.getMonth() + 1} / ${date.getDate()}
      </div>
    </div>
    `;
  }

  private generateListActionsMarkup(): string {
    return `<div class="action create-new-habit button button-border-1 box-shadow js-habit-list__create-new-habit">Create New Habit</div>`;
  }

  // Event Listeners

  public addHandleCreateNewHabit(handler: () => void) {
    this.parentElement.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (!target.classList.contains("js-habit-list__create-new-habit")) return;

      e.stopPropagation();
      handler();
    });
  }

  public addHandlerToggleDayCompelete(handler: (data: { habitId: string; date: string; completed: boolean }) => void) {
    this.parentElement.addEventListener("click", (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const habitDay = target.closest(".js-habit-day") as HTMLElement;
      if (!habitDay) return;

      const habitId = (habitDay.closest(".js-habit-list__habit")! as HTMLElement).dataset.habitId;
      if (!habitId) return;

      const date = habitDay.dataset.date;
      const completed = habitDay.dataset.completed;

      handler({ habitId: habitId, date: date!, completed: !(completed ? completed === "true" : false) });

      e.stopPropagation();
    });
  }

  public addHandlerEditHabit(handler: (habitId: string) => void) {
    this.parentElement.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (!target.classList.contains("js-edit-habit")) return;

      const habitId = (target.closest(".js-habit-list__habit") as HTMLElement).dataset.habitId;
      if (!habitId) return;

      e.stopPropagation();

      handler(habitId);
    });
  }
}
