import { BASE_URL, apiKey } from '../constants'

const baseParamKeys = {
    api_key: apiKey,
    per_page: 20,
    format: 'json',
    nojsoncallback: 1,
}

export const fetchPhotos = async (params) => {
    const { search, page } = params;
    const url = new URL(BASE_URL);
    let paramKeys;
    if(params.search) {
        paramKeys = { ...baseParamKeys, method: 'flickr.photos.search', page, text: search }
    } else {
        paramKeys = { ...baseParamKeys, method: 'flickr.photos.getRecent', page }
    }
    Object.entries(paramKeys).forEach(([key , value]) => url.searchParams.append(key, value));
    const response = await fetch(url);
    const res = await response.json();
    return res;
}