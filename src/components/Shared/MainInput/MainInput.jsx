import './MainInput.css'

const MainInput = ({ type, name, id, label, value, setInputValue, options = [], defaultValue }) => {
  return (
    <>
      <div className="mb-3" style={{ direction: "rtl" }}>
        <label htmlFor={id}>{label}</label>
        {type == "textarea" ? (
          <textarea
            defaultValue={defaultValue}
            className="form-control"
            name={name}
            id={id}
            rows={3}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              marginTop: '10px',
              background: 'transparent',
              borderColor: 'rgba(159, 154, 154, 1)',
            }}
          ></textarea>
        ) : type == "text" ? (
          <input
            defaultValue={defaultValue}
            className="form-control"
            name={name}
            id={id}
            // max={30}
            // value={value}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              outline: '0px solid red',
              marginTop: '10px',
              background: 'transparent',
              borderColor: 'rgba(159, 154, 154, 1)',
            }}
          />
        ) : (
          <select
            defaultValue={defaultValue}
            className="form-control"
            name={name}
            id={id}
            value={value}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              outline: '0px solid red',
              marginTop: '10px',
              background: 'transparent',
              borderColor: 'rgba(159, 154, 154, 1)',
            }}
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
