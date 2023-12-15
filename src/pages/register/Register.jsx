import React, { useState } from 'react'
import './register.css'
import { InfoCircleOutlined, UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Input, Form, Tooltip, InputNumber, Button, Switch, notification  } from 'antd';
import { instance } from '../../config/axios';
import { Link, useNavigate } from 'react-router-dom'

export const Register = () => {
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (error) => {
        const messages = error
        api.open({
            message: 'Error!!!!!!!',
            description: messages,
            duration: 4,
        });
    };

    const [data, setData] = useState({
        name: undefined,
        lastmane: undefined,
        email: undefined,
        phone: undefined,
        password: undefined,
        isAdmin: false,

    })

    const handleChange = (e) => {  
        setData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    }
    const handleNumber = (e) => {
        setData((prev) => ({
            ...prev,
            phone: e
        }))
    }
    const handeAdmin = (e) => {
        setData((prev) => ({
            ...prev,
            isAdmin: e
        }))
    }

    const onClick = async(e) => {
        e.preventDefault();
        try {
            const res = await instance.post("/user/register", data);
            openNotification();
            navigate("/login");
            console.log(res);
        } catch (error) {
            const {response} = error;
            console.log(response);
            openNotification(response.data.message);
        }
    }
    return (
        <div className='register'>
          
            <div className="rWrapper">
            <h1>Register</h1>
                <Form className='form' layout='vertical'>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input className='back'
                            onChange={handleChange}
                            id='name'
                            placeholder="Enter your name"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            suffix={
                                <Tooltip title="Extra information">
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="lastname"
                        label="Lastname"
                        rules={[{ required: true, message: 'Please input your lastname!' }]}
                    >
                        <Input className='back'
                            onChange={handleChange}
                            id='lastname'
                            placeholder="Enter your lastname "
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            suffix={
                                <Tooltip title="Extra information">
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >

                        <Input className='back'
                            onChange={handleChange}
                            id='email'
                            placeholder="Enter your email "
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            suffix={
                                <Tooltip title="Extra information">
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="number"
                        label="Phone Number"
                        rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                    >

                        <InputNumber className='back hei'
                            onChange={handleNumber}
                            id='number'
                            placeholder="Enter your Phone Number "
                            addonBefore="+569"
                            prefix={<PhoneOutlined className="site-form-item-icon" />}
                            suffix={
                                <Tooltip title="Extra information">
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >

                        <Input.Password className='back'
                            onChange={handleChange}
                            id='password'
                            placeholder="Enter your password "

                        />
                    </Form.Item>
                    <Form.Item
                        name="admin"
                        label="Is Admin?"
                    >
                        <Switch onChange={handeAdmin} defaultChecked={data.role}/>
                    </Form.Item>
                    {contextHolder}
                    <Button onClick={onClick} type="primary" htmlType="submit">
                        Register
                    </Button>
                    <div className="link">
                        <p>Already have an account?</p>
                        <Link to={'/login'}>Login</Link>
                    </div>
                </Form>
            </div>
        </div>
    )
}
