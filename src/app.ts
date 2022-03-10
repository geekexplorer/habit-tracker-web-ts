import { HabitData, HabitModel } from "./models/HabitModel.js";
import { ViewBase } from "./views/ViewBase.js";
import { HabitListView } from "./views/HabitListView.js";
import { HabitService } from "./services/HabitService.js";
import { ModalViewBase } from "./views/ModalViewBase.js";
import { ErrorModalView } from "./views/ErrorModalView.js";
import { CreateHabitModalView } from "./views/CreateHabitModalView.js";
import { EditHabitModalView } from "./views/EditHabitModalView.js";
import { DeleteHabitModalView } from "./views/DeleteHabitModalView.js";

class App {
  private static instance: App;

  // ----------
  // State
  // ----------
  private habitListModel?: HabitModel[];

  // ----------
  // Views
  // ----------`
  private habitListView: HabitListView = new HabitListView(".js-habit-list-view", "My Habits");
  private errorModalView: ErrorModalView = new ErrorModalView(".modal");
  private createHabitModalView: CreateHabitModalView = new CreateHabitModalView(".modal");
  private editHabitModalView: EditHabitModalView = new EditHabitModalView(".modal");
  private deleteHabitModalView: DeleteHabitModalView = new DeleteHabitModalView(".modal");

  private pageViews: ViewBase[] = [this.habitListView];
  private modalViews: ModalViewBase[] = [this.createHabitModalView, this.editHabitModalView, this.deleteHabitModalView];

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

    if (!this.habitListModel) {
      this.renderAppError("Unable to download habit list. Please try again later.");
      return;
    }
    this.initUI();
  }

  private async initState() {
    const habitsResult = await HabitService.getAllHabits();
    if (!habitsResult.success) return;

    this.habitListModel = habitsResult.data as HabitModel[];
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
    this.habitListView.addHandlerDeleteHabit(this.hlv_handleHabitDelete.bind(this));
  }

  private initModalHandlers() {
    // CreateHabitModalView
    this.createHabitModalView.addCreateHabitHandler(this.createhm_handleCreateNewHabit.bind(this));

    // EditHabitModalView
    this.editHabitModalView.addEditHabitHandler(this.edithm_handleEditHabit.bind(this));

    // DeleteHabitModalView
    this.deleteHabitModalView.addHandleDelete(this.deletehm_handleDeleteHabit.bind(this));
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
    this.habitListView.render(this.habitListModel as HabitModel[]);
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
    const habit = this.habitListModel!.find((habit) => habit.id === habitId);
    if (!habit) return;
    this.editHabitModalView.render(habit);
    this.editHabitModalView.show();
  }

  private async hlv_handleHabitDelete(habitId: string) {
    const habit = this.habitListModel!.find((habit) => habit.id === habitId);
    this.deleteHabitModalView.render(habit);
    this.deleteHabitModalView.show();
  }

  private async hlv_handleHabitDayClick(data: { habitId: string; date: string; completed: boolean }) {
    const { habitId, date, completed } = data;
    const habit = this.habitListModel!.find((habit) => habit.id === habitId);

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

    this.habitListModel?.push(newHabitResult.data as HabitModel);
    this.createHabitModalView.hide();
    this.renderHabitListView();
  }

  // EditHabitModalView Handlers (edithm)
  private async edithm_handleEditHabit(data: { habitModel: HabitModel; updatedTitle: string }) {
    const updatedHabit = new HabitModel(data.habitModel);
    updatedHabit.title = data.updatedTitle;
    const result = await HabitService.updateHabit(data.habitModel.id!, updatedHabit);

    this.editHabitModalView.hide();

    if (!result.success) {
      this.renderAppError(result.data!);
      return;
    }

    data.habitModel.title = updatedHabit.title;

    this.renderHabitListView();
    this.showPageView(this.habitListView);
  }

  // DeleteHabitModalView Handlers (deletehm)
  private async deletehm_handleDeleteHabit(habitId: string) {
    this.deleteHabitModalView.toggleWorking();
    const result = await HabitService.deleteHabit(habitId);
    if (!result.success) {
      this.renderAppError(`Unable to delete habit.(habitId=${habitId}`);
      return;
    }
    const deletedHabitIndex = this.habitListModel!.findIndex((habit: HabitModel) => habit.id === habitId);
    this.habitListModel!.splice(deletedHabitIndex);
    this.deleteHabitModalView.hide();
    this.renderHabitListView();
    this.showPageView(this.habitListView);
  }

  // ErrorModalView Handlers (error)
  private error_handleOk() {}
}

const app = App.getApp();
app.initialize();
