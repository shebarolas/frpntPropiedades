import React, { useEffect, useState } from 'react';
import { Progress, Space } from 'antd';
import { instance } from '../../../config/axios';
import { useSelector } from 'react-redux';
import { CardDashboard } from '../cardDashboard/CardDashboard';
import { Card, Col, Row, Statistic } from 'antd';
import './dashboard.css';
import { ProbDash } from '../../../pages/ProbDash/ProbDash';
const { Meta } = Card;

export const Dashboard = () => {
    return (

        <div className='dashboard'>
            <ProbDash/>
        </div >
    )
}
