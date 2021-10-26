import React from 'react';
import PropTypes from 'prop-types';
import {updateBook, getAllBooks, createBook} from "../../crud/http-methods-books";
import {getAllUsers} from "../../crud/http-methods-users";

import {Button} from 'react-bootstrap';

import {ModalComponent, Container, FormComponent} from './partials';

export default class BookList extends React.Component {
    state = {
        books: [],
        users: [],
        active: 'all-books',
        alldata: [],
        nextId: '',
        filter: false,
        openModal: false,
        selectedFeature: {
            id: '',
            book_name: '',
            author_firstname:'',
            author_lastname: '',
            userId: '',
        },
    };

     componentDidMount () {
        getAllBooks().then(res => {this.setState({books: res.data}); this.setState({alldata: res.data})});
        getAllUsers().then(res => this.setState({users: res.data}));
    };

    editData = data => {
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
        if (this.state.filter) {
            getAllBooks().then(res => {this.setState({alldata: res.data})});
        } else getAllBooks().then(res => {this.setState({books: res.data}); this.setState({alldata: res.data})});  
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
        const nextValueId = Math.max(...this.state.alldata.map(o => o.id), 0)+1;
        this.setState({nextId: nextValueId})
        this.openModalEdit({id: nextValueId, book_name: '', author_firstname: '', author_lastname: '', userId: '',});
    };

    filterData = (e) => {
        if (e.target.getAttribute('id').includes('filter')) {
            let array = this.state.alldata.filter((item) => {
                if( item.userId !== '') {
                    return true
                };
            });
            this.setState({books: array});
            this.setState({filter: true})
        } else {
            this.setState({books: this.state.alldata});
            this.setState({filter: false})
        };
        this.setState({active: e.target.getAttribute('id')})
    };

    render() {
        return (        
            <div>  
                <Button variant="outlined" color="primary" onClick={this.openModalAdd}>Add new</Button>
                <Button className={`button-book ${this.state.active === 'all-books' ? 'button-active' : ''}`} id="all-books" onClick={(e)=> this.filterData(e)}>Sve knjige</Button>
                <Button className={`button-book  ${this.state.active === 'filter-books' ? 'button-active' : ''}`}  id="filter-books" onClick={(e)=> this.filterData(e)}>Posuđene knjige</Button>

                <Container data = {this.state.books} openModalEdit = {this.openModalEdit} usersData = {this.state.active === 'filter-books' ?  this.state.users : []}            
               
                />
                <ModalComponent 
                    show={this.state.openModal}
                    handleClose={this.closeModalEdit}
                    /*attributes = {this.state.selectedFeature}
                    submitData = {this.saveSubmitedData}*/
                    child={
                        <FormComponent
                            attributes = {this.state.selectedFeature}
                            submitData = {this.saveSubmitedData}
                        />
                    }
                />
          </div>   
        )
}};

/*BookList.propTypes={
    propsconsole: PropTypes.string, 
    propsname: PropTypes.string,
    posts: PropTypes.array,
    user: PropTypes.array,
    comments: PropTypes.array
};*/