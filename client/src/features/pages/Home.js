import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

import {
  addHabit,
  getAllHabits,
  habitSelector,
} from "../../store/slices/habitSlice";
import Habit from "../components/Habit";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
const defaultWeekdays = Array.apply(null, Array(7)).map(function (_, i) {
  return moment(i, "e")
    .startOf("week")
    .isoWeekday(i + 1)
    .format("dddd");
});
const today = moment().format("dddd").toString();

const Home = () => {
  const [habit, setHabit] = useState("");
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, errorMessage, habits, code } =
    useSelector(habitSelector);

  function getHabits() {
    if (authState.id) dispatch(getAllHabits({ userId: authState?.id }));
  }
  useEffect(() => {
    getHabits();
  }, []);

  useEffect(() => {
    if (isError) {
      toast.success(errorMessage);
      if (code === 401)
        setTimeout(() => {
          return <Redirect push to="/sign-in" />;
        }, 2000);
    }
  }, [isError, errorMessage, code]);

  const sendHabit = async () => {
    await dispatch(addHabit({ userId: authState.id, content: habit }));
    if (isSuccess) toast.success("Habits added successfully ✅");
    setHabit("");
    getHabits();
  };

  return (
    <div>
      <Navbar />
      <Toaster />
      <div className="container mx-auto">
        <div className="shadow-xl mt-4">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <div className="px-4 text-center">
                    <input
                      id="habit-input"
                      className="shadow border flex-grow  focus:outline-teal-500 w-7/12 rounded-lg py-2 px-3 my-5 mr-5 text-grey-darker"
                      required
                      value={habit}
                      onChange={(e) => setHabit(e.target.value)}
                      placeholder="Add new habit"
                    />

                    <button
                      type="submit"
                      id="add-button"
                      data-testid="add-button"
                      className="flex-grow-0 items-center justify-center w-2/12 p-2 border-2 rounded-lg border-green-400 text-white bg-green-400 hover:bg-green-500"
                      onClick={sendHabit}
                      disabled={isFetching || !habit.length ? true : false}
                    >
                      Add Habit
                    </button>
                  </div>
                  {isFetching ? (
                    <div className="grid justify-items-center py-60">
                      <Loader />
                    </div>
                  ) : (
                    <div className="p-4 border-b border-gray-200">
                      <h4 className="text-center my-2">Habit List</h4>
                      <table className="p-4 min-w-full divide-y-2 divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr className="">
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Habit
                            </th>
                            {defaultWeekdays.map((day, index) => {
                              return today === day ? (
                                <th
                                  scope="col"
                                  key={"day-" + index}
                                  className="px-6 py-3 text-center text-xs font-medium text-white bg-green-400 rounded-lg  uppercase tracking-wider"
                                >
                                  {day}
                                </th>
                              ) : (
                                <th
                                  scope="col"
                                  key={"day-" + index}
                                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  {day}
                                </th>
                              );
                            })}

                            <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y-2 divide-gray-200  ">
                          {habits.map((habit, index) => {
                            return (
                              <Habit
                                habit={habit}
                                key={"habit-" + index}
                                callBack={getHabits}
                              />
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
