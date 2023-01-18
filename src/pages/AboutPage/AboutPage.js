import { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import SEO from '../../hoc/SEO';
import arr from '../../assets/icons/arr.svg';
import { HandySvg } from 'handy-svg';
import { CustomContext } from '../../hoc/mainContentContext';
import { Link } from 'react-router-dom';
import Loading from '../../layout/loading/Loading';

const AboutPage = () => {
  const { AboutPageData } = useContext(CustomContext);
  const { AboutCompany, OurCapabilities, AboutPageSEO } = AboutPageData;
  return (
    <>
      <SEO
        SeoTitle={AboutPageSEO?.SeoTitle || 'ProfiPackPlus - О нас'}
        SeoDescription={AboutPageSEO?.SeoDescription || 'Подробнее о нас '}
      />
      <div className='about'>
        <div className='about__top'>
          <Link to='/'>
            Главная{' '}
            <span>
              <HandySvg src={arr} width='6' height='9' />
            </span>
          </Link>
          <span>О нас</span>
          <div className='about__top__title'>
            <h2>Наша компания</h2>
          </div>
        </div>
        <div className='about__mid order__self '>
          {AboutCompany !== '' ? (
            <ReactMarkdown children={AboutCompany} />
          ) : (
            <Loading />
          )}
        </div>
        <div className='about__bottom order__self '>
          <div className='about__bottom__title'>
            <h2>Наши возможности</h2>
          </div>
          {OurCapabilities !== '' ? (
            <ReactMarkdown children={OurCapabilities} />
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
};

export default AboutPage;
