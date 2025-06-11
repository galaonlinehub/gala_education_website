import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { useDonationListener } from '@/src/hooks/paymentSocketContext';
import { PaymentStatus } from '@/src/config/settings';
import PaymentLoadingAnimation from './PaymentLoadingAnimation';
import { RenderReferenceState } from '../auth/signup/PaymentStatus';
import { sessionStorageFn } from '@/src/utils/fns/client';
import { decrypt } from '@/src/utils/fns/encryption';
import DonationSuccess from './DonationSuccess';
import PaymentFailedAnimation from './DonationFailed';

const ProcessingModal = ({ setShowProcessingModal, showProcessingModal }) => {
    // Use more descriptive state name and enum-like values
    const [paymentState, setPaymentState] = useState('LOADING'); // 'LOADING', 'PENDING', 'SUCCESS'

    const payment_reference = sessionStorageFn.get("payment_reference");
    const amount_paid = sessionStorageFn.get("amount_paid");

    const paymentReference = decrypt(payment_reference);
    const amount = decrypt(amount_paid);


    useDonationListener((paymentMsg) => {
        console.log("Message from socket here:", paymentMsg);

        if (paymentMsg.status === PaymentStatus.SUCCESS) {
            setPaymentState('SUCCESS');
        } else if (paymentMsg.status === PaymentStatus.PENDING) {
            setPaymentState('PENDING');
        } else if (paymentMsg.status === PaymentStatus.FAILURE) {
            setPaymentState('FAILURE');
        }

    });

    const renderContent = () => {
        switch (paymentState) {
            case 'LOADING':
                return <PaymentLoadingAnimation />;
            case 'PENDING':
                return (
                    <RenderReferenceState reference={paymentReference} amount={amount} donation={true} onClose={() => {
                        setShowProcessingModal(false);
                        setPaymentState('LOADING');
                    }} />
                );
            case 'SUCCESS':
                return <DonationSuccess setCloseSuccessModal={() => {
                    setShowProcessingModal(false);
                    setPaymentState('LOADING');
                }} />;
            case 'FAILURE':
                return <PaymentFailedAnimation setCloseSuccessModal={() => {
                    setShowProcessingModal(false);
                    setPaymentState('LOADING');
                }} />;
            default:
                return <PaymentLoadingAnimation />;
        }
    };

    return (
        <Modal
            styles={{
                content: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    padding: 0
                },
                body: {
                    backgroundColor: 'white',
                    padding: 0
                }
            }}
            style={{
                borderRadius: '30px',
                overflow: 'hidden',
                
            }}
            
            open={showProcessingModal}
            mask={true}
            closable={false}
            maskClosable={false}
            onCancel={() => setShowProcessingModal(false)}
            footer={null}
            centered
            width={400}
        >
            <div className='w-full items-center p-2 justify-center flex'>
                {renderContent()}
            </div>
        </Modal>
    );
};

export default ProcessingModal;