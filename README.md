# NestJS + Angular app for workspaceSE

### Install dependencies

Open a console in the `server` directory and run:

```bash
npm install
```

Use the same command for the Angular frontend app in `client` directory.

### Running the app

To run unit tests for nestJS run the following command in the server directory:

```bash
npm test
```

to run the server, use the command below in the server directory:

```bash
npm start
```

To run frontend Angular app go to `client` directory and run:

```bash
npm start
```

### Docker

Inside `server` directory use command to build docker container with app:

```bash
docker build -t nest-app-se .
```

After the build is done you can run your application on docker with command:

```bash
docker run -p 3000:3000 nest-app-se
```
