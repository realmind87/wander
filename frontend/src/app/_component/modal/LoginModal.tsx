import React, { useState } from 'react';
import Modal from './Modal'; // Modal 컴포넌트 경로에 맞게 조정

const ParentComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
    
  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>This is a modal!</p>
      </Modal>
    </div>
  );
};

export default ParentComponent;