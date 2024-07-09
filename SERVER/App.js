const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const { verifyJWT, authAdmin, authEmployee } = require('./middleware/authorization');
const cookieParser = require('cookie-parser')
app.use(cookieParser());

const ContactUs=require("./routes/ContactUsRoute")
app.use("/ContactUs", ContactUs);

const logIn=require("./routes/loginRoute")
app.use("/logIn", logIn);

const signUp=require("./routes/signUpRoute")
app.use("/signUp", signUp);

const changePassword=require("./routes/changePasswordRoute")
app.use("/changePassword",  changePassword);

const gallery=require("./routes/galleryRoute")
app.use("/gallery", gallery);

const myDetails=require("./routes/myDetailsRoute")
app.use("/myDetails",  myDetails); 

app.use(verifyJWT);

const accessories=require("./routes/accessoriesRoute")
app.use("/accessories", accessories);

const dresses=require("./routes/dressesRoute")
app.use("/dresses", dresses);

const orders=require("./routes/ordersRoute")
app.use("/orders",authEmployee, orders);

const turns=require("./routes/turnsRoute")
app.use("/turns",authEmployee, turns);

const disabledTurns=require("./routes/disabledTurnsRoute")
app.use("/disabledTurns",authEmployee, disabledTurns);

const clients=require("./routes/clientsRoute")
app.use("/clients", authEmployee, clients);

const calendar=require("./routes/calendarRoute")
app.use("/calendar", authEmployee, calendar);

const workHours=require("./routes/workHoursRoute")
app.use("/workHours",authEmployee, workHours);



const users=require("./routes/usersRoute")
app.use("/users",authAdmin, users);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


