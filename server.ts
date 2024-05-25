import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import csvParser from 'csv-parser';

interface Car {
  model: string;
  mpg: string;
  cyl: string;
  disp: string;
  hp: string;
  drat: string;
  wt: string;
  qsec: string;
  vs: string;
  am: string;
  gear: string;
  carb: string;
}

let carsData: Car[] = [];

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/cars', (req: Request, res: Response) => {
  res.json(carsData);
});

app.post('/cars/search', (req: Request, res: Response) => {
  const { model, vs, hp } = req.body;
  let filteredCars: Car[] = carsData;

  if (model) {
    filteredCars = filteredCars.filter((car) => car.model.toLowerCase().includes(model.toLowerCase()));
  }

  if (vs !== undefined && vs !== '') {
    filteredCars = filteredCars.filter((car) => car.vs === vs);
  }

  if (hp !== undefined && hp !== '') {
    filteredCars = filteredCars.filter((car) => parseInt(car.hp) > parseInt(hp));
  }

  res.json(filteredCars);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Read and parse the CSV file
const fs = require('fs');

fs.createReadStream('cars.csv')
  .pipe(csvParser())
  .on('data', (row: Car) => {
    carsData.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });