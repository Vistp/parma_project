import { TableColumnsType } from 'antd';
import NoPhotographyOutlinedIcon from '@mui/icons-material/NoPhotographyOutlined';
import { IDetail } from 'types/types';
import 'app/index.css';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteDetail } from 'utils/api';
import { ColumnType } from 'antd/es/table';
import { DetailType } from 'types/types';

const finstImage = {
  title: 'Изображение',
  dataIndex: 'image_path',
  render: (imagePath: string) => {
    if (!imagePath) {
      return <NoPhotographyOutlinedIcon fontSize="large" />;
    }
    const firstImagePath = imagePath.split(',')[0].trim();
    const imageUrl = `${import.meta.env.VITE_BASE_URL}${firstImagePath}`;

    return (
      <>
        {firstImagePath ? (
          <img
            src={imageUrl}
            alt="Изображение не найдено"
            style={{
              width: '50px',
              height: '50px',
              objectFit: 'contain',
              border: '1px solid #e0e0e0',
            }}
          />
        ) : (
          <NoPhotographyOutlinedIcon fontSize="large" />
        )}
      </>
    );
  },
};

function actions(handleEditClick: (id: number) => void, detail: DetailType): ColumnType<IDetail> {
  return {
    title: 'Действия',
    render: (_text, record) => (
      <>
        {detail !== 'archive_drills' && (
          <IconButton edge="start" color="inherit" onClick={() => handleEditClick(record.id)}>
          <EditIcon />
        </IconButton>
        )}
        <IconButton edge="end" color="inherit" onClick={() => deleteDetail(record.id, detail)}>
          <DeleteIcon />
        </IconButton>
      </>
    ),
  };
}

const drillsColumns = (handleEditClick: (id: number) => void): TableColumnsType<IDetail> => {
  return [
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
      render: (_text, record) => <span>{record.diameter} мм</span>,
    },
    {
      title: 'Длина',
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
      title: 'Винты',
      render: (_value, record) => (
        <select defaultValue="Винты">
          {record.screws?.map((screw) => (
            <option key={screw.id}>{screw.type}</option>
          ))}
        </select>
      ),
    },
    {
      title: 'Пластины',
      render: (_value, record) => (
        <select defaultValue="Пластины">
          {record.plates?.map((plate) => (
            <option key={plate.id}>{plate.type}</option>
          ))}
        </select>
      ),
    },
    finstImage,
    actions(handleEditClick, 'drills') as ColumnType<IDetail>,
  ];
};

const skrewsColumns = (handleEditClick: (id: number) => void): TableColumnsType<IDetail> => {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Тип',
      dataIndex: 'type',
      sorter: (a, b) => a.type.toLowerCase().localeCompare(b.type.toLowerCase()),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Длина',
      dataIndex: 'length',
      sorter: (a, b) => a.length - b.length,
      sortDirections: ['ascend', 'descend'],
      render: (_text, record) => <span>{record.length} мм</span>,
    },
    {
      title: 'Резьба',
      dataIndex: 'thread',
      sorter: (a, b) => a.company.toLowerCase().localeCompare(b.company.toLowerCase()),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Шаг резьбы',
      dataIndex: 'step_of_thread',
      sorter: (a, b) => a.step_of_thread - b.step_of_thread,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Компания',
      dataIndex: 'company',
      sorter: (a, b) => a.company.toLowerCase().localeCompare(b.company.toLowerCase()),
      sortDirections: ['ascend', 'descend'],
    },
    finstImage,
    actions(handleEditClick, 'screws') as ColumnType<IDetail>,
  ];
};

const platesColumns = (handleEditClick: (id: number) => void): TableColumnsType<IDetail> => {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Тип',
      dataIndex: 'sub_type',
      sorter: (a, b) => a.type.toLowerCase().localeCompare(b.type.toLowerCase()),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Материал',
      dataIndex: 'material',
      sorter: (a, b) => a.company.toLowerCase().localeCompare(b.company.toLowerCase()),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Количество',
      dataIndex: 'amount',
			sorter: (a, b) => a.length - b.length,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Компания',
      dataIndex: 'company',
      sorter: (a, b) => a.company.toLowerCase().localeCompare(b.company.toLowerCase()),
      sortDirections: ['ascend', 'descend'],
    },
    finstImage,
    actions(handleEditClick, 'plates') as ColumnType<IDetail>,
  ];
};

const archiveDrillsColumns = (handleEditClick: (id: number) => void): TableColumnsType<IDetail> => {
  return [
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
      render: (_text, record) => <span>{record.diameter} мм</span>,
    },
    {
      title: 'Длина',
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
      title: 'Винты',
      render: (_value, record) => (
        <select defaultValue="Винты">
          {record.screws?.map((screw) => (
            <option key={screw.id}>{screw.type}</option>
          ))}
        </select>
      ),
    },
    {
      title: 'Пластины',
      render: (_value, record) => (
        <select defaultValue="Пластины">
          {record.plates?.map((plate) => (
            <option key={plate.id}>{plate.type}</option>
          ))}
        </select>
      ),
    },
    finstImage,
    actions(handleEditClick, 'archive_drills') as ColumnType<IDetail>,
  ];
};

export { drillsColumns, skrewsColumns, platesColumns, archiveDrillsColumns };
