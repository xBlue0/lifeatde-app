import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment/locale/it';

import {
    withStyles,
    Card,
    CardHeader,
    CardActionArea,
    CardContent,
    Typography,
    Grid,
} from '@material-ui/core';

class NewsCard extends Component {

    render() {
        const { classes, news } = this.props;

        return(
            <Grid item xs={12} md={6} xl={4}>
                <Card >
                    <CardHeader subheader={<Moment locale="it" parse="YYYY-MM-DD HH:mm" fromNow>{news.attributes.created_at}</Moment>}/>
                    <CardActionArea className={classes.cardContent}>
                        <CardContent>
                            <Typography gutterBottom variant="title" component="h1">{news.attributes.title}</Typography>
                            <Typography component="p">{news.attributes.description}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        );
    }
}


const styles = theme => ({
    cardContent: {
        width: '100%'
    },
});

export default withStyles(styles)(NewsCard);