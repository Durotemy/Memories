import React, { useState, useEffect } from 'react';
import useStyle from "./style";
import { TextField, Button, Typography, Paper } from "@material-ui/core"
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from "../../actions/post";


const Form = ({ currentId, setCurrentId }) => {

    const [postData, setPostData] = useState({
        title: '',
        message: '',
        selectedFile: '',
    })
    const d = useSelector((state) => state.posts.posts)
    console.log("q", d)
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    // const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null))

    const styles = useStyle();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("profile"));


    useEffect(() => {
        if (post) {
            return setPostData(post)
        }
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId === 0) {
            dispatch(createPost({ ...postData, name: user?.result?.name }))
        }
        else {
            dispatch(updatePost(currentId, { ...postData, firstname: user?.result?.name }))
        }
        clear()
    }

    let clear = () => {
        setCurrentId(0);
        setPostData({
            title: '',
            message: '',
            selectedFile: '',
        })
    }
    if (!user?.result?.name) {
        return (
            <Paper className={styles.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        )
    }
    return (
        <Paper className={styles.paper}>
            <form autoComplete="off" noValidate className={`${styles.root} ${styles.form}`} onSubmit={handleSubmit}>

                <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
                <TextField name="title"
                    variant="outlined"
                    label="title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField name="message"
                    variant="outlined"
                    label="message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <div className={styles.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={(file) => setPostData({ ...postData, selectedFile: file.base64 })}
                    />
                </div>
                <Button variant="contained" size="large" color="primary" type="submit" className={styles.buttonSubmit} fullWidth>
                    Submit
                </Button>
                <Button variant="contained" size="small" color="secondary" fullWidth onClick={clear}>
                    Clear
                </Button>
            </form>
        </Paper>
    );
}

export default Form;