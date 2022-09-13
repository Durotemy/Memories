import React from 'react';
import { useSelector } from "react-redux"
import { Grid, CircularProgress } from "@material-ui/core"
import Post from './Post/Post';
import useStyle from './styles';

const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts)
    const classes = useStyle();


    if (!posts.length) return 'No posts';
    return (
        !isLoading ? <CircularProgress /> : (
            <div styles={{ padding: '10px' }}>
                <Grid className={classes.container} container alignItems="stretch" spacing={1} margin={2}>
                    {posts.map((post) => (
                        <Grid key={post._id} items xs={12} sm={12} md={6} lg={4}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        )
    )
}
export default Posts;