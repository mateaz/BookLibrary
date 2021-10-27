import React from 'react';
import {updateUser, getAllUsers, createUser} from "../../crud/http-methods-users";
import {Button, Alert} from 'react-bootstrap';
import {ModalComponent, Container} from './partials';
import {BsFillPersonPlusFill} from 'react-icons/bs';

export default class UserList extends React.Component {
    state = {
        users: [],
        nextId: '',
        openModal: false,
        selectedFeature: {
            id: '',
            name: '',
            author:'',
        },
        showAlert: false,
        variant: '',
        messageVariant: '',
    };

    componentDidMount () {
        getAllUsers().then(res => this.setState({users: res.data}));
    };

    editData = (data) => {
        data['id'] = this.state.selectedFeature['id'];
        updateUser(data['id'], data)
            .then(() => {
                this.updateData();
                this.closeModalEdit();
            })
            .catch((error) =>console.log(error));
    };

    addData = (data) => {
        data['id'] = this.state.nextId;
        createUser(data)
            .then(() => {
                this.updateData();
                this.closeModalEdit();
                this.showMessageAlert('success', 'Uspješno ste dodali novog korisnika!')
            })
            .catch(() =>this.showMessageAlert('warning', 'Nešto je pošlo po krivu. Pokušajte ponovno.'));
    };

    updateData = () => {
        getAllUsers().then(res => this.setState({users: res.data}));
    };

    openModalEdit = (selected) => {
        this.setState({openModal: !this.state.openModal})
        if (selected !== this.state.selectedFeature) {
            this.setState({selectedFeature: selected})
         };
    };

    closeModalEdit = () => {
        this.setState({openModal: false})
    };

    saveSubmitedData = (submitedData, b) => {
        if (b === 'edit') {
            this.editData(submitedData);
        } else this.addData(submitedData);
    };

    openModalAdd = () => {
        const nextValueId = Math.max(...this.state.users.map(o => o.id), 0)+1;
        this.setState({nextId: nextValueId})
        this.openModalEdit({id: nextValueId, userName: '', date_of_birth: ''});
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
                        <Button onClick={() => this.setState({showAlert: false})} variant="outline-success">
                            Zatvori
                        </Button>
                    </div>
                </Alert> 
                <div className="buttons-list">
                    <Button variant="outlined" color="primary" className='button-custom' onClick={this.openModalAdd}>Dodaj novog korisnika <BsFillPersonPlusFill/></Button>
                </div>
                <Container 
                    data = {this.state.users}
                    openModalEdit = {this.openModalEdit}
                />
                <ModalComponent 
                    show={this.state.openModal}
                    handleClose={this.closeModalEdit}
                    attributes = {this.state.selectedFeature}
                    submitData = {this.saveSubmitedData}
                />
          </div>   
        )
}};
