import { Modal, Button } from 'antd';
import React, { useState } from 'react';

import { RenderReferenceState } from '../auth/signup/PaymentStatus';

const DonationPaymentModal = ({ isPaymentModalOpen, cancelPaymentModal, referenceNumber, donationAmount }) => {


    return (

        <Modal
            title={<div className='w-full justify-center flex'>Pending Transaction!</div>}
            open={isPaymentModalOpen}
            onCancel={cancelPaymentModal}
            footer={[
                <Button key="close" onClick={cancelPaymentModal}>
                    Close
                </Button>,
            ]}
            centered
            width={500}
        >
            <div className='w-full flex'>
                <RenderReferenceState reference={referenceNumber} amount={donationAmount} donation={true} />

            </div>
        </Modal>
    );
};

export default DonationPaymentModal;
