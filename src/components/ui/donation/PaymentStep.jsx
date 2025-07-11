import { apiPost } from "@/src/services/api/api_service";
import {
  Card,
  Col,
  Divider,
  Form,
  Radio,
  Row,
  Select,
  Space,
  Typography,
  Button,
  Input,
  Modal,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import ConfettiButton from "../ConfettiAnimation";
import { sessionStorageFn } from "@/src/utils/fns/client";
import { encrypt } from "@/src/utils/fns/encryption";
import { useDonationListener, usePaymentSocketContext } from "@/src/hooks/paymentSocketContext";
import { PaymentStatus } from "@/src/config/settings";

const { Title, Paragraph, Text } = Typography;

const PaymentStep = ({
  form,
  setPaymentMethod,
  paymentMethod,
  selectedAmount,
  setShowDonatePopup,
  donationFrequency,
  setActiveTab,
  setIsPhoneValid,
  isPhoneValid,
  setShowProcessingModal,
}) => {
  const { joinRoom, isConnected, roomName } = usePaymentSocketContext();
  const [loading, setLoading] = useState(false);



  const room_name = useMemo(
    () => crypto.randomUUID().replace(/-/g, "").substring(0, 10),
    []
  );

  useEffect(() => {
    joinRoom(room_name);
  }, [room_name, joinRoom]);

  useDonationListener((paymentMsg) => {

    if (paymentMsg.status === 'success') {
      console.log('Payment successful!');

    } else if (paymentMsg.status === 'failed') {
      console.log('Payment failed!');

    }
  });

  const completeDonation = () => {
    setLoading(true);

    form
      .validateFields()
      .then(async (values) => {
        const donationData = {
          email: values.email || form.getFieldValue("email") || "",
          frequency: donationFrequency === "monthly" ? "monthly" : "one_time",
          name: values.name || form.getFieldValue("name") || "",
          amount: selectedAmount,
          phone_number: `255${values.phone_number}`,
          room_name: room_name,
        };

        const response = await apiPost("/make-donation", donationData);

        const encryptedPaymentReference = encrypt(response.data.order_response?.data[0]?.payment_token);
        const encryptedAmount = encrypt(selectedAmount);

        sessionStorageFn.set("payment_reference", encryptedPaymentReference);
        sessionStorageFn.set("amount_paid", encryptedAmount);

        console.log("Payment token:", response.data.order_response?.data[0]?.payment_token);

        setLoading(false);
        form.resetFields();
        setShowDonatePopup(false);

        setShowProcessingModal(true);

      })
      .catch((error) => {
        console.error("Validation failed:", error);
        setLoading(false);
      });
  };

  return (
    <div>
      

      <Form form={form} layout="vertical">
        <div style={{ marginBottom: "16px" }}>
          <Text strong>Choose payment method</Text>
          <Radio.Group
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={{ marginTop: "8px", width: "100%" }}
            buttonStyle="solid"
          >
            <Radio.Button
              disabled
              value="bank"
              style={{
                width: "50%",
                textAlign: "center",
                backgroundColor: paymentMethod === "bank" ? "#001840" : "",
                color: paymentMethod === "bank" ? "white" : "",
              }}
            >
              Bank A/C
            </Radio.Button>
            <Radio.Button
              value="mobile"
              style={{
                width: "50%",
                textAlign: "center",
                backgroundColor: paymentMethod === "mobile" ? "#001840" : "",
                color: paymentMethod === "mobile" ? "white" : "",
              }}
            >
              Mobile
            </Radio.Button>
          </Radio.Group>
        </div>

        {paymentMethod === "bank" && (
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item label="Card Number" style={{ marginBottom: "12px" }}>
                  <Input placeholder="1234 5678 9012 3456" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Expiration Date"
                  style={{ marginBottom: "12px" }}
                >
                  <Input placeholder="MM/YY" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="CVV" style={{ marginBottom: "12px" }}>
                  <Input placeholder="123" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Country" style={{ marginBottom: "12px" }}>
              <Select defaultValue="tanzania" style={{ width: "100%" }}>
                <Select.Option value="tanzania">Tanzania</Select.Option>
                <Select.Option value="kenya">Kenya</Select.Option>
                <Select.Option value="uganda">Uganda</Select.Option>
              </Select>
            </Form.Item>

            <Text style={{ fontSize: "12px" }}>
              By providing your card information, you allow Gala Education to
              charge your card for future payments in accordance with their
              terms.
            </Text>
          </Space>
        )}

        {paymentMethod === "mobile" && (
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Form.Item
              label="Phone number"
              name="phone_number"
              rules={[
                {
                  required: true,
                  message: (
                    <span className="text-xs ">
                      Please enter your phone number
                    </span>
                  ),
                },
                {
                  validator: async (_, value) => {
                    if (!value) {
                      setIsPhoneValid(false);
                      return Promise.resolve();
                    }

                    if (!/^[67]/.test(value)) {
                      setIsPhoneValid(false);
                      return Promise.reject(
                        <span className="text-xs">
                          Phone number must start with 6 or 7
                        </span>
                      );
                    }

                    if (!/^\d{9}$/.test(value)) {
                      setIsPhoneValid(false);
                      return Promise.reject(
                        <span className="text-xs">
                          Phone number must be exactly 9 digits
                        </span>
                      );
                    }
                    setIsPhoneValid(true);
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                placeholder="Phone number"
                addonBefore="255"
                size="middle"
                className="text-xs"
                disabled={loading}
              />
            </Form.Item>
          </Space>
        )}

        <Divider style={{ margin: "16px 0" }} />

        <Card
          size="small"
          style={{ marginBottom: "16px", background: "#f9f9f9" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>Amount :</Text>
            <Text strong>{`TZS ${selectedAmount?.toLocaleString()}`}</Text>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>Frequency:</Text>
            <Text strong>
              {donationFrequency === "monthly" ? "Monthly" : "One-time"}
            </Text>
          </div>
        </Card>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button disabled={loading} onClick={() => setActiveTab("1")}>Back</Button>
          <Button
            loading={loading}
            iconPosition="end"
            className="bg-[#001840] text-white"
            disabled={!selectedAmount || !isPhoneValid || loading}
            onClick={completeDonation}
          >
            Complete Donation
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PaymentStep;