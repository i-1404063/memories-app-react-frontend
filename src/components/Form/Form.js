import React, { useState } from "react";
import usestyles from "./style";
import FileBase from "react-file-base64";
import { createPost, updatePost } from "../../redux/actions/posts";
import { useDispatch, useSelector } from "react-redux";
import { Button, Paper, Typography, TextField } from "@material-ui/core";
import { useEffect } from "react";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  const classes = usestyles();

  const handleChange = (e) => {
    const name = e.target.name;
    if (name === "tags")
      setPostData({ ...postData, [e.target.name]: e.target.value.split(",") });
    else setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentId) {
      dispatch(createPost(postData));
    } else {
      dispatch(updatePost(currentId, postData));
    }

    handleClear();
  };

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleClear = () => {
    //Todo something
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        noValidate
        autoComplete="off"
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          value={postData.creator}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          value={postData.title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          value={postData.message}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          value={postData.tags}
          onChange={handleChange}
          fullWidth
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          variant="contained"
          className={classes.buttonSubmit}
          size="large"
          type="submit"
          color="primary"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          size="small"
          className={classes.buttonSubmit}
          color="secondary"
          fullWidth
          onClick={handleClear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
