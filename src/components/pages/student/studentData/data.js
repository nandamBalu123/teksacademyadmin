import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// Your data array
const initialData = [...]; // Your data goes here

const itemsPerPage = 10; // Number of items to display per page

const PaginationExample = () => {
  const [page, setPage] = useState(1);

  // Calculate the range of items to display on the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the data array to display only the items for the current page
  const displayedData = initialData.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      {/* Display your data for the current page here */}
      <ul>
        {displayedData.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      {/* Render the Material-UI Pagination component */}
      <Stack spacing={2}>
        <Pagination
          count={Math.ceil(initialData.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default PaginationExample;



export const initialDataa = [
  {
    id: 1,

    photo: "photo",

    registrationnumber: "1234",

    branch: "hitechcity",

    name: "John",

    studentid: 231,

    mobilenumber: 23212,

    email: "john@gmail.com",

    courses: "java",

    enquirytakenby: "kavya",

    leadsource: "walkin",

    admissiondate: "2023-10-03",

    modeoftraining: "offline",
  },

  {
    id: 2,

    photo: "photo",

    registrationnumber: "231",

    branch: "ameerpet",

    name: "kavya",

    studentid: 232,

    mobilenumber: 98765,

    email: "jane@gmail.com",

    courses: "python",

    enquirytakenby: "mark",

    leadsource: "justdail",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 3,

    photo: "photo",

    registrationnumber: "9876",

    branch: "gachibowli",

    name: "Bob",

    studentid: 233,

    mobilenumber: 54321,

    email: "bob@gmail.com",

    courses: "react",

    enquirytakenby: "alice",

    leadsource: "referral",

    admissiondate: "2023-10-03",

    modeoftraining: "offline",
  },

  {
    id: 4,

    photo: "photo",

    registrationnumber: "4321",

    branch: "dilsukhnagar",

    name: "Alice",

    studentid: 234,

    mobilenumber: 12345,

    email: "alice@gmail.com",

    courses: "node.js",

    enquirytakenby: "john",

    leadsource: "walkin",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 5,

    photo: "photo",

    registrationnumber: "7890",

    branch: "hitechcity",

    name: "Eve",

    studentid: 235,

    mobilenumber: 67890,

    email: "eve@gmail.com",

    courses: "angular",

    enquirytakenby: "susan",

    leadsource: "referral",

    admissiondate: "2023-10-05",

    modeoftraining: "online",
  },

  {
    id: 6,

    photo: "photo",

    registrationnumber: "1357",

    branch: "hitechcity",

    name: "Michael",

    studentid: 236,

    mobilenumber: 98765,

    email: "michael@gmail.com",

    courses: "html/css",

    enquirytakenby: "lisa",

    leadsource: "referral",

    admissiondate: "2023-10-05",

    modeoftraining: "offline",
  },

  {
    id: 7,

    photo: "photo",

    registrationnumber: "2468",

    branch: "dilsukhnagar",

    name: "Sarah",

    studentid: 237,

    mobilenumber: 13579,

    email: "sarah@gmail.com",

    courses: "javascript",

    enquirytakenby: "david",

    leadsource: "walkin",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 8,

    photo: "photo",

    registrationnumber: "9876",

    branch: "ameerpet",

    name: "Peter",

    studentid: 238,

    mobilenumber: 24680,

    email: "peter@gmail.com",

    courses: "ruby",

    enquirytakenby: "sophia",

    leadsource: "referral",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 9,

    photo: "photo",

    registrationnumber: "5432",

    branch: "ameerpet",

    name: "Mary",

    studentid: 239,

    mobilenumber: 98765,

    email: "mary@gmail.com",

    courses: "php",

    enquirytakenby: "mark",

    leadsource: "referral",

    admissiondate: "2023-10-03",

    modeoftraining: "offline",
  },

  {
    id: 10,

    photo: "photo",

    registrationnumber: "1111",

    branch: "hitechcity",

    name: "David",

    studentid: 240,

    mobilenumber: 54321,

    email: "david@gmail.com",

    courses: "c#",

    enquirytakenby: "lisa",

    leadsource: "walkin",

    admissiondate: "2023-10-05",

    modeoftraining: "offline",
  },

  {
    id: 11,

    photo: "photo",

    registrationnumber: "123",

    branch: "Madhapur",

    name: "son",

    studentid: 232,

    mobilenumber: 23212,

    email: "john@gmail.com",

    courses: "java",

    enquirytakenby: "kavya",

    leadsource: "walkin",

    admissiondate: "2023-10-03",

    modeoftraining: "online",
  },

  {
    id: 12,

    photo: "photo",

    registrationnumber: "231",

    branch: "ameerpet",

    name: "kavya",

    studentid: 232,

    mobilenumber: 98765,

    email: "jane@gmail.com",

    courses: "python",

    enquirytakenby: "mark",

    leadsource: "justdail",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 13,

    photo: "photo",

    registrationnumber: "9876",

    branch: "gachibowli",

    name: "Bob",

    studentid: 233,

    mobilenumber: 54321,

    email: "bob@gmail.com",

    courses: "react",

    enquirytakenby: "alice",

    leadsource: "referral",

    admissiondate: "2023-10-03",

    modeoftraining: "offline",
  },

  {
    id: 14,

    photo: "photo",

    registrationnumber: "4321",

    branch: "dilsukhnagar",

    name: "Alice",

    studentid: 234,

    mobilenumber: 12345,

    email: "alice@gmail.com",

    courses: "node.js",

    enquirytakenby: "john",

    leadsource: "walkin",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 15,

    photo: "photo",

    registrationnumber: "7890",

    branch: "hitechcity",

    name: "Eve",

    studentid: 235,

    mobilenumber: 67890,

    email: "eve@gmail.com",

    courses: "angular",

    enquirytakenby: "susan",

    leadsource: "referral",

    admissiondate: "2023-10-05",

    modeoftraining: "online",
  },

  {
    id: 16,

    photo: "photo",

    registrationnumber: "1357",

    branch: "hitechcity",

    name: "Michael",

    studentid: 236,

    mobilenumber: 98765,

    email: "michael@gmail.com",

    courses: "html/css",

    enquirytakenby: "lisa",

    leadsource: "referral",

    admissiondate: "2023-10-05",

    modeoftraining: "offline",
  },

  {
    id: 17,

    photo: "photo",

    registrationnumber: "2468",

    branch: "dilsukhnagar",

    name: "Sarah",

    studentid: 237,

    mobilenumber: 13579,

    email: "sarah@gmail.com",

    courses: "javascript",

    enquirytakenby: "david",

    leadsource: "walkin",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 18,

    photo: "photo",

    registrationnumber: "9876",

    branch: "ameerpet",

    name: "Peter",

    studentid: 238,

    mobilenumber: 24680,

    email: "peter@gmail.com",

    courses: "ruby",

    enquirytakenby: "sophia",

    leadsource: "referral",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 19,

    photo: "photo",

    registrationnumber: "5432",

    branch: "ameerpet",

    name: "Mary",

    studentid: 239,

    mobilenumber: 98765,

    email: "mary@gmail.com",

    courses: "php",

    enquirytakenby: "mark",

    leadsource: "referral",

    admissiondate: "2023-10-03",

    modeoftraining: "offline",
  },

  {
    id: 20,

    photo: "photo",

    registrationnumber: "1111",

    branch: "hitechcity",

    name: "David",

    studentid: 240,

    mobilenumber: 54321,

    email: "david@gmail.com",

    courses: "c#",

    enquirytakenby: "lisa",

    leadsource: "walkin",

    admissiondate: "2023-10-05",

    modeoftraining: "offline",
  },

  {
    id: 21,

    photo: "photo",

    registrationnumber: "1234",

    branch: "hitechcity",

    name: "John",

    studentid: 231,

    mobilenumber: 23212,

    email: "john@gmail.com",

    courses: "java",

    enquirytakenby: "kavya",

    leadsource: "walkin",

    admissiondate: "2023-10-03",

    modeoftraining: "offline",
  },

  {
    id: 22,

    photo: "photo",

    registrationnumber: "231",

    branch: "ameerpet",

    name: "kavya",

    studentid: 232,

    mobilenumber: 98765,

    email: "jane@gmail.com",

    courses: "python",

    enquirytakenby: "mark",

    leadsource: "justdail",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 23,

    photo: "photo",

    registrationnumber: "9876",

    branch: "gachibowli",

    name: "Bob",

    studentid: 233,

    mobilenumber: 54321,

    email: "bob@gmail.com",

    courses: "react",

    enquirytakenby: "alice",

    leadsource: "referral",

    admissiondate: "2023-10-03",

    modeoftraining: "offline",
  },

  {
    id: 24,

    photo: "photo",

    registrationnumber: "4321",

    branch: "dilsukhnagar",

    name: "Alice",

    studentid: 234,

    mobilenumber: 12345,

    email: "alice@gmail.com",

    courses: "node.js",

    enquirytakenby: "john",

    leadsource: "walkin",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 25,

    photo: "photo",

    registrationnumber: "7890",

    branch: "hitechcity",

    name: "Eve",

    studentid: 235,

    mobilenumber: 67890,

    email: "eve@gmail.com",

    courses: "angular",

    enquirytakenby: "susan",

    leadsource: "referral",

    admissiondate: "2023-10-05",

    modeoftraining: "online",
  },

  {
    id: 26,

    photo: "photo",

    registrationnumber: "1357",

    branch: "hitechcity",

    name: "Michael",

    studentid: 236,

    mobilenumber: 98765,

    email: "michael@gmail.com",

    courses: "html/css",

    enquirytakenby: "lisa",

    leadsource: "referral",

    admissiondate: "2023-10-05",

    modeoftraining: "offline",
  },

  {
    id: 27,

    photo: "photo",

    registrationnumber: "2468",

    branch: "dilsukhnagar",

    name: "Sarah",

    studentid: 237,

    mobilenumber: 13579,

    email: "sarah@gmail.com",

    courses: "javascript",

    enquirytakenby: "david",

    leadsource: "walkin",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 28,

    photo: "photo",

    registrationnumber: "9876",

    branch: "ameerpet",

    name: "Peter",

    studentid: 238,

    mobilenumber: 24680,

    email: "peter@gmail.com",

    courses: "ruby",

    enquirytakenby: "sophia",

    leadsource: "referral",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 29,

    photo: "photo",

    registrationnumber: "5432",

    branch: "ameerpet",

    name: "Mary",

    studentid: 239,

    mobilenumber: 98765,

    email: "mary@gmail.com",

    courses: "php",

    enquirytakenby: "mark",

    leadsource: "referral",

    admissiondate: "2023-10-03",

    modeoftraining: "offline",
  },

  {
    id: 30,

    photo: "photo",

    registrationnumber: "1111",

    branch: "hitechcity",

    name: "David",

    studentid: 240,

    mobilenumber: 54321,

    email: "david@gmail.com",

    courses: "c#",

    enquirytakenby: "lisa",

    leadsource: "walkin",

    admissiondate: "2023-10-05",

    modeoftraining: "offline",
  },

  {
    id: 31,

    photo: "photo",

    registrationnumber: "1234",

    branch: "hitechcity",

    name: "John",

    studentid: 231,

    mobilenumber: 23212,

    email: "john@gmail.com",

    courses: "java",

    enquirytakenby: "kavya",

    leadsource: "walkin",

    admissiondate: "2023-10-03",

    modeoftraining: "offline",
  },

  {
    id: 32,

    photo: "photo",

    registrationnumber: "231",

    branch: "ameerpet",

    name: "kavya",

    studentid: 232,

    mobilenumber: 98765,

    email: "jane@gmail.com",

    courses: "python",

    enquirytakenby: "mark",

    leadsource: "justdail",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 33,

    photo: "photo",

    registrationnumber: "9876",

    branch: "gachibowli",

    name: "Bob",

    studentid: 233,

    mobilenumber: 54321,

    email: "bob@gmail.com",

    courses: "react",

    enquirytakenby: "alice",

    leadsource: "referral",

    admissiondate: "2023-10-03",

    modeoftraining: "offline",
  },

  {
    id: 34,

    photo: "photo",

    registrationnumber: "4321",

    branch: "dilsukhnagar",

    name: "Alice",

    studentid: 234,

    mobilenumber: 12345,

    email: "alice@gmail.com",

    courses: "node.js",

    enquirytakenby: "john",

    leadsource: "walkin",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 35,

    photo: "photo",

    registrationnumber: "7890",

    branch: "hitechcity",

    name: "Eve",

    studentid: 235,

    mobilenumber: 67890,

    email: "eve@gmail.com",

    courses: "angular",

    enquirytakenby: "susan",

    leadsource: "referral",

    admissiondate: "2023-10-05",

    modeoftraining: "online",
  },

  {
    id: 36,

    photo: "photo",

    registrationnumber: "1357",

    branch: "hitechcity",

    name: "Michael",

    studentid: 236,

    mobilenumber: 98765,

    email: "michael@gmail.com",

    courses: "html/css",

    enquirytakenby: "lisa",

    leadsource: "referral",

    admissiondate: "2023-10-05",

    modeoftraining: "offline",
  },

  {
    id: 37,

    photo: "photo",

    registrationnumber: "2468",

    branch: "dilsukhnagar",

    name: "Sarah",

    studentid: 237,

    mobilenumber: 13579,

    email: "sarah@gmail.com",

    courses: "javascript",

    enquirytakenby: "david",

    leadsource: "walkin",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 38,

    photo: "photo",

    registrationnumber: "9876",

    branch: "ameerpet",

    name: "Peter",

    studentid: 238,

    mobilenumber: 24680,

    email: "peter@gmail.com",

    courses: "ruby",

    enquirytakenby: "sophia",

    leadsource: "referral",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 39,

    photo: "photo",

    registrationnumber: "5432",

    branch: "ameerpet",

    name: "Mary",

    studentid: 239,

    mobilenumber: 98765,

    email: "mary@gmail.com",

    courses: "php",

    enquirytakenby: "mark",

    leadsource: "referral",

    admissiondate: "2023-10-03",

    modeoftraining: "offline",
  },

  {
    id: 40,

    photo: "photo",

    registrationnumber: "1111",

    branch: "hitechcity",

    name: "David",

    studentid: 240,

    mobilenumber: 54321,

    email: "david@gmail.com",

    courses: "c#",

    enquirytakenby: "lisa",

    leadsource: "walkin",

    admissiondate: "2023-10-05",

    modeoftraining: "offline",
  },

  {
    id: 41,

    photo: "photo",

    registrationnumber: "1234",

    branch: "hitechcity",

    name: "John",

    studentid: 231,

    mobilenumber: 23212,

    email: "john@gmail.com",

    courses: "java",

    enquirytakenby: "kavya",

    leadsource: "walkin",

    admissiondate: "2023-10-03",

    modeoftraining: "offline",
  },

  {
    id: 42,

    photo: "photo",

    registrationnumber: "231",

    branch: "ameerpet",

    name: "kavya",

    studentid: 232,

    mobilenumber: 98765,

    email: "jane@gmail.com",

    courses: "python",

    enquirytakenby: "mark",

    leadsource: "justdail",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 43,

    photo: "photo",

    registrationnumber: "9876",

    branch: "gachibowli",

    name: "Bob",

    studentid: 233,

    mobilenumber: 54321,

    email: "bob@gmail.com",

    courses: "react",

    enquirytakenby: "alice",

    leadsource: "referral",

    admissiondate: "2023-10-03",

    modeoftraining: "offline",
  },

  {
    id: 44,

    photo: "photo",

    registrationnumber: "4321",

    branch: "dilsukhnagar",

    name: "Alice",

    studentid: 234,

    mobilenumber: 12345,

    email: "alice@gmail.com",

    courses: "node.js",

    enquirytakenby: "john",

    leadsource: "walkin",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 45,

    photo: "photo",

    registrationnumber: "7890",

    branch: "hitechcity",

    name: "Eve",

    studentid: 235,

    mobilenumber: 67890,

    email: "eve@gmail.com",

    courses: "angular",

    enquirytakenby: "susan",

    leadsource: "referral",

    admissiondate: "2023-10-05",

    modeoftraining: "online",
  },

  {
    id: 46,

    photo: "photo",

    registrationnumber: "1357",

    branch: "hitechcity",

    name: "Michael",

    studentid: 236,

    mobilenumber: 98765,

    email: "michael@gmail.com",

    courses: "html/css",

    enquirytakenby: "lisa",

    leadsource: "referral",

    admissiondate: "2023-10-05",

    modeoftraining: "offline",
  },

  {
    id: 47,

    photo: "photo",

    registrationnumber: "2468",

    branch: "dilsukhnagar",

    name: "Sarah",

    studentid: 237,

    mobilenumber: 13579,

    email: "sarah@gmail.com",

    courses: "javascript",

    enquirytakenby: "david",

    leadsource: "walkin",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 48,

    photo: "photo",

    registrationnumber: "9876",

    branch: "ameerpet",

    name: "Peter",

    studentid: 238,

    mobilenumber: 24680,

    email: "peter@gmail.com",

    courses: "ruby",

    enquirytakenby: "sophia",

    leadsource: "referral",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 49,

    photo: "photo",

    registrationnumber: "5432",

    branch: "ameerpet",

    name: "Mary",

    studentid: 239,

    mobilenumber: 98765,

    email: "mary@gmail.com",

    courses: "php",

    enquirytakenby: "mark",

    leadsource: "referral",

    admissiondate: "2023-10-03",

    modeoftraining: "offline",
  },

  {
    id: 50,

    photo: "photo",

    registrationnumber: "1111",

    branch: "hitechcity",

    name: "David",

    studentid: 240,

    mobilenumber: 54321,

    email: "david@gmail.com",

    courses: "c#",

    enquirytakenby: "lisa",

    leadsource: "walkin",

    admissiondate: "2023-10-05",

    modeoftraining: "offline",
  },

  {
    id: 51,

    photo: "photo",

    registrationnumber: "1234",

    branch: "hitechcity",

    name: "John",

    studentid: 231,

    mobilenumber: 23212,

    email: "john@gmail.com",

    courses: "java",

    enquirytakenby: "kavya",

    leadsource: "walkin",

    admissiondate: "2023-10-03",

    modeoftraining: "offline",
  },

  {
    id: 52,

    photo: "photo",

    registrationnumber: "231",

    branch: "ameerpet",

    name: "kavya",

    studentid: 232,

    mobilenumber: 98765,

    email: "jane@gmail.com",

    courses: "python",

    enquirytakenby: "mark",

    leadsource: "justdail",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 53,

    photo: "photo",

    registrationnumber: "9876",

    branch: "gachibowli",

    name: "Bob",

    studentid: 233,

    mobilenumber: 54321,

    email: "bob@gmail.com",

    courses: "react",

    enquirytakenby: "alice",

    leadsource: "referral",

    admissiondate: "2023-10-03",

    modeoftraining: "offline",
  },

  {
    id: 54,

    photo: "photo",

    registrationnumber: "4321",

    branch: "dilsukhnagar",

    name: "Alice",

    studentid: 234,

    mobilenumber: 12345,

    email: "alice@gmail.com",

    courses: "node.js",

    enquirytakenby: "john",

    leadsource: "walkin",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 55,

    photo: "photo",

    registrationnumber: "7890",

    branch: "hitechcity",

    name: "Eve",

    studentid: 235,

    mobilenumber: 67890,

    email: "eve@gmail.com",

    courses: "angular",

    enquirytakenby: "susan",

    leadsource: "referral",

    admissiondate: "2023-10-05",

    modeoftraining: "online",
  },

  {
    id: 56,

    photo: "photo",

    registrationnumber: "1357",

    branch: "hitechcity",

    name: "Michael",

    studentid: 236,

    mobilenumber: 98765,

    email: "michael@gmail.com",

    courses: "html/css",

    enquirytakenby: "lisa",

    leadsource: "referral",

    admissiondate: "2023-10-05",

    modeoftraining: "offline",
  },

  {
    id: 57,

    photo: "photo",

    registrationnumber: "2468",

    branch: "dilsukhnagar",

    name: "Sarah",

    studentid: 237,

    mobilenumber: 13579,

    email: "sarah@gmail.com",

    courses: "javascript",

    enquirytakenby: "david",

    leadsource: "walkin",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 58,

    photo: "photo",

    registrationnumber: "9876",

    branch: "ameerpet",

    name: "Peter",

    studentid: 238,

    mobilenumber: 24680,

    email: "peter@gmail.com",

    courses: "ruby",

    enquirytakenby: "sophia",

    leadsource: "referral",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 59,

    photo: "photo",

    registrationnumber: "5432",

    branch: "ameerpet",

    name: "Mary",

    studentid: 239,

    mobilenumber: 98765,

    email: "mary@gmail.com",

    courses: "php",

    enquirytakenby: "mark",

    leadsource: "referral",

    admissiondate: "2023-10-03",

    modeoftraining: "offline",
  },

  {
    id: 60,

    photo: "photo",

    registrationnumber: "1111",

    branch: "hitechcity",

    name: "David",

    studentid: 240,

    mobilenumber: 54321,

    email: "david@gmail.com",

    courses: "c#",

    enquirytakenby: "lisa",

    leadsource: "walkin",

    admissiondate: "2023-10-05",

    modeoftraining: "offline",
  },

  {
    id: 61,

    photo: "photo",

    registrationnumber: "1234",

    branch: "hitechcity",

    name: "John",

    studentid: 231,

    mobilenumber: 23212,

    email: "john@gmail.com",

    courses: "java",

    enquirytakenby: "kavya",

    leadsource: "walkin",

    admissiondate: "2023-10-03",

    modeoftraining: "offline",
  },

  {
    id: 62,

    photo: "photo",

    registrationnumber: "231",

    branch: "ameerpet",

    name: "kavya",

    studentid: 232,

    mobilenumber: 98765,

    email: "jane@gmail.com",

    courses: "python",

    enquirytakenby: "mark",

    leadsource: "justdail",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 63,

    photo: "photo",

    registrationnumber: "9876",

    branch: "gachibowli",

    name: "Bob",

    studentid: 233,

    mobilenumber: 54321,

    email: "bob@gmail.com",

    courses: "react",

    enquirytakenby: "alice",

    leadsource: "referral",

    admissiondate: "2023-10-03",

    modeoftraining: "offline",
  },

  {
    id: 64,

    photo: "photo",

    registrationnumber: "4321",

    branch: "dilsukhnagar",

    name: "Alice",

    studentid: 234,

    mobilenumber: 12345,

    email: "alice@gmail.com",

    courses: "node.js",

    enquirytakenby: "john",

    leadsource: "walkin",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 65,

    photo: "photo",

    registrationnumber: "7890",

    branch: "hitechcity",

    name: "Eve",

    studentid: 235,

    mobilenumber: 67890,

    email: "eve@gmail.com",

    courses: "angular",

    enquirytakenby: "susan",

    leadsource: "referral",

    admissiondate: "2023-10-05",

    modeoftraining: "online",
  },

  {
    id: 66,

    photo: "photo",

    registrationnumber: "1357",

    branch: "hitechcity",

    name: "Michael",

    studentid: 236,

    mobilenumber: 98765,

    email: "michael@gmail.com",

    courses: "html/css",

    enquirytakenby: "lisa",

    leadsource: "referral",

    admissiondate: "2023-10-05",

    modeoftraining: "offline",
  },

  {
    id: 67,

    photo: "photo",

    registrationnumber: "2468",

    branch: "dilsukhnagar",

    name: "Sarah",

    studentid: 237,

    mobilenumber: 13579,

    email: "sarah@gmail.com",

    courses: "javascript",

    enquirytakenby: "david",

    leadsource: "walkin",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 68,

    photo: "photo",

    registrationnumber: "9876",

    branch: "ameerpet",

    name: "Peter",

    studentid: 238,

    mobilenumber: 24680,

    email: "peter@gmail.com",

    courses: "ruby",

    enquirytakenby: "sophia",

    leadsource: "referral",

    admissiondate: "2023-10-04",

    modeoftraining: "online",
  },

  {
    id: 69,

    photo: "photo",

    registrationnumber: "5432",

    branch: "ameerpet",

    name: "Mary",

    studentid: 239,

    mobilenumber: 98765,

    email: "mary@gmail.com",

    courses: "php",

    enquirytakenby: "mark",

    leadsource: "referral",

    admissiondate: "2023-10-03",

    modeoftraining: "offline",
  },
];
