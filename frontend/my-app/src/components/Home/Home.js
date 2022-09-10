import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Form from "../Form/Form";
import Post from "../Posts/Posts";
import { getPosts } from "../../actions/post";
import { Container, Grid, Grow, Paper } from "@material-ui/core";
import Pagination from "../Pagination";
const Home = () => {
    const [currentId, setCurrentId] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);
    return (
        <Grow in>
            <Container>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Post setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper   elevation={6}>
                            <Pagination />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}
export default Home;