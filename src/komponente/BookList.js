import React from 'react';
import PropTypes from 'prop-types';

export default class BookList extends React.Component {
    state = {
        targetIDs: [],
        showID: [],
    };

   /* componentDidMount () {
        console.log(`${this.props.propsconsole} ${this.props.propsname}`);
    };*/

   /* handleOnClickButton = (e) => {
        let buttonId = e.target.getAttribute('id');
        let newButtonIds = [...this.state.showID];

        if (newButtonIds.includes(buttonId)) {
            newButtonIds = newButtonIds.filter(e => e !== buttonId)
        } else {
          newButtonIds.push(buttonId);
        }
        this.setState({showID: newButtonIds});

        let targetId = parseInt(e.target.previousSibling.getAttribute('id'));
        let newList = [...this.state.targetIDs];
        
        if (newList.includes(targetId)) {
          newList = newList.filter(e => e !== targetId)
        } else {
            newList.push(targetId);
        }
        this.setState({targetIDs: newList});
    };*/

    render() {

        return (                                                                                                                                                          
            <div className="list-books">
                {this.props.books.map(book => {
                    const { id } = book;
                    const { userID } = book;
                    const { name } = book;
                    const { author } = book;
                    const {image } = book
                    return (
                        <div key={id} >
                            <div>
                                <img src={require(`../img/${image}`).default} width={150} height={150}/>
                                <p>{userID}</p>
                                <p>{name}</p>
                                <p>{author}</p>        
                            </div>                   
                        </div>
                    )
                })}
            </div>
        )}
};

BookList.propTypes={
    propsconsole: PropTypes.string, 
    propsname: PropTypes.string,
    posts: PropTypes.array,
    user: PropTypes.array,
    comments: PropTypes.array
};