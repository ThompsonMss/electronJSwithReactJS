import { useEffect, useState } from "react";
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

import DriveEtaIcon from "@material-ui/icons/DriveEta";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";

const { ipcRenderer } = window.require("electron");

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

function App() {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const [host, setHost] = useState("localhost");
  const [user, setUser] = useState("postgres");
  const [pass, setPass] = useState("admin");
  const [database, setDatabase] = useState("acessodedicado");
  const [apt, setApt] = useState("");
  const [cond, setCond] = useState("");

  const [data, setData] = useState([]);
  const [dataLogs, setDataLogs] = useState([]);
  const [listenLog, setListenLog] = useState(null);

  useEffect(() => {
    ipcRenderer.on("endQuery", (event, message) => {
      setData(message);
      setLoading(false);
    });

    ipcRenderer.on("errorQuery", (event, message) => {
      alert("Não foi possível realizar consulta.");
      setLoading(false);
    });

    ipcRenderer.on("errorSocket", (event, message) => {
      alert("Não foi possível se conectar no servidor de socket.");
    });

    ipcRenderer.on("closeSocket", (event, message) => {
      alert("Servidor de socket encerrado.");
    });

    ipcRenderer.on("messageSocket", (event, message) => {
      setListenLog(message);
      console.log("Mensagem: ", message);
    });
  }, []);

  useEffect(() => {
    if (listenLog != null) {
      const aux = dataLogs;
      if (aux.length >= 20) {
        aux.splice(aux.length - 1, 1);
        aux.unshift(listenLog);
      } else {
        aux.unshift(listenLog);
      }

      setDataLogs(aux);
    }
  }, [listenLog]);

  function execQuery() {
    if (!apt) {
      alert("Preencha um ID APT");
      return;
    }

    if (!cond) {
      alert("Preencha um ID COND");
      return;
    }

    if (!host) {
      alert("Preencha um HOST");
      return;
    }

    if (!user) {
      alert("Preencha um USER");
      return;
    }

    if (!pass) {
      alert("Preencha um PASSWORD");
      return;
    }

    if (!database) {
      alert("Preencha um DATABASE");
      return;
    }

    try {
      setLoading(true);

      const params = {
        host: host,
        user: user,
        password: pass,
        database: database,
        id_apt: apt,
        id_cond: cond,
      };

      ipcRenderer.send("execQuery", params);
    } catch (e) {
      alert("Erro ao se conectar com banco de dados.");
      setLoading(false);
    }
  }

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
            {dataLogs.map((item, index) => (
              <ListItem
                key={index}
                style={{ marginBottom: "10px", background: "#ff8c3f" }}
              >
                <ListItemAvatar>
                  <Avatar style={{ background: "rgba(0,0,0,.1)" }}>
                    {item?.tipo == "car" ? (
                      <DriveEtaIcon />
                    ) : (
                      <EmojiPeopleIcon />
                    )}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <TitleList>{item?.no ? item?.no : "Opa!"}</TitleList>
                  }
                  secondary={
                    <DescList>
                      {item?.desc ? item?.desc : "Recebi um socket diferente"}
                    </DescList>
                  }
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
          <CssTextField
            className={classes.margin}
            label="Host:"
            id="host"
            value={host}
            onChange={(e) => setHost(e.target.value)}
          />
          <CssTextField
            className={classes.margin}
            label="Database:"
            id="database"
            value={database}
            onChange={(e) => setDatabase(e.target.value)}
          />
          <CssTextField
            className={classes.margin}
            label="User:"
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </Row>

        <Row>
          <CssTextField
            className={classes.margin}
            label="Password:"
            id="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <CssTextField
            className={classes.margin}
            label="ID Cond:"
            id="condominio"
            type="number"
            value={cond}
            onChange={(e) => setCond(e.target.value)}
          />
          <CssTextField
            className={classes.margin}
            label="ID Apt:"
            id="apartamento"
            type="number"
            value={apt}
            onChange={(e) => setApt(e.target.value)}
          />
        </Row>

        <div
          style={{
            marginLeft: "10px",
            marginTop: "10px",
            marginBottom: "-20px",
          }}
        >
          <Button onClick={execQuery} variant="contained" color="primary">
            {loading ? "Consultado..." : "Consultar"}
          </Button>
        </div>

        <TableContainer
          style={{
            marginTop: "40px",
            width: "98%",
            marginLeft: "10px",
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
              {data.map((row, index) => (
                <StyledTableRow key={index + ""}>
                  <StyledTableCell component="th" scope="row">
                    {row.no_cond}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.no_apt}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.no_morador}
                  </StyledTableCell>
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
