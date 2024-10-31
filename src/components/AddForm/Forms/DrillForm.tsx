import { Form, Input, Button, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useThemeContext } from 'app/ThemeContextProvaider';
import { useState } from 'react';
import { IFormDrill, ErrorInterface, SuccessInterface } from 'types/types';
import { UploadFile } from 'antd/es/upload';
import useLoadData from '../useLoadData';

const layout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
const tailLayout = { wrapperCol: { offset: 6, span: 16 } };

interface AddFormProps {
  onSubmit: (values: IFormDrill) => Promise<ErrorInterface | SuccessInterface>;
  onSuccess: () => void;
}

const DrillForm: React.FC<AddFormProps> = ({ onSubmit, onSuccess }) => {
  const [form] = Form.useForm();
  const { mode } = useThemeContext();
  const { screws, plates } = useLoadData();
  const [images, setImages] = useState<UploadFile[]>([]);

  const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setImages(fileList);
  };

  return (
    <Form
      className={mode === 'light' ? 'light-theme' : 'dark-theme'}
      form={form}
      {...layout}
      name="basic"
      initialValues={{
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
        values.images = images;
        try {
          await onSubmit(values);
          onSuccess();
          form.resetFields();
          setImages([]);
        } catch (error) {
          alert(`Возникла ошибка при отправке формы: ${(error as ErrorInterface)?.message ?? 'Неизвестная ошибка'}`);
        }
      }}
    >
      <Form.Item label="Название" name="name" rules={[{ required: true, message: 'Пожалуйста, введите название!' }]}>
        <Input placeholder="Пожалуйста, введите название" />
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
      <Form.Item label="Винты" name="screws" rules={[{ required: true, message: 'Пожалуйста, выберите винт!' }]}>
        <Select mode="multiple" placeholder="Выберите винт...">
          {screws.map((screw) => (
            <Select.Option key={screw.id} value={screw.id}>
              {screw.type}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Пластины" name="plates" rules={[{ required: true, message: 'Пожалуйста, выберите пластину!' }]}>
        <Select mode="multiple" placeholder="Выберите пластину...">
          {plates.map((plate) => (
            <Select.Option key={plate.id} value={plate.id}>
              {plate.type}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Изображение" name="images">
        <Upload fileList={images} onChange={handleChange}>
          <Button icon={<UploadOutlined />}>Нажмите, чтобы загрузить</Button>
        </Upload>
      </Form.Item>
      <Form.Item
        label="Описание"
        name="description"
        rules={[{ required: true, message: 'Пожалуйста, предоставьте описание!' }]}
      >
        <Input.TextArea rows={4} placeholder="Пожалуйста, введите подробное описание" />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DrillForm;
