let baseUrl, devUrl;

switch (process.env.NODE_ENV) {

    case 'production':
        baseUrl = 'production';
        break;
    case 'test':
        baseUrl = 'test';
        break;
    default:
        baseUrl = 'development';
}


export default {
    baseUrl,
};
