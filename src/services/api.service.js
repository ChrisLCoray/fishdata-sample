import axios from 'axios';

export default class Api {
    convertStringToId = (string) => { return string.toLowerCase().replace(/w/g, '_') };

    async getFishData() {
        return await axios({
            method: 'get',
            url: 'http://localhost:5001/gofish?apikey=abrradiology',
        }).then((response) => {
            return response.data;
        })
    }

    getRegions(data) {
        const regions = [];
        data.map((fish) => {
            fish.NOAAFisheriesRegion && regions.indexOf(fish.NOAAFisheriesRegion) < 0 && regions.push(fish.NOAAFisheriesRegion)
        })
        return regions;
    }

    getFishByRegion(data, region) {
        return (region) ? data.filter((fish) => fish.NOAAFisheriesRegion === region) : data;
    }

    getAvgFishData(data) {
        const formatAvg = (number) => { return Math.ceil(number * 100) / 100 }
        let totalCalories = 0, totalFat = 0;
        data.map((fish) => {
            totalCalories += Number(fish.Calories);
            const fat = (fish.FatTotal) ? Number(fish.FatTotal.replace(' g', '')) : 0;
            totalFat += fat;
        });
        return { avgCalories: formatAvg(totalCalories / data.length), avgFat: formatAvg(totalFat / data.length) };
    }
}
