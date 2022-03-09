import { HabitData, HabitModel } from "./models/HabitModel.js";
import { ViewBase } from "./views/ViewBase.js";
import { HabitListView } from "./views/HabitListView.js";
import { HabitService } from "./services/HabitService.js";
import { ModalViewBase } from "./views/ModalViewBase.js";
import { ErrorModalView } from "./views/ErrorModalView.js";
import { CreateHabitModalView } from "./views/CreateHabitModalView.js";
import { EditHabitModalView } from "./views/EditHabitModalView.js";

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
  private editHabitModalView: EditHabitModalView = new EditHabitModalView(".modal", "Edit Habit");

  private pageViews: ViewBase[] = [this.habitListView];
  private modalViews: ModalViewBase[] = [this.createHabitModalView, this.editHabitModalView];

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
    this.habitListView.addHandlerEditHabit(this.hlv_handleHabitEdit.bind(this));
  }

  private initModalHandlers() {
    // CreateHabitModalView
    this.createHabitModalView.addCreateHabitHandler(this.createhm_handleCreateNewHabit.bind(this));

    // EditHabitModalView
    this.editHabitModalView.addEditHabitHandler(this.edithm_handleEditHabit);
  }

  // ----------
  // Render Section
  // ----------

  private hideModals() {
    this.modalViews.forEach((modal) => modal.hide());
  }

  private hidePages() {
    this.pageViews.forEach((page) => page.hide());
  }

  private showPageView(view: ViewBase) {
    this.hidePages();
    view.show();
  }

  private showModal(modal: ModalViewBase) {
    this.hideModals();
    modal.show();
  }

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

  private async hlv_handleHabitEdit(habitId: string) {
    const habit = this.habitList!.find((habit) => habit.id === habitId);
    if (!habit) return;
    this.editHabitModalView.render(habit);
    this.editHabitModalView.show();
  }

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
  private async createhm_handleCreateNewHabit(data: HabitData) {
    const newHabit = new HabitModel(data);
    const newHabitResult = await HabitService.createHabit(newHabit);

    if (!newHabitResult.success) {
      this.errorModalView.render("Unable to create new habit.");
      this.showModal(this.errorModalView);
      return;
    }

    this.habitList?.push(newHabitResult.data as HabitModel);
    this.createHabitModalView.hide();
    this.renderHabitListView();
  }

  // EditHabitModalView Handlers (edithm)
  private async edithm_handleEditHabit(data: { habit: HabitModel; updatedTitle: string }) {
    const updatedHabit = new HabitModel(data.habit);
    updatedHabit.title = data.updatedTitle;
    const result = await HabitService.updateHabit(data.habit.id!, updatedHabit);

    this.editHabitModalView.hide();

    if (result && !result.success) {
      this.renderAppError(result.data);
      return;
    }

    data.habit.title = updatedHabit.title;

    this.renderHabitListView();
    this.showPageView(this.habitListView);
  }

  // DeleteHabitModalView Handlers (deletehm)
  private async deletehm_handleDeleteHabit(habitId: string) {}

  // ErrorModalView Handlers (error)
  private error_handleOk() {}
}

const app = App.getApp();
app.initialize();
