import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomContext } from '../../hoc/mainContentContext';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';

const CatalogFullPage = () => {
  const { baseUrl, catalogs, setCatalogs } = useContext(CustomContext);
  const [loading, setLoading] = useState(true);

  // Получение каталогов
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        '/api/catalogs?populate[Icon][populate]=*&populate[sub_catalogs][populate]=*'
      )
      .then(({ data }) => {
        setCatalogs(data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Ошибка при загрузке каталогов:', error);
        setLoading(false);
      });
  }, [setCatalogs]);

  // Отображение подкатегорий
  const renderSubcategories = (subcategories, parentSlug) => {
    return (
      <div className="catalog-subcategories">
        {subcategories.map(({ id, Title, Description, Slug, Icon }) => (
          <div key={id} className="catalog-subcategory-item">
            <Link to={`/${parentSlug}/${Slug}`} className="catalog-subcategory-link">
              <div className="catalog-subcategory-image">
                {Icon ? (
                  <img src={`${baseUrl}${Icon?.url}`} alt={Title} />
                ) : (
                  <div className="catalog-image-placeholder"></div>
                )}
              </div>
              <div className="catalog-subcategory-title" title={Description}>
                {Title}
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  // Отображение категорий
  const renderCategories = () => {
    if (loading) {
      return (
        <div className="catalog-categories">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="catalog-category-item loading">
              <div className="catalog-category-header">
                <Skeleton height={60} width={60} className="catalog-category-image" />
                <Skeleton height={24} width={200} className="catalog-category-title" />
              </div>
              <div className="catalog-subcategories">
                {[...Array(4)].map((_, idx) => (
                  <div key={idx} className="catalog-subcategory-item">
                    <Skeleton height={80} width={80} className="catalog-subcategory-image" />
                    <Skeleton height={16} width={100} className="catalog-subcategory-title" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="catalog-categories">
        {catalogs?.map(({ id, Title, Slug, Description, sub_catalogs, Icon }) => (
          <div key={id} className="catalog-category-item">
            <div className="catalog-category-header">
              <Link to={`/${Slug}`} className="catalog-category-link">
                <div className="catalog-category-image">
                  {Icon ? (
                    <img src={`${baseUrl}${Icon?.url}`} alt={Title} />
                  ) : (
                    <div className="catalog-image-placeholder"></div>
                  )}
                </div>
                <h2 className="catalog-category-title" title={Description}>
                  {Title}
                </h2>
              </Link>
            </div>
            {sub_catalogs?.length > 0 && renderSubcategories(sub_catalogs, Slug)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="catalog-page">
      <div className="catalog-page-header">
        <h1>Каталог продукции</h1>
        <p>Выберите категорию для просмотра товаров</p>
      </div>
      {renderCategories()}
    </div>
  );
};

export default CatalogFullPage;
