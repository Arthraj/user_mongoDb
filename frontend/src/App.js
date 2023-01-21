import "./App.css";
import { useState } from "react";

function App() {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);
  const [mongoId, setMongoID] = useState("");
  const [monoObject,setMonoObject]=useState([]);
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const showData = () => {
    getData("http://localhost:3000/user").then((rawdata) => {
      setData(rawdata);
    });
  };

  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async function getData(url = "") {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }

  const findMongoId = async (e) => {
    e.preventDefault();
    
    await getData(`http://localhost:3000/user/${mongoId}`).then((data) => {
      setMonoObject(data);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const senddata = {
      name: form.name,
      email: form.email,
    };
    await postData("http://localhost:3000/user", senddata).then((data) => {
      console.log(data);
    });
  };

  return (
    <div className="App">
      <div className="wrapper">

        {/* <p className="heads">User Registration</p> */}

        <form className="login">
          <p className="title">User Registration</p>
          <input
            type="text"
            placeholder="Username"
            autoFocus
            onChange={(e) => setField("name", e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setField("email", e.target.value)}
          />

          <button onClick={(e) => handleSubmit(e)}>
            <span className="state">Save in Database</span>
          </button>
        </form>
      </div>

      <div className="wrapper2 task_2">
      <p className="title">Display User Data</p>
        <div className="wrapper3">
          <button className="btn" onClick={() => showData()}>
            <span className="state">Show Data of Database</span>
          </button>
          <button className="btn" onClick={() => setData([])}>
            <span className="state">Hide</span>
          </button>
        </div>
        <div>
          <table className="styled-table">
            <thead>
              <tr>
                <th>S.no.</th>
                <th>Name</th>
                <th>Email Address</th>
              </tr>
            </thead>
            <tbody>
              {data
                .slice(0)
                .reverse()
                .map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="wrapper2 task_3">
        
        <form className="login">
          <p className="title">Find User    (MongoDB_id)</p>
          <input
            type="text"
            placeholder="Mongo_id"
            value={mongoId}
            onChange={(e) => setMongoID(e.target.value)}
          />
          <button onClick={(e) => findMongoId(e)}>
            <span className="state">Search By MongoId</span>
          </button>
          <div>
            <p>
              {
                monoObject.name!==undefined || monoObject.email!==undefined?monoObject.name+" - "+monoObject.email:" "
              }
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default App;
