import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { Switch } from 'antd';
const { Option } = Select;
import "./editProp.css";
import { UploadImg } from '../uploadImg/UploadImg';
import {useSelector} from 'react-redux';
import { instance } from '../../../config/axios';

export const EditProp = ({ data, setLoad }) => {
  const {user} = useSelector((state) => state.session );
 
  const [credential, setCredential] = useState({
    name: data.name,
    type: data.type,
    city: data.city,
    adress: data.adress,
    desc: data.desc,
    price: data.price,
    featured: data.featured

  });
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleFileList = (newFileList) => {
    setFileList(newFileList);
  }
  
  const showDrawer = () => {
    setOpen(true);
  };
  const handleType = (e) => {
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
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (checked) => {
    setCredential((prev) => ({
      ...prev,
      featured: checked
    })
    );
  };

  const handleClick = async(e) => {
    e.preventDefault();
    // console.log(credential);
    // console.log(fileList);

    try {
      const formData = new FormData();
      formData.append('name', credential.name);
      formData.append('type', credential.type);
      formData.append('city', credential.city);
      formData.append('adress', credential.adress);
      formData.append('desc', credential.desc);
      formData.append('price', credential.price);
      formData.append('featured', credential.featured);
      fileList.map(file => {
        formData.append('image', file.originFileObj);     
      });
      const {status} = await instance.put(`/hotel/update/${data._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if(status === 200){
        setLoad(true);
        onClose();
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>
      <Button className='btnEdit' type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Editar Propiedades
      </Button>

      <Drawer
        title="Editar mi propiedad"
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
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleClick} type="primary">
              Editar
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
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
                <Select id='type' defaultValue={credential.type} options={[
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
                <Input id='price' onChange={handleChange} defaultValue={credential.price} placeholder="Please house price" />
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
                <Switch id='featured' defaultChecked={credential.featured} onChange={onChange} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="Photos"
                label="Photos"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
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
                <Input.TextArea id='desc' defaultValue={credential.desc} onChange={handleChange} rows={4} placeholder="please enter description house" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );

}
