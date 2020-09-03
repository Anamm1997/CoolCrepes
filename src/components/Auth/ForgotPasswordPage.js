import React from 'react';
import Fire from '../Fire';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import '../../App.css';

class ForgotPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.submitPasswordReset = this.submitPasswordReset.bind(this);
        this.state = {
            email:"",
            errMessage:""
        };
    }
    
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitPasswordReset(e){
        e.preventDefault();
        console.log(this.state.email)
        Fire.auth().sendPasswordResetEmail(this.state.email).then((u)=>{
            this.setState({errMessage: ""});
            console.log("Email sent Success");
            alert("Please check you email")
            
        }).catch((error) => {
            this.setState({errMessage: error.message});
        });
    }
    
    render() {
        return(
        <Form onSubmit = {this.submitPasswordReset} className="pageForm">
                    <h1 className="text-center">Forgot Password?</h1>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
                    </FormGroup>
                    <Button type = "submit" className="btn-lg btn-block btn-light mb-3" >Send email</Button>
                <p>{ this.state.errMessage }</p>
                </Form>
        )
    }
    
}

export default ForgotPasswordPage;
