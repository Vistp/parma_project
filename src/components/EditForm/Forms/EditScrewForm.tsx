import { Modal, Form, Input, Button, Upload, UploadFile } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getDetail, updateScrew } from 'utils/api';
import tableStore from 'store/tableStore';
import { DetailType, IScrew } from 'types/types';

export const EditScrewForm = ({
  id,
  visible,
  onClose,
  activeItem
}: {
  id: number | null;
  visible: boolean;
  onClose: () => void;
  activeItem: DetailType;
}) => {
  const [form] = Form.useForm();
  const [images, setImages] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (id && visible) {
        const data = await getDetail(id, activeItem.slice(0, -1) as DetailType);
        if (data) {
          form.setFieldsValue({ ...data });
          const imageList = data.image_path
            ? data.image_path.split(',').map((image: string, index: number) => ({
                uid: index.toString(),
                name: `image-${index}`,
                status: 'done',
                url: `${import.meta.env.VITE_BASE_URL}${image.trim()}`,
              }))
            : [];
          setImages(imageList);
        }
      }
    };
    fetchData();
  }, [id, visible, form, activeItem]);

  const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setImages(fileList);
  };

  const handleSubmit = async (values: IScrew) => {
    setLoading(true);
    try {
      values.images = images;
      await updateScrew(id, values);
      tableStore.getDetails('screws');
      onClose();
    } catch (error) {
      console.error('Ошибка при обновлении данных:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Редактирование винта" open={visible} footer={null} onCancel={onClose}>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item label="Тип" name="type" rules={[{ required: true, message: 'Введите тип!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Длина" name="length" rules={[{ required: true, message: 'Введите длину!' }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Резьба" name="thread" rules={[{ required: true, message: 'Введите тип резьбы!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Шаг резьбы" name="step_of_thread" rules={[{ required: true, message: 'Введите шаг!' }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Компания" name="company" rules={[{ required: true, message: 'Введите компанию!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Изображение" name="images">
          <Upload fileList={images} onChange={handleChange} beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Нажмите, чтобы загрузить</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Описание" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Сохранить изменения
        </Button>
      </Form>
    </Modal>
  );
};
