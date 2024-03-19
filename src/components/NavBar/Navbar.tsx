import {
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "@app/providers/auth";

// assets
import { images } from "@app/assets";

// icons
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import ArticleIcon from "@mui/icons-material/Article";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import StoreIcon from "@mui/icons-material/Store";
import BadgeIcon from "@mui/icons-material/Badge";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
// styles
import { useStyles } from "./NavBarStyles";
import { AuthRoleEnum } from "@app/enums/auth";

export const Navbar = () => {
  const classes = useStyles();
  const auth = useAuth();

  const linksList =
    auth.role === AuthRoleEnum.admin
      ? [
          {
            text: "MORBILIDAD",
            icon: <HealthAndSafetyIcon />,
            path: "/",
          },
          { text: "INFORMES", icon: <ArticleIcon />, path: "/reports" },
          {
            text: "CONSULTAS",
            icon: <MedicalServicesIcon />,
            path: "/Consult",
          },
          { text: "USUARIOS", icon: <PeopleAltIcon />, path: "/" },
          { text: "CLIENTES", icon: <StoreIcon />, path: "/" },
          { text: "EMPLEADOS", icon: <BadgeIcon />, path: "/" },
          { text: "EVENTUALIDAD", icon: <MoodBadIcon />, path: "/" },
          { text: "PERFIL", icon: <AccountCircleIcon />, path: "/" },
        ]
      : [
          {
            text: "MORBILIDAD",
            icon: <HealthAndSafetyIcon />,
            path: "/",
          },
          { text: "INFORMES", icon: <ArticleIcon />, path: "/reports" },
          { text: "CONSULTAS", icon: <MedicalServicesIcon />, path: "/" },
          { text: "EMPLEADOS", icon: <BadgeIcon />, path: "/" },
          { text: "EVENTUALIDAD", icon: <MoodBadIcon />, path: "/" },
          { text: "PERFIL", icon: <AccountCircleIcon />, path: "/" },
        ];

  return (
    <Container className={classes.container}>
      <img src={images.logo} alt="logo" className={classes.logo} />
      <List className={classes.listItems}>
        {linksList.map(({ text, icon, path }) => (
          <ListItem key={text} disablePadding sx={{ textDecoration: "none" }}>
            <Link style={{ textDecoration: "none" }} to={path}>
              <ListItemButton>
                <ListItemIcon sx={{ color: "black" }}>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
        <ListItem disablePadding className={classes.logOutItem}>
          <ListItemButton onClick={() => auth.logout()}>
            <ListItemIcon sx={{ color: "black" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Cerrar Sesión"}></ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Container>
  );
};
