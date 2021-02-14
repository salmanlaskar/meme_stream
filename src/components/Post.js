import { CircularProgress, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "../axios";
export default function Home({ history, match }) {
  const [data, setData] = useState({
    name: "",
    caption: "",
    url: "",
  });
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    axios({ url: "/memes/" + match.params.id, method: "GET" })
      .then((res) => res.data)
      .then((data1) => {
        setData(data1);
        setCaption(data1.caption);
        setUrl(data1.url);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        alert("error in data fetching");
      });
  }, [flag, match.params.id]);
  const Edit = () => {
    if (!caption || !url) {
      return alert("Feilds are empty");
    }
    setLoading(true);
    axios({
      url: "/memes/" + match.params.id,
      method: "PATCH",
      data: { caption, url },
    })
      .then((res) => res.data)
      .then((data1) => {
        setFlag(!flag);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        alert("error in edit meme");
      });
  };
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <div style={{ margin: "20px 0px" }}>
        <div
          style={{
            marginBottom: "40px",
            width: "400px",
            boxShadow: "0 3px 3px 0 rgba(0, 0, 0, 0.38)",
            backgroundColor: "#fafafa",
            display: data.url ? "flex" : "none",
            flexDirection: "column",
          }}
        >
          <b style={{ margin: "20px 0px 8px 20px", fontSize: "18px" }}>
            {data.name}
          </b>
          <p
            style={{
              margin: "1px 0px 16px 35px",
              fontSize: "14px",
              width: "330px",
            }}
          >
            {data.caption}
          </p>
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <img
              src={data.url}
              style={{
                width: "340px",
                height: "300px",
                objectFit: "contain",
                marginBottom: "20px",
                borderRadius: "4px",
              }}
              alt="memeimage"
            />
          </div>
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
        <b
          style={{
            fontSize: "28px",
            fontWeight: 500,
            fontFamily: "sans-serif",
          }}
        >
          Edit Meme
        </b>
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
          placeholder="Be creative with your caption"
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
            margin: "25px 0px 60px 0px",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            height: "42px",
            backgroundColor: "#ff9200",
            borderRadius: "4px",
            boxShadow: "0 3px 3px 0 rgba(0, 0, 0, 0.38)",
          }}
          onClick={() => {
            Edit();
          }}
        >
          <p
            className="BC_Rectangle1_View"
            style={{ color: "#ffffff", textAlign: "center", fontSize: "16px" }}
          >
            EDIT MEME
          </p>
        </div>
      </div>
    </div>
  );
}
