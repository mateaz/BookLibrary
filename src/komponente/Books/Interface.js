import React from 'react';
import {getUser} from "../../crud/http-methods-users";
import {updateBook, getAllBooks} from "../../crud/http-methods-books";
import {Alert, Button} from 'react-bootstrap';
import {ModalComponent, Container, Find} from './partials';
import {BsFillPlusCircleFill, BsFillDashCircleFill} from 'react-icons/bs'

export default class Interface extends React.Component {
    state = {
        searchedUser: '',
        show: false,
        books: [],
        borrowedBooks: [],
        restBooks: [],
        showAlert: false,
        variant: '',
        messageVariant: '',
        openModal: false,
        selectedFeature: {
            id: '',
            book_name: '',
            author_firstname:'',
            author_lastname: '',
            userId: '',
        },
    };

    handleSubmit = data => {
        getUser(data.id)
            .then(res => {
                this.setState({searchedUser: res.data})
                this.getData(data.id);
                this.setState({show: true});
            })
            .catch( () => {
                this.setState({searchedUser: ''});
                this.setState({show: false})
            });
    };

    getData = e => {
        getAllBooks().then(res => {
          this.setState({books: res.data}); 
          this.filterBooks(e);
        });
    };

    filterBooks = e => {
        let borrowed = this.state.books.filter((item) => {
            if( item.userId === e) {
                return true;
            } else return false;
        }); 
        this.setState({borrowedBooks: borrowed})
        let notborrowed = this.state.books.filter((item) => {
            if( item.userId === '') {
                return true;
            } else return false;
        }); 
        this.setState({restBooks: notborrowed})
    };

    openModalEdit = selected => {
        this.setState({openModal: true})
        this.setState({selectedFeature: selected}) 
    };

    closeModalEdit = () => {
        this.setState({openModal: false})
    };
    
    returnBook = () => {
        let userID = this.state.selectedFeature['userId'];
        let data = this.state.selectedFeature;
        data['userId'] = '';
        updateBook(data['id'], data)
            .then(() => {
                this.showMessageAlert('success', 'Uspješno ste vratili knjigu');
                this.getData(userID);
                this.closeModalEdit();
            })
            .catch(() => {
                this.showMessageAlert('warning', 'Nešto je pošlo po krivu. Pokušajte ponovno');
                this.closeModalEdit();
            });
    }

    borrowBook = () => {
        let data = this.state.selectedFeature;
        data['userId'] = this.state.searchedUser['id'];    
        updateBook(data['id'], data)
        .then(() => {
            this.showMessageAlert('success', 'Uspješno ste posudili knjigu');
            this.getData(this.state.searchedUser['id']);
            this.closeModalEdit();
        })
        .catch(() => {
            this.showMessageAlert('warning', 'Nešto je pošlo po krivu. Pokušajte ponovno');
            this.closeModalEdit();
        });
    };

    showMessageAlert = (variant, message) => {
        this.setState({showAlert: true});
        this.setState({variant: variant});
        this.setState({messageVariant: message})
    };

    render() {
        return (        
            <div id="interface">  
                <Alert show={this.state.showAlert} variant={this.state.variant}>
                    <p>{this.state.messageVariant}</p>
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => this.setState({showAlert: false})} variant="outline-success">
                            Zatvori
                        </Button>
                    </div>
                </Alert> 
                <Find onSubmit={this.handleSubmit}/>
                {!this.state.show ?  
                    <div></div>  : 
                    ( <div className="userinterface"> 
                        {this.state.borrowedBooks.length > 0 ? 
                        <div className="userinterface-div-content" >
                            <p className="userinterface-message-p">Za vratiti</p>
                            <Container data = {this.state.borrowedBooks} openModalEdit = {this.openModalEdit} iconButton={<BsFillDashCircleFill/>}/>
                        </div>
                         : 
                         <div className="userinterface-div-content">
                             <p className="userinterface-message-p">Trenutno niste posudili nijednu knjigu</p>
                        </div>
                        }
                        <div className="vertical-line"></div>
                        {this.state.restBooks.length > 0 ? 
                        <div className="userinterface-div-content" >
                        <p className="userinterface-message-p">Za posuditi</p>
                                <Container data = {this.state.restBooks} openModalEdit = {this.openModalEdit} iconButton={<BsFillPlusCircleFill/>}/>
                                </div>
                            : 
                            <div className="userinterface-div-content" >
                                <p className="userinterface-message-p">Nijedna knjiga nije dostupna za posudbu</p>
                            </div>
                        }
                    </div>)
                }
                <ModalComponent 
                    show={this.state.openModal}
                    handleClose={this.closeModalEdit}
                    child = {this.state.selectedFeature.userId ? 
                        ( <div className='modal-return-borrow'>
                            <div>Za povratak knjige u knjižnicu kliknite Da</div>
                            <div className='modal-return-borrow-buttons'>
                                <Button className='button-custom' onClick={this.returnBook}>Da</Button>
                                <Button className='button-custom' onClick={this.closeModalEdit}>Odustani</Button>
                            </div>
                        </div>
                        )
                    : 
                        ( <div className='modal-return-borrow'>
                            <div>Za posudbu knjige kliknite Da</div>
                            <div className='modal-return-borrow-buttons'>
                                <Button className='button-custom' onClick={this.borrowBook}>Da</Button>
                                <Button className='button-custom' onClick={this.closeModalEdit}>Odustani</Button>
                            </div>
                        </div>
                        )
                        }
                />
                
            </div>    
        )
}};