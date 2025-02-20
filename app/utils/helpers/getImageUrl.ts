function getImageUrl(src?: string) {
  return `${import.meta.env.VITE_API_STATIC_URL || ""}${src}`;
}

export default getImageUrl;
