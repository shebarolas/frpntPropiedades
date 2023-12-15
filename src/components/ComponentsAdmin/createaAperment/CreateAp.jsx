import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
const { Option } = Select;
import { Switch } from 'antd';
import './createApp.css';
import { UploadImg } from '../uploadImg/UploadImg';
import { instance } from '../../../config/axios';
import {useSelector} from 'react-redux';
import {notification } from 'antd';

export const CreateAp = ({setLoad}) => {
    const {user} = useSelector((state) => state.session );
    const [fileList, setFileList] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();  

  const [credential, setCredential] = useState({
    name: '',
    type: '',
    city: '',
    adress: '',
    desc: '',
    price: 0,
    featured: true,
    bano: 0,
    habitaciones: 0,
    user: user._id,
  });
  
  const handleFileList = (newFileList) => {
    setFileList(newFileList);
  }
 

  const handleType = (e) => {
    console.log(e);
    setCredential((prev) => ({
      ...prev,
      type: e
    })
    );
  }

  const handleChange = (e) => {
    setCredential((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    })
    );
  }
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    setLoading(false);

  };
  const onChange = (checked) => {
    console.log(checked);
    
    setCredential((prev) => ({
      ...prev,
      featured: checked
    })
    );
  };



  const handleClick = async(e) => {
    e.preventDefault();
     console.log(credential);
   
    try {
     const formData = new FormData();
     formData.append('name', credential.name);
     formData.append('type', credential.type);
     formData.append('city', credential.city);
     formData.append('adress', credential.adress);
     formData.append('desc', credential.desc);
     formData.append('price', credential.price);
     formData.append('featured', credential.featured);
     formData.append('user', credential.user);
     formData.append('bano', credential.bano);
     formData.append('habitaciones', credential.habitaciones);
     fileList.map(file => {
       formData.append('image', file.originFileObj);     
     });
    
     const {status} = await instance.post("/hotel/register", formData, {
       headers: {
         'Content-Type': 'multipart/form-data'
       }
     })
     setLoading(true);
     console.log(status);
      if(status === 200){
        setLoad(true);
        setCredential({
          name: '',
          type: '',
          city: '',
          adress: '',
          desc: '',
          price: 0,
          featured: true,
          bano: 0,
          habitaciones: 0,
        });
        form.resetFields();
        onClose();
       
      }
    } catch (error) {
      setLoading(false);
      const {response} = error;
      openNotification(response.data.message);
     
    }

  }

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (error) => {
    const messages = error
    api.open({
      message: 'Notification Title',
      description:messages,
      duration: 0,
    });
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Nueva Casa
      </Button>
      {contextHolder}
      <Drawer
        title="Create a new House"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={handleClick} loading={loading}  type="primary">
              Crear
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: 'Please house name',
                  },
                ]}
              >
                <Input id='name' defaultValue={credential.name} onChange={handleChange} placeholder="Please house name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="adress"
                label="Adress"
                rules={[
                  {
                    required: true,
                    message: 'Please adress house',
                  },
                ]}
              >
                <Input id='adress' defaultValue={credential.adress} onChange={handleChange} placeholder="Please adress house" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[
                  {
                    required: true,
                    message: 'Please select an type',
                  },
                ]}
              >
                <Select id='type' options={[
                  {
                    value: 'House',
                    label: 'House',
                  },
                  {
                    value: 'Aparment',
                    label: 'Aparment',
                  },
                  {
                    value: 'Others',
                    label: 'Others',
                  }]} onChange={handleType} placeholder="Please select type">

                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="city"
                label="City"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the type',
                  },
                ]}
              >
                <Input id='city' defaultValue={credential.city} onChange={handleChange} placeholder="Please city house" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[
                  {
                    required: true,
                    message: 'Please house price',
                  },
                ]}
              >
                <Input id='price' value={credential.price} onChange={handleChange} placeholder="Please house price" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="featured"
                label="Featured"
                rules={[
                  {
                    required: true,
                    message: 'Please',
                  },
                ]}
              >
                <Switch id='featured' defaultChecked onChange={onChange} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="bano"
                label="Cantidad de baños"
                rules={[
                  {
                    required: true,
                    message: 'Please house baños',
                  },
                ]}
              >
                <Input id='bano' value={credential.bano} onChange={handleChange} placeholder="Please house bano" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="habitaciones"
                label="Habitaciones"
                rules={[
                  {
                    required: true,
                    message: 'Please house habitaciones',
                  },
                ]}
              >
                <Input id='habitaciones' value={credential.habitaciones} onChange={handleChange} placeholder="Please house habitaciones" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="Photos"
                label="Fotos (La primera imagen subida sera utilizada como portada)"
                rules={[
                  {
                    required: true,
                    message: 'please upload photos',
                  },
                ]}
              >
                <UploadImg fileList={fileList} handleFileList={handleFileList} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea id='desc' value={credential.desc} onChange={handleChange} rows={4} placeholder="please enter description house" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
}
