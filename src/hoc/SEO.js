import { Helmet } from 'react-helmet';

const SEO = ({ SeoTitle, SeoDescription, SeoImage }) => {
  const MAIN_IMAGE_URL =
    SeoImage === null || SeoImage === undefined
      ? `https://www.profipackplus.kg/%PUBLIC_URL%/logo.jpg`
      : SeoImage[0] === '/'
      ? `https://www.profipackplus.kg${SeoImage}`
      : SeoImage;
  return (
    <Helmet>
      {/* HTML Meta Tags */}
      <title>{SeoTitle}</title>
      <meta name='title' content={SeoTitle} />
      <meta name='description' content={SeoDescription} />
      {/* Facebook Meta Tags */}
      <meta property='og:title' content={SeoTitle} />
      <meta property='og:description' content={SeoDescription} />
      <meta property='og:image' itemProp='image' content={MAIN_IMAGE_URL} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={window.location.href} />
      {/* Twitter Meta Tags */}
      <meta property='twitter:title' content={SeoTitle} />
      <meta property='twitter:description' content={SeoDescription} />
      <meta property='twitter:domain' content='profipackplus.kg' />
      <meta property='twitter:url' content={window.location.href} />
      <meta
        property='twitter:image'
        itemProp='image'
        content={MAIN_IMAGE_URL}
      />
      <meta property='twitter:card' content={MAIN_IMAGE_URL} />
    </Helmet>
  );
};

export default SEO;
