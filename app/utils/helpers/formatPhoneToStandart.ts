function formatPhoneNumber(phone: string): string {
  return phone.replace(/[\s\(\)-]/g, "");
}

export default formatPhoneNumber;
