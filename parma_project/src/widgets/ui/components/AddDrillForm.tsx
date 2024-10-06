import { Form, Input, Button, Modal, Select } from 'antd';
import { useState } from 'react';
import { addDrill } from '../../../shared/utils/api';
import tableStore from '../../../store/tableStore';

const layout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
const tailLayout = { wrapperCol: { offset: 6, span: 16 } };

interface IFormDrill {
  name: string;
  diameter: number;
  length_xD: number;
  deep_of_drill: number;
  plate: string;
  key: string;
  company: string;
  is_broken: boolean;
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
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
        name: '',
        diameter: 0,
        length_xD: 0,
        deep_of_drill: 0,
        plate: '',
        key: '',
        company: '',
        is_broken: false,
        storage: '',
        description: '',
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
      <Form.Item
        label="Пластина"
        name="plate"
        rules={[{ required: true, message: 'Пожалуйста, введите название пластины!' }]}
      >
        <Input placeholder="Пожалуйста, введите название пластины" />
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
        <Select style={{ width: 120 }}>
          <Select.Option value={false}>Исправно</Select.Option>
          <Select.Option value={true}>Сломанно</Select.Option>
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

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Добавить сверло
      </Button>
      <Modal title="Добавление сверло" open={modalOpen} footer={null} onCancel={handleCancel}>
        <AddForm onSubmit={addDrill} onSuccess={handleSuccess} />
      </Modal>
    </>
  );
};

export default AddModal;
