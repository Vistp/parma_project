import { Form, Input, Button, Modal, Select } from 'antd';
import { useThemeContext } from 'app/ThemeContextProvaider';
import { useEffect, useState } from 'react';
import tableStore from 'store/tableStore';
import { IPlate, IScrew } from 'types/types';
import { addDrill } from 'utils/api';
import { getPlates } from 'utils/apiPlates';
import { getScrews } from 'utils/apiScrews';

const layout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
const tailLayout = { wrapperCol: { offset: 6, span: 16 } };

interface IFormDrill {
  name: string;
  diameter: number;
  length_xD: number;
  deep_of_drill: number;
  plate: number;
  key: string;
  company: string;
  is_broken: boolean;
  screws: number;
  storage: string;
  description: string;
}

interface ErrorInterface {
  message: string;
}

interface SuccessInterface {
  message: string;
}

function AddForm({
  onSubmit,
  onSuccess,
}: {
  onSubmit: (values: IFormDrill) => Promise<ErrorInterface | SuccessInterface>;
  onSuccess: () => void;
}) {
  const [screws, setScrews] = useState<IScrew[]>([]);
  const [plates, setPlates] = useState<IPlate[]>([]);


  useEffect(() => {
    const getAllScrews = async () => {
      const res = await getScrews();
      setScrews(res)
    }
    const getAllPlates = async () => {
      const res = await getPlates();
      setPlates(res)
    }

    getAllPlates();
    getAllScrews();
  }, []);

  const [form] = Form.useForm();

  const { mode } = useThemeContext(); // тема 'light' или 'dark'

  return (
    <Form
      className={mode === 'light' ? 'light-theme' : 'dark-theme'}
      form={form}
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
        name: 'new',
        diameter: 0.5,
        length_xD: 10,
        deep_of_drill: 10,
        key: 'newKey',
        company: 'newCompany',
        is_broken: false,
        storage: 'newStorage',
        description: 'hello',
      }}
      onFinish={async (values) => {
        try {
          console.log(values);
          const result = await onSubmit(values);
          console.log('Result: ', result);
          onSuccess();
        } catch (error) {
          alert(`Возникла ошибка при отправке формы: ${(error as ErrorInterface)?.message ?? 'Неизвестная ошибка'}`);
        }
      }}
    >
      {/* Поля формы */}
      <Form.Item label="Имя" name="name" rules={[{ required: true, message: 'Пожалуйста, введите ваше название!' }]}>
        <Input placeholder="Пожалуйста, введите ваше название" />
      </Form.Item>
      <Form.Item label="Диаметр" name="diameter" rules={[{ required: true, message: 'Пожалуйста, введите диаметр!' }]}>
        <Input type="number" placeholder="Пожалуйста, введите диаметр" />
      </Form.Item>
      <Form.Item label="Длина" name="length_xD" rules={[{ required: true, message: 'Пожалуйста, введите длину!' }]}>
        <Input type="number" placeholder="Пожалуйста, введите длину" />
      </Form.Item>
      <Form.Item
        label="Глубина сверления"
        name="deep_of_drill"
        rules={[{ required: true, message: 'Пожалуйста, введите глубину сверления!' }]}
      >
        <Input type="number" placeholder="Пожалуйста, введите глубину сверления" />
      </Form.Item>
      <Form.Item label="Ключ" name="key" rules={[{ required: true, message: 'Пожалуйста, введите название ключа!' }]}>
        <Input placeholder="Пожалуйста, введите название ключа" />
      </Form.Item>
      <Form.Item
        label="Компания"
        name="company"
        rules={[{ required: true, message: 'Пожалуйста, введите название компании!' }]}
      >
        <Input placeholder="Пожалуйста, введите название компании" />
      </Form.Item>
      <Form.Item
        label="Состояние"
        name="is_broken"
        rules={[{ required: true, message: 'Пожалуйста, выберите состояние!' }]}
      >
        <Select style={{ width: '100%' }}>
          <Select.Option value={false}>Исправно</Select.Option>
          <Select.Option value={true}>Сломанно</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Винты"
        name="screws"
        rules={[{ required: true, message: 'Пожалуйста, выберите винт!' }]}
      >
        <Select mode="multiple" style={{ width: '100%' }} placeholder="Выберите винт...">
          {screws.map(screw => (
            <Select.Option key={screw.id} value={screw.id}>{screw.type}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Пластины"
        name="plates"
        rules={[{ required: true, message: 'Пожалуйста, выберите винт(ы)!' }]}
      >
        <Select mode="multiple" style={{ width: '100%' }} placeholder="Выберите пластину...">
          {plates.map(plate => (
            <Select.Option key={plate.id} value={plate.id}>{plate.type}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Место хранения"
        name="storage"
        rules={[{ required: true, message: 'Пожалуйста, выберите место хранения!' }]}
      >
        <Input placeholder="Пожалуйста, выберите место хранения" />
      </Form.Item>
      <Form.Item
        label="Описание"
        name="description"
        rules={[{ required: true, message: 'Пожалуйста, предоставьте описание!' }]}
      >
        <Input.TextArea rows={4} placeholder="Пожалуйста, введите подробное описание" />
      </Form.Item>

      {/* Кнопка "Отправить" */}
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
}

const AddModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleSuccess = () => {
    setModalOpen(false);
    tableStore.getDrills();
  };

  const { mode } = useThemeContext(); // тема 'light' или 'dark'

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Добавить сверло
      </Button>
      <Modal className={mode === 'light' ? 'light-theme' : 'dark-theme'} title="Добавление сверла" open={modalOpen} footer={null} onCancel={handleCancel}>
        <AddForm onSubmit={addDrill} onSuccess={handleSuccess} />
      </Modal>
    </>
  );
};

export default AddModal;
