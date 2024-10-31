import { Modal, Form, Input, Button, UploadFile, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getDetail, updatePlate } from 'utils/api';
import tableStore from 'store/tableStore';
import { DetailType, IPlate } from 'types/types';

export const EditPlateForm = ({
  id,
  visible,
  onClose,
  activeItem
}: {
  id: number | null;
  visible: boolean;
  onClose: () => void;
  activeItem: DetailType
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

  const handleSubmit = async (values: IPlate) => {
    setLoading(true);
    try {
      values.images = images;
      await updatePlate(id, values);
      tableStore.getDetails('plates');
      onClose();
    } catch (error) {
      console.error('Ошибка при обновлении данных:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Редактирование пластины" open={visible} footer={null} onCancel={onClose}>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item label="Тип" name="type" rules={[{ required: true, message: 'Введите тип!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Подтип" name="sub_type" rules={[{ required: true, message: 'Введите подтип!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Материал" name="material" rules={[{ required: true, message: 'Введите материал!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Количество" name="amount" rules={[{ required: true, message: 'Введите количество!' }]}>
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
