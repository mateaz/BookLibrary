import React from 'react';
import {updateUser, getAllUsers, createUser} from "../../crud/http-methods-users";
import {Button, Alert} from 'react-bootstrap';
import {Container, FormComponent, ModalComponent} from './partials';
import {BsFillPersonPlusFill} from 'react-icons/bs';
import {FiEdit} from 'react-icons/fi';

export default class UserList extends React.Component {
    state = {
        users: [],
        nextId: '',
        showModal: false,
        selectedUser: {
            id: '',
            userName: '',
            dateOfBirth:'',
        },
        showAlert: false,
        variant: '',
        messageVariant: '',
        setModalTitle: '',
    };

    componentDidMount () {
        getAllUsers().then(res => this.setState({users: res.data}));
    };

    editData = (data) => {
        data['id'] = this.state.selectedUser['id'];
        updateUser(data['id'], data)
            .then(() => {
                this.updateData();
                this.handleHideModalClick();
            })
            .catch((error) =>console.log(error));
    };

    addData = (data) => {
        data['id'] = this.state.nextId;
        createUser(data)
            .then(() => {
                this.updateData();
                this.handleHideModalClick();
                this.showMessageAlert('success', 'Uspješno ste dodali novog korisnika!')
            })
            .catch(() =>this.showMessageAlert('warning', 'Nešto je pošlo po krivu. Pokušajte ponovno.'));
    };

    updateData = () => {
        getAllUsers().then(res => this.setState({users: res.data}));
    };

    handleSelectedClick = (selected) => {
        this.setState({showModal: !this.state.showModal})
        this.setState({setModalTitle: 'Izmijeni podatke o korisniku'});
        if (selected !== this.state.selectedUser) {
            this.setState({selectedUser: selected})
         };
    };

    handleHideModalClick = () => {
        this.setState({showModal: false})
    };

    handleUserDataSubmit = (submitedData, b) => {
        if (b === 'edit') {
            this.editData(submitedData);
        } else this.addData(submitedData);
    };

    handleClickOpenModalAdd = () => {
        const nextValueId = Math.max(...this.state.users.map(o => o.id), 0)+1;
        this.setState({nextId: nextValueId})
        this.handleSelectedClick({id: nextValueId, userName: '', dateOfBirth: ''});
        this.setState({setModalTitle: 'Dodaj novog korisnika'});
    };

    showMessageAlert = (variant, message) => {
        this.setState({showAlert: true});
        this.setState({variant: variant});
        this.setState({messageVariant: message})
    };

    render() {
        return (        
            <div>  
                <Alert show={this.state.showAlert} variant={this.state.variant}>
                    <p>{this.state.messageVariant}</p>
                    <div className="d-flex justify-content-end">
                        <Button onClick = {() => this.setState({showAlert: false})} variant="outline-success">Zatvori</Button>
                    </div>
                </Alert> 
                <div className="buttons-list">
                    <Button variant="outlined" color="primary" className='button-custom' onClick={this.handleClickOpenModalAdd}>Dodaj novog korisnika <BsFillPersonPlusFill/></Button>
                </div>
                <Container users = {this.state.users} onSelectedClick = {this.handleSelectedClick} iconElement = {<FiEdit/>}/>
                <ModalComponent 
                    modalTitle = {this.state.setModalTitle}
                    isShowing = {this.state.showModal}
                    onHideModalClick = {this.handleHideModalClick}
                    children = {
                        <FormComponent 
                            user = {this.state.selectedUser}
                            onUserDataSubmit = {this.handleUserDataSubmit}
                        />
                    }                   
                />
          </div>   
        )
}};
