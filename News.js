import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = async () => {
    let url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=706fe71972f344a98cf5f12943b5c0be&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles || [],
      loading: false,
    });
  };

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 }, this.fetchArticles);
  };

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 }, this.fetchArticles);
  };

  render() {
    return (
      <div className="container my-3">
        {this.state.loading && <Spinner />}
        <h1 className="text-center">News.pk-Top Headlines.</h1>
        <div className="row">
          
          {this.state.articles.map((element, index) => {
            return (
              <div className="col-md-4" key={element.url || index}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-primary"
            onClick={this.handlePrevClick}
          >
            &larr;Previous
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
