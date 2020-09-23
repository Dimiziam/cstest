# Credit Suisse - Additional Task for AngularJS

## source

- Placed at Github
https://github.com/Dimiziam/cstest.git

### Data source

- Originally provided data.json seems corrupted. 
Object 'Requests' has two types 'Status' values : "New" and "Draft".
But 2 of 6 items have " New" instead of "New".
Unknown if it corruption or it supposed to be so.
Anyway:
  - that two items fields values are replaced with "New" to provide better sorting process
  - original data package placed at /app/data/data0.json

## Workings of the Application

- The application filesystem layout structure is based on the [angular-seed][angular-seed] project.

### Running the Application
Comand Line
- git clone https://github.com/Dimiziam/cstest.git
- cd cstest
- Run `npm start`.
- Navigate your browser to [http://localhost:8000/](http://localhost:8000/) to see the application
  running.

