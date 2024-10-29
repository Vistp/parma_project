import { Button, Table, TableProps, Tag } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import tableStore from 'store/tableStore';
import { DetailType, IDetail } from 'types/types';
import { useThemeContext } from 'app/ThemeContextProvaider';
import { EditDrillForm } from '../EditDrillForm';
import TablesButtons from 'components/TablesButtons/TablesButtons';
import TablesFilter from 'components/TablesFilter/TablesFilter';
import { drillsColumns, platesColumns, skrewsColumns, archiveDrillsColumns } from './columns';
import { useLocation } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import 'app/index.css';

const InitialTable = observer(() => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedParameters, setSelectedParameters] = useState<number[]>([]);
  const [visible, setVisible] = useState(false);
  const activeItems: string = useLocation().pathname.slice(1);

  useEffect(() => {
    const fetchDetails = async () => {
      await tableStore.getDetails(activeItems as DetailType);
    };

    fetchDetails();
    setSelectedParameters([]);
  }, [activeItems]);

  const handleEditClick = (id: number) => {
    tableStore.getDetailIdEdit(id);
    setVisible(true)
  }

  const handleCloseModal = () => {
    setVisible(false); 
  };

	let columns: ColumnsType<IDetail> = drillsColumns(handleEditClick);

  const filteredData = selectedParameters.length
  ? tableStore.details.filter((detail) => {
      if (detail.diameter) {
        return selectedParameters.includes(detail.diameter)
      } else if (detail.length) {
        return selectedParameters.includes(detail.length)
      } else if (detail.amount) {
        return selectedParameters.includes(detail.amount)
      }
    })
  : tableStore.details;

	switch (activeItems) {
		case 'drills':
			columns = drillsColumns(handleEditClick);
			break;
		case 'screws':
			columns = skrewsColumns(handleEditClick);
			break;
		case 'plates':
			columns = platesColumns(handleEditClick);
			break;
    case 'archive_drills':
      columns = archiveDrillsColumns(handleEditClick);
      break;
	};

  const openFilterDrawer = () => {
    setDrawerVisible(true);
  };

  const closeFilterDrawer = () => {
    setDrawerVisible(false);
  };

  const resetFilter = () => {
    setSelectedParameters([]);
    setDrawerVisible(false);
  };

  const onChange: TableProps<IDetail>['onChange'] = (sorter, extra) => {
    console.log('params', sorter, extra);
  };

  const { mode } = useThemeContext(); // тема 'light' или 'dark'

  return (
    <>
      {/* Панель кнопок над таблицей*/}
			<TablesButtons openFilter={openFilterDrawer} />

      {/* Индикация активных фильтров */}
      {selectedParameters.length > 0 && (
        <div style={{ marginBottom: '5px' }}>
          <h4>Применённые фильтры:</h4>
          {selectedParameters.map((diameter) => (
            <Tag key={diameter} color="blue" style={{ marginRight: '5px' }}>
              {diameter} мм
            </Tag>
          ))}
          <Button type="link" onClick={resetFilter}>
            Сбросить фильтры
          </Button>
        </div>
      )}

      <Table
        className={mode === 'light' ? 'light-theme' : 'dark-theme'}
        rowKey={'id'}
        columns={columns}
        dataSource={filteredData}
        onChange={onChange}
        scroll={{ x: 1000, y: 55 * 5 }}
        pagination={false}
        onRow={(record) => ({
          onClick: () => {tableStore.getDetailIdDescription(record.id)},
          style: { cursor: 'pointer' }
        })}
      />

      {/* Drawer для фильтров */}
      <TablesFilter
				closeFilterDrawer={closeFilterDrawer}
				drawerVisible={drawerVisible}
				setSelectedParameters={setSelectedParameters}
				selectedParameters={selectedParameters}
				resetFilter={resetFilter}
			/>
      <EditDrillForm 
        id={tableStore.idDetailEdit}
        activeItem={activeItems as DetailType}
        visible={visible} 
        onClose={handleCloseModal}
			/>
    </>
  );
});

export default InitialTable;

