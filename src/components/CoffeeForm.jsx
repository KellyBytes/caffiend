import { coffeeOptions } from '../utils';

const CoffeeForm = () => {
  return (
    <>
      <div className="section-header">
        <i className="fa-solid fa-pencil" />
        <h2>Start Tracking Today</h2>
      </div>
      <h4>Select coffee type</h4>
      <div className="coffee-grid">
        {coffeeOptions.slice(0, 5).map((option, optionIndex) => {
          return (
            <button className="button-card" key={optionIndex}>
              <h4>{option.name}</h4>
              <p>{option.caffeine} mg</p>
            </button>
          );
        })}
        <button className="button-card">
          <h4>Other</h4>
          <p>n/a</p>
        </button>
      </div>
      <select name="coffee-list" id="coffee-list">
        <option value={null}>Select type</option>
        {coffeeOptions.map((option, optionIndex) => {
          return (
            <option value={option.name} key={optionIndex}>
              {option.name} ({option.caffeine} mg)
            </option>
          );
        })}
      </select>
      <h4>Add the cost ($)</h4>
      <input type="number" className="w-full" placeholder="e.g. 4.50" />
      <h4>Time since consumption</h4>
      <div className="time-entry">
        <div>
          <h4>Hours</h4>
          <select name="hours" id="hours-select">
            {Array.from({ length: 24 }, (_, i) => i).map((hour, hourIndex) => (
              <option value={hour} key={hourIndex}>
                {hour}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h4>Mins</h4>
          <select name="hours" id="hours-select">
            {Array.from({ length: 12 }, (_, i) => i * 5).map(
              (min, minIndex) => (
                <option value={min} key={minIndex}>
                  {min}
                </option>
              )
            )}
          </select>
        </div>
      </div>
      <button>
        <p>Add Entry</p>
      </button>
    </>
  );
};

export default CoffeeForm;
