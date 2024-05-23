import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Tabs, Tab } from '@mui/material';
import { Link, matchPath, useLocation } from 'react-router-dom';

const getSelectedTab = (pathname) => {

  if (matchPath({ path: '/notes', end: false}, pathname)) {
    return '/notes';
  }

  return '/';
}

export default function NavigationBar() {

  const { pathname } = useLocation();

  const [selectedTab, setSelectedTab] = useState('/');

  useEffect(() => {

    setSelectedTab(getSelectedTab(pathname));

  }, [pathname]);


  return (
    <AppBar position="fixed" sx={{ backgroundColor: "white" }}>
      <Toolbar sx={{}}>
        <Tabs value={selectedTab}>
          <Tab label="Home" value="/" component={Link} to="" />
          <Tab
            label="Notes"
            value="/notes"
            component={Link}
            to="notes"
          />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}