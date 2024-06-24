
import './MainInput.css'

const MainInput = ({ type, name, id, label, value, setInputValue, options = [], defaultValue }) => {
  return (
    <>
      <div className="mb-3" style={{ direction: "rtl" }}>
        <label htmlFor={id}>{label}</label>
        {type == "textarea" ? (
          <textarea
            defaultValue={value}
            className="form-control"
            name={name}
            id={id}
            rows={3}
            // value={value}            
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              marginTop: '10px',
              background: 'transparent',
              borderColor: 'rgba(159, 154, 154, 1)',
            }}
          ></textarea>
        ) : type == "text" ? (
          <input
            defaultValue={value}
            className="form-control"
            name={name}
            id={id}
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
            className="main-select me-2"
            defaultValue={value}
            name={name}
            id={id}
            // value={value}
            onChange={(e) => {
              setInputValue(e.target.value)
              // console.log(e.target.value);
            }}
            style={{
              outline: '0px solid red',
              marginTop: '10px',
              background: 'transparent',
              borderColor: 'rgba(159, 154, 154, 1)',
              textAlign: 'center',
              cursor: 'pointer',
              padding: '0 10px',
              borderRadius: '5px'
            }}
          >
          <option value="none" className='text-center'>عدم</option>
            {options.map((e, index) => (
              <option key={index} value={e.id} className='text-center'>
                {e.name}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  );
};

export default MainInput;
