
import { useState } from 'react';
import axios from 'axios';
import "../../../../styles/auth/signup.css";
import countryList from 'country-list';
import { useRouter } from 'next/navigation';

const Payment = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    country: '',
  });

  const [errors, setErrors] = useState({
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    country: '',
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate form fields
      let hasErrors = false;
      const newErrors = { ...errors };

      if (!/^\d{16}$/.test(formData.cardNumber)) {
        newErrors.cardNumber = 'Invalid card number';
        hasErrors = true;
      }

      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expirationDate)) {
        newErrors.expirationDate = 'Invalid expiration date';
        hasErrors = true;
      }

      if (!/^\d{3}$/.test(formData.securityCode)) {
        newErrors.securityCode = 'Invalid security code';
        hasErrors = true;
      }

      if (!formData.country) {
        newErrors.country = 'Country is required';
        hasErrors = true;
      }

      setErrors(newErrors);
      if (hasErrors) return;

      // Submit form data to API
      await axios.post('/api/payment', formData);
      console.log('Payment successful');
    } catch (error) {
      console.error('Error submitting payment:', error);
    }
  };

  const countries = countryList.getData();

  return (
    <section className="py-12">
      <div className="flex flex-col items-center justify-center w-full sm:px-0">
        <span className="font-black text-[16px]">Payment</span>
        <span className="flex flex-col items-center">
          <span className="font-black text-[16px] leading-5">10,000 TSH</span>
          <span className="font-bold text-[12px] leading-5">(Billed Annually)</span>
        </span>
        <span className="font-semibold text-[14px]">
          Your subscription will auto-renew yearly until cancelled
        </span>

        <div className="hidden lg:flex gap-6 w-full sm:w-auto mt-6">
          <button className="h-input-height w-full sm:w-[328.9px] bg-[#001840] rounded-[5px] text-[16px] text-white font-black">
            Bank A/C
          </button>
          <button className="h-input-height w-full sm:w-[328.9px] bg-[#001840] rounded-[5px] text-[16px] text-white font-black">
            Mobile Payment
          </button>
        </div> 

        <div className="flex flex-col items-center justify-center w-full sm:w-[684.12px] mt-6">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col items-start gap-3">
              <div className="flex flex-col items-start gap-1 w-full">
                <label htmlFor="cardNumber" className="text-[16px] font-extrabold text-black">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 1234 1234 1234"
                  className={`h-input-height w-full bg-[#001840] rounded-[5px] placeholder-[#8C8B8D] placeholder:font-semibold placeholder:text-[13px] text-white pl-4 ${
                    errors.cardNumber ? 'border-red-500' : ''
                  }`}
                />
                {errors.cardNumber && (
                  <span className="text-red-500 text-sm">{errors.cardNumber}</span>
                )}
              </div>

              <div className="flex gap-3 w-full">
                <div className="flex flex-col items-start gap-1 w-1/2">
                  <label htmlFor="expirationDate" className="text-[16px] font-extrabold text-black">
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    id="expirationDate"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    className={`w-full h-input-height bg-[#001840] rounded-[5px] placeholder-[#8C8B8D] placeholder:font-semibold placeholder:text-[13px] text-white pl-4 ${
                      errors.expirationDate ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.expirationDate && (
                    <span className="text-red-500 text-sm">{errors.expirationDate}</span>
                  )}
                </div>

                <div className="flex flex-col items-start gap-1 w-1/2">
                  <label htmlFor="securityCode" className="text-[16px] font-extrabold text-black">
                    Security Code
                  </label>
                  <input
                    type="text"
                    id="securityCode"
                    name="securityCode"
                    value={formData.securityCode}
                    onChange={handleInputChange}
                    placeholder="CVC"
                    className={`w-full h-input-height bg-[#001840] rounded-[5px] placeholder-[#8C8B8D] placeholder:font-semibold placeholder:text-[13px] text-white pl-4 ${
                      errors.securityCode ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.securityCode && (
                    <span className="text-red-500 text-sm">{errors.securityCode}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-start gap-1 w-full">
                <label htmlFor="country" className="text-[16px] font-extrabold text-black">
                  Country
                </label>
                <div className="relative w-full">
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Select Country"
                    className={`h-input-height w-full bg-[#001840] rounded-[5px] placeholder-[#8C8B8D] placeholder:font-semibold placeholder:text-[13px] text-white pl-4 pr-8 ${
                      errors.country ? 'border-red-500' : ''
                    }`}
                  />
                  <div className="absolute top-1/2 transform -translate-y-1/2 right-4 text-white">
                    {formData.country && (
                      <span>
                        {countries.find((c) => c.name === formData.country).emoji}{' '}
                        {formData.country}
                      </span>
                    )}
                  </div>
                </div>
                {errors.country && (
                  <span className="text-red-500 text-sm">{errors.country}</span>
                )}
              </div>

              <span className="text-[12px] font-bold text-center w-full">
                By providing your card information, you allow Gala Education to charge your card for
                future payments in accordance with their terms.
              </span>

              <div className="flex items-center justify-center w-full">
                <button
                  onClick={()=>router.push('/signin')}
                  type="submit"
                  className="bg-[#030DFE] w-[117.46px] h-[42.27px] rounded-[5px] font-black text-[16px] text-white my-6"
                >
                  Pay
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Payment;


