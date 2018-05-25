var expressSession = require("express-session");
var mongoStore = require("connect-mongodb-session")(expressSession);

var store = new mongoStore({
  uri: "mongodb://user:user@ds157559.mlab.com:57559/vue-music", //CHANGE ME!!!!!!
  collection: "Sessions"
});

store.on("error", function(err) {
  console.log("[SESSION ERROR]", err);
});

// @ts-ignore
var session = expressSession({
  secret: "nvr3v34 f42qinpvakg294 aJQNERAVLA 234G  nrneukv24nrf 9 9FNEQDC 243WE98 9nf prew9 tg v  BPDF  P498QBUegd egUIVDAK EQC39nf832 we dfc", //CHANGE ME!!!!
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 52 * 2,
  },
  store,
  resave: true,
  saveUninitialized: true
});

module.exports = session;