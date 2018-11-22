import React, { Component } from 'react';

import {
    Button,
    Divider,
    Typography,
    withStyles
} from '@material-ui/core';

import Api from '../lib/Api';
import LocalStorage from "../lib/LocalStorage";
import BookCardList from '../components/books/BookCardList';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import Loader from "../components/common/Loader";
import { withSnackbar } from 'notistack';

class BookCardsContainer extends Component {

    state = {
        loading: true,
        books: null,
        users: null
    };

    componentDidMount() {
        document.title =  'LifeAtDe | Libri';

        const courseId = LocalStorage.get('user').data.relationships.course.data.id;

        Api.get(`/courses/${courseId}/books`).then(response => {
            this.setState({
                books: response.data,
                users: response.included,
                loading: false
            });
        }).catch(({errors}) => {
            errors.forEach(error => this.props.enqueueSnackbar(error.detail, {variant: 'error'}));
        });
    }

    removeBook = (bookId, userId) => {
        let books = this.state.books.filter(book => book.id !== bookId);
        let users = this.state.users.filter(user => user.id !== userId);

        this.setState({
            books,
            users
        });
    };

    render() {
        const { classes } = this.props;
        const { books, users, loading } = this.state;

        if (loading) {
            return (
                <Loader />
            )
        }

        return(
            <div id="book-cards-container">
                <Typography className={classes.header} component="h1" variant="h4">
                    Libri
                    <div>
                        <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
                            <AddIcon/>
                        </Button>
                        <Button variant="fab" color="primary" aria-label="Filter" className={classes.button}>
                            <FilterListIcon/>
                        </Button>
                    </div>
                </Typography>
                <Divider className={classes.hr} />
                <BookCardList books={books} users={users} onBookDelete={this.removeBook}/>
            </div>
        )
    }
}

const styles = theme => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        width: '40px',
        height: '40px',
        margin: `${theme.spacing.unit}px 0 ${theme.spacing.unit}px ${theme.spacing.unit}px`,
    },
    hr: {
        margin: '0 0 20px',
    },
});


export default withSnackbar(withStyles(styles)(BookCardsContainer));