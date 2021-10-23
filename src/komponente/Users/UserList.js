import React from 'react';
import PropTypes from 'prop-types';
import {updateUser, getAllUsers, createUser} from "../../crud/http-methods-users";
import {Form, Button} from 'react-bootstrap';


import {ModalComponent, Container} from './partials';

export default class UserList extends React.Component {
    state = {
        users: [],
        nextId: '',
        targetIDs: [],
        showID: [],
        openModal: false,
        selectedFeature: {
            id: '',
            name: '',
            author:'',
        },
    };

     componentDidMount () {
        getAllUsers().then(res => (console.log(res.data), this.setState({users: res.data})));
    };

    editData = (data) => {
        data['id'] = this.state.selectedFeature['id'];
        updateUser(data['id'], data)
            .then(() => {
               // showAlert("success", "Update success");
                //closeDialog();
                this.updateData();
                this.closeModalEdit();
            })
            .catch((error) => /*showAlert("error", "Update failed"));*/ console.log(error));
    };

    addData = (data) => {
        data['id'] = this.state.nextId;
        createUser(data)
            .then(() => {
                this.updateData();
                this.closeModalEdit();
            })
            .catch((error) => /*showAlert("error", "Update failed"));*/ console.log(error));
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
        this.openModalEdit({id: nextValueId, name: '', author: ''}, );
    };

    render() {
        return (        
            <div>  
                <Button variant="outlined" color="primary" onClick={this.openModalAdd}>Add new</Button>
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
}
}

/*BookList.propTypes={
    propsconsole: PropTypes.string, 
    propsname: PropTypes.string,
    posts: PropTypes.array,
    user: PropTypes.array,
    comments: PropTypes.array
};*/