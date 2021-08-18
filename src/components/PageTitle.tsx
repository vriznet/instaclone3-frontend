import { Helmet } from 'react-helmet-async';

interface PageTitleProps {
  title: string;
}

const PageTitle = (props: PageTitleProps) => (
  <Helmet>
    <title>{props.title}</title>
  </Helmet>
);

export default PageTitle;
