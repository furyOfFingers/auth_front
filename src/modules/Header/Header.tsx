import { Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { LANGUAGE } from "../../constants/common";

export const Header = () => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setLanguage = (lang: string) => {
    localStorage.setItem(LANGUAGE, lang);
    i18n.changeLanguage(lang);
    handleClose();
  };

  return (
    <div>
      <Button sx={{ border: 1, marginBottom: 2 }} onClick={handleClick}>
        {t("menu.changeLanguage")}
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => setLanguage("ru")}>{t("menu.ru")}</MenuItem>

        <MenuItem onClick={() => setLanguage("en")}>{t("menu.en")}</MenuItem>
      </Menu>
    </div>
  );
};
