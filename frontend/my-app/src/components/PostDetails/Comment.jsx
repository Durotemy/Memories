import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  CircularProgress,
  Divider,
} from "@material-ui/core";

import useStyles from "./styles";
import { commentPost } from "../../actions/post";

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const commentsRef = useRef();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleComment = async () => {
    const finalComment = `name: ${user?.result?.name} comment: ${comment}, `;
    const newComment = await dispatch(commentPost(finalComment, post._id));
    setComment(newComment);
    setComment("");
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h5">
            Comments
          </Typography>
          {comments.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(": ")[0]}</strong>
              {c.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a Comment
            </Typography>
            <TextField
              fullwidth
              rows={2}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              // disabled={!comment}
              variant="contained"
              onClick={handleComment}
              color="primary"
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
