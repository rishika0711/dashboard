import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Button, Progress, Modal, Form, Input, Empty } from 'antd';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ADD_WIDGET, REMOVE_WIDGET } from './action';
import dummyData from './dummyData'; 
import './dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardV2 = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [widgetData, setWidgetData] = useState({ name: '', text: '' });
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Initialize as an empty string

  const categories = useSelector((state) => state);
  const dispatch = useDispatch();

  const showModal = (category) => {
    setActiveCategory(category);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (widgetData.name && widgetData.text) {
      const newWidget = {
        id: Date.now(),
        name: widgetData.name,
        text: widgetData.text,
        type: 'text',
        data: null,
      };

      dispatch({
        type: ADD_WIDGET,
        payload: {
          category: activeCategory,
          widget: newWidget,
        },
      });

      setWidgetData({ name: '', text: '' });
      setIsModalVisible(false);
      setActiveCategory(null);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleRemoveWidget = (category, widgetId) => {
    dispatch({
      type: REMOVE_WIDGET,
      payload: {
        category,
        widgetId,
      },
    });
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget => 
      widget?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    )
  }));

  return (
    <div className="dashboard-container">
      <div className="search-container">
        <Input.Search
          placeholder="Search widgets"
          enterButton
          onSearch={value => setSearchQuery(value)} // Update search query state
          style={{ width: '40%', display: 'flex', justifyContent: 'center' }}
        />
      </div>   
      <div className="header">
        <h1>CNAPP Dashboard</h1>
      </div>
      <Row gutter={[16, 16]}>
        {filteredCategories.map((category) => (
          <Col span={24} key={category.category}>
            <div className="category-header">
              <h2>{category.category}</h2>
            </div>
            <Row gutter={[16, 16]} className="widget-row">
              {category.widgets.map((widget) => (
                <Col span={8} key={widget.id}>
                  <Card
                    title={widget.name}
                    extra={<Button danger onClick={() => handleRemoveWidget(category.category, widget.id)}>X</Button>}
                    className="widget-card"
                  >
                    <div className="widget-content">
                      {widget.type === 'circle' && (
                        <div className="circle-chart">
                          <div className="chart-container">
                            <Doughnut
                              data={widget.data}
                              options={{
                                plugins: {
                                  legend: {
                                    display: true,
                                    position: 'right',
                                  },
                                  datalabels: {
                                    formatter: (value) => `${value}%`,
                                    color: '#fff',
                                  },
                                },
                              }}
                            />
                          </div>
                        </div>
                      )}
                      {widget.type === 'dashboard' && (
                        <div className="dashboard-chart">
                          <div className="chart-container">
                            <Doughnut
                              data={widget.data}
                              options={{
                                cutout: '50%',
                                plugins: {
                                  legend: {
                                    display: true,
                                    position: 'right',
                                  },
                                  datalabels: {
                                    formatter: (value) => `${value}%`,
                                    color: '#fff',
                                  },
                                },
                              }}
                            />
                          </div>
                        </div>
                      )}
                      {widget.type === 'line' && (
                        <div className="chart-container">
                          <span className="progress-label">
                            {widget.label}
                          </span>
                          <Progress
                            percent={widget.percent}
                            strokeColor={{
                              '0%': '#f5222d',
                              '100%': '#faad14',
                            }}
                            strokeWidth={20}
                            format={percent => `${percent}%`}
                          />
                        </div>
                      )}
                      {widget.type === 'text' && (
                        <div className="widget-text">
                          <pre>{widget.text}</pre>
                        </div>
                      )}
                      {widget.type === 'empty' && (
                        <div className="widget-text">
                          <Empty />
                        </div>
                      )}
                    </div>
                  </Card>
                </Col>
              ))}
              <Col span={8}>
                <Card className="add-widget-card">
                  <Button className="add-widget-button" onClick={() => showModal(category.category)}>+ Add Widget</Button>
                </Card>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>

      <Modal title="Add Widget" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form layout="vertical">
          <Form.Item label="Widget Name">
            <Input
              value={widgetData.name}
              onChange={(e) => setWidgetData({ ...widgetData, name: e.target.value })}
              placeholder="Enter widget name"
            />
          </Form.Item>
          <Form.Item label="Widget Text">
            <Input
              value={widgetData.text}
              onChange={(e) => setWidgetData({ ...widgetData, text: e.target.value })}
              placeholder="Enter widget text"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DashboardV2;

