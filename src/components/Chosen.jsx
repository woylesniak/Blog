import React from 'react';
import {connect} from 'react-redux';
import store from '../store/store';
import Comment from './Comment';

const handlerRemove = (data) => {
    const action = { type: "REMOVE_POST", data};
    store.dispatch(action)
}

const Chosen = (props) => {
        return (
            props.posts.map((post) => <Comment 
                key = {post.id}
                id = {post.id}
                name = {post.name}
                body = {post.body}
                email = {post.email}
                type={'remove'}
                onClick = {() => {handlerRemove(post)}}
                />
            )
        )
    }

export default connect((state) => ({
    posts: Array.from(state.selected)
}))(Chosen);