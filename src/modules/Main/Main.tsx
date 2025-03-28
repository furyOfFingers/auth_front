import { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";

import { SignIn } from "../SignIn";
import { SignUp } from "../SignUp";
import { Header } from "../Header";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export const Main = (): JSX.Element => {
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Header />
      </Box>

      <Tabs value={value} onChange={handleChange}>
        <Tab label="Sign In" {...a11yProps(0)} />
        <Tab label="Sign Up" {...a11yProps(1)} />
      </Tabs>

      <CustomTabPanel value={value} index={0}>
        <SignIn />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <SignUp />
      </CustomTabPanel>
    </>
  );
};
