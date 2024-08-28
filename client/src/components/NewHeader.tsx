import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate  } from "react-router-dom";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import { TextField, FormControl, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {useDispatch, useSelector } from "react-redux";
import CreateIcon from '@mui/icons-material/Create';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { _getAllTicket, _getAllStatatics , _getAllSummaryTickets} from '../Action/TicketDispatcher';
import { useTranslation } from 'react-i18next';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(1),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const navigateTo = useNavigate();
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
 
  const { user , deptData} = useSelector((state:any) => state.authReducer)
  const [open, setOpen] = React.useState(false);

  let [menu, setMenu]:any = React.useState([{title: 'My Profile', path: '/Profile', isOpen: true}])

  const [input, setInput] = React.useState({
    language: 'en',
  });

  let [path , setSelectPath] = React.useState(0)

  const handleChanges = (event) => {
    console.log(event.target.name, event.target.value);

    i18n.changeLanguage(event.target.value);

    setInput({ ...input, [event.target.name]: event.target.value });

  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onLogOut = () => {

    sessionStorage.removeItem("user");
    navigateTo('/')
    window.location.reload();

  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          {/* <span className="navbar-brand text-custom1 fw-bold fs-3 pe-md-3">CustTech Automation</span> */}

          <Typography variant="h6" style =  {{ marginRight: '20%'}} noWrap component="div">
          
          {t('bank_name')}
          </Typography>


          {
          <FormControl sx={{ minWidth: "20%" , marginLeft: '20%', margin:'5px', backgroundColor:'white'}}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      {/* Select Manager */}
                    </InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={input.language}
                      onChange={handleChanges}
                      fullWidth
                      // sx={{ mb: 2 }}
                      name="language"
                      // label="Select Manager"
                    >

                    <MenuItem value={'en'}>
                            {'English'}
                          </MenuItem>
                          <MenuItem value={'es'}>
                            {'Español'}
                          </MenuItem>
                          <MenuItem value={'fr'}>
                            {'Français'}
                          </MenuItem>
                    
                    </Select>
                  </FormControl>
            }
        </Toolbar>
        
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
  
          <div
            style={{
              display: "flex",
              padding: "20px",
              alignItems: "center",
              borderRadius: "10px",
              justifyContent: "flex-start",
              background: "#F2F3F5",
              margin: "10px",
              width: "80%",
            }}
          >
            <Avatar style={{ background: "#0F9D58" }}>
            {JSON.parse(sessionStorage.getItem("user") || "{}").FirstName[0]}
            {JSON.parse(sessionStorage.getItem("user") || "{}").LastName[0]}
            </Avatar>
            <div style={{ paddingLeft: "15px", textAlign: "start" }}>
              <div style={{ fontWeight: "bold", fontSize: "22px" }}>
              {JSON.parse(sessionStorage.getItem("user") || "{}").FirstName}
              </div>
              <div style={{ color: "#677784", fontSize: "12px" }}>
              {JSON.parse(sessionStorage.getItem("user") || "{}").cusTechRole}
              </div>
            </div>
          </div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>

        </DrawerHeader>
        <Divider />
        <List>
          {menu.map((text, index) => (
            text.isOpen &&
            <ListItem key={text.title} disablePadding  
             style={path === index ? {background:'#0d6efd'} : {background:'white'} } 
            onClick={() => {
              setSelectPath(index);
              handleDrawerClose();
              navigateTo(text.path)
              // history.push(text.path);
            }}>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                
                <ListItemText 
                //  primaryTypographyProps={{ variant: "h6" }}
                 primary={text.title}
                 />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))} */}
        </List>
        <div style={{ position: 'relative', marginTop: '100%'}}>
            <Divider style={{ margin: "20px 10px" }} />
            {/* <Button
              onClick={onLogOut}
              fullWidth
              variant="contained"
              color="error"
              startIcon={<ExitToAppIcon />}
            >
              {t('logout')}
            </Button> */}
                <Button
                onClick={onLogOut}
                type="submit"
                fullWidth
                startIcon={<ExitToAppIcon />}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {t('logout')}
              </Button>
          </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
    </Main>
    </Box>
  );
}
