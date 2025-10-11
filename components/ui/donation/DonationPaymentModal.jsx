import { Modal, Button } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

import { RenderReferenceState } from '../auth/signup/PaymentStatus';


const DonationPaymentModal = ({ isPaymentModalOpen, cancelPaymentModal, referenceNumber, donationAmount }) => {

    const donate = useTranslations('donate');
    const act = useTranslations('all_classes');


    return (

        <Modal
            title={<div className='w-full justify-center flex'>{donate('pending_transaction')}</div>}
            open={isPaymentModalOpen}
            onCancel={cancelPaymentModal}
            footer={[
                <Button key="close" onClick={cancelPaymentModal}>
                    {act('close')}
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
