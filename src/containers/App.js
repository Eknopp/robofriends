import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundery from '../components/ErrorBoundery';

class App extends React.Component{
    constructor(){
        super()
        this.state = {
            robots:[],
            searchField:''
        }
    }

    onSearchChange = (event) => {
        this.setState({searchField: event.target.value})
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => this.setState({ robots: users }));
    }


    render(){
        const { robots, searchField } = this.state;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })

        return !robots.length?
             <h1>Loading</h1> :
           
             (
            <div className='tc'>
                <h1 className='f1'>Robofriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <br></br>
                <Scroll>
                    <ErrorBoundery>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundery>
                </Scroll>
            </div>
        );
    
    }
}

export default App; 