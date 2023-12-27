import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

//function App() {
  // const [data, setData] = useState({ test: [] });

  // useEffect(() => {
  //   fetch("http://127.0.0.1:5100/contact")
  //     .then(res => res.json())
  //     .then(data => {
  //       setData(data);
  //       console.log(data);
  //     })
  //     .catch(error => console.error('Error fetching data:', error));
  // }, []);

  function App() {
    //use state will be used to manage state of the data object 
    // object for storing and using data
    const [data, setdata] = useState({
        name: "",
        phone: ""
       
    });
 
    // Using useEffect is used to fetch data once component mounts
    // it fetches once bc of dependect array [] 
    useEffect(() => {
        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
        fetch("http://127.0.0.1:5100/contact").then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                setdata({
                    name: data.name,
                    phone: data.phone,
                   
                });
            })
        );
    }, []);


// need to set upif else statement to render different views whether data is empty or not 
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Name: {data.name}</Text>
      <Text>Phone: {data.phone}</Text>
    </View>
  );
}


export default App;
