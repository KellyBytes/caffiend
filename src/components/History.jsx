import { useAuth } from '../context/AuthContext';
import {
  calculateCurrentCaffeineLevel,
  coffeeConsumptionHistory,
  getCaffeineAmount,
  timeSinceConsumption,
} from '../utils';
import { useState } from 'react';

const History = () => {
  const { globalData } = useAuth();
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <>
      <div className="section-header">
        <i className="fa-solid fa-clock-rotate-left" />
        <h2>History</h2>
      </div>
      <div className="history-data">
        <p>
          <i>Hover or click for more information</i>
        </p>
        <div className="coffee-history">
          {Object.keys(globalData)
            .sort((a, b) => b - a) // descending order
            .map((utcTime, coffeeIndex) => {
              const coffee = globalData[utcTime];
              const timeSinceConsumed = timeSinceConsumption(utcTime);
              const originalAmount = getCaffeineAmount(coffee.name);
              const remainingAmount = Number(
                calculateCurrentCaffeineLevel({
                  [utcTime]: coffee,
                })
              ).toFixed(1);
              // const summary = `${coffee.name} | ${timeSinceConsumed} | $${coffee.cost} | ${remainingAmount}mg / ${originalAmount}mg`;

              const summary = `${coffee.name}\n$${coffee.cost.toFixed(
                2
              )}\n${timeSinceConsumed}\n${remainingAmount} / ${originalAmount}mg`;

              return (
                // <div title={summary} key={coffeeIndex}>
                //   <i className="fa-solid fa-mug-hot" />
                // </div>
                <div
                  key={coffeeIndex}
                  className="coffee-history-item"
                  onClick={() =>
                    setActiveIndex(
                      activeIndex === coffeeIndex ? null : coffeeIndex
                    )
                  }
                  onMouseEnter={() => setActiveIndex(null)}
                >
                  <i className="fa-solid fa-mug-hot" />
                  {/* hover & click*/}
                  <div
                    className={`tooltip-text ${
                      activeIndex === coffeeIndex ? 'visible' : ''
                    }`}
                  >
                    {summary}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default History;
