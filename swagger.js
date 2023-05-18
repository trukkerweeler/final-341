const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Swaggy API',
        description: 'Final Project API',
    },
    host: 'https://web-service-final.onrender.com',
    schemes: ['http'],
};

const outputfile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputfile, endpointsFiles, doc);

// // Run server after generating swagger file
// swaggerAutogen(outputfile, endpointsFiles, doc).then (async () => {
//     await import('./server.js');
// });