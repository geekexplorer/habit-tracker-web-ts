import { HabitData, HabitModel } from "../models/HabitModel.js";
import { API_URL } from "../config/constants.js";
import { REST } from "./FetchHelpers.js";

export const HabitService = {
  getAllHabits: async function (): Promise<HabitServiceResponse<HabitModel[]> | HabitServiceResponse<string>> {
    try {
      const habitData = await REST.Get<HabitData[]>(API_URL);
      return new HabitServiceResponse<HabitModel[]>(
        true,
        habitData.map<HabitModel>((habitData) => new HabitModel(habitData))
      );
    } catch (err) {
      console.error(err);
      return new HabitServiceResponse<string>(false, "Unable to retrieve habit list.");
    }
  },

  getHabitById: async function (id: string): Promise<HabitServiceResponse<HabitModel> | HabitServiceResponse<string>> {
    try {
      const habitData = await REST.Get<HabitData>(`${API_URL}/${id}`);
      return new HabitServiceResponse<HabitModel>(true, new HabitModel(habitData));
    } catch (err) {
      console.error(err);
      return new HabitServiceResponse<string>(false, `Unable to retrive habit. (id=${id}`);
    }
  },

  createHabit: async function (
    newHabit: HabitModel
  ): Promise<HabitServiceResponse<HabitModel> | HabitServiceResponse<string>> {
    try {
      const newHabitData = await REST.Post<HabitData>(`${API_URL}`, newHabit);
      return new HabitServiceResponse<HabitModel>(true, new HabitModel(newHabitData));
    } catch (err) {
      console.error(err);
      return new HabitServiceResponse<string>(false, `Unable to create new habit.`);
    }
  },

  updateHabit: async function (
    id: string,
    updatedHabitData: HabitModel
  ): Promise<HabitServiceResponse<string> | HabitServiceResponse<null>> {
    try {
      await REST.Put(`${API_URL}/${id}`, updatedHabitData);
      return new HabitServiceResponse<null>(true, null);
    } catch (err) {
      console.error(err);
      return new HabitServiceResponse<string>(false, `Unable to update habit. (id=${id}`);
    }
  },

  deleteHabit: async function (id: string): Promise<HabitServiceResponse<string> | HabitServiceResponse<null>> {
    try {
      await REST.Delete(`${API_URL}/${id}`);
      return new HabitServiceResponse(true, null);
    } catch (err) {
      console.error(err);
      return new HabitServiceResponse<string>(false, `Unable to delete habit. (id=${id})`);
    }
  },
};

class HabitServiceResponse<T> {
  public success: boolean;
  public data: T;

  constructor(success: boolean, data: T) {
    this.success = success;
    this.data = data;
  }
}
