const MainInput = ({ type, name, id, label, value, setInputValue, options = []}) => {
  return (
    <>
      <div className="mb-3" style={{ direction: "rtl" }}>
        <label htmlFor={id}>{label}</label>
        {type == "textarea" ? (
          <textarea
            className="form-control"
            name={name}
            id={id}
            rows={5}
            value={value}
            onChange={(e) => setInputValue(e.target.value)}
          ></textarea>
        ) : type == "text" ? (
          <input
            className="form-control"
            type="text"
            id={id}
            max={30}
            value={value}
            onChange={(e) => setInputValue(e.target.value)}
          />
        ) : (
          <select
            className="form-control"
            name={name}
            id={id}
            value={value}
            onChange={(e) => setInputValue(e.target.value)}
          >
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
