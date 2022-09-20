import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Form from "../Form/Form";
import Post from "../Posts/Posts";
import { getPosts, getPostBySearch } from "../../actions/post";
import { Container, Grid, Grow, Paper, AppBar, TextField } from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from '@mui/material'
import Pagination from "../Pagination";
import ChipInput from "material-ui-chip-input";
import useStyles from "./styles";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();

    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const [currentId, setCurrentId] = useState(0);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();
    const searchPost = () => {
        if (search.trim()) {
            dispatch(getPostBySearch({ search, tags: tags.join(",") }));
            navigate(`/posts/search?searchQuery=${search || 'none'}`);
        } else {
            navigate('/');
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    }
    const handleAdd = (tag) => setTags([...tags, tag]);
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));


    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Post setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField name="search"
                                variant="outlined"
                                label="Search Memories"
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            {/* <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant="outlined"
                                color="primary"
                            /> */}
                            <Button onClick={searchPost} className={classes.searchButton} color='primary' variant="contained">Search</Button>
                        </AppBar>

                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery ) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}
export default Home;