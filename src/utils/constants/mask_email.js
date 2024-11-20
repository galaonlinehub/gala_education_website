export const maskEmail = (email) => {
  const [localPart, domain] = email.split("@");
  const visibleStart = localPart.slice(0, 1);
  const visibleEnd = localPart.slice(-2);
  const maskedMiddle = "*".repeat(localPart.length - 4);

  return `${visibleStart}${maskedMiddle}${visibleEnd}@${domain}`;
};
