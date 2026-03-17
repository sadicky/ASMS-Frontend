type Pagedata = {
  title: string;
};
const PageMeta = ({ title }: Pagedata) => {
  return (
    <title>
      {title
        ? `${title} | ASMS Gambia`
        : ' ASMS Gambia'}
    </title>
  );
};

export default PageMeta;
