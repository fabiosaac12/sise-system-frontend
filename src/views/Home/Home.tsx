import { Box, Container, Typography } from "@mui/material";
import { useStyles } from "./HomeStyles";

export const Home = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth="lg">
      <Box>
        <Typography variant="body2">Home</Typography>
      </Box>
    </Container>
  );
};
