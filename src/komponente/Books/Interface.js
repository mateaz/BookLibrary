import React from 'react';
import {getUser} from "../../crud/http-methods-users";
import {getAllBooks} from "../../crud/http-methods-books";
import { getAllBorrowedBooks, deleteBorrowedBook, createBorrowedBook} from "../../crud/http-methods-stateofborrow";

import {Alert, Button} from 'react-bootstrap';
import {BsFillPlusCircleFill, BsFillDashCircleFill} from 'react-icons/bs'
import {Container, Find, ModalComponent} from './partials';

export default class Interface extends React.Component {
    state = {
        borrowedBooks: [],
        allBooks: [],
        searchedUser: '',
        searchedUserList: [],
        showInterface: false,
        showAlert: false,
        variant: '',
        messageVariant: '',
        showModal: false,
        selectedBook: {
            id: '',
            userId: '',
            bookId: '',
        },
    };

    componentDidMount() {
        getAllBooks()
            .then(res => {
                this.setState({allBooks: res.data})
            })
            .catch(error => {
                console.log(error);
            });

        getAllBorrowedBooks()
            .then(res => {
                this.setState({borrowedBooks: res.data}); 
            })
            .catch(error => {
                console.log(error);
            });
    };

    handleUsernameSubmit = data => {
        this.setState({searchedUser: data.userName});

        getUser(data.userName)
            .then(res => {
                this.setState({searchedUserList: res.data})

                this.setState({showInterface: true});
            })
            .catch( () => {
                this.setState({searchedUserList: ''});
                this.setState({showInterface: false})
            });
    };

    getData = () => {
        getAllBorrowedBooks()
            .then(res => {
                this.setState({borrowedBooks: res.data}); 
            })
            .catch(error => {
                console.log(error);
            });

        getUser(this.state.searchedUser)
            .then(res => {
                this.setState({searchedUserList: res.data})
                this.setState({shoshowInterfacew: true});
            })
            .catch( () => {
                this.setState({searchedUserList: ''});
                this.setState({showInterface: false})
            });
    };

    handleSelectedClick = (selected, userId) => {
       this.setState({showModal: true})
       let selectedBook = {...this.state.selectedBook}
       selectedBook.userId = userId;
       selectedBook.bookId = selected.id;
     
       if (this.state.borrowedBooks.find(u=> u.bookId===selected.id && u.userId===userId)) {
           selectedBook.id = this.state.borrowedBooks.find(u=> u.bookId===selected.id && u.userId===userId).id;
       } else selectedBook.id = '';

       this.setState({selectedBook: selectedBook})
      
    };

    handleHideModalClick = () => {
        this.setState({showModal: false})
    };
    
    handleReturnBookClick = () => {
        let data = this.state.selectedBook;
        deleteBorrowedBook(data.id)
            .then(() => {
                this.showMessageAlert('success', 'Uspješno ste vratili knjigu');
                this.getData();
                this.handleHideModalClick();
            })
            .catch(() => {
                this.showMessageAlert('warning', 'Nešto je pošlo po krivu. Pokušajte ponovno');
                this.handleHideModalClick();
            });
    };

    handleBorrowBookClick = () => {
        let data = this.state.selectedBook;
        const nextValueId = Math.max(...this.state.borrowedBooks.map(o => o.id), 0)+1;
        data['id'] = nextValueId;

        createBorrowedBook(data)
            .then(() => {
                this.showMessageAlert('success', 'Uspješno ste posudili knjigu');
                this.getData();
                this.handleHideModalClick();
            })
            .catch(() => {
                this.showMessageAlert('warning', 'Nešto je pošlo po krivu. Pokušajte ponovno');
                this.handleHideModalClick();
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
                <Find onUsernameSubmit={this.handleUsernameSubmit}/>
                {!this.state.showInterface ?  
                    null : 
                    (<div className="userinterface"> 
                        {this.state.searchedUserList.length > 0 ? 
                            this.state.searchedUserList.map((user, i) => (
                               <div key={i} className="userinterface-div-content">
                                   <p className="userinterface-username">{user.userName}</p>
                                    {user.borrowState.length > 0 ? 
                                        user.borrowState.length !== this.state.allBooks.length ? 
                                            <div className="single-user-interface"> 
                                                <div className="single-book-borrow-state">
                                                    <p className="userinterface-information">Knjige koje je korisnik posudio/la</p>
                                                    <Container iconElement={<BsFillDashCircleFill/>} numUserId={user.id} onSelectedClick = {this.handleSelectedClick} books={this.state.allBooks.filter(book => ( user.borrowState.some(s => book.id === s.bookId)))}/>
                                                </div>
                                                <div className="single-book-borrow-state s">
                                                    <p className="userinterface-information">Dostupne knjige za posudbu</p>
                                                    <Container iconElement={<BsFillPlusCircleFill/>} numUserId={user.id} onSelectedClick = {this.handleSelectedClick} books={this.state.allBooks.filter(book => (!user.borrowState.some(s => book.id === s.bookId)))}/>
                                                </div>
                                            </div>
                                            :   
                                            <div className="single-user-interface"> 
                                                <div className="single-book-borrow-state">
                                                    <p className="userinterface-information">Knjige koje je korisnik posudio/la</p>
                                                    <Container iconElement={<BsFillDashCircleFill/>} numUserId={user.id} onSelectedClick = {this.handleSelectedClick} books={this.state.allBooks.filter(book => (user.borrowState.some(s => book.id === s.bookId)))}/>
                                                </div>
                                                <div className="single-book-borrow-state">
                                                    <p className="userinterface-information">Za posudbu nije dostupna nijedna knjiga</p>
                                                </div>        
                                            </div>
                                        : 
                                        <div className="single-user-interface">
                                            <div className="single-book-borrow-state">
                                                <p className="userinterface-information">Korisnik nije posudio/la knjgu</p>
                                            </div>
                                            <div className="single-book-borrow-state">
                                                <p className="userinterface-information">Dostupne knjige za posudbu</p>
                                                <Container numUserId={user.id} iconElement={<BsFillPlusCircleFill/>} onSelectedClick = {this.handleSelectedClick} books={this.state.allBooks}/>
                                            </div>                                            
                                        </div>
                                    }
                                </div> 
                            ))
                         : 
                         <div className="userinterface-div-content">
                             <p className="userinterface-message-p">Nema rezultata za traženi pojam</p>
                        </div>
                        }
                    </div>)}
                <ModalComponent 
                    modalTitle = {this.state.selectedBook.id ? 'Vrati knjigu?' : 'Posudi knjigu?'}
                    isShowing = {this.state.showModal}
                    onHideModalClick = {this.handleHideModalClick}
                    children = {this.state.selectedBook.id ? 
                        ( <div className='modal-return-borrow'>
                            <div>Za povratak knjige u knjižnicu kliknite Da</div>
                            <div className='modal-return-borrow-buttons'>
                                <Button className='button-custom' onClick={this.handleReturnBookClick}>Da</Button>
                                <Button className='button-custom' onClick={this.handleHideModalClick}>Odustani</Button>
                            </div>
                        </div>
                        )
                    : 
                        ( <div className='modal-return-borrow'>
                            <div>Za posudbu knjige kliknite Da</div>
                            <div className='modal-return-borrow-buttons'>
                                <Button className='button-custom' onClick={this.handleBorrowBookClick}>Da</Button>
                                <Button className='button-custom' onClick={this.handleHideModalClick}>Odustani</Button>
                            </div>
                        </div>
                        )
                        }
                />
                
            </div>    
        )
}};