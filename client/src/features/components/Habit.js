import moment from "moment";
import { useDispatch } from "react-redux";
import Checxbox from "./Checkbox";

import { markHabit } from "../../store/slices/habitSlice";
export default function Habit({ habit }) {
  const startOfWeek = moment().startOf("isoWeek");
  const endOfWeek = moment().endOf("isoWeek");

  let days = [];
  let day = startOfWeek;

  while (day <= endOfWeek) {
    days.push(moment(day.toDate()).format("YYYY-MM-DD"));
    day = day.clone().add(1, "d");
  }
  const dispach = useDispatch();

  const setHabitStatus = async (date, status) => {
    let dateObj = {
      date: date,
      complete: status,
    };
    await dispach(markHabit(habit.id, dateObj));
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
              <Checxbox
                date={day}
                index={index}
                value={true}
                callBack={setHabitStatus}
              />
            ) : (
              <Checxbox
                date={day}
                index={index}
                value={false}
                callBack={setHabitStatus}
              />
            )}
          </td>
        );
      })}
    </tr>
  );
}
