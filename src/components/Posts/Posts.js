import React from "react";
import Post from "./Post/Post";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);

  return !posts.length ? (
    <div>
      <CircularProgress /> No Post Available. plz! create some post.
    </div>
  ) : (
    <Grid container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} xs={12} sm={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
