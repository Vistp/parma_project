import { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Upload, Button, UploadFile } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getData, getDetail, updateDrill } from 'utils/api';
import { IFormDrill, IDetail, DetailType } from 'types/types';
import tableStore from 'store/tableStore';


export const EditDrillForm = ({
    id,
    visible,
    onClose,
    activeItem
  } : {
    id: number | null,
    visible: boolean,
    onClose: () => void,
    activeItem: DetailType
  }) => {
  const [form] = Form.useForm();
  const [images, setImages] = useState<UploadFile[]>([]);
  const [availableScrews, setAvailableScrews] = useState<IDetail[]>([]);
  const [availablePlates, setAvailablePlates] = useState<IDetail[]>([]);
  const [loading, setLoading] = useState(false);

  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
  const tailLayout = { wrapperCol: { offset: 6, span: 16 } };

  useEffect(() => {
    const fetchData = async () => {
      if (id && visible) {
        const data = await getDetail(id, activeItem.slice(0, -1) as DetailType);
        if (data) {
          form.setFieldsValue({
            ...data,
            screws: data.screws.map((screw: IDetail) => screw.id) || [],
            plates: data.plates.map((plate: IDetail) => plate.id) || [],
          });

          const imageList = data.image_path
            ? data.image_path.split(',').map((image: string, index: number) => ({
                uid: index,
                name: `image-${index}`,
                status: 'done',
                url: `${import.meta.env.VITE_BASE_URL}${image.trim()}`,
              }))
            : [];
          setImages(imageList);
        }
      }

      const screwsData = await getData('screws');
      setAvailableScrews(screwsData); 

      const platesData = await getData('plates');
      setAvailablePlates(platesData); 
    };

    fetchData();
  }, [id, visible, form, activeItem]);

  const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setImages(fileList);
  };

  const handleSubmit = async (values: IFormDrill) => {
    setLoading(true);
    try {
      values.images = images;
      await updateDrill(id, values);
      tableStore.getDetails('drills');
      onClose();
    } catch (error) {
      console.error('Ошибка при обновлении данных:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Редактирование сверла" open={visible} footer={null} onCancel={onClose}>
      <Form
        form={form}
        onFinish={handleSubmit}
        {...layout}
        initialValues={{
          screws: [],
          plates: [],
          images: [],
        }}
      >
        <Form.Item label="Название" name="name" rules={[{ required: true, message: 'Пожалуйста, введите название!' }]}>
          <Input placeholder="Пожалуйста, введите название" />
        </Form.Item>
        <Form.Item
          label="Диаметр"
          name="diameter"
          rules={[{ required: true, message: 'Пожалуйста, введите диаметр!' }]}
        >
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
          <Select mode="multiple" style={{ width: '100%' }} placeholder="Выберите винт...">
            {availableScrews.map((screw) => (
              <Select.Option key={screw.id} value={screw.id}>
                {screw.type}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Пластины"
          name="plates"
          rules={[{ required: true, message: 'Пожалуйста, выберите пластину!' }]}
        >
          <Select mode="multiple" style={{ width: '100%' }} placeholder="Выберите пластину...">
            {availablePlates.map((plate) => (
              <Select.Option key={plate.id} value={plate.id}>
                {plate.type}
              </Select.Option>
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
        <Form.Item label="Изображение" name="images">
          <Upload fileList={images} onChange={handleChange} beforeUpload={() => false}>
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
          <Button type="primary" htmlType="submit" loading={loading}>
            Сохранить изменения
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
