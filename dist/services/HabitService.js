var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { HabitModel } from "../models/HabitModel.js";
import { API_URL } from "../config/constants.js";
import { REST } from "./FetchHelpers.js";
export const HabitService = {
    getAllHabits: function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const habitData = yield REST.Get(API_URL);
                return new HabitServiceResponse(true, habitData.map((habitData) => new HabitModel(habitData)));
            }
            catch (err) {
                console.error(err);
                return new HabitServiceResponse(false, "Unable to retrieve habit list.");
            }
        });
    },
    getHabitById: function (id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const habitData = yield REST.Get(`${API_URL}/${id}`);
                return new HabitServiceResponse(true, new HabitModel(habitData));
            }
            catch (err) {
                console.error(err);
                return new HabitServiceResponse(false, `Unable to retrive habit. (id=${id}`);
            }
        });
    },
    createHabit: function (newHabit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newHabitData = yield REST.Post(`${API_URL}`, newHabit);
                return new HabitServiceResponse(true, new HabitModel(newHabitData));
            }
            catch (err) {
                console.error(err);
                return new HabitServiceResponse(false, `Unable to create new habit.`);
            }
        });
    },
    updateHabit: function (id, updatedHabitData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield REST.Put(`${API_URL}/${id}`, updatedHabitData);
            }
            catch (err) {
                console.error(err);
                return new HabitServiceResponse(false, `Unable to update habit. (id=${id}`);
            }
        });
    },
    deleteHabit: function (id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield REST.Delete(`${API_URL}/${id}`);
            }
            catch (err) {
                console.error(err);
                return new HabitServiceResponse(false, `Unable to delete habit. (id=${id})`);
            }
        });
    },
};
class HabitServiceResponse {
    constructor(success, data) {
        this.success = success;
        this.data = data;
    }
}
//# sourceMappingURL=HabitService.js.map