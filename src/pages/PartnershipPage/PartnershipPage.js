import ReactMarkdown from 'react-markdown';
import SEO from '../../hoc/SEO';
import Feedback from '../../components/Feedback';
import { HandySvg } from 'handy-svg';
import arr from '../../assets/icons/arr.svg';
import { useContext } from 'react';
import { CustomContext } from '../../hoc/mainContentContext';
import { Link } from 'react-router-dom';

const PartnershipPage = () => {
  const { PartnerPageData } = useContext(CustomContext);
  const { Info, PartnerPageSEO } = PartnerPageData;

  return (
    <>
      <SEO
        SeoTitle={PartnerPageSEO?.SeoTitle || 'ProfiPackPlus - Сотрудничество'}
        SeoDescription={
          PartnerPageSEO?.SeoDescription || 'Описание Сотрудничества'
        }
      />
      <div className='partnership'>
        <div className='partnership__top'>
          <Link to='/'>
            Главная{' '}
            <span>
              <HandySvg src={arr} width='6' height='9' />
            </span>
          </Link>
          <span>Сотрудничество</span>
        </div>
        <div className='partnership__title'>
          <h2>Корпоративным клиентам</h2>
        </div>
        <div className='partnership__text order__self '>
          <ReactMarkdown children={Info} />
        </div>

        {/*Я по фану добавил, если не залетит можно убрать часть фидбека*/}
        <div className='partnership__feedback'>
          <div className='partnership__title'>
            <h2>Данные для сотрудничества:</h2>
          </div>
          <Feedback />
        </div>
      </div>
    </>
  );
};

export default PartnershipPage;
