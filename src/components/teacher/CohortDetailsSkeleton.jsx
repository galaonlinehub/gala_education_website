import React from 'react';
import {
    Skeleton,
    Card,
    Row,
    Col,
    Space,
    Divider,
    Tag
} from 'antd';

const CohortDetailsSkeleton = () => {
    return (
        <div style={{ background: "#f5f7fa", minHeight: "100vh" }}>
            {/* Hero Section Skeleton */}
            <div style={{
                background: "linear-gradient(135deg, #003399 0%, #001840 100%)",
                padding: "40px 0",
                color: "#fff"
            }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
                    <Row gutter={[32, 32]} align="middle">
                        <Col xs={24} lg={14}>
                            <Card style={{ background: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(10px)" }}>
                                <Skeleton active title={{ width: '80%' }} paragraph={{ rows: 2 }} />
                                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                                    <Skeleton.Button active size="small" shape="round" style={{ width: 100 }} />
                                    <Space align="center">
                                        <Skeleton.Avatar active size={48} />
                                        <div style={{ width: '60%' }}>
                                            <Skeleton active paragraph={false} title={{ width: '100%' }} />
                                            <Skeleton active paragraph={false} title={{ width: '80%' }} />
                                        </div>
                                    </Space>
                                </Space>
                            </Card>
                        </Col>

                        <Col xs={24} lg={10}>
                            <Card>
                                <Row gutter={[16, 16]}>
                                    <Col span={12}>
                                        <Skeleton active paragraph={false} title={{ width: '50%' }} />
                                        <Skeleton active paragraph={false} title={{ width: '70%' }} />
                                    </Col>
                                    <Col span={12}>
                                        <Skeleton active paragraph={false} title={{ width: '50%' }} />
                                        <Skeleton active paragraph={false} title={{ width: '70%' }} />
                                    </Col>
                                    <Col span={12}>
                                        <Skeleton active paragraph={false} title={{ width: '50%' }} />
                                        <Skeleton active paragraph={false} title={{ width: '70%' }} />
                                        <Skeleton.Button active size="small" style={{ width: '100%', height: 8, marginTop: 8 }} />
                                    </Col>
                                    <Col span={12}>
                                        <Skeleton active paragraph={false} title={{ width: '50%' }} />
                                        <Skeleton active paragraph={false} title={{ width: '70%' }} />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>

            {/* Main Content Skeleton */}
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
                <Row gutter={[24, 24]}>
                    {/* About Section Skeleton */}
                    <Col xs={24} lg={16}>
                        <Card className="card-shadow">
                            <Skeleton active title={{ width: '30%' }} paragraph={{ rows: 4 }} />
                        </Card>

                        {/* Schedule Section Skeleton */}
                        <Card className="card-shadow" style={{ marginTop: "24px" }}>
                            <Skeleton active title={{ width: '40%' }} paragraph={false} />
                            <Divider style={{ margin: '16px 0' }} />
                            {/* <Row gutter={[16, 16]}>
                                {[1, 2, 3, 4].map((_, index) => (
                                    <Col xs={24} sm={12} key={index}>
                                        <Card style={{ background: "#f0f5ff", borderColor: "#d6e4ff" }}>
                                            <Skeleton active paragraph={false} title={{ width: '60%' }} />
                                            <Skeleton.Button active block style={{ marginTop: 16 }} />
                                        </Card>
                                    </Col>
                                ))}
                            </Row> */}
                            <div className="flex gap-3">
                                {[1, 2, 3, 4].map((_, index) => (
                                    <div
                                        key={index}
                                        className="inline-block mb-1 mr-1 py-1 px-3 rounded-md bg-gray-200 animate-pulse"
                                        style={{
                                            width: `${60 + Math.random() * 40}px`,
                                            height: '24px'
                                        }}
                                    />
                                ))}
                            </div>
                        </Card>
                    </Col>

                    {/* Sidebar Skeleton */}
                    <Col xs={24} lg={8}>
                        <Card className="card-shadow">
                            <Skeleton active title={{ width: '50%' }} paragraph={false} />
                            <Space direction="vertical" style={{ width: "100%", marginTop: 16 }} size="large">
                                <Skeleton.Button active block />
                                <Skeleton.Button active block />
                                <Skeleton.Button active block />
                            </Space>
                        </Card>

                        {/* Quick Stats Skeleton */}
                        <Card className="card-shadow" style={{ marginTop: "24px" }}>
                            <Skeleton active title={{ width: '40%' }} paragraph={false} />
                            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                                <Col span={24}>
                                    <Card size="small" style={{ background: "#fff7e6", textAlign: "center", padding: 16 }}>
                                        <Skeleton active paragraph={false} title={{ width: '50%' }} />
                                        <Skeleton active paragraph={false} title={{ width: '70%' }} />
                                    </Card>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default CohortDetailsSkeleton