import React, { useState } from 'react';
import './swithTabs.scss';
const SwithTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectTabs] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTabs = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectTabs(index);
    }, 300);
    onTabChange(tab, index);
  };
  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tab, index) => {
          return (
            <span
              key={index}
              onClick={() => activeTabs(tab, index)}
              className={`tabItem ${selectedTab === index ? 'active' : ''}`}
            >
              {tab}
            </span>
          );
        })}
        <span className="movingBg" style={{ left: left }}></span>
      </div>
    </div>
  );
};

export default SwithTabs;
