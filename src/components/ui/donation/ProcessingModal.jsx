import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { useDonationListener } from '@/src/hooks/paymentSocketContext';
import { PaymentStatus } from '@/src/config/settings';
import PaymentLoadingAnimation from './PaymentLoadingAnimation';
import { RenderReferenceState } from '../auth/signup/PaymentStatus';
import { sessionStorageFn } from '@/src/utils/fns/client';
import { decrypt } from '@/src/utils/fns/encryption';


const ProcessingModal = ({ setShowProcessingModal, showProcessingModal }) => {

    const [showReferenceBanner, setShowReferenceBanner] = useState(null);

    const payment_reference = sessionStorageFn.get("payment_reference");
    const amount_paid = sessionStorageFn.get("amount_paid");

    const paymentReference = decrypt(payment_reference);
    const amount = decrypt(amount_paid);


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
                {showReferenceBanner == null ? <PaymentLoadingAnimation /> : <RenderReferenceState reference={paymentReference} amount={amount} donation={true} />}
            </div>
        </Modal>
    );
};

export default ProcessingModal;
