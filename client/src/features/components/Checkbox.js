import { useState } from "react";

export default function Checkbox({ date, value, index, callBack }) {
  const [val, setVal] = useState(value);
  const settingChange = (status) => {
    setVal(status);
    callBack(date, status);
  };
  return (
    <label
      key={"date" + Math.random() + "-" + index}
      className="inline-flex items-center"
    >
      <input
        type="checkbox"
        className="text-indigo-500 w-4 h-4 mr-2 focus:ring-indigo-400 focus:ring-opacity-25 border border-gray-300 rounded"
        onChange={(e) => settingChange(e.target.checked)}
        value={val}
        checked={val}
        id={"id" + Math.random() + "-" + index}
      />
    </label>
  );
}
