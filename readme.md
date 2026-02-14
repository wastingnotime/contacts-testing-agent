# contacts-testing-agent

## status

This repository belongs to the Contacts reference initiative started in 2020.

Its purpose was to understand how different stacks shape design decisions around the same domain model.

As of 2026, this project is frozen.

The exploration phase has been completed.  
My current focus is depth, invariants, and system coherence rather than stack comparison.

This code remains as historical reference.


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
