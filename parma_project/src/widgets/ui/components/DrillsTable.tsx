import { Button, Table, TableColumnsType, TableProps } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import tableStore from '../../../store/tableStore';
import { IDrill } from '../../../shared/types/types';
import AddDrillForm from './AddDrillForm';
const DrillsTable: React.FC = observer(() => {
  useEffect(() => {
    tableStore.getDrills()
  }, []);

  const columns: TableColumnsType<IDrill> = [
    { 
      title: 'ID',
      dataIndex: 'id',
      showSorterTooltip: { target: 'full-header' },
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Название',
      dataIndex: 'name',
      showSorterTooltip: { target: 'full-header' },
      sorter: (a, b) => a.name.toLowerCase().substring(0, 1).localeCompare(b.name.toLowerCase().substring(0, 1)),
      sortDirections: ['ascend', 'descend'],
      onCell: (record) => ({
        onClick: () => {
          console.log(record.id)
        },
      }),
    },
    {
      title: 'Диаметр',
      dataIndex: 'diameter',
      showSorterTooltip: { target: 'full-header' },
      sorter: (a, b) => a.diameter - b.diameter,
      sortDirections: ['ascend', 'descend'],
      filters: tableStore.getDiameters().map((diameter) => ({
        text: `${diameter} мм`,
        value: diameter,
      })),
      filterMultiple: false,
      onFilter: (value, record) => record.diameter === value,
    },
    {
      title: 'Длинна',
      dataIndex: 'length_xD',
      showSorterTooltip: { target: 'full-header' },
      sorter: (a, b) => a.length_xD - b.length_xD,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Глубина сверления',
      dataIndex: 'deep_of_drill',
      showSorterTooltip: { target: 'full-header' },
      sorter: (a, b) => a.deep_of_drill - b.deep_of_drill,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Пластина',
      dataIndex: 'plate',
    },
    {
      title: 'Винт',
      dataIndex: 'screw',
    },
    {
      title: 'Компания',
      dataIndex: 'company',
      showSorterTooltip: { target: 'full-header' },
      sorter: (a, b) => a.company.toLowerCase().substring(0, 1).localeCompare(b.company.toLowerCase().substring(0, 1)),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Изображение',
      dataIndex: 'image_path',
      render: (record) => (
        record?.image_path ? (
          <img src={`http://45.9.73.213:8003/${record.image_path}`} alt="Изображение не найдено" style={{ width:'50px', height:'50px',objectFit:'contain' }} />
        ) : null
      ),
    },
  ];

  const onChange: TableProps<IDrill>['onChange'] = ( sorter, extra) => {
    console.log('params', sorter, extra);
  };

  return(
    <>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
        <Button type="primary" onClick={() => tableStore.handleIsBroken()}>{`isBroken ${tableStore.isBroken}`}</Button>
        <AddDrillForm/>
      </div>
      <Table<IDrill>
        rowKey={'id'}
        columns={columns}
        dataSource={tableStore.drills}
        onChange={onChange}
        showSorterTooltip={{ target: 'sorter-icon' }}
        loading={!tableStore.drills.length ? true : false}
        scroll={{ y: 55 * 5 }}
        pagination={false}
      />
    </>
  )
});

export default DrillsTable;