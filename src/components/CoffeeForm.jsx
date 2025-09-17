import { useState } from 'react';
import { coffeeOptions } from '../utils';
import Modal from './Modal';
import Authentication from './Authentication';
import { useAuth } from '../context/AuthContext';
import { db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

const CoffeeForm = (props) => {
  const { isAuthenticated } = props;

  const [showModal, setShowModal] = useState(false);
  const [showCoffeeTypes, setShowCoffeeTypes] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [coffeeCost, setCoffeeCost] = useState('');
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);

  const { globalData, setGlobalData, globalUser } = useAuth();

  const handleSubmitForm = async () => {
    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }

    // define a guard clause that only submits the form if it is completed
    if (!selectedCoffee) return;

    try {
      // then we're going to create a new data object
      const newGlobalData = { ...(globalData || {}) };

      const currentTime = Date.now();
      const timeToSubtract = hour * 60 * 60 * 1000 + min * 60 * 1000;
      const timestamp = currentTime - timeToSubtract;

      const newData = {
        name: selectedCoffee,
        cost: coffeeCost ? parseFloat(coffeeCost) : null,
      };
      newGlobalData[timestamp] = newData;
      console.log(timestamp, selectedCoffee, coffeeCost);

      // update the global state
      setGlobalData(newGlobalData);

      // persist the data in the firebase firestore
      const userRef = doc(db, 'users', globalUser.uid);
      const res = await setDoc(
        userRef,
        {
          [timestamp]: newData,
        },
        { merge: true }
      );

      setSelectedCoffee(null);
      setCoffeeCost('');
      setHour(0);
      setMin(0);
      setShowCoffeeTypes(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal handleCloseModal={handleCloseModal}>
          <Authentication handleCloseModal={handleCloseModal} />
        </Modal>
      )}
      <div className="section-header">
        <i className="fa-solid fa-pencil" />
        <h2>Start Tracking Today</h2>
      </div>
      <h4>Select coffee type</h4>
      <div className="coffee-grid">
        {coffeeOptions.slice(0, 5).map((option, optionIndex) => {
          return (
            <button
              onClick={() => {
                setSelectedCoffee(option.name);
                setShowCoffeeTypes(false);
              }}
              className={`button-card ${
                option.name === selectedCoffee ? 'coffee-button-selected' : ''
              }`}
              key={optionIndex}
            >
              <h4>{option.name}</h4>
              <p>{option.caffeine} mg</p>
            </button>
          );
        })}
        <button
          onClick={() => {
            setShowCoffeeTypes(true);
            setSelectedCoffee(null);
          }}
          className={`button-card ${
            showCoffeeTypes ? 'coffee-button-selected' : ''
          }`}
        >
          <h4>Other</h4>
          <p>n/a</p>
        </button>
      </div>
      {showCoffeeTypes && (
        <select
          onChange={(e) => {
            setSelectedCoffee(e.target.value);
          }}
          name="coffee-list"
          id="coffee-list"
        >
          <option value={null}>Select type</option>
          {coffeeOptions.map((option, optionIndex) => {
            return (
              <option value={option.name} key={optionIndex}>
                {option.name} ({option.caffeine} mg)
              </option>
            );
          })}
        </select>
      )}
      <h4>Add the cost ($)</h4>
      <input
        type="number"
        className="w-full"
        value={coffeeCost}
        onChange={(e) => setCoffeeCost(e.target.value)}
        placeholder="e.g. 4.50"
      />
      <h4>Time since consumption</h4>
      <div className="time-entry">
        <div>
          <h4>Hours</h4>
          <select
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            id="hours-select"
          >
            {Array.from({ length: 24 }, (_, i) => i).map((hour, hourIndex) => (
              <option value={hour} key={hourIndex}>
                {hour}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h4>Mins</h4>
          <select
            value={min}
            onChange={(e) => setMin(e.target.value)}
            id="mins-select"
          >
            {Array.from({ length: 4 }, (_, i) => i * 15).map(
              (min, minIndex) => (
                <option value={min} key={minIndex}>
                  {min}
                </option>
              )
            )}
          </select>
        </div>
      </div>
      <button onClick={handleSubmitForm}>
        <p>Add Entry</p>
      </button>
    </>
  );
};

export default CoffeeForm;
