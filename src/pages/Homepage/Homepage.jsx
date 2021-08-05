import React, { Component } from "react";

import { fetchPhotos } from "../../services/fetchPhotos";
import PhotoView from "../../components/PhotoView/PhotoView";
import noResult from '../../assets/images/no_result.png';

import './Homepage.css'

let timeout;
const debounce = (func, delay) => {
    clearTimeout(timeout);
    timeout = setTimeout(func, delay);
};

export default class Homepage extends Component {
    constructor() {
        super();
        this.state = {
            search: '',
            page: 1,
            pages: 0,
            photoList: [],
            loading: false,
        }
        this.handleChange = this.handleChange.bind(this);   
    }

    componentDidMount() {
        const { page } = this.state;
        document.addEventListener('scroll', this.trackScrolling);
        this.setState({ loading: true });
        fetchPhotos({ page }).then(res => {
            if(res){
                this.setState({photoList: res.photos.photo, pages: res.photos.pages, loading: false});
            }
        })
    }

    componentDidUpdate(_prevProps, prevState) {
        const {search: prevSearch} = prevState
        const {search} = this.state;
        if(search !== prevSearch){
            debounce(() => {
                this.setState({photoList: [], loading: true});
                fetchPhotos({search, page: 1}).then(res => {
                    if(res){
                        this.setState({photoList: res.photos.photo, pages: res.photos.pages, loading: false});
                    } else {
                        this.setState({photoList: [], loading: false});
                    }
                })
            }, 500)
        }
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    trackScrolling = () => {
        const { photoList, page, search, pages, loading } = this.state;
        const wrappedElement = document.getElementById('homepage');
        if (this.isBottom(wrappedElement)) {
            this.setState({ loading: true });
            if(!loading) {
                fetchPhotos({ page: page + 1, search }).then(res => {
                    if(res){
                        const tempPhotoList = [...photoList, ...res.photos.photo];
                        this.setState({photoList: tempPhotoList, pages: res.photos.pages, loading: false, page: res.photos.page});
                    }
                });
                console.log('homepage bottom reached');
                document.removeEventListener('scroll', this.trackScrolling);
            }
            if(page !== pages) {
                document.addEventListener('scroll', this.trackScrolling);
            }
        }
    };

    handleChange(e) {
        this.setState({search: e.target.value, page: 1, pages: 0});
    }

    render() {
        const { photoList, pages, page, loading, search } = this.state;
        return <div className='homepage' id='homepage'>
            <div className='param-div'>
                <input 
                    className='search'
                    id='search'
                    name='search'
                    type='text'
                    placeholder='Search'
                    label='Search'
                    onChange={this.handleChange}
                    value={search}
                />
            </div>
            {
                search && !loading && pages > 0 && <div className='no-of-results'>
                    <p className='result-count'>More than {pages*20} results found</p>
                </div>
            }
            <div className='photo-list'>
                {photoList.map(photo => <PhotoView key={photo.id} photo={photo} />)}
            </div>
            {
                loading && <div className='loading'>
                    <div className='loader'></div>
                </div>
            }
            {
                !loading && pages === 0 && <div className='no-results'>
                    <img className='no-result-img' src={noResult} alt='no results' />
                </div>
            }
            {
                pages > 0 && page > pages && <div className='no-more-results'>
                    <p>No more results to show</p>
                </div>
            }
            
        </div>
    }
}