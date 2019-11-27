import React, {Component} from 'react';
import axios from 'axios';
import store from '../store/store';
import Comment from './Comment';
import {connect} from 'react-redux';

class ListComment extends Component {

	state = {
		posts: []
	};

	componentDidMount() {
		if(this.props.isLoaded === false) {
		axios
			.get(`https://jsonplaceholder.typicode.com/comments?_start=${Math.floor(Math.random() * 20) + 2}&_limit=20`)
			.then((res) => {
				// this.setState({
				// 	posts: res.data
				// });
				store.dispatch({type: 'LOAD_POST', data: res.data})
			})
			.catch((error) => {
				console.log(error);
			});
		}
		console.log(this.props);
	}

	handlerAdd = (data) => {
		const action = {
			type: "ADD_POST",
			data
		};
		store.dispatch(action);
	}

	render() {
		const { posts } = this.props;
		
		return (
			<div > {
				posts.map((post) => 
					<Comment 
						key={post.id}
						{...post}
						onClick = {this.handlerAdd}
					/>
				)} 
			</div>
		)
	}
}

export default connect((state) => ({
	posts: Array.from(state.all),
	isLoaded: state.isLoaded
}))(ListComment);