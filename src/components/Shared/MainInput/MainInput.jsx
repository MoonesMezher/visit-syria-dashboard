import { useState } from "react";
const MainInput = (Props) => {
  const [input_value, setInputValue] = useState(" ");
  return (
    <>
      <div className="mb-3" style={{ direction: "rtl" }}>
        <label htmlFor={Props.id}>{Props.label}</label>
        {Props.type == "textarea" ? (
          <textarea
            className="form-control"
            name={Props.name}
            id={Props.id}
            rows={Props.rows_num}
            value={input_value}
            onChange={(e) => setInputValue(e.target.value)}
          ></textarea>
        ) : Props.type == "text" ? (
          <input
            className="form-control"
            type="text"
            id={Props.id}
            max={30}
            value={input_value}
            onChange={(e) => setInputValue(e.target.value)}
          />
        ) : (
          <select
            className="form-control"
            name={Props.name}
            id={Props.id}
            value={input_value}
            onChange={(e) => setInputValue(e.target.value)}
          >
            {Props.options.map((e, index) => (
              <option key={index} value={e}>
                {e}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  );
};

export default MainInput;
