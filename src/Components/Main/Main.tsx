import React, { ReactElement } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Categories from './Categories/Categories';
import CategorySingle from './CategorySingle/CategorySingle';
import ArticleSingle from './Articles/ArticleSingle/ArticleSingle';
import TopNews from './TopNews/TopNews';
import Search from './Search/Search';
import Page404 from './Page404/Page404';

import { ArticleInterface } from './Articles/ArticleInterface';
import { CountriesEnum } from '../../Service/CountriesEnum';
import { CategoriesItem } from './Categories/CategoriesItem';
import { Route, Switch } from 'react-router-dom';
import { Countries } from '../../Service/Countries';
import { ArticleTypeEnum } from './Articles/ArticleTypeEnum';

const main = (props: {
  isLoading: boolean;
  articles: ArticleInterface[];
  articleSingle: ArticleInterface | null;
  countryCode: CountriesEnum;
  searchTerm: string;
  category: string;
  articlesPerCategory: CategoriesItem[];
  hasMoreOnScroll: boolean;
  onArticleMoreEvent: (article: ArticleInterface) => void;
  onSearchEvent: (searchTerm: string) => void;
  onArticleBackEvent: () => void;
  onSingleCategory: (category: string) => void;
  onToggleCategory: (index: number) => void;
  onFetchMoreData: () => any;
}): ReactElement => {
  const country: string = Countries.filter(
    (it) => it.code === props.countryCode
  ).map((it) => it.name)[0];

  return (
    <Container className="container-main">
      <Switch>
        <Route
          path={[
            `/`,
            `/${props.countryCode}/`,
            `/${props.countryCode}/top-news`,
          ]}
          exact
          render={() => (
            <TopNews
              articles={props.articles}
              country={country}
              countryCode={props.countryCode}
              hasMoreOnScroll={props.hasMoreOnScroll}
              onArticleMoreEvent={props.onArticleMoreEvent}
              onFetchMoreData={props.onFetchMoreData}
            />
          )}
        />
        <Route
          path={`/${props.countryCode}/categories`}
          exact
          render={() => (
            <Categories
              articlesPerCategory={props.articlesPerCategory}
              country={country}
              countryCode={props.countryCode}
              onArticleMoreEvent={props.onArticleMoreEvent}
              handleEventSingleCategory={props.onSingleCategory}
              handleEventToggle={props.onToggleCategory}
            />
          )}
        />
        <Route
          path={`/${props.countryCode}/search`}
          exact
          render={() => (
            <Search
              articles={props.articles}
              country={country}
              countryCode={props.countryCode}
              searchTerm={props.searchTerm}
              hasMoreOnScroll={props.hasMoreOnScroll}
              onArticleMoreEvent={props.onArticleMoreEvent}
              onSearchEvent={props.onSearchEvent}
              onFetchMoreData={props.onFetchMoreData}
            />
          )}
        />
        <Route
          path={`/${props.countryCode}/category-single`}
          exact
          render={() => (
            <CategorySingle
              articles={props.articles}
              country={country}
              countryCode={props.countryCode}
              category={props.category}
              hasMoreOnScroll={props.hasMoreOnScroll}
              onArticleMoreEvent={props.onArticleMoreEvent}
              onFetchMoreData={props.onFetchMoreData}
            />
          )}
        />
        {props.articleSingle != null ? (
          <Route
            path={`/${props.countryCode}/article-single`}
            exact
            render={() => (
              <ArticleSingle
                item={props.articleSingle!}
                type={ArticleTypeEnum.SingleDetails}
                countryCode={props.countryCode}
                onArticleMoreEvent={props.onArticleMoreEvent}
                onArticleBackEvent={props.onArticleBackEvent}
              />
            )}
          />
        ) : null}
        ;
        <Route component={Page404} />
      </Switch>

      {props.isLoading === true ? <div className="loader"></div> : null}
    </Container>
  );
};

export default main;
