import { Button, Modal } from 'antd';
import { useState } from 'react';
import { addDrill, addScrew, addPlate } from 'utils/api';
import { useThemeContext } from 'app/ThemeContextProvaider';
import ScrewForm from './Forms/ScrewForm';
import PlateForm from './Forms/PlateForm';
import { DetailType } from 'types/types';
import DrillForm from './Forms/DrillForm';
import tableStore from 'store/tableStore';

const AddModal = ({ activeItems }: { activeItems: DetailType }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { mode } = useThemeContext();

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleSuccess = () => {
    setModalOpen(false);
    tableStore.getDetails(activeItems);
  };

  const renderForm = () => {
    switch (activeItems) {
      case 'drills':
        return <DrillForm onSubmit={addDrill} onSuccess={handleSuccess} />;
      case 'screws':
        return <ScrewForm onSubmit={addScrew} onSuccess={handleSuccess} />;
      case 'plates':
        return <PlateForm onSubmit={addPlate} onSuccess={handleSuccess} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setModalOpen(true)}>
        Добавить {activeItems === 'drills' ? 'сверло' : activeItems === 'screws' ? 'винт' : 'пластину'}
      </Button>
      <Modal
        className={mode === 'light' ? 'light-theme' : 'dark-theme'}
        title={`Добавление ${activeItems === 'drills' ? 'сверла' : activeItems === 'screws' ? 'винта' : 'пластины'}`}
        open={modalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        {renderForm()}
      </Modal>
    </>
  );
};

export default AddModal;
