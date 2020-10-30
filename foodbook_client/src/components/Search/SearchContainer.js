import React from 'react';
import Search from './Search';
import Results from '../Results/Results';
import SearchModel from '../../models/SearchModel';

class SearchContainer extends React.Component {
    state = {
        query: '',
        results: [],
    };

    fetchRecipes = (query) => {
        SearchModel.searchRecipes({query})
        .then((response) => {
            console.log("response: ", response);
            this.setState({
                results: response.data.data,
            });
        })
        .catch((error) => {
            console.log(error);
            return <p>Sorry, that search didn't work. Please try again.</p>;
        });
    };

    shouldComponentUpdate = (nextProps, nextState) => {
        if(this.state.results.length === 0 && this.state.query === nextState.query) {
            return false;
        }
        return true;
    };

    componentDidUpdate = (prevProps, prevState) => {
        if(prevState.query !== this.state.query) {
            this.fetchRecipes(this.state.query);
        }
    };

    handleChange = (event) => {
        this.setState({
            query: event.target.value
        });
    };
    
    render () {
        if (this.state.results) {
            return (
                <>
                    <Search handleChange={this.handleChange} query={this.state.query} />
                    <Results results={this.state.results} />
                </>
            );
        }
        return (
            <Search handleChange={this.handleChange} query={this.state.query} />
        );
    };
};

export default SearchContainer;