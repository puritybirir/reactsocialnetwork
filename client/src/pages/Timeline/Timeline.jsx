import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Post from "../../components/Post/Post";
import PostForm from "../../components/PostForm/PostForm";
import postsData from "../../data/postsData";
import "./Timeline.css";

const Timeline = ({ themeMode }) => {
  const [posts, setPosts] = useState([]);
  const [shownPosts, setShownPosts] = useState([]);
  console.log(shownPosts);

  useEffect(() => {
    fetch("http://localhost:9000/api/posts")
      .then((res) => res.json())
      .then((res) => {
        setPosts(res.data)
      });
  }, []);

  useEffect(() => {
    setShownPosts(posts.reverse());
  }, [posts, shownPosts]);

  return (
    <div className="timeline" data-testid="timeline">
      <PostForm themeMode={themeMode} posts={posts} setPosts={setPosts} />
      {shownPosts.map((post, i) => (
        <Post key={i} {...post} />
      ))}
    </div>
  );
};

Timeline.propTypes = {
  themeMode: PropTypes.string,
};

export default Timeline;
