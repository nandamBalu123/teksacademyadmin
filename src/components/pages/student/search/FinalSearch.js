
import React, { useState } from 'react';

const FinalSearch = () => {
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState([]);
    const [showUsers, setShowUsers] = useState(false);
    const users = ["irshad@gmail.com", "bhavitha@gmail.com", "balu@gmail.com", "anil@gmail.com", "niraj@gmail.com", "irfan@gmail.com", "lashmi@gmail.com", "suma@gmail.com", "vivek@gmail.com"];
    const handleInputChange = (value) => {
        setQuery(value);
        setShowUsers(true);
    };
    const handleClick = (value) => {
        setSelected((e) => [...e, value])
        setQuery('');
        setShowUsers(false);
    };
    return (
        <div>
            <div className='border border-1'>
                {selected.map((result) => (
                    <span>{result} </span>
                ))}
                <input
                    type="text"
                    style={{ border: "none" }}
                    value={query}
                    onChange={(e) => handleInputChange(e.target.value)}
                />
            </div>
            {showUsers && (
                <ul>
                    {users
                        .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
                        .map((user, index) => (
                            <li key={index} onClick={() => handleClick(user)}>
                                {user}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
};

export default FinalSearch;
