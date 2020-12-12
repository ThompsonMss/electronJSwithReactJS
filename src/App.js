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
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  margin: 10,
  table: {
    minWidth: 300,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#FF6800",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

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
                  <Avatar style={{ background: "rgba(0,0,0,.1)" }}>
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

        <div
          style={{
            marginLeft: "10px",
            marginTop: "10px",
            marginBottom: "-20px",
          }}
        >
          <Button variant="contained" color="primary">
            Enviar
          </Button>
        </div>

        <TableContainer
          style={{
            marginTop: "40px",
            width: "98%",
            marginLeft: '10px'
          }}
          component={Paper}
          className="scrollbarHide"
        >
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Condomínio</StyledTableCell>
                <StyledTableCell align="center">Apartamento</StyledTableCell>
                <StyledTableCell align="right">Morador</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    Condomínio Dedicado
                  </StyledTableCell>
                  <StyledTableCell align="center">102A</StyledTableCell>
                  <StyledTableCell align="right">Thompson M</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </WrapperRight>
    </Container>
  );
}

export default App;
