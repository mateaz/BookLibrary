import React from 'react';
import {updateBook, createBook, getAllBooksWithBorrowState} from "../../crud/http-methods-books";
import {BsFillPlusSquareFill} from 'react-icons/bs'
import {Button, Alert} from 'react-bootstrap';
import {FiEdit} from 'react-icons/fi';
import {Container, FormComponent, ModalComponent} from './partials';

export default class BookList extends React.Component {
    state = {
        books: [],
        active: 'all-books',
        alldata: [],
        nextId: '',
        filter: false,
        showModal: false,
        selectedFeature: {
            id: '',
            bookName: '',
            authorName:''
        },
        showAlert: false,
        variant: '',
        messageVariant: '',
        setModalTitle: '',
        borrowedBooks: '',
    };

     componentDidMount () {
        getAllBooksWithBorrowState().then(res => {
            this.setState({books: res.data}); 
            this.setState({alldata: res.data})
        });        
    };

    editData = data => {
        data['id'] = this.state.selectedFeature['id'];
        updateBook(data['id'], data)
            .then(() => {
                this.updateData();
                this.handleClickHideModal();
            })
            .catch((error) => console.log(error));
    };

    addData = data => {
        data['id'] = this.state.nextId;
        createBook(data)
            .then(() => {
                this.showMessageAlert('success', 'Uspješno ste dodali novu knjigu!')
                this.updateData();
                this.handleClickHideModal();
            })
            .catch(() =>this.showMessageAlert('warning', 'Nešto je pošlo po krivu. Pokušajte ponovno.'));
    };

    updateData = () => {
        if (this.state.filter) {
            getAllBooksWithBorrowState().then(res => {this.setState({alldata: res.data})});
        } else getAllBooksWithBorrowState().then(res => {this.setState({books: res.data}); this.setState({alldata: res.data})});  
    };

    handleClickSetSelected = (selected) => {
        this.setState({showModal: !this.state.showModal});
        this.setState({setModalTitle: 'Izmijeni podatke o knjizi'});
        if (selected !== this.state.selectedFeature) {
            this.setState({selectedFeature: selected})
         };
    };

    handleClickHideModal = () => {
        this.setState({showModal: false})
    };

    saveSubmitedData = (submitedData, b) => {
        if (b === 'edit') {
            this.editData(submitedData);
        } else this.addData(submitedData);
    };

    openModalAdd = () => {
        const nextValueId = Math.max(...this.state.alldata.map(o => o.id), 0)+1;
        this.setState({nextId: nextValueId})
        this.handleClickSetSelected({id: nextValueId, bookName: '', authorName: ''});
        this.setState({setModalTitle: 'Dodaj novu knjigu'});
    };

    filterData = (e) => {

        if (e.target.getAttribute('id').includes('filter')) {
            let array = this.state.alldata.filter((item) => {
                if(item.borrowState.length > 0) {
                    return true
                } else return false;
            });
            this.setState({books: array});
            this.setState({filter: true})
        } else {
            this.setState({books: this.state.alldata});
            this.setState({filter: false})
        };
        this.setState({active: e.target.getAttribute('id')})

    };

    showMessageAlert = (variant, message) => {
        this.setState({showAlert: true});
        this.setState({variant: variant});
        this.setState({messageVariant: message})
    };

    render() {
        return (        
            <div id="book-list"> 
                <Alert show={this.state.showAlert} variant={this.state.variant}>
                    <p>{this.state.messageVariant}</p>
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => this.setState({showAlert: false})} variant="outline-success">
                            Zatvori
                        </Button>
                    </div>
                </Alert>  
                <div className="buttons-list">
                    <Button className='button-custom' onClick={this.openModalAdd}>Dodaj novu knjigu <BsFillPlusSquareFill /></Button>
                    <div>
                        <Button className={`button-custom ${this.state.active === 'all-books' ? 'button-active' : ''}`} id="all-books" onClick={(e)=> this.filterData(e)}>Sve knjige</Button>
                        <Button className={`button-custom  ${this.state.active === 'filter-books' ? 'button-active' : ''}`}  id="filter-books" onClick={(e)=> this.filterData(e)}>Posuđene knjige</Button>
                    </div>
                </div>
                <Container iconElement={<FiEdit />} books = {this.state.books} onClickSetSelected = {this.handleClickSetSelected}/>
                <ModalComponent 
                    modalTitle={this.state.setModalTitle}
                    isShowing={this.state.showModal}
                    onClickHide={this.handleClickHideModal}
                    children = {
                        <FormComponent
                            book = {this.state.selectedFeature}
                            onSubmitBookData = {this.saveSubmitedData}
                        />
                    }
                />
          </div>   
        )
}};

