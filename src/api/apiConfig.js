const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '6782ed18d7177aca29052691284800c4',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};
export default apiConfig;
