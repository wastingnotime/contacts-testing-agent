# contacts-testing-agent

## getting started

### execute a sut for test

```bash
docker run -p 8010:8010 wastingnotime/contacts-backend-go-echo:0.1.0-alpha
```

### using image

```bash
docker run  \
--network=host \
-e SERVICES_TO_TEST=http://localhost:8010 \
wastingnotime/contacts-testing-agent:0.1.0-alpha
```

### using source

dependencies
* nvm or use node 21+

preparation
```bash
nvm use

npm i
```

execution
```bash
SERVICES_TO_TEST=http://localhost:8010 npm test
```