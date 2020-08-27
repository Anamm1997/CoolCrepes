import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import StateNames from '../Shared/StateNames';


function UserSetting(props) {
    const isUserInputValid = props.user.editing && props.user.editing && props.user.email && props.user.firstName && props.user.lastName && 
                            props.user.address.streetName && props.user.address.state && props.user.address.zipcode && props.user.address.city;


    return (
        <>

            <Form  onSubmit={props.submitUpdate} className="registerForm">
                <h1 className="text-center">User Settings</h1>
                <FormGroup>
                    <Button className="btn-lg btn-block btn-info" onClick={props.toggleEditing}>
                        {props.user.editing ? 'Disable' : 'Enable'} Editing
                    </Button>
                </FormGroup>
                <div className="row">
                    <div className="col">
                        <FormGroup>
                            <Label>First Name</Label>
                            <Input type="text" name="firstName" placeholder="First Name" value={props.user.firstName} onChange={props.handleChange} disabled={!props.user.editing} />
                        </FormGroup>
                    </div>
                    <div className="col">
                        <FormGroup>
                            <Label>Last Name</Label>
                            <Input type="text" name="lastName" placeholder="Last Name" value={props.user.lastName} onChange={props.handleChange} disabled={!props.user.editing} />
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col col-sm-8">
                        <FormGroup>
                            <Label>Address</Label>
                            <Input type="text" name="streetName" placeholder="Address" value={props.user.address.streetName} onChange={props.handleChange} disabled={!props.user.editing} />
                        </FormGroup>
                    </div>
                    <div className="col col-sm-4">
                        <FormGroup>
                            <Label>Zip</Label>
                            <Input type="text" name="zipcode" placeholder="Zipcode" value={props.user.address.zipcode} onChange={props.handleChange} disabled={!props.user.editing} />
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <FormGroup>
                            <Label>City</Label>
                            <Input type="text" name="city" placeholder="City" value={props.user.address.city} onChange={props.handleChange} disabled={!props.user.editing} />
                        </FormGroup>
                    </div>
                    <div className="col">
                        <FormGroup>
                            <Label>State</Label>
                            <select name="state" className="custom-select" value={props.user.address.state} onChange={props.handleChange} disabled={!props.user.editing} >
                                <option value="" disabled> Select State</option>
                                {Object.keys(StateNames).map(stateIndex => {
                                    return <option value={stateIndex} key={stateIndex}>{StateNames[stateIndex]}</option>;
                                })}
                            </select>
                        </FormGroup>
                    </div>
                </div>

                <FormGroup>
                    <Label>Email</Label>
                    <Input type="email" name="email" placeholder="Email" value={props.user.email} onChange={props.handleChange} disabled={true} />
                </FormGroup>

                <FormGroup> 
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" name="image" onChange={props.handleChange} disabled={!props.user.editing} />
                        <label className="custom-file-label">Profile Picture (optional)</label>
                    </div>
                </FormGroup>

                <Button type="submit" className="btn-lg btn-block btn-primary" disabled={!isUserInputValid}>Update Profile</Button>
            </Form>
            <p>{ props.user.message }</p>
        </>
    );
           
}

export default UserSetting;