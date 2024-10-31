import { Form, Input, Button, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { UploadFile } from 'antd/es/upload';
import { IPlate } from 'types/types';

const layout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
const tailLayout = { wrapperCol: { offset: 6, span: 16 } };

const PlateForm = ({ onSubmit, onSuccess }: { onSubmit: (values: IPlate) => Promise<IPlate>; onSuccess: () => void }) => {
  const [form] = Form.useForm();
  const [images, setImages] = useState<UploadFile[]>([]);

  const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setImages(fileList);
  };

  return (
    <Form
      form={form}
      {...layout}
      name="plateForm"
      initialValues={{
        type: '',
        sub_type: '',
        material: '',
        amount: 1,
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
        <Input placeholder="Введите тип пластины" />
      </Form.Item>
      <Form.Item label="Подтип" name="sub_type" rules={[{ required: true, message: 'Введите подтип!' }]}>
        <Input placeholder="Введите подтип" />
      </Form.Item>
      <Form.Item
        label="Материал"
        name="material"
        rules={[{ required: true, message: 'Выберите материал!' }]}
      >
        <Select placeholder="Выберите материал">
          <Select.Option value="m">M</Select.Option>
          <Select.Option value="s">S</Select.Option>
          <Select.Option value="x">X</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Количество" name="amount" rules={[{ required: true, message: 'Введите количество!' }]}>
        <Input type="number" placeholder="Введите количество" />
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

export default PlateForm;
