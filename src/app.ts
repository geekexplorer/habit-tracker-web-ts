import { HabitData, HabitModel } from "./models/HabitModel.js";
import { HabitListView } from "./views/HabitListView.js";
import { HabitService } from "./services/HabitService.js";
import { ErrorModalView } from "./views/ErrorModalView.js";
import { CreateHabitModalView } from "./views/CreateHabitModalView.js";

class App {
  private static instance: App;

  // ----------
  // State
  // ----------
  private habitList?: HabitModel[];
  private currentHabit?: HabitModel;

  // ----------
  // Views
  // ----------`
  private habitListView: HabitListView = new HabitListView(".js-habit-list-view", "My Habits");
  private errorModalView: ErrorModalView = new ErrorModalView(".modal");
  private createHabitModalView: CreateHabitModalView = new CreateHabitModalView(".modal", "Create New Habit");

  private constructor() {}

  public static getApp() {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }

  // ----------
  // Initialization Methods
  // ----------

  public async initialize() {
    await this.initState();

    if (!this.habitList) {
      this.renderAppError("Unable to download habit list. Please try again later.");
      return;
    }
    this.initUI();
  }

  private async initState() {
    const habitsResult = await HabitService.getAllHabits();
    if (!habitsResult.success) return;

    this.habitList = habitsResult.data as HabitModel[];
  }

  private initUI() {
    this.initEventHandlers();
    this.renderHabitListView();
  }

  private initEventHandlers() {
    this.initHabitListViewHandlers();
    this.initModalHandlers();
  }

  private initHabitListViewHandlers() {
    // HabitList
    this.habitListView.addHandleCreateNewHabit(this.hlv_handleCreateNewHabit.bind(this));
    // Habit
    this.habitListView.addHandlerToggleDayCompelete(this.hlv_handleHabitDayClick.bind(this));
  }

  private initModalHandlers() {}

  // ----------
  // Render Section
  // ----------

  private renderAppError(message: string) {
    this.errorModalView.render(message);
    this.errorModalView.show();
  }

  private renderHabitListView() {
    this.habitListView.render(this.habitList as HabitModel[]);
    this.habitListView.show();
  }

  // ----------
  // Event Handlers
  // ----------

  // HabitListViewHandlers (hlv)

  private hlv_handleCreateNewHabit() {
    this.createHabitModalView.render();
    this.createHabitModalView.show();
  }

  private async hlv_handleHabitEdit(habitId: string) {}

  private async hlv_handleHabitDelete(habitId: string) {}

  private async hlv_handleHabitDayClick(data: { habitId: string; date: string; completed: boolean }) {
    const { habitId, date, completed } = data;
    const habit = this.habitList!.find((habit) => habit.id === habitId);

    if (!habit) return;

    const dayIdx = habit.days.findIndex((day) => day.date === new Date(date).toJSON());
    habit.days[dayIdx].completed = completed;

    await HabitService.updateHabit(habitId, habit);

    this.renderHabitListView();
  }

  // CreateHabitModalView Handlers (createhm)
  private async createhm_handleCreateNewHabit(data: { title: string; duration: number }) {}

  // EditHabitModalView Handlers (edithm)
  private async edithm_handleEditHabit(data: HabitData) {}

  // DeleteHabitModalView Handlers (deletehm)
  private async deletehm_handleDeleteHabit(habitId: string) {}

  // ErrorModalView Handlers (error)
  private error_handleOk() {}
}

const app = App.getApp();
app.initialize();
