import {
  Box,
  Button,
  IconButton,
  Snackbar,
  TextField,
} from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { useState } from "react";
import "./App.scss";
import { writeSecretFriend } from "./firebase/config";

const App = () => {
  const [group, setGroup] = useState([{ name: "", group: "", id: "" }]);
  const [indexName, setIndexName] = useState(0);
  const [showUrls, setShowUrls] = useState(false);
  const [clipboard, setClipboard] = useState(false);

  const handleName = (name, index) => {
    setGroup(
      [...group].map((object, i) => {
        if (i === index) {
          return {
            ...object,
            name: name,
            id: `id${indexName}`,
          };
        } else return object;
      })
    );
  };

  const handleGroup = (nameGroup, index) => {
    setGroup(
      [...group].map((object, i) => {
        if (i === index) {
          return {
            ...object,
            group: nameGroup,
          };
        } else return object;
      })
    );
  };

  const handleAdd = () => {
    setGroup([...group, { name: "", group: "", id: "" }]);
    setIndexName(indexName + 1);
  };

  const createUrls = () => {
    let asignedUsers = [];
    let gifts = {};
    for (let index = 0; index < group.length; index++) {
      let available = group.filter(
        (item) => !item.group.includes(group[index].group)
      );

      available = available.filter((item) => !asignedUsers.includes(item.name));
      const secretFriend = getMultipleRandom(available);
      gifts = {
        ...gifts,
        [group[index].id]: {
          name: group[index].name,
          secretFriend: secretFriend[0].name,
        },
      };
      asignedUsers.push(secretFriend[0].name);
    }
    writeSecretFriend(gifts);
    setShowUrls(true);
  };

  const handleCopy = (id) => {
    const Text = `Hello, open this link to see who is your secret friend\n\nhttps://famous-khapse-ec370b.netlify.app/friend/${id}`;
    navigator.clipboard.writeText(Text);
    setClipboard(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setClipboard(false);
  };

  const getMultipleRandom = (arr) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, 1);
  };

  return (
    <Box className="App">
      <Box>
        {group.map((data, index) => {
          return (
            <Box key={index} className="Dialog">
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                size="small"
                value={group[index].name}
                onChange={(e) => handleName(e.target.value, index)}
              />
              <TextField
                id="outlined-basic"
                label="Group"
                variant="outlined"
                size="small"
                value={group[index].group}
                onChange={(e) => handleGroup(e.target.value, index)}
              />
              {showUrls ? (
                <IconButton
                  aria-label="copy"
                  onClick={() => handleCopy(group[index].id)}
                >
                  <AssignmentIcon />
                </IconButton>
              ) : (
                <IconButton aria-label="copy" disabled>
                  <AssignmentIcon />
                </IconButton>
              )}
            </Box>
          );
        })}
      </Box>
      <Box>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Agregar
        </Button>
        <Button variant="contained" color="primary" onClick={createUrls}>
          Generar enlaces
        </Button>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={clipboard}
        autoHideDuration={1000}
        onClose={handleClose}
        message="Copied"
      />
    </Box>
  );
};

export default App;
