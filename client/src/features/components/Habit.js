import moment from "moment";
import { useDispatch } from "react-redux";

import Checkbox from "./Checkbox";
import { markHabit, deleteHabit } from "../../store/slices/habitSlice";
export default function Habit({ habit, callBack }) {
  const startOfWeek = moment().startOf("isoWeek");
  const endOfWeek = moment().endOf("isoWeek");

  let days = [];
  let day = startOfWeek;

  while (day <= endOfWeek) {
    days.push(moment(day.toDate()).format("YYYY-MM-DD"));
    day = day.clone().add(1, "d");
  }
  const dispatch = useDispatch();
  const setHabitStatus = async (date, status) => {
    let dateObj = {
      date: date,
      complete: status,
    };
    await dispatch(markHabit({ habitId: habit._id, dateObj }));
    callBack();
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-medium text-gray-500">
          {habit.content}
        </span>
      </td>
      {days.map((day, index) => {
        return (
          <td
            key={day + "-" + index}
            className="px-6 py-3 text-center whitespace-nowrap"
          >
            {habit.dates.some(
              (habitDay) => habitDay.date === day && habitDay.complete === true
            ) ? (
              <Checkbox
                date={day}
                index={index}
                value={true}
                callBack={setHabitStatus}
              />
            ) : (
              <Checkbox
                date={day}
                index={index}
                value={false}
                callBack={setHabitStatus}
              />
            )}
          </td>
        );
      })}
      <td>
        <button
          className="bg-red-400	 rounded-xl text-white px-2 text-2xl	"
          onClick={async () => {
            await dispatch(deleteHabit(habit._id));
            callBack();
          }}
        >
          ␡
        </button>
      </td>
    </tr>
  );
}
