import "./MainInput.css";
const MainInput = ({
  type,
  name,
  id,
  label,
  value,
  setInputValue,
  options,
}) => {
  return (
    <>
      <div className="mb-3" style={{ direction: "rtl" }}>
        <div>
          <label htmlFor={id}>{label}</label>
        </div>
        {type == "textarea" ? (
          <textarea
            className="textarea-input-style"
            name={name}
            id={id}
            rows={4}
            value={value}
            onChange={(e) => setInputValue(e.target.value)}
          ></textarea>
        ) : type == "text" ? (
          <input
            className="text-input-style"
            type="text"
            name={name}
            id={id}
            max={30}
            value={value}
            onChange={(e) => setInputValue(e.target.value)}
          />
        ) : (
          <select
            className={"select-control select-input-style"}
            name={name}
            id={id}
            value={value}
            onChange={(e) => setInputValue(e.target.value)}
          >
            {/* <option selected>Open this select menu</option> */}
            {options.map((e, index) => (
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
