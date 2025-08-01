import { Card, Col, Row } from 'antd'
import React from 'react'

const CohortCardSkeleton = () => {
    return (
        <Row gutter={[24, 24]}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <Col xs={24} sm={12} md={8} key={`skeleton-${item}`}>
                    <Card
                        className="h-full shadow-md overflow-hidden"
                        bodyStyle={{ padding: "16px" }}
                        cover={<div className="h-32 bg-gray-200 animate-pulse" />}
                    >
                        <div className="flex flex-col h-full">
                            {/* Topic title skeleton */}
                            <div className="mb-4">
                                <div className="flex items-center mb-2">
                                    <div className="w-6 h-6 bg-gray-200 rounded-full mr-2 animate-pulse" />
                                    <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
                                </div>
                                <div className="ml-6 space-y-2">
                                    <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
                                    <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse" />
                                </div>
                            </div>

                            {/* Dates skeleton */}
                            <div className="flex justify-between mb-4 bg-gray-100 p-3 rounded-md">
                                <div className="flex flex-col items-start w-2/5">
                                    <div className="flex items-center w-full mb-1">
                                        <div className="w-3 h-3 bg-gray-200 rounded-full mr-1 animate-pulse" />
                                        <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
                                    </div>
                                    <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse" />
                                </div>
                                <div className="flex flex-col items-start w-2/5">
                                    <div className="flex items-center w-full mb-1">
                                        <div className="w-3 h-3 bg-gray-200 rounded-full mr-1 animate-pulse" />
                                        <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
                                    </div>
                                    <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse" />
                                </div>
                            </div>

                            {/* Stats skeleton */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center w-2/5">
                                    <div className="w-3 h-3 bg-gray-200 rounded-full mr-1 animate-pulse" />
                                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                                </div>
                                <div className="flex items-center w-2/5">
                                    <div className="w-3 h-3 bg-gray-200 rounded-full mr-1 animate-pulse" />
                                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                                </div>
                            </div>

                            {/* Button skeleton */}
                            <div className="mt-auto pt-2">
                                <div className="h-9 bg-gray-200 rounded w-full animate-pulse" />
                            </div>
                        </div>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default CohortCardSkeleton