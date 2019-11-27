import React from 'react';
import axios from 'axios';
import store from '../store/store';
import {Link} from 'react-router-dom';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);

const formValid = ({formErrors, ...rest}) => {
    let valid = true;
    // Filter
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};

class AddComent extends React.Component {
    state = {
        name: null,
        email: null,
        body: null,
        formErrors: {
            name: '',
            email: '',
            body: '',
        }
    }

    handlerSubmit = e => {
        e.preventDefault();
        if (formValid(this.state)) {
            axios.post(`https://jsonplaceholder.typicode.com/comments`, {
                name: this.state.name,
                email: this.state.email,
                body: this.state.body
            });
            console.log("Send comment");
            this.handlerAdd(this.state);
        } else {
            console.error("Form invalid - Display error messeage")
        }
    }

    handlerAdd = (data) => {
        const action = { type: "CREATE_POST", data};
        store.dispatch(action)
    }

    handlerChange = e => {
        e.preventDefault();

        const {
            name,
            value
        } = e.target;
        const formErrors = this.state.formErrors;

        // console.log("Name: ", name);
        // console.log("Value: ", value);

        const validators = {
            name: (value) => value.length < 3 && value.length > 0 ? 'Minimum 3 characters require' : "",
            email: (value) => emailRegex.test(value) && value.length > 0 ? '' : 'Invalid email adress',
            body: (value) => value.length < 2 && value.length > 0 ? 'Minimum 3 characters require' : "",
        }
        formErrors[name] = validators[name](value)

        // TEST

        // switch (name) { 
        //     case 'name':
        //         formErrors.name = value.length < 3 && value.length > 0 ?
        //             'Minimum 3 characters require' :
        //             "";
        //         break;
        //     case 'email':
        //         formErrors.email = emailRegex.test(value) && value.length > 0 ?
        //             '' :
        //             'Invalid email adress';
        //         break;
        //     case 'body':
        //         formErrors.body = value.length < 3 && value.length > 0 ?
        //             'Minimum 3 characters require' :
        //             '';
        //         break;
        //     default:
        //         break;
        // }

        this.setState({
                formErrors,
                [name]: value
            },
            () => console.log(this.state))
    }

    render() {
        const {formErrors} = this.state;
        const errorStyle = {
            display: "block",
            color: 'red',
            fontSize: 10,
            fontWeight: 800
        }

        const inputStyle = {
            width: '100%',
            padding: '10px 15px',
            fontSize: 14,
            fontWeight: 500,
            border: '1px solid #CCC',
            marginTop: '5px',
            boxSizing: "border-box"
        }
        return (
            <div className = "wrapper" style = {{display: 'flex',justifyContent: 'center',alignItems: 'center',width: '100%',minHeight: '500px'}} >
                <Link to = "/" style={{position: 'absolute', top: '80px', left: '50px'}}> Back</Link>  
                <div className = "form-wrapper" style = {{display: 'block',width: '600px',height: '400px',backgroundColor: '#FFF',padding: '15px'}} >
                    <h1 style = {{textAlign: 'center',textTransform: 'uppercase',color: '#BBB'}} > Add new comment < /h1> 
                    <form onSubmit = {this.handlerSubmit} >
                        <div className = "email" style = {{marginBottom: '30px'}} >
                            <label htmlFor = "email" style = {{display: 'block',fontSize: 16,fontWeight: '600'}} > Email </label> 
                            <input type = "email" className = "" placeholder = "Email" name = "email" onChange = {this.handlerChange} style = {inputStyle}/> 
                            {formErrors.email.length > 0 && ( <span className = "errorMesseage" style = {errorStyle} > {formErrors.email} < /span>)} 
                        </div> 
                        <div className = "name" style = {{marginBottom: '30px'}} >
                            <label htmlFor = "name" style = {{display: 'block',fontSize: 16,fontWeight: '600'}} > Name </label> 
                            <input type = "text" className = "" placeholder = "Name" name = "name" onChange = {this.handlerChange} style = {inputStyle}/> 
                            {formErrors.name.length > 0 && ( <span className = "errorMesseage" style = {errorStyle} > {formErrors.name} < /span>)} 
                        </div> 
                        <div className = "body" style = {{marginBottom: '30px'}} >
                            <label htmlFor = "body" style = {{display: 'block',fontSize: 16,fontWeight: '600'}} > Body < /label> 
                            <input type = "text" className = "" placeholder = "Body" name = "body" onChange = {this.handlerChange} style = {inputStyle}/> 
                            {formErrors.body.length > 0 && ( <span className = "errorMesseage" style = {errorStyle} > {formErrors.body} < /span>)} 
                        </div> 
                        <div className = "createComment" >
                            <button type = "submit" style = {{display: 'block',padding: '10px 15px',backgroundColor: '#00b300',color: '#FFF',borderRadius: '5px', margin: '0 auto'}} > Create Comment < /button> 
                        </div> 
                    </form> 
                </div> 
            </div>
        )
    }
}

export default AddComent;
