import { Card, Form, InputNumber, Radio, Button, Typography, Input } from 'antd';
import { useTranslations } from 'next-intl';
const { Paragraph, Text } = Typography;

const DonationStep = ({
  form,
  selectedAmount,
  setSelectedAmount,
  setDonationFrequency,
  donationFrequency,
  handleAmountChange,
}) => {
  const donate = useTranslations('donate');
  const sut = useTranslations('sign_up');
  return (
    <Form form={form}>
      <div className="mb-4">
        {/* <Radio.Group
          value={donationFrequency}
          onChange={(e) => setDonationFrequency(e.target.value)}
          style={{
            marginBottom: '16px',
            width: '100%',
          }}
          buttonStyle="solid"
        >
          <Radio.Button
            value="monthly"
            style={{
              width: '50%',
              textAlign: 'center',
              backgroundColor: donationFrequency === 'monthly' ? '#001840' : '',
              color: donationFrequency === 'monthly' ? 'white' : '',
              outline: 'none',
              boxShadow: 'none',
              border: 'none',
            }}
          >
            {donate('monthly')}
          </Radio.Button>
          <Radio.Button
            value="onetime"
            style={{
              width: '50%',
              textAlign: 'center',
              backgroundColor: donationFrequency === 'onetime' ? '#001840' : '',
              color: donationFrequency === 'onetime' ? 'white' : '',
              outline: 'none',
              boxShadow: 'none',
              border: 'none',
            }}
          >
            {donate('one_time')}
          </Radio.Button>
        </Radio.Group> */}

        <Form.Item label={donate('amount')}>
          <InputNumber
            addonBefore="TZS"
            min={100}
            className="w-full"
            formatter={(value) => (value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '')}
            parser={(value) => value.replace(/\s|,/g, '')}
            value={selectedAmount}
            onChange={handleAmountChange}
            onKeyDown={(event) => {
              // Allow only numbers, backspace, and delete
              const allowedKeys = [
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                'Backspace',
                'Delete',
              ];
              if (!allowedKeys.includes(event.key) && !event.ctrlKey && !event.metaKey) {
                event.preventDefault();
              }
            }}
          />
        </Form.Item>

        <div className="flex justify-between mt-2">
          {[1000, 5000, 10000].map((amount) => (
            <button
              key={amount}
              className={`flex-1 mx-1 border  rounded-md cursor-pointer text-sm ${selectedAmount === amount ? 'bg-[#001840] border-[#001840] hover:text-white text-white' : 'text-gray-400 border-gray-400 hover:border-[#001840] hover:text-[#001840]'}`}
              type={selectedAmount === amount ? 'primary' : 'default'}
              onClick={() => setSelectedAmount(amount)}
            >
              {amount?.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <Card size="small" className="mb-4 bg-[#f9f9f9]">
          <Paragraph className="text-xs">
            <Text className="font-semibold text-xs">{donate('your_impact')} </Text>
            {donate('support_message')}
          </Paragraph>
        </Card>

        <Form.Item name="name">
          <Input placeholder={donate('enter_your_name_optional')} />
        </Form.Item>

        <Form.Item name="email" rules={[{ type: 'email', message: sut('valid_email_address') }]}>
          <Input placeholder={donate('enter_your_email_optional')} />
        </Form.Item>
      </div>
    </Form>
  );
};

export default DonationStep;
