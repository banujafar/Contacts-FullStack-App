import http from "http";
import {
  deleteContact,
  getContacts,
  postContact,
  updateContact,
} from "./handlers.js";

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");

  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  const regex = /(\/contacts)(?:\/(.+))?/g;
  const str = req.url;
  let m;
  m = regex.exec(str);

  if (m !== null) {
    const selectedId = m[2];
    if (m[1] === "/contacts") {
      switch (req.method) {
        case "GET":
          return getContacts(req, res, selectedId);
        case "POST":
          return postContact(req, res);
        case "PUT":
          return updateContact(req, res, selectedId);
        case "DELETE":
          return deleteContact(req, res, selectedId);
      }
    }
  }
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
