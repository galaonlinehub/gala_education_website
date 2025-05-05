export const formatPhoneNumber = (value) => {
  const digitsOnly = value.replace(/\D/g, "");

  if (digitsOnly.length <= 3) {
    return digitsOnly;
  } else if (digitsOnly.length <= 6) {
    return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3)}`;
  } else {
    return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(
      3,
      6
    )}-${digitsOnly.slice(6, 9)}`;
  }
};

export const handlePhoneInput = (event) => {
  return formatPhoneNumber(event.target.value);
  // onChange(formattedValue);
};

export const reformat_phone_number = (phone_number) =>
  phone_number.replace(/\D/g, "");

export const mask_phone_number = (number) => {
  number = number.replace(/-/g, "");
  const visibleStart = number.slice(0, 5);
  const visibleEnd = number.slice(-2);
  const maskedMiddle = "*".repeat(
    number.length - (visibleStart.length + visibleEnd.length)
  );

  return `${visibleStart}${maskedMiddle}${visibleEnd}`;
};
