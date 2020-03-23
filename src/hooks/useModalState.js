import { useState, useCallback, useMemo } from 'react';

export default (initialState, modalNames = []) => {
  const [activeModal, setActiveModal] = useState(initialState || false);

  const openModal = useCallback(name => setActiveModal(name || true), []);
  const closeModal = useCallback(() => setActiveModal(false), []);

  // авто-генерация методов для открытия модалок по имени => название метода openModal + название модалки
  const openModalActions = useMemo(() => modalNames.reduce((acc, modalName) => {
    acc[`openModal${modalName[0].toUpperCase()}${modalName.slice(1)}`] = () => openModal(modalName);
    return acc;
  }, {}), []);

  return {
    activeModal,
    openModal,
    closeModal,
    ...openModalActions,
  };
};
