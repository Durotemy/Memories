import React from "react";

import {  PaginationItem } from "@mui/material";
import { Pagination } from '@mui/material'
import { Link } from "react-router-dom";
import useStyles from "./styles";

const Paginate = () => {
  const classes = useStyles();

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={5}
      page={1}
      variant="outlined"
      color="primary"
      shape="rounded"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
      )}
    />
  );
};
export default Paginate;
