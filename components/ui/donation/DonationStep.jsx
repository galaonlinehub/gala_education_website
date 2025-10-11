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
      <div style={{ marginBottom: '20px' }}>
        <Radio.Group
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
            }}
          >
            {donate('one_time')}
          </Radio.Button>
        </Radio.Group>

        <Form.Item label={donate('amount')}>
          <InputNumber
            addonBefore="TZS"
            min={100}
            style={{ width: '100%' }}
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

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
          {[1000, 5000, 10000].map((amount) => (
            <Button
              key={amount}
              className={`${selectedAmount === amount ? 'bg-[#001840]' : null}`}
              type={selectedAmount === amount ? 'primary' : 'default'}
              onClick={() => setSelectedAmount(amount)}
              style={{ flex: 1, margin: '0 4px' }}
            >
              {amount?.toLocaleString()}
            </Button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <Card size="small" style={{ marginBottom: '16px', background: '#f9f9f9' }}>
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
