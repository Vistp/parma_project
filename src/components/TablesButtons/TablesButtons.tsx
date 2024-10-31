import { Button } from 'antd';
import 'app/index.css';
import AddModal from 'components/AddForm/AddModal';
import { DetailType } from 'types/types';


const TablesButtons = ({ openFilter, activeItems }: { openFilter: () => void, activeItems: DetailType }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
      <Button type="primary" onClick={openFilter}>
        Фильтры
      </Button>
      {
        activeItems !== 'archive_drills' && <AddModal activeItems={activeItems} />
      }
    </div>
  );
};

export default TablesButtons;
