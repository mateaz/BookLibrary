import React from 'react';
import {updateUser, getAllUsers, createUser} from "../../crud/http-methods-users";
import {updateBook, getAllBooks, createBook} from "../../crud/http-methods-books";

export default class Interface extends React.Component {
    state = {
        users: [],
        searchedUser: '',
        show: false,
        books: [],
        borrowedBooks: [],
        restBooks: [],

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
        getAllUsers().then(res => this.setState({users: res.data}));
    };

    checkUser = (inputid) => {
        this.setState({searchedUser: inputid})
    };

    handleSubmit = (e) => {
        e.preventDefault();
        
       if (parseInt(this.state.searchedUser)) {
            let array = this.state.users.filter((item) => {
                if( item.id === parseInt(this.state.searchedUser)) {
                    return true
                };
            });
            if (array) {
                this.setState({show: true})
                this.getData(parseInt(this.state.searchedUser));
            };
        };/* else {
            console.log('nista')
        };*/
    };

    getData = (e) => {
        getAllBooks().then(res => {
          this.setState({books: res.data}); 
          this.filterBooks(e);
        });
    };

    filterBooks = (e) => {
        console.log(e)

        let borrowed = this.state.books.filter((item) => {
            if( item.userId === e) {
                return true
            };
        }); 

        this.setState({borrowedBooks: borrowed})

        console.log(borrowed)

        let notborrowed = this.state.books.filter((item) => {
            if( item.userId !== e) {
                return true
            };
        }); 

        this.setState({restBooks: notborrowed})

        console.log(notborrowed)
    };

    render() {
        return (        
            <div>  
                {!this.state.show ? 
                    <form onSubmit={this.handleSubmit} className="login-forma">
                        <label>
                            <p>Upiši ID korisnika</p>
                            <input type="number" onChange={e => this.checkUser(e.target.value)}/>
                        </label>
                        <div>
                            <button type="submit" className="login-button">Prijava</button>
                        </div>
                    </form> 
                    : 
                    
                    (
                        <div> 
                    <div className="blue">
                        {this.state.borrowedBooks.map(feature => {
                            
                            const { id } = feature;
                            // const { userId } = feature;
                            const { book_name } = feature;
                            const { author_firstname } = feature;
                            const { author_lastname } = feature;
                
                        //  const {image } = feature
                            return (
                                <div key={id} className="book-card">
                                    {/*  <img src={require(`../img/${image}`).default} width={150} height={150}/>*/}
                                    <p className="book_name-book">{book_name}</p>
                                    <p className="author_firstname-book">{author_firstname} {author_lastname}</p>  
                                    {/*  <p>{userId}</p>      */}
                                </div>
                            )
                        })}
                    </div>

                    <div className="red">
                    {this.state.restBooks.map(feature => {
                        
                        const { id } = feature;
                        // const { userId } = feature;
                        const { book_name } = feature;
                        const { author_firstname } = feature;
                        const { author_lastname } = feature;

                    //  const {image } = feature
                        return (
                            <div key={id} className="book-card">
                                {/*  <img src={require(`../img/${image}`).default} width={150} height={150}/>*/}
                                <p className="book_name-book">{book_name}</p>
                                <p className="author_firstname-book">{author_firstname} {author_lastname}</p>  
                                {/*  <p>{userId}</p>      */}
                            </div>
                        )
                    })}
                    </div>
                    
                    </div>)
                }
                
               


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