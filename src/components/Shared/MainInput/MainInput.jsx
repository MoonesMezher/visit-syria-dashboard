const MainInput = ({ type, name, id,value, label,  setInputValue, options = [],selected,defaultValue}) => {
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
            // value={value}
            defaultValue={defaultValue}
            onChange={(e) => setInputValue(e.target.value)}
          ></textarea>
        ) : type == "text" ? (
          <input
            className="form-control"
            type="text"
            id={id}
            max={30}
            defaultValue={defaultValue}

            // value={value}
            onChange={(e) => setInputValue(e.target.value)}
          />
        ) : (
          <select
            className="form-control"
            name={name}
            id={id}
            defaultValue={defaultValue}

            value={value}
            onChange={(e) => setInputValue(e.target.value)}
          >
             <option   selected>
                {selected}
              </option>
            {options.map((e, index) => (
              <>
              
                <option key={index} value={e}>
                {e}
              </option>
              </>
            
            ))}
          </select>
        )}
      </div>
    </>
  );
};

export default MainInput;
