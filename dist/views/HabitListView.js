import { ViewBase } from "./ViewBase.js";
export class HabitListView extends ViewBase {
    constructor(parentSelector, title) {
        super(parentSelector);
        this.data = [];
        this.title = title;
    }
    render(data) {
        this.data = data;
        super.render();
    }
    generateMarkup() {
        return `
      ${this.generateTitleMarkup()}
      ${this.generateHabitListMarkup()}
      ${this.generateListActionsMarkup()}
    `;
    }
    generateTitleMarkup() {
        return `
    <div class="habit-list-view__title title-border-1 box-shadow">${this.title}</div> 
  `;
    }
    generateHabitListMarkup() {
        return `
      <div class="habit-list">
        ${this.data.reduce((prev, habit) => {
            return prev + this.generateHabitMarkup(habit);
        }, "")}
      </div>
    `;
    }
    generateHabitMarkup(habit) {
        return `
    <div class="habit-list__habit js-habit-list__habit border-1 box-shadow " data-habit-id=${habit.id}>
      <div class="habit-details">
        <div class="habit-details__title">${habit.title}</div>
        <div class="habit-details__start-date">started ${new Date(habit.dateStarted).toLocaleDateString()}</div>
        ${this.generateHabitActionsMarkup(habit.id)}
      </div>
      ${this.generateHabitDaysMarkup(habit)}
    </div>
  `;
    }
    generateHabitActionsMarkup(habitId) {
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
    generateHabitDaysMarkup(habit) {
        return `
      <div class="habit-days">
      ${habit.days.reduce((prev, day, _) => {
            return prev + this.generateHabitDayMarkup(day);
        }, "")}
      </div>
    `;
    }
    generateHabitDayMarkup(day) {
        const date = new Date(day.date);
        return `
    <div class="habit-day js-habit-day" data-date="${day.date}" data-completed="${day.completed}">
      <div>
        ${day.completed
            ? '<i class="fa-regular fa-circle-check day-complete action"></i>'
            : '<i class="fa-regular fa-circle day-incomplete action"></i>'}
      </div>
     
      <div class="day-date">
        ${date.getMonth() + 1} / ${date.getDate()}
      </div>
    </div>
    `;
    }
    generateListActionsMarkup() {
        return `<div class="action create-new-habit button button-border-1 box-shadow js-habit-list__create-new-habit">Create New Habit</div>`;
    }
    // Event Listeners
    addHandleCreateNewHabit(handler) {
        this.parentElement.addEventListener("click", (e) => {
            const target = e.target;
            if (!target.classList.contains("js-habit-list__create-new-habit"))
                return;
            e.stopPropagation();
            handler();
        });
    }
    addHandlerToggleDayCompelete(handler) {
        this.parentElement.addEventListener("click", (e) => {
            const target = e.target;
            const habitDay = target.closest(".js-habit-day");
            if (!habitDay)
                return;
            const habitId = habitDay.closest(".js-habit-list__habit").dataset.habitId;
            if (!habitId)
                return;
            const date = habitDay.dataset.date;
            const completed = habitDay.dataset.completed;
            handler({ habitId: habitId, date: date, completed: !(completed ? completed === "true" : false) });
            e.stopPropagation();
        });
    }
}
//# sourceMappingURL=HabitListView.js.map