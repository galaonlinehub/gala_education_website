import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { useDonationListener } from '@/src/hooks/paymentSocketContext';
import { PaymentStatus } from '@/src/config/settings';
import PaymentLoadingAnimation from './PaymentLoadingAnimation';


const ProcessingModal = ({ setShowProcessingModal, showProcessingModal }) => {

    const [showReferenceBanner, setShowReferenceBanner] = useState(null);


    useDonationListener((paymentMsg) => {
        console.log("Message from socket here:", paymentMsg);

        if (paymentMsg.status === PaymentStatus.SUCCESS) {
            setShowReferenceBanner(false);

        } else if (paymentMsg.status === PaymentStatus.PENDING) {
            setShowReferenceBanner(true);
        }
    });

    return (
        <Modal
            title={<div className='w-full justify-center text-red-500 flex'>Pending Transaction</div>}
            open={showProcessingModal}
            mask={true}
            closable={false}
            maskClosable={false}
            onCancel={() => setShowProcessingModal(false)}
            footer={null}
            centered
            width={500}
        >
            <div className='w-full flex'>
                {/* {showReferenceBanner == null ? <PaymentLoadingAnimation /> : } */}
            </div>
        </Modal>
    );
};

export default ProcessingModal;
