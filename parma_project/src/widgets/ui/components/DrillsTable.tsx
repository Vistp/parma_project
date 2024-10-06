import { Button, Drawer, Table, TableColumnsType, TableProps, Checkbox, Tag, Switch } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import tableStore from '../../../store/tableStore';
import { IDrill } from '../../../shared/types/types';
import AddDrillForm from './AddDrillForm';
import { useTheme } from '../../../context/ThemeContext'; // Импортируйте контекст темы

const DrillsTable: React.FC = observer(() => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedDiameters, setSelectedDiameters] = useState<number[]>([]);
  const { toggleTheme, isDarkMode } = useTheme(); // Получите функции и состояние темы

  useEffect(() => {
    tableStore.getDrills();
  }, []);

  const columns: TableColumnsType<IDrill> = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Название',
      dataIndex: 'name',
      sorter: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Диаметр',
      dataIndex: 'diameter',
      sorter: (a, b) => a.diameter - b.diameter,
      sortDirections: ['ascend', 'descend'],
      render: (text, record) => <span>{record.diameter} мм</span>,
    },
    {
      title: 'Длинна',
      dataIndex: 'length_xD',
      sorter: (a, b) => a.length_xD - b.length_xD,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Глубина сверления',
      dataIndex: 'deep_of_drill',
      sorter: (a, b) => a.deep_of_drill - b.deep_of_drill,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Компания',
      dataIndex: 'company',
      sorter: (a, b) => a.company.toLowerCase().localeCompare(b.company.toLowerCase()),
      sortDirections: ['ascend', 'descend'],
    },
   {
  title: 'Изображение',
  dataIndex: 'image_path',
  render: (imagePath: string) => {
    const imageUrl = `http://45.9.73.213:8003/${imagePath}`;

    // Логируем URL изображения для отладки
    console.log('Image URL:', imageUrl);

    return (
      <>
        {imagePath ? (
          <img
            src={imageUrl}
            alt="Изображение не найдено"
            style={{
              width: '50px',
              height: '50px',
              objectFit: 'contain',
              borderRadius: '4px',
              border: '1px solid #e0e0e0',
            }}
            onError={(e) => {
              console.error(`Ошибка загрузки изображения: ${imageUrl}`);
              e.currentTarget.src = 'path/to/default/image.png'; // Установите путь к изображению по умолчанию
              e.currentTarget.onerror = null; // Удалите обработчик ошибки, чтобы избежать бесконечной загрузки
            }}
          />
        ) : (
          <span style={{ color: 'red' }}>Изображение не найдено</span>
        )}
      </>
    );
  },
},

  ];

  const openFilterDrawer = () => {
    setDrawerVisible(true);
  };

  const closeFilterDrawer = () => {
    setDrawerVisible(false);
  };

  const applyFilter = () => {
    closeFilterDrawer();
  };

  const onDiametersFilterChange = (values: number[]) => {
    setSelectedDiameters(values);
  };

  const resetFilter = () => {
    setSelectedDiameters([]);
    closeFilterDrawer();
  };

  const filteredData = selectedDiameters.length
    ? tableStore.drills.filter((drill) => selectedDiameters.includes(drill.diameter))
    : tableStore.drills;

  const onChange: TableProps<IDrill>['onChange'] = (sorter, extra) => {
    console.log('params', sorter, extra);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <Button type="primary" onClick={() => tableStore.handleIsBroken()}>{`isBroken ${tableStore.isBroken}`}</Button>
        <Button onClick={openFilterDrawer}>Фильтры</Button>
        <AddDrillForm />
        <Switch checked={isDarkMode} onChange={toggleTheme} checkedChildren="Тёмная" unCheckedChildren="Светлая" />
      </div>

      {/* Индикация активных фильтров */}
      {selectedDiameters.length > 0 && (
        <div style={{ marginBottom: '10px' }}>
          <h4>Применённые фильтры:</h4>
          {selectedDiameters.map(diameter => (
            <Tag key={diameter} color="blue" style={{ marginRight: '5px' }}>
              {diameter} мм
            </Tag>
          ))}
          <Button type="link" onClick={resetFilter}>Сбросить фильтры</Button>
        </div>
      )}

      <Table<IDrill>
        rowKey={'id'}
        columns={columns}
        dataSource={filteredData}
        onChange={onChange}
        loading={!tableStore.drills.length}
        scroll={{ y: 55 * 5 }}
        pagination={false}
      />

      {/* Drawer для фильтров */}
      <Drawer
        title="Фильтрация по диаметрам"
        placement="right"
        onClose={closeFilterDrawer}
        visible={drawerVisible}
      >
        <div>
          <h3>Выберите диаметры:</h3>
          <Checkbox.Group
            options={tableStore.getDiameters()
              .sort((a, b) => b - a)
              .map((diameter) => ({
                label: `${diameter} мм`,
                value: diameter,
              }))}
            onChange={onDiametersFilterChange}
            value={selectedDiameters}
            style={{ display: 'flex', flexDirection: 'column' }}
          />

          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={resetFilter}>Сброс</Button>
            <Button type="primary" onClick={applyFilter}>Применить фильтр</Button>
          </div>
        </div>
      </Drawer>
    </>
  );
});

export default DrillsTable;