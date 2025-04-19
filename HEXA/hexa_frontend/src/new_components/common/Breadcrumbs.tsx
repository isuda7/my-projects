import {Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

type BreadCrumbData = {
  text: string;
  url: string;
}

const Breadcrumbs = (props: any) => {
  const navigate = useNavigate();
  const { t } = useTranslation()
  const { data } = props;

  const handleItemSelect = (url: string) => {
    navigate(url);
  };

  return (
    <div className="breadcrumbs">
	  <span>
		  <Link to={"/home"} onClick={() => handleItemSelect("/home")}>
        {t('home.home') /* 홈 */}
      </Link>
	  </span>
      {
        data.map((item:BreadCrumbData, index: number) => (
          <span key={index}>
            <Link 
              to={item.url} 
              onClick={() => handleItemSelect(item.url)}
            >
              {item.text}
            </Link>
          </span>
        ))
      }
    </div>
  );
};

export default Breadcrumbs;