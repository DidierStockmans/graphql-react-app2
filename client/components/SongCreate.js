import React, { Component } from 'react';
import {Link, hashHistory} from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import query from './../queries/fetchQuery';

class SongCreate extends Component {

    constructor(props) {
        super(props);

        this.state = {title: ''};
    }

    onSubmit(event) {
        event.preventDefault();

        this.props.mutate({
            variables: { title: this.state.title },
            refetchQueries: [{ query }]
        })
        .then(() => hashHistory.push("/"));
    }

    render() {
        return(
            <div>
                <Link to="/">Back</Link>
                <h3>Create new song</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Song title:</label>
                    <input
                        onChange={event => this.setState({title: event.target.value})}
                        value={this.state.title}
                    />
                </form>
            </div>  
        );  
    }
}

const mutation = gql`
    mutation AddSong($title: String) {
        addSong(title: $title) {
            title
        }
    }
`;

export default graphql(mutation)(SongCreate);