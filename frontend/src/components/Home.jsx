import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

export default function Home() {
    const [cards, setCards] = useState([]);
    const [items, setItems] = useState([]);

    // go on top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // for carousel slides
    useEffect(() => {
        axios.get(`${API_BASE_URL}/carousel/`)
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching carousel data!", error);
            });
    }, []);

    // for food items after carousel slides
    useEffect(() => {
        axios.get(`${API_BASE_URL}/fooditems/`)
            .then(response => {
                setCards(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    return (
        <>
            {/* picture and description */}
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {items.map((item, index) => (
                        <div key={index} className={`carousel-item${index === 0 ? ' active' : ''}`}>
                            <img src={item.imageUrl} className="d-block w-100" alt={item.title} />
                            <div className="carousel-caption d-none d-md-block carousel_details">
                                <h5>{item.title}</h5>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* cards */}
            <div className="container my-5">
                <div className="row">
                    {cards.map((card) => (
                        <FoodCard
                            key={card.id}
                            category={card.category}
                            title={card.title}
                            special={card.special}
                            description={card.description}
                            imageUrl={card.imageUrl}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}


const FoodCard = ({ category, title, special, description, imageUrl }) => {
    return (
        <div className="col-md-6">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                    <strong className="d-inline-block mb-2 text-primary-emphasis">{category}</strong>
                    <h3 className="mb-0">{title}</h3>
                    <div className="mb-1 text-body-secondary">{special}</div>
                    <p className="card-text mb-auto">{description}</p>
                    {/* <a href="/" className="icon-link gap-1 icon-link-hover stretched-link">
                        Explore
                        <svg className="bi"><use xlinkHref="#chevron-right"></use></svg>
                    </a> */}
                </div>
                <div className="col-auto d-none d-lg-block">
                    <img src={imageUrl} alt={title} className="bd-placeholder-img" width="200" height="250" />
                </div>
            </div>
        </div>
    );
};