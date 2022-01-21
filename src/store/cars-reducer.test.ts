import {
    addCar,
    CarsInitStateType,
    carsReducer,
    deleteCar,
    editCar,
    setCars,
    setCurrentCar,
    updateCarBrand, updateCarEngineType, updateCarModel, updateCarNumber
} from "./cars-reducer";

let startState:  CarsInitStateType;

beforeEach(() => {
    startState = {
        cars: [],
        currentCar: {
            brand: '',
            carNumber: '',
            engineType: '',
            id: 0,
            mileage: 0,
            model: '',
            new: true,
            price: 0,
            transmission: '',
            userId: 0,
            yearOfConstruction: 0
        },
        isFetching: false
    };
});

test('cars must be set to state', () => {
    const action = setCars([{
        "brand": "bmw",
        "carNumber": "qweqweqweqe",
        "engineType": "FUEL",
        "mileage": 0,
        "model": "wadadasdas",
        "new": true,
        "price": 0,
        "transmission": "MANUAL",
        "yearOfConstruction": 0
    }]);
    const endState = carsReducer(startState, action);
    expect(endState.cars.length).toBe(1);
})

test('car must be added to cars array', () => {
    const action = addCar({
        "brand": "nissan",
        "carNumber": "qweqweqweqe",
        "engineType": "GAS",
        "mileage": 0,
        "model": "wadadasdas",
        "new": true,
        "price": 0,
        "transmission": "MANUAL",
        "yearOfConstruction": 0
    });
    const endState = carsReducer(startState, action);
    expect(endState.cars.length).toBe(1);
    expect(endState.cars[0].brand).toBe('nissan');
    expect(endState.cars[0].engineType).toBe('GAS');
})

test('car must be deleted from cars array', () => {
    let startState = {
        cars: [{
            "brand": "nissan",
            "carNumber": "qweqweqweqe",
            "engineType": "GAS",
            "mileage": 0,
            "model": "wadadasdas",
            "new": true,
            "price": 0,
            "transmission": "MANUAL",
            "yearOfConstruction": 0,
            id: 1
        }],
        currentCar: {
            brand: '',
            carNumber: '',
            engineType: '',
            id: 0,
            mileage: 0,
            model: '',
            new: true,
            price: 0,
            transmission: '',
            userId: 0,
            yearOfConstruction: 0
        },
        isFetching: false
    };
    const action = deleteCar(1)
    const endState = carsReducer(startState, action);
    expect(endState.cars.length).toBe(0);
})


test('car must be edited', () => {
    let startState = {
        cars: [{
            "brand": "nissan",
            "carNumber": "qweqweqweqe",
            "engineType": "GAS",
            "mileage": 0,
            "model": "wadadasdas",
            "new": true,
            "price": 0,
            "transmission": "MANUAL",
            "yearOfConstruction": 0,
            id: 1
        }],
        currentCar: {
            brand: '',
            carNumber: '',
            engineType: '',
            id: 0,
            mileage: 0,
            model: '',
            new: true,
            price: 0,
            transmission: '',
            userId: 0,
            yearOfConstruction: 0
        },
        isFetching: false
    };
    const action = editCar({
        brand: 'bmw',
        "carNumber": "qweqweqweqe",
        "engineType": "HYBRID",
        "mileage": 0,
        "model": "wadadasdas",
        "new": true,
        "price": 0,
        "transmission": "MANUAL",
        "yearOfConstruction": 0,
        id: 1
    });
    const endState = carsReducer(startState, action);
    expect(endState.cars[0].brand).toBe('bmw');
    expect(endState.cars[0].engineType).toBe('HYBRID');
})


test('new current car must be set', () => {
    const action = setCurrentCar({
        "brand": "nissan",
        "carNumber": "qweqweqweqe",
        "engineType": "GAS",
        "mileage": 0,
        "model": "wadadasdas",
        "new": true,
        "price": 0,
        "transmission": "MANUAL",
        "yearOfConstruction": 0
    });
    const endState = carsReducer(startState, action);
    expect(endState.currentCar.brand).toBe('nissan');
    expect(endState.currentCar.engineType).toBe('GAS');
})

test('current car brand must be updated', () => {
    const action = updateCarBrand('audi');
    const endState = carsReducer(startState, action);
    expect(endState.currentCar.brand).toBe('audi');
})

test('current car model must be updated', () => {
    const action = updateCarModel('m3');
    const endState = carsReducer(startState, action);
    expect(endState.currentCar.model).toBe('m3');
})

test('current car number must be updated', () => {
    const action = updateCarNumber('AAA123AAA');
    const endState = carsReducer(startState, action);
    expect(endState.currentCar.carNumber).toBe('AAA123AAA');
})

test('current car engine must be updated', () => {
    const action = updateCarEngineType('GAS');
    const endState = carsReducer(startState, action);
    expect(endState.currentCar.engineType).toBe('GAS');
})