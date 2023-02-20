import React from 'react';
import { useLoaderData } from "react-router-dom";
import Api from '../services/api.service';
import ListView from './listview';

const api = new Api;

export async function loader({ params }) {
    const data = await api.getFishData();
    return {
        fish: api.getFishByRegion(data, params.locationId),
        region: params.locationId
    };
}

export default function Location() {
    const data = useLoaderData();
    return (
        <section className="view-container">
            <h3>Location: {data.region}</h3>
            <ListView data={data} />
        </section>
    );
}
