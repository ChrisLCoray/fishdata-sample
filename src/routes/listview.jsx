import React from 'react';
import { useLoaderData } from "react-router-dom";
import Api from '../services/api.service';

const api = new Api;

export default function ListView(props) {
    const fishes = props.data.fish;
    const averages = api.getAvgFishData(fishes);
    const defaultImg = {
        alt: 'Image Not Found',
        src: '/assets/default-fish.png',
        title: 'Image Not Found'
    };
    const fishList = fishes.map((fish, i) => {
        const image = (fish.ImageGallery && fish.ImageGallery.length > 0) ? fish.ImageGallery[0] : defaultImg;
        return <div key={`id-${api.convertStringToId(fish.SpeciesName)}-${i}`} className="fish-row row">
            <img src={image.src} alt={`Image of ${image.alt}`} title={image.title} className="col fish-image" />
            <div className="col fish-name">{fish.SpeciesName}</div>
            <div className="col fish-cals">{fish.Calories}</div>
            <div className="col fish-fats">{fish.FatTotal}</div>
        </div>
    });
    return (
        <section className="listview">
            <div className="averages row">
                <div className="col row-title">Averages:</div>
                <div className="col calories">Calories - {averages.avgCalories}</div>
                <div className="col fat">Fat - {averages.avgFat}</div>
            </div>
            <div className="col fish-list">
                <div className="fish-row row title">
                    <div className="col fish-image">Image</div>
                    <div className="col fish-name">Name</div>
                    <div className="col fish-cals">Calories</div>
                    <div className="col fish-fats">Fat</div>
                </div>
                {fishList}
            </div>
        </section>
    );
}
