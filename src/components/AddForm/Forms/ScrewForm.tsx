import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { UploadFile } from 'antd/es/upload';
import { IScrew } from 'types/types';

const layout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
const tailLayout = { wrapperCol: { offset: 6, span: 16 } };

const ScrewForm = ({ onSubmit, onSuccess }: { onSubmit: (values: IScrew) => Promise<IScrew>; onSuccess: () => void }) => {
  const [form] = Form.useForm();
  const [images, setImages] = useState<UploadFile[]>([]);

  const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setImages(fileList);
  };

  return (
    <Form
      form={form}
      {...layout}
      name="screwForm"
      initialValues={{
        type: '',
        length: 1,
        thread: '',
        step_of_thread: 0.1,
        company: '',
        description: '',
        image_path: '',
      }}
      onFinish={async (values) => {
        values.images = images;
        try {
          await onSubmit(values);
          onSuccess();
          form.resetFields();
          setImages([]);
        } catch (error) {
          alert(`Error submitting form: ${error || 'Unknown error'}`);
        }
      }}
    >
      <Form.Item label="Тип" name="type" rules={[{ required: true, message: 'Введите тип!' }]}>
        <Input placeholder="Введите тип винта" />
      </Form.Item>
      <Form.Item label="Длина" name="length" rules={[{ required: true, message: 'Введите длину!' }]}>
        <Input type="number" placeholder="Введите длину" />
      </Form.Item>
      <Form.Item label="Резьба" name="thread" rules={[{ required: true, message: 'Введите тип резьбы!' }]}>
        <Input placeholder="Введите резьбу" />
      </Form.Item>
      <Form.Item label="Шаг резьбы" name="step_of_thread" rules={[{ required: true, message: 'Введите шаг резьбы!' }]}>
        <Input type="number" placeholder="Введите шаг резьбы" />
      </Form.Item>
      <Form.Item label="Компания" name="company" rules={[{ required: true, message: 'Введите название компании!' }]}>
        <Input placeholder="Введите название компании" />
      </Form.Item>
      <Form.Item label="Описание" name="description" rules={[{ required: true, message: 'Введите описание!' }]}>
        <Input.TextArea rows={4} placeholder="Введите описание" />
      </Form.Item>
      <Form.Item label="Изображение" name="image_path">
        <Upload fileList={images} onChange={handleChange}>
          <Button icon={<UploadOutlined />}>Загрузить изображение</Button>
        </Upload>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ScrewForm;