var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { HabitListView } from "./views/HabitListView.js";
import { HabitService } from "./services/HabitService.js";
import { ErrorModalView } from "./views/ErrorModalView.js";
import { CreateHabitModalView } from "./views/CreateHabitModalView.js";
class App {
    constructor() {
        // ----------
        // Views
        // ----------`
        this.habitListView = new HabitListView(".js-habit-list-view", "My Habits");
        this.errorModalView = new ErrorModalView(".modal");
        this.createHabitModalView = new CreateHabitModalView(".modal", "Create New Habit");
    }
    static getApp() {
        if (!App.instance) {
            App.instance = new App();
        }
        return App.instance;
    }
    // ----------
    // Initialization Methods
    // ----------
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initState();
            if (!this.habitList) {
                this.renderAppError("Unable to download habit list. Please try again later.");
                return;
            }
            this.initUI();
        });
    }
    initState() {
        return __awaiter(this, void 0, void 0, function* () {
            const habitsResult = yield HabitService.getAllHabits();
            if (!habitsResult.success)
                return;
            this.habitList = habitsResult.data;
        });
    }
    initUI() {
        this.initEventHandlers();
        this.renderHabitListView();
    }
    initEventHandlers() {
        this.initHabitListViewHandlers();
        this.initModalHandlers();
    }
    initHabitListViewHandlers() {
        // HabitList
        this.habitListView.addHandleCreateNewHabit(this.hlv_handleCreateNewHabit.bind(this));
        // Habit
        this.habitListView.addHandlerToggleDayCompelete(this.hlv_handleHabitDayClick.bind(this));
    }
    initModalHandlers() { }
    // ----------
    // Render Section
    // ----------
    renderAppError(message) {
        this.errorModalView.render(message);
        this.errorModalView.show();
    }
    renderHabitListView() {
        this.habitListView.render(this.habitList);
        this.habitListView.show();
    }
    // ----------
    // Event Handlers
    // ----------
    // HabitListViewHandlers (hlv)
    hlv_handleCreateNewHabit() {
        this.createHabitModalView.render();
        this.createHabitModalView.show();
    }
    hlv_handleHabitEdit(habitId) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    hlv_handleHabitDelete(habitId) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    hlv_handleHabitDayClick(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { habitId, date, completed } = data;
            const habit = this.habitList.find((habit) => habit.id === habitId);
            if (!habit)
                return;
            const dayIdx = habit.days.findIndex((day) => day.date === new Date(date).toJSON());
            habit.days[dayIdx].completed = completed;
            yield HabitService.updateHabit(habitId, habit);
            this.renderHabitListView();
        });
    }
    // CreateHabitModalView Handlers (createhm)
    createhm_handleCreateNewHabit(data) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    // EditHabitModalView Handlers (edithm)
    edithm_handleEditHabit(data) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    // DeleteHabitModalView Handlers (deletehm)
    deletehm_handleDeleteHabit(habitId) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    // ErrorModalView Handlers (error)
    error_handleOk() { }
}
const app = App.getApp();
app.initialize();
//# sourceMappingURL=app.js.map