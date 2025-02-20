interface MetaProps {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImageUrl?: string;
}

function Meta({
  description,
  ogDescription,
  ogImageUrl,
  ogTitle,
  title,
}: MetaProps) {
  return (
    <>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogDescription && (
        <meta property="og:description" content={ogDescription} />
      )}
      {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}
    </>
  );
}

export default Meta;
