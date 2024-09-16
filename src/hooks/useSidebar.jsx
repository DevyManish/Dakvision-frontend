import React, { useState } from 'react';

function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false);
  const toggleSidebar = () => {
    setIsMinimized(prevState => !prevState);
  };

  return (
    <div>
      <button onClick={toggleSidebar}>
      </button>
      <div style={{ width: isMinimized ? '60px' : '250px', transition: 'width 0.3s' }}>
        <div>{isMinimized ? 'Minimized' : 'Expanded'}</div>
      </div>
    </div>
  );
}

export default Sidebar;
