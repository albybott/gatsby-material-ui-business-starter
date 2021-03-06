import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Toolbar, AppBar } from "@material-ui/core";

// import Menu from "./Menu";
// import MenuMobile from "./MenuMobile";
// import { Hidden, Toolbar, AppBar, IconButton, Link } from "@material-ui/core";
// import { Home } from "mdi-material-ui";

const Header = props => {
  const { title, info } = props;

  return (
    <AppBar id="appBar">
      <Toolbar>
        <Grid container justify="space-between" spacing={16}>
          <Grid item>
            <Typography variant="h5" color="inherit">
              {title}
            </Typography>
            {/* <Link key={"home"} to={"/"}>
              <IconButton style={{ color: "#fff" }}>
                <Home />
              </IconButton>
            </Link> */}
          </Grid>
          <Grid item>
            {/* <Hidden smDown>
              <Typography
                style={{ color: "#efefef", flex: 1 }}
                component="span"
                variant="caption"
              >
                <Menu />
              </Typography>
            </Hidden>
            <Hidden mdUp>
              <MenuMobile />
            </Hidden> */}
            <Typography variant="h6" color="inherit">
              {info}
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            contact {
              email
              phone
            }
          }
        }
      }
    `}
    render={data => (
      <Header data={data} title={props.title} info={props.info} />
    )}
  />
);
