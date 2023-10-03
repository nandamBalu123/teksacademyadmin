import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import DownloadIcon from "@mui/icons-material/Download";
import "./StudentData.css";
import { useState } from "react";
import { useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { initialDataa } from "./data";

import { LastPage } from "@mui/icons-material";
// import ReactPaginate from 'react-paginate';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// function createData(name, calories, fat, carbs, protein) {

// for  Static table data
const initialData = [
  {
    id: 1,
    photo: "photo",
    registrationnumber: "1234",
    branch: "hitechcity",
    name: "John",
    studentid: 231,
    contactnumber: 23212,
    email: "john@gmail.com",
    course: "java",
    counsellar: "kavya",
    source: "walkin",
    joiningdata: "2023-10-03",
    trainingmode: "offline",
  },
  {
    id: 2,
    photo: "photo",
    registrationnumber: "231",
    branch: "ameerpet",
    name: "kavya",
    studentid: 232,
    contactnumber: 98765,
    email: "jane@gmail.com",
    course: "python",
    counsellar: "mark",
    source: "justdail",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 3,
    photo: "photo",
    registrationnumber: "9876",
    branch: "gachibowli",
    name: "Bob",
    studentid: 233,
    contactnumber: 54321,
    email: "bob@gmail.com",
    course: "react",
    counsellar: "alice",
    source: "referral",
    joiningdata: "2023-10-03",
    trainingmode: "offline",
  },
  {
    id: 4,
    photo: "photo",
    registrationnumber: "4321",
    branch: "dilsukhnagar",
    name: "Alice",
    studentid: 234,
    contactnumber: 12345,
    email: "alice@gmail.com",
    course: "node.js",
    counsellar: "john",
    source: "walkin",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 5,
    photo: "photo",
    registrationnumber: "7890",
    branch: "hitechcity",
    name: "Eve",
    studentid: 235,
    contactnumber: 67890,
    email: "eve@gmail.com",
    course: "angular",
    counsellar: "susan",
    source: "referral",
    joiningdata: "2023-10-05",
    trainingmode: "online",
  },
  {
    id: 6,
    photo: "photo",
    registrationnumber: "1357",
    branch: "hitechcity",
    name: "Michael",
    studentid: 236,
    contactnumber: 98765,
    email: "michael@gmail.com",
    course: "html/css",
    counsellar: "lisa",
    source: "referral",
    joiningdata: "2023-10-05",
    trainingmode: "offline",
  },
  {
    id: 7,
    photo: "photo",
    registrationnumber: "2468",
    branch: "dilsukhnagar",
    name: "Sarah",
    studentid: 237,
    contactnumber: 13579,
    email: "sarah@gmail.com",
    course: "javascript",
    counsellar: "david",
    source: "walkin",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 8,
    photo: "photo",
    registrationnumber: "9876",
    branch: "ameerpet",
    name: "Peter",
    studentid: 238,
    contactnumber: 24680,
    email: "peter@gmail.com",
    course: "ruby",
    counsellar: "sophia",
    source: "referral",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 9,
    photo: "photo",
    registrationnumber: "5432",
    branch: "ameerpet",
    name: "Mary",
    studentid: 239,
    contactnumber: 98765,
    email: "mary@gmail.com",
    course: "php",
    counsellar: "mark",
    source: "referral",
    joiningdata: "2023-10-03",
    trainingmode: "offline",
  },
  {
    id: 10,
    photo: "photo",
    registrationnumber: "1111",
    branch: "hitechcity",
    name: "David",
    studentid: 240,
    contactnumber: 54321,
    email: "david@gmail.com",
    course: "c#",
    counsellar: "lisa",
    source: "walkin",
    joiningdata: "2023-10-05",
    trainingmode: "offline",
  },
  {
    id: 11,
    photo: "photo",
    registrationnumber: "123",
    branch: "Madhapur",
    name: "son",
    studentid: 232,
    contactnumber: 23212,
    email: "john@gmail.com",
    course: "java",
    counsellar: "kavya",
    source: "walkin",
    joiningdata: "2023-10-03",
    trainingmode: "online",
  },
  {
    id: 12,
    photo: "photo",
    registrationnumber: "231",
    branch: "ameerpet",
    name: "kavya",
    studentid: 232,
    contactnumber: 98765,
    email: "jane@gmail.com",
    course: "python",
    counsellar: "mark",
    source: "justdail",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 13,
    photo: "photo",
    registrationnumber: "9876",
    branch: "gachibowli",
    name: "Bob",
    studentid: 233,
    contactnumber: 54321,
    email: "bob@gmail.com",
    course: "react",
    counsellar: "alice",
    source: "referral",
    joiningdata: "2023-10-03",
    trainingmode: "offline",
  },
  {
    id: 14,
    photo: "photo",
    registrationnumber: "4321",
    branch: "dilsukhnagar",
    name: "Alice",
    studentid: 234,
    contactnumber: 12345,
    email: "alice@gmail.com",
    course: "node.js",
    counsellar: "john",
    source: "walkin",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 15,
    photo: "photo",
    registrationnumber: "7890",
    branch: "hitechcity",
    name: "Eve",
    studentid: 235,
    contactnumber: 67890,
    email: "eve@gmail.com",
    course: "angular",
    counsellar: "susan",
    source: "referral",
    joiningdata: "2023-10-05",
    trainingmode: "online",
  },
  {
    id: 16,
    photo: "photo",
    registrationnumber: "1357",
    branch: "hitechcity",
    name: "Michael",
    studentid: 236,
    contactnumber: 98765,
    email: "michael@gmail.com",
    course: "html/css",
    counsellar: "lisa",
    source: "referral",
    joiningdata: "2023-10-05",
    trainingmode: "offline",
  },
  {
    id: 17,
    photo: "photo",
    registrationnumber: "2468",
    branch: "dilsukhnagar",
    name: "Sarah",
    studentid: 237,
    contactnumber: 13579,
    email: "sarah@gmail.com",
    course: "javascript",
    counsellar: "david",
    source: "walkin",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 18,
    photo: "photo",
    registrationnumber: "9876",
    branch: "ameerpet",
    name: "Peter",
    studentid: 238,
    contactnumber: 24680,
    email: "peter@gmail.com",
    course: "ruby",
    counsellar: "sophia",
    source: "referral",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 19,
    photo: "photo",
    registrationnumber: "5432",
    branch: "ameerpet",
    name: "Mary",
    studentid: 239,
    contactnumber: 98765,
    email: "mary@gmail.com",
    course: "php",
    counsellar: "mark",
    source: "referral",
    joiningdata: "2023-10-03",
    trainingmode: "offline",
  },
  {
    id: 20,
    photo: "photo",
    registrationnumber: "1111",
    branch: "hitechcity",
    name: "David",
    studentid: 240,
    contactnumber: 54321,
    email: "david@gmail.com",
    course: "c#",
    counsellar: "lisa",
    source: "walkin",
    joiningdata: "2023-10-05",
    trainingmode: "offline",
  },
  {
    id: 21,
    photo: "photo",
    registrationnumber: "1234",
    branch: "hitechcity",
    name: "John",
    studentid: 231,
    contactnumber: 23212,
    email: "john@gmail.com",
    course: "java",
    counsellar: "kavya",
    source: "walkin",
    joiningdata: "2023-10-03",
    trainingmode: "offline",
  },
  {
    id: 22,
    photo: "photo",
    registrationnumber: "231",
    branch: "ameerpet",
    name: "kavya",
    studentid: 232,
    contactnumber: 98765,
    email: "jane@gmail.com",
    course: "python",
    counsellar: "mark",
    source: "justdail",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 23,
    photo: "photo",
    registrationnumber: "9876",
    branch: "gachibowli",
    name: "Bob",
    studentid: 233,
    contactnumber: 54321,
    email: "bob@gmail.com",
    course: "react",
    counsellar: "alice",
    source: "referral",
    joiningdata: "2023-10-03",
    trainingmode: "offline",
  },
  {
    id: 24,
    photo: "photo",
    registrationnumber: "4321",
    branch: "dilsukhnagar",
    name: "Alice",
    studentid: 234,
    contactnumber: 12345,
    email: "alice@gmail.com",
    course: "node.js",
    counsellar: "john",
    source: "walkin",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 25,
    photo: "photo",
    registrationnumber: "7890",
    branch: "hitechcity",
    name: "Eve",
    studentid: 235,
    contactnumber: 67890,
    email: "eve@gmail.com",
    course: "angular",
    counsellar: "susan",
    source: "referral",
    joiningdata: "2023-10-05",
    trainingmode: "online",
  },
  {
    id: 26,
    photo: "photo",
    registrationnumber: "1357",
    branch: "hitechcity",
    name: "Michael",
    studentid: 236,
    contactnumber: 98765,
    email: "michael@gmail.com",
    course: "html/css",
    counsellar: "lisa",
    source: "referral",
    joiningdata: "2023-10-05",
    trainingmode: "offline",
  },
  {
    id: 27,
    photo: "photo",
    registrationnumber: "2468",
    branch: "dilsukhnagar",
    name: "Sarah",
    studentid: 237,
    contactnumber: 13579,
    email: "sarah@gmail.com",
    course: "javascript",
    counsellar: "david",
    source: "walkin",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 28,
    photo: "photo",
    registrationnumber: "9876",
    branch: "ameerpet",
    name: "Peter",
    studentid: 238,
    contactnumber: 24680,
    email: "peter@gmail.com",
    course: "ruby",
    counsellar: "sophia",
    source: "referral",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 29,
    photo: "photo",
    registrationnumber: "5432",
    branch: "ameerpet",
    name: "Mary",
    studentid: 239,
    contactnumber: 98765,
    email: "mary@gmail.com",
    course: "php",
    counsellar: "mark",
    source: "referral",
    joiningdata: "2023-10-03",
    trainingmode: "offline",
  },
  {
    id: 30,
    photo: "photo",
    registrationnumber: "1111",
    branch: "hitechcity",
    name: "David",
    studentid: 240,
    contactnumber: 54321,
    email: "david@gmail.com",
    course: "c#",
    counsellar: "lisa",
    source: "walkin",
    joiningdata: "2023-10-05",
    trainingmode: "offline",
  },
  
  {
    id: 31,
    photo: "photo",
    registrationnumber: "1234",
    branch: "hitechcity",
    name: "John",
    studentid: 231,
    contactnumber: 23212,
    email: "john@gmail.com",
    course: "java",
    counsellar: "kavya",
    source: "walkin",
    joiningdata: "2023-10-03",
    trainingmode: "offline",
  },
  {
    id: 32,
    photo: "photo",
    registrationnumber: "231",
    branch: "ameerpet",
    name: "kavya",
    studentid: 232,
    contactnumber: 98765,
    email: "jane@gmail.com",
    course: "python",
    counsellar: "mark",
    source: "justdail",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 33,
    photo: "photo",
    registrationnumber: "9876",
    branch: "gachibowli",
    name: "Bob",
    studentid: 233,
    contactnumber: 54321,
    email: "bob@gmail.com",
    course: "react",
    counsellar: "alice",
    source: "referral",
    joiningdata: "2023-10-03",
    trainingmode: "offline",
  },
  {
    id: 34,
    photo: "photo",
    registrationnumber: "4321",
    branch: "dilsukhnagar",
    name: "Alice",
    studentid: 234,
    contactnumber: 12345,
    email: "alice@gmail.com",
    course: "node.js",
    counsellar: "john",
    source: "walkin",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 35,
    photo: "photo",
    registrationnumber: "7890",
    branch: "hitechcity",
    name: "Eve",
    studentid: 235,
    contactnumber: 67890,
    email: "eve@gmail.com",
    course: "angular",
    counsellar: "susan",
    source: "referral",
    joiningdata: "2023-10-05",
    trainingmode: "online",
  },
  {
    id: 36,
    photo: "photo",
    registrationnumber: "1357",
    branch: "hitechcity",
    name: "Michael",
    studentid: 236,
    contactnumber: 98765,
    email: "michael@gmail.com",
    course: "html/css",
    counsellar: "lisa",
    source: "referral",
    joiningdata: "2023-10-05",
    trainingmode: "offline",
  },
  {
    id: 37,
    photo: "photo",
    registrationnumber: "2468",
    branch: "dilsukhnagar",
    name: "Sarah",
    studentid: 237,
    contactnumber: 13579,
    email: "sarah@gmail.com",
    course: "javascript",
    counsellar: "david",
    source: "walkin",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 38,
    photo: "photo",
    registrationnumber: "9876",
    branch: "ameerpet",
    name: "Peter",
    studentid: 238,
    contactnumber: 24680,
    email: "peter@gmail.com",
    course: "ruby",
    counsellar: "sophia",
    source: "referral",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 39,
    photo: "photo",
    registrationnumber: "5432",
    branch: "ameerpet",
    name: "Mary",
    studentid: 239,
    contactnumber: 98765,
    email: "mary@gmail.com",
    course: "php",
    counsellar: "mark",
    source: "referral",
    joiningdata: "2023-10-03",
    trainingmode: "offline",
  },
  {
    id: 40,
    photo: "photo",
    registrationnumber: "1111",
    branch: "hitechcity",
    name: "David",
    studentid: 240,
    contactnumber: 54321,
    email: "david@gmail.com",
    course: "c#",
    counsellar: "lisa",
    source: "walkin",
    joiningdata: "2023-10-05",
    trainingmode: "offline",
  },
  
  {
    id: 41,
    photo: "photo",
    registrationnumber: "1234",
    branch: "hitechcity",
    name: "John",
    studentid: 231,
    contactnumber: 23212,
    email: "john@gmail.com",
    course: "java",
    counsellar: "kavya",
    source: "walkin",
    joiningdata: "2023-10-03",
    trainingmode: "offline",
  },
  {
    id: 42,
    photo: "photo",
    registrationnumber: "231",
    branch: "ameerpet",
    name: "kavya",
    studentid: 232,
    contactnumber: 98765,
    email: "jane@gmail.com",
    course: "python",
    counsellar: "mark",
    source: "justdail",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 43,
    photo: "photo",
    registrationnumber: "9876",
    branch: "gachibowli",
    name: "Bob",
    studentid: 233,
    contactnumber: 54321,
    email: "bob@gmail.com",
    course: "react",
    counsellar: "alice",
    source: "referral",
    joiningdata: "2023-10-03",
    trainingmode: "offline",
  },
  {
    id: 44,
    photo: "photo",
    registrationnumber: "4321",
    branch: "dilsukhnagar",
    name: "Alice",
    studentid: 234,
    contactnumber: 12345,
    email: "alice@gmail.com",
    course: "node.js",
    counsellar: "john",
    source: "walkin",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 45,
    photo: "photo",
    registrationnumber: "7890",
    branch: "hitechcity",
    name: "Eve",
    studentid: 235,
    contactnumber: 67890,
    email: "eve@gmail.com",
    course: "angular",
    counsellar: "susan",
    source: "referral",
    joiningdata: "2023-10-05",
    trainingmode: "online",
  },
  {
    id: 46,
    photo: "photo",
    registrationnumber: "1357",
    branch: "hitechcity",
    name: "Michael",
    studentid: 236,
    contactnumber: 98765,
    email: "michael@gmail.com",
    course: "html/css",
    counsellar: "lisa",
    source: "referral",
    joiningdata: "2023-10-05",
    trainingmode: "offline",
  },
  {
    id: 47,
    photo: "photo",
    registrationnumber: "2468",
    branch: "dilsukhnagar",
    name: "Sarah",
    studentid: 237,
    contactnumber: 13579,
    email: "sarah@gmail.com",
    course: "javascript",
    counsellar: "david",
    source: "walkin",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 48,
    photo: "photo",
    registrationnumber: "9876",
    branch: "ameerpet",
    name: "Peter",
    studentid: 238,
    contactnumber: 24680,
    email: "peter@gmail.com",
    course: "ruby",
    counsellar: "sophia",
    source: "referral",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 49,
    photo: "photo",
    registrationnumber: "5432",
    branch: "ameerpet",
    name: "Mary",
    studentid: 239,
    contactnumber: 98765,
    email: "mary@gmail.com",
    course: "php",
    counsellar: "mark",
    source: "referral",
    joiningdata: "2023-10-03",
    trainingmode: "offline",
  },
  {
    id: 50,
    photo: "photo",
    registrationnumber: "1111",
    branch: "hitechcity",
    name: "David",
    studentid: 240,
    contactnumber: 54321,
    email: "david@gmail.com",
    course: "c#",
    counsellar: "lisa",
    source: "walkin",
    joiningdata: "2023-10-05",
    trainingmode: "offline",
  },
  
  {
    id: 51,
    photo: "photo",
    registrationnumber: "1234",
    branch: "hitechcity",
    name: "John",
    studentid: 231,
    contactnumber: 23212,
    email: "john@gmail.com",
    course: "java",
    counsellar: "kavya",
    source: "walkin",
    joiningdata: "2023-10-03",
    trainingmode: "offline",
  },
  {
    id: 52,
    photo: "photo",
    registrationnumber: "231",
    branch: "ameerpet",
    name: "kavya",
    studentid: 232,
    contactnumber: 98765,
    email: "jane@gmail.com",
    course: "python",
    counsellar: "mark",
    source: "justdail",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 53,
    photo: "photo",
    registrationnumber: "9876",
    branch: "gachibowli",
    name: "Bob",
    studentid: 233,
    contactnumber: 54321,
    email: "bob@gmail.com",
    course: "react",
    counsellar: "alice",
    source: "referral",
    joiningdata: "2023-10-03",
    trainingmode: "offline",
  },
  {
    id: 54,
    photo: "photo",
    registrationnumber: "4321",
    branch: "dilsukhnagar",
    name: "Alice",
    studentid: 234,
    contactnumber: 12345,
    email: "alice@gmail.com",
    course: "node.js",
    counsellar: "john",
    source: "walkin",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 55,
    photo: "photo",
    registrationnumber: "7890",
    branch: "hitechcity",
    name: "Eve",
    studentid: 235,
    contactnumber: 67890,
    email: "eve@gmail.com",
    course: "angular",
    counsellar: "susan",
    source: "referral",
    joiningdata: "2023-10-05",
    trainingmode: "online",
  },
  {
    id: 56,
    photo: "photo",
    registrationnumber: "1357",
    branch: "hitechcity",
    name: "Michael",
    studentid: 236,
    contactnumber: 98765,
    email: "michael@gmail.com",
    course: "html/css",
    counsellar: "lisa",
    source: "referral",
    joiningdata: "2023-10-05",
    trainingmode: "offline",
  },
  {
    id: 57,
    photo: "photo",
    registrationnumber: "2468",
    branch: "dilsukhnagar",
    name: "Sarah",
    studentid: 237,
    contactnumber: 13579,
    email: "sarah@gmail.com",
    course: "javascript",
    counsellar: "david",
    source: "walkin",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 58,
    photo: "photo",
    registrationnumber: "9876",
    branch: "ameerpet",
    name: "Peter",
    studentid: 238,
    contactnumber: 24680,
    email: "peter@gmail.com",
    course: "ruby",
    counsellar: "sophia",
    source: "referral",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 59,
    photo: "photo",
    registrationnumber: "5432",
    branch: "ameerpet",
    name: "Mary",
    studentid: 239,
    contactnumber: 98765,
    email: "mary@gmail.com",
    course: "php",
    counsellar: "mark",
    source: "referral",
    joiningdata: "2023-10-03",
    trainingmode: "offline",
  },
  {
    id: 60,
    photo: "photo",
    registrationnumber: "1111",
    branch: "hitechcity",
    name: "David",
    studentid: 240,
    contactnumber: 54321,
    email: "david@gmail.com",
    course: "c#",
    counsellar: "lisa",
    source: "walkin",
    joiningdata: "2023-10-05",
    trainingmode: "offline",
  },
  
  {
    id: 61,
    photo: "photo",
    registrationnumber: "1234",
    branch: "hitechcity",
    name: "John",
    studentid: 231,
    contactnumber: 23212,
    email: "john@gmail.com",
    course: "java",
    counsellar: "kavya",
    source: "walkin",
    joiningdata: "2023-10-03",
    trainingmode: "offline",
  },
  {
    id: 62,
    photo: "photo",
    registrationnumber: "231",
    branch: "ameerpet",
    name: "kavya",
    studentid: 232,
    contactnumber: 98765,
    email: "jane@gmail.com",
    course: "python",
    counsellar: "mark",
    source: "justdail",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 63,
    photo: "photo",
    registrationnumber: "9876",
    branch: "gachibowli",
    name: "Bob",
    studentid: 233,
    contactnumber: 54321,
    email: "bob@gmail.com",
    course: "react",
    counsellar: "alice",
    source: "referral",
    joiningdata: "2023-10-03",
    trainingmode: "offline",
  },
  {
    id: 64,
    photo: "photo",
    registrationnumber: "4321",
    branch: "dilsukhnagar",
    name: "Alice",
    studentid: 234,
    contactnumber: 12345,
    email: "alice@gmail.com",
    course: "node.js",
    counsellar: "john",
    source: "walkin",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 65,
    photo: "photo",
    registrationnumber: "7890",
    branch: "hitechcity",
    name: "Eve",
    studentid: 235,
    contactnumber: 67890,
    email: "eve@gmail.com",
    course: "angular",
    counsellar: "susan",
    source: "referral",
    joiningdata: "2023-10-05",
    trainingmode: "online",
  },
  {
    id: 66,
    photo: "photo",
    registrationnumber: "1357",
    branch: "hitechcity",
    name: "Michael",
    studentid: 236,
    contactnumber: 98765,
    email: "michael@gmail.com",
    course: "html/css",
    counsellar: "lisa",
    source: "referral",
    joiningdata: "2023-10-05",
    trainingmode: "offline",
  },
  {
    id: 67,
    photo: "photo",
    registrationnumber: "2468",
    branch: "dilsukhnagar",
    name: "Sarah",
    studentid: 237,
    contactnumber: 13579,
    email: "sarah@gmail.com",
    course: "javascript",
    counsellar: "david",
    source: "walkin",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 68,
    photo: "photo",
    registrationnumber: "9876",
    branch: "ameerpet",
    name: "Peter",
    studentid: 238,
    contactnumber: 24680,
    email: "peter@gmail.com",
    course: "ruby",
    counsellar: "sophia",
    source: "referral",
    joiningdata: "2023-10-04",
    trainingmode: "online",
  },
  {
    id: 69,
    photo: "photo",
    registrationnumber: "5432",
    branch: "ameerpet",
    name: "Mary",
    studentid: 239,
    contactnumber: 98765,
    email: "mary@gmail.com",
    course: "php",
    counsellar: "mark",
    source: "referral",
    joiningdata: "2023-10-03",
    trainingmode: "offline",
  },
  {
    id: 70,
    photo: "photo",
    registrationnumber: "1111",
    branch: "hitechcity",
    name: "David",
    studentid: 240,
    contactnumber: 54321,
    email: "david@gmail.com",
    course: "c#",
    counsellar: "lisa",
    source: "walkin",
    joiningdata: "2023-10-05",
    trainingmode: "offline",
  },
  
  
];
// Add more data objects as needed  
let initialDataCount = initialData.length;

const StudentData = () => {
  const [filteredData, setFilteredData] = useState(initialData);
  let recordCount = filteredData.length;
  //
  let [date, setdate] = useState("");
  let [branch, setbranch] = useState("");

  let [source, setsource] = useState("");

  let [mode, setmode] = useState("");
  let [search, setSearch] = useState("");
  const handleFilter = () => {
    const filteredResult = initialData.filter((item) => {
      if (
        item.joiningdata.includes(date) &&
        item.branch.includes(branch) &&
        item.source.includes(source) &&
        item.trainingmode.includes(mode)
      )
        return (
          item.joiningdata.includes(date) &&
          item.branch.includes(branch) &&
          item.source.includes(source) &&
          item.trainingmode.includes(mode)
        );
    });
    setFilteredData(filteredResult);
  };
  useEffect(() => {
    handleFilter();
  }, [date, source, mode, branch]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    const filteredResults = initialData.filter((item) => {
      if (item.name.toLowerCase().includes(newSearchTerm.toLowerCase())) {
        return item.name.toLowerCase().includes(newSearchTerm.toLowerCase());
      }
      if (item.branch.toLowerCase().includes(newSearchTerm.toLowerCase())) {
        return item.branch.toLowerCase().includes(newSearchTerm.toLowerCase());
      }
      if (item.counsellar.toLowerCase().includes(newSearchTerm.toLowerCase())) {
        return item.counsellar
          .toLowerCase()
          .includes(newSearchTerm.toLowerCase());
      }

      if (item.course.toLowerCase().includes(newSearchTerm.toLowerCase())) {
        return item.course.toLowerCase().includes(newSearchTerm.toLowerCase());
      }
      if (
        item.registrationnumber
          .toString()
          .toLowerCase()
          .includes(newSearchTerm.toLowerCase())
      ) {
        return item.registrationnumber
          .toString()
          .toLowerCase()
          .includes(newSearchTerm.toLowerCase());
      }
      if (
        item.studentid
          .toString()
          .toLowerCase()
          .includes(newSearchTerm.toLowerCase())
      ) {
        return item.studentid
          .toString()
          .toLowerCase()
          .includes(newSearchTerm.toLowerCase());
      }
      if (
        item.trainingmode.toLowerCase().includes(newSearchTerm.toLowerCase())
      ) {
        return item.trainingmode
          .toLowerCase()
          .includes(newSearchTerm.toLowerCase());
      }
    });

    setFilteredData(filteredResults);
  };
  const [currentPage , setCurrentPage] = useState(1)
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage; 
  const records = initialData.slice(firstIndex , lastIndex);
  const npage = Math.ceil(initialData.length/recordsPerPage)
 const numbers = [...Array(npage +1).keys()].slice(1)


  return (
    <div className="studetdetails container">
      <div className="row mb-3">
        <div className="col-9 col-md-9 ">
          <input
            type="text"
            placeholder="Search Here......"
            style={{
              height: "55px",
              width: "100%",
              padding: "10px",
              border: "1.5px solid black",
              borderRadius: "5px",
            }}
            value={searchTerm}
            // value={search}
            onChange={handleSearchChange}
            // onChange={(e) => {
            //   handleFilter();
            //   setSearch(e.target.value);
            // }}
          />
        </div>
        <div className="col-3 col-md-3 text-end pt-lg-3">
          {recordCount}/{initialDataCount}
        </div>
      </div>
      <div className="row mb-3 ">
        <input
          type="date"
          className="col-12 col-md-5 col-lg-3 me-2 felids"
          placeholder="Enter Date"
          style={{
            height: "45px",

            padding: "15px",
            border: "1.5px solid black",
            borderRadius: "5px",
          }}
          // onChange={(e) => handleDateFilter(e.target.value)}
          onChange={(e) => {
            handleFilter();
            setdate(e.target.value);
          }}
        />
        <select
          className="col-12 col-md-5 col-lg-2 me-2 felids"
          id=""
          placeholder="Filter Branch"
          required
          style={{
            height: "45px",

            border: "1.5px solid black",
            borderRadius: "5px",
          }}
          // onChange={(e) => handleBranchFilter(e.target.value)}
          onChange={(e) => {
            setbranch(e.target.value);
          }}
        >
          <option value="">Branch</option>
          <option value="hitechcity"> Hitech city</option>
          <option value="ameerpet"> Ameerpet</option>
          <option value="dilsukhnagar"> Dilsukhnagar</option>
          <option value="gachibowli"> Gachibowli</option>
        </select>
        <select
          className="col-12 col-md-5 col-lg-2 me-2 felids"
          id=""
          placeholder="Lead Source"
          required
          style={{
            height: "45px",

            border: "1.5px solid black",
            borderRadius: "5px",
          }}
          // onChange={(e) => handleLeadFilter(e.target.value)}
          onChange={(e) => {
            setsource(e.target.value);
          }}
        >
          <option value="">LeadSource</option>
          <option value="walkin"> Walkin</option>
          <option value="justdail"> JustDail</option>
          <option value="referral"> Referral</option>
        </select>
        <select
          className="col-12 col-md-5 col-lg-2 me-2 felids"
          id=""
          placeholder="Mode of Traning"
          required
          style={{
            height: "45px",

            border: "1.5px solid black",
            borderRadius: "5px",
          }}
          // onChange={(e) => handleModeOfTrainingFilter(e.target.value)}
          onChange={(e) => {
            setmode(e.target.value);
          }}
        >
          <option value="">Mode Of Training</option>
          <option value="online"> Online</option>
          <option value="offline"> Offline</option>
        </select>
        <RotateLeftIcon
          sx={{ fontSize: 48 }}
          className="col-sm-12 col-md-4 col-lg-2  me-lg-3 "
        />
        <ShowChartIcon
          sx={{ fontSize: 48 }}
          className="col-sm-12 col-md-4 col-lg-2 me-lg-4 "
        />
        <DownloadIcon
          sx={{ fontSize: 48 }}
          className="col-sm-12 col-md-4 col-lg-2   "
        />
      </div>
      

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className=" bg-primary fs-6 border border 1 text-center ">
                SNo
              </StyledTableCell>
              <StyledTableCell className=" bg-primary fs-6 border border 1 text-center" align="left">
                Photo
              </StyledTableCell>
              <StyledTableCell className="  bg-primary fs-6 border border 1 text-centerborder border 1 text-center" align="left">
                Registration No
              </StyledTableCell>
              <StyledTableCell className="bg-primary fs-6 border border 1 text-center" align="left">
                Student Name & Student ID
              </StyledTableCell>
              <StyledTableCell className="bg-primary fs-6 border border 1 text-center " align="left">
                Contact Number & Email
              </StyledTableCell>
              <StyledTableCell className="bg-primary fs-6 border border 1 text-center" align="left">
                Course Counseller Source
              </StyledTableCell>
              <StyledTableCell className="bg-primary fs-6 border border 1 text-center " align="left">
                Joining Date & Traning Mode
              </StyledTableCell>
              <StyledTableCell className="bg-primary fs-6 border border 1 text-center" align="left">
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* <StyledTableRow>
              <StyledTableCell align="center">1</StyledTableCell>
              <StyledTableCell align="center">Photo</StyledTableCell>
              <StyledTableCell align="center"> 23745859757</StyledTableCell>
              <StyledTableCell align="center">Bhavitha</StyledTableCell>
              <StyledTableCell align="center">12345</StyledTableCell>
              <StyledTableCell align="center">Full Stack</StyledTableCell>
              <StyledTableCell align="center">23-09-01</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </StyledTableRow> */}
           
          
           
            
            {/* <StyledTableRow>
              <StyledTableCell align="center">1</StyledTableCell>
              <StyledTableCell align="center">Photo</StyledTableCell>
              <StyledTableCell align="center"> 23745859757</StyledTableCell>
              <StyledTableCell align="center">Bhavitha</StyledTableCell>
              <StyledTableCell align="center">12345</StyledTableCell>
              <StyledTableCell align="center">Full Stack</StyledTableCell>
              <StyledTableCell align="center">23-09-01</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </StyledTableRow>
      */}
            
            {records.map((item) => (
              // <li key={item.id}>{item.name}</li>
              <StyledTableRow key={item.id}>
                <StyledTableCell className=" border border 2 text-center">{item.id}</StyledTableCell>
                <StyledTableCell className=" border border 1 text-center">{item.photo}</StyledTableCell>
                <StyledTableCell className=" border border 1 text-center">
                  <p> {item.registrationnumber}</p>  {item.branch}
                </StyledTableCell>
                <StyledTableCell className=" border border 1 text-center">
                  {item.name} 
                  {item.studentid}
                </StyledTableCell>
                <StyledTableCell className=" border border 1 text-center">
                  {item.contactnumber} <hr />
                  {item.email}
                </StyledTableCell>
                <StyledTableCell className=" border border 1 text-center">
                  {item.course} <hr />
                  {item.counsellar} <hr />
                  {item.source}
                </StyledTableCell>
                <StyledTableCell className=" border border 1 text-center">
                  {item.joiningdata} <hr />
                  {item.trainingmode}
                </StyledTableCell>
                <StyledTableCell className=" border border 1 text-center">
                  <EditIcon/>
                  <VisibilityIcon/>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          {/* <Stack spacing={2}>
      
      <Pagination count={10} color="primary" />
      
    </Stack> */}
        </Table>
      </TableContainer>
      <nav> 
        <ul className="pagination"> 
        <li className="page-item"> 
        <a href="#" className="bg-primary text-light px-3 py-2" onClick={prevPage}> Prev </a></li> 
        { 
        numbers.map((n, i) =>( 
          <li className={`page-item ${currentPage == n ? 'active': "" }`} key={i}> 
          <a href="#" className="mx-1 " onClick={changePage(n)}>{n} </a></li>
        ) )
         
        }
        <li className="page-item"> 
        <a href="#" className="bg-primary text-light px-3 py-2" onClick={nextPage} > Next</a></li>
        </ul>
      </nav>
      {/* {rows.map((row) => (
              <StyledTableRow key={row.SNo}>
                <StyledTableCell component="th" scope="row">
                  {row.SNo}
                </StyledTableCell>
                <StyledTableCell align="right">{row.Photo}</StyledTableCell>
                <StyledTableCell align="right">{row.Registration}</StyledTableCell>

                <StyledTableCell align="right">{row.Studentname}</StyledTableCell>
                <StyledTableCell align="right">{row.Contactnumber}</StyledTableCell>
                <StyledTableCell align="right">{row.Counseller}</StyledTableCell>
                <StyledTableCell align="right">{row.Date}</StyledTableCell>
                <StyledTableCell align="right">{row.Action}</StyledTableCell>

              </StyledTableRow>
            ))} */}
    </div>
  );
   function prevPage(){ 
    if(currentPage !== firstIndex){ 
      setCurrentPage(currentPage - 1)
    }

   }
    function changePage(id){ 
      

    }
  function nextPage(){ 
    if(currentPage !==  lastIndex){ 
      setCurrentPage( currentPage + 1)
    }

  }
};

export default StudentData;
