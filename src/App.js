import {
  Container,
  WrapperLeft,
  WrapperRight,
  Title,
  Row,
  TitleList,
  DescList,
} from "./styles";
import { ResizableBox } from "react-resizable";

/* MATERIAL UI */
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  margin: 10,
}));

const CssTextField = withStyles({
  root: {
    width: "100%",
    margin: "10px",
    "& label.Mui-focused": {
      color: "#FF6800",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#FF6800",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "yellow",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FF6800",
      },
    },
  },
})(TextField);

function App() {
  const classes = useStyles();

  return (
    <Container>
      <ResizableBox
        width={400}
        height={Infinity}
        minConstraints={[300, Infinity]}
        maxConstraints={[500, Infinity]}
        resizeHandles={["e"]}
        axis="x"
      >
        <WrapperLeft>
          <Title color="#FFF">
            <span>Logs</span>
          </Title>
          <List className={classes.root}>
            {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(() => (
              <ListItem style={{ marginBottom: "10px", background: "#ff8c3f" }}>
                <ListItemAvatar>
                  <Avatar>
                    <BeachAccessIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<TitleList>Anderson</TitleList>}
                  secondary={<DescList>Entrada Principal</DescList>}
                />
              </ListItem>
            ))}
          </List>
        </WrapperLeft>
      </ResizableBox>

      <WrapperRight>
        <Title color="#888">
          <span>Query in the database</span>
        </Title>
        <Row>
          <CssTextField className={classes.margin} label="Host:" id="host" />
          <CssTextField
            className={classes.margin}
            label="Database:"
            id="database"
          />
          <CssTextField className={classes.margin} label="User:" id="user" />
        </Row>

        <Row>
          <CssTextField
            className={classes.margin}
            label="Password:"
            id="password"
          />
          <CssTextField
            className={classes.margin}
            label="ID Condomínio:"
            id="condominio"
          />
          <CssTextField
            className={classes.margin}
            label="ID Apartamento:"
            id="apartamento"
          />
        </Row>
      </WrapperRight>
    </Container>
  );
}

export default App;
