import React from 'react';
import PropTypes from 'prop-types';
import {updateBook, getAllBooks, createBook} from "../../crud/http-methods-books";
import {Form, Button} from 'react-bootstrap';


import {ModalComponent, Container} from './partials';

export default class BookList extends React.Component {
    state = {
        books: [],
        nextId: '',
        targetIDs: [],
        showID: [],
        openModal: false,
        selectedFeature: {
            id: '',
            book_name: '',
            author_firstname:'',
            author_lastname: ''
        },
    };

     componentDidMount () {
        getAllBooks().then(res => this.setState({books: res.data}));
    };

    editData = (data) => {
        data['id'] = this.state.selectedFeature['id'];
        updateBook(data['id'], data)
            .then(() => {
               // showAlert("success", "Update success");
                this.updateData();
                this.closeModalEdit();
            })
            .catch((error) => /*showAlert("error", "Update failed"));*/ console.log(error));
    };

    addData = (data) => {
        data['id'] = this.state.nextId;
        createBook(data)
            .then(() => {
                this.updateData();
                this.closeModalEdit();
            })
            .catch((error) => /*showAlert("error", "Update failed"));*/ console.log(error));
    };

    updateData = () => {
        getAllBooks().then(res => this.setState({books: res.data}));
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
        const nextValueId = Math.max(...this.state.books.map(o => o.id), 0)+1;
        this.setState({nextId: nextValueId})
        this.openModalEdit({id: nextValueId, book_name: '', author_firstname: '', author_lastname: ''});
    };

    render() {
        return (        
            <div>  
                <Button variant="outlined" color="primary" onClick={this.openModalAdd}>Add new</Button>
                <Container 
                    data = {this.state.books}
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