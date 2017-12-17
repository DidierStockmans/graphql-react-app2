import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
    constructor(props) {
        super(props);

        this.state = { content: '', songId: this.props.songId };
    }
    
    onSubmit(event) {
        event.preventDefault();

        const { songId, content } = this.state;

        this.props.mutate({
            variables: {
                songId: songId,
                content: content
            }
        }).then(() => this.setState({content: ''}));
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Add a lyric:</label>
                <input value={this.state.content} onChange={event => this.setState({content: event.target.value})} />
            </form>
        );
    }
}

const mutation = gql`
mutation AddLyrics($content: String!, $songId: ID!){
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);