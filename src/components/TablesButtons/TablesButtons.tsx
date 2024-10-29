import { Button } from 'antd';
import AddDrillForm from './../AddDrillForm';
import 'app/index.css';

const TablesButtons = ({ openFilter, activeItems }: { openFilter: () => void, activeItems: string }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
      <Button type="primary" onClick={openFilter}>
        Фильтры
      </Button>
      {
        activeItems !== 'archive_drills' && <AddDrillForm />
      }
    </div>
  );
};

export default TablesButtons;
