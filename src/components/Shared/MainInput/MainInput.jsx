import './MainInput.css'

const MainInput = ({ type, name, id, label, value, setInputValue, options = []}) => {
  return (
    <>
      <div className="mb-3" style={{ direction: "rtl" }}>
        <label className="input-label" htmlFor={id} style={{marginBottom:"5px"}}>{label}</label>
        {type == "textarea" ? (
          <textarea
            className="form-control"
            name={name}
            id={id}
            rows={3}
            value={value}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              marginTop: '10px',
              background: 'transparent',
              borderColor: 'rgba(159, 154, 154, 1)',
            }}
          ></textarea>
        ) : type == "text" ? (
          <input
            className="form-control"
            type="text"
            id={id}
            max={30}
            value={value}
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
