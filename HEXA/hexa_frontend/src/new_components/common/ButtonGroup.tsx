import {Button} from "@progress/kendo-react-buttons";
import * as React from "react";
import {useSelector} from "react-redux";
import {menuSelector} from "@/store/modules/userStore.ts";
import {Menu} from "@/utils/apiService/type/auth/menu.type.ts";
import {flattenMenu} from "@/utils/common.ts";
import {useTranslation} from "react-i18next";

interface ButtonGroupProps {
  handleDelete?: () => void;
  formRenderProps?: any;
  deleteButton?: boolean;
  submitButton?: boolean;
}

const ButtonGroup = ({handleDelete, formRenderProps, deleteButton, submitButton}: ButtonGroupProps) => {
  const {t} = useTranslation();
  const path = window.location.pathname;
  const menuList = useSelector(menuSelector);
  const flatMenuList = flattenMenu(menuList);
  const thisMenu = flatMenuList.find((menu: Menu) => menu.url === path);

  if (thisMenu) {
    const menuGrantType = thisMenu.grantType;
    deleteButton = menuGrantType?.find((v: any) => v === 'DELETE') ? deleteButton : false;
    submitButton = menuGrantType?.find((v: any) => v === 'UPDATE') ? submitButton : false;

  }

  return (
    <div className="btn-group k-mt-10">
      <div className="group-align-right">
        {deleteButton && (
          <Button
            onClick={handleDelete}
            size="large"
            fillMode="outline"
          >
            {t("common.delete")}
          </Button>
        )
        }
        <Button
          onClick={() => window.history.back()}
          size="large"
          fillMode="outline"
        >
          {t("common.cancel")}
        </Button>
        {submitButton && (
          <Button type={'submit'}
                  disabled={!formRenderProps.allowSubmit}
                  size="large"
                  themeColor="primary">
            {t("common.save")}
          </Button>
        )}
      </div>
    </div>
  );
}

export default ButtonGroup;