import { CircularProgress, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "../axios";
export default function Home({ history }) {
  const [name, setname] = useState("");
  const [caption, setCaption] = useState("");
  const [url, setUrl] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(true);
  const Submit = () => {
    if (!name || !caption || !url) {
      return alert("Feilds are empty");
    }
    setLoading(true);
    axios({ url: "/memes", method: "POST", data: { caption, name, url } })
      .then((res) => res.data)
      .then((data) => {
        setFlag(!flag);
        setLoading(false);
        setname("");setCaption("");setUrl("");
      })
      .catch((e) => {
        setLoading(false);
        alert(e.response.data.message);
      });
  };
  useEffect(() => {
    axios({ url: "/memes", method: "GET" })
      .then((res) => res.data)
      .then((data) => {
        setLoading(false);
        setList(data);
      })
      .catch((e) => {
        setLoading(false);
        alert("error in data fetching");
      });
  }, [flag]);
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <div style={{ marginTop: "60px" }}>
        <b
          style={{
            fontSize: "28px",
            fontWeight: 500,
            fontFamily: "sans-serif",
          }}
        >
          Meme Stream
        </b>
        <p style={{ margin: "26px 0px 5px 0px" }}>Meme Owner</p>
        <TextField
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => {
            e.preventDefault();
            setname(e.target.value);
          }}
          variant="outlined"
          style={{ width: "310px" }}
        />
        <p style={{ margin: "14px 0px 5px 0px" }}>Caption</p>
        <TextField
          placeholder="Be creative with your caption"
          value={caption}
          onChange={(e) => {
            e.preventDefault();
            setCaption(e.target.value);
          }}
          variant="outlined"
          style={{ width: "345px" }}
        />
        <p style={{ margin: "14px 0px 5px 0px" }}>Meme URL</p>
        <TextField
          placeholder="Enter URL for your meme here"
          value={url}
          onChange={(e) => {
            e.preventDefault();
            setUrl(e.target.value);
          }}
          variant="outlined"
          style={{ width: "380px" }}
        />
        <div
          style={{
            width: "300px",
            display: "flex",
            marginTop: "25px",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            height: "42px",
            backgroundColor: "#ff9200",
            borderRadius: "4px",
            boxShadow: "0 3px 3px 0 rgba(0, 0, 0, 0.38)",
          }}
          onClick={() => {
            Submit();
          }}
        >
          <p
            style={{ color: "#ffffff", textAlign: "center", fontSize: "16px",fontFamily:"Roboto" }}
          >
            Submit Meme
          </p>
        </div>
        {loading && (
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </div>
        )}
        {list.length > 0 ? (
          <p style={{ marginTop: "50px", fontSize: "30px", color: "#3acce1" }}>
            Some memes for you
          </p>
        ) : null}
        {list.map((item, index) => {
          return (
            <div
              style={{
                marginBottom: "15px",
                width: "400px",
                boxShadow: "0 3px 3px 0 rgba(0, 0, 0, 0.38)",
                backgroundColor: "#fafafa",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              key={index}
              onClick={() => {
                history.push("/" + item.id);
              }}
            >
              <b style={{ margin: "20px 0px 8px 20px", fontSize: "18px" }}>
                {item.name}
              </b>
              <p
                style={{
                  margin: "1px 0px 16px 35px",
                  fontSize: "14px",
                  width: "330px",
                }}
              >
                {item.caption}
              </p>
              <div style={{display:'flex',justifyContent:'center',width:'100%'}}>
              <img
                src={item.url}
                style={{
                  width: "340px",
                  height: "300px",
                  objectFit: "contain",
                  marginBottom: "20px",
                  borderRadius: "4px",
                }}
                alt={index.toString()}
              /></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
