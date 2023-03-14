import { api } from "../utils/api";
import { createCarInput } from "../types";
import type { Car } from "../types";
import Head from "next/head";
import { useState } from "react";

function AddCar() {
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [engine, setEngine] = useState<string>("Hybrid");
  const [year, setYear] = useState<number>(0);
  const [numberOfDoors, setNumberOfDoors] = useState<number>(0);
  const [engineCapacity, setEngineCapacity] = useState<number>(0);
  const [bodyType, setBodyType] = useState<string>("Hatchback");

  const trpc = api.useContext();

  const { mutate } = api.car.addCar.useMutation({
    onMutate: async () => {
      await trpc.car.getAllCars.cancel();
    },
  });

  return (
    <>
      <Head>
        <title>Car Lease Page</title>
        <meta name="description" content="Car Lease Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const result = createCarInput.safeParse({
              make,
              model,
              engine,
              year,
              numberOfDoors,
              engineCapacity,
              bodyType,
            });

            if (!result.success) {
              console.log(result.error.errors);
              return;
            }

            mutate({
              make,
              model,
              engine,
              year,
              numberOfDoors,
              engineCapacity,
              bodyType,
            });
          }}
          className="w-1/2 flex flex-col  justify-between"
        >
          <label className="flex flex-col m-2">
            Make:
            <input
              className="input input-bordered input-primary w-full max-w-xs"
              placeholder="Make"
              type="text"
              name="make"
              id="make"
              value={make}
              onChange={(e) => setMake(e.target.value)}
            />
          </label>
          <label className="flex flex-col m-2">
            {" "}
            Model:
            <input
              className="input input-bordered input-primary w-full max-w-xs"
              placeholder="New Car..."
              type="text"
              name="model"
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </label>
          <label className="flex flex-col m-2">
            Engine:
            <select
              className="select select-primary w-full max-w-xs"
              placeholder="New Car..."
              name="engine"
              id="engine"
              value={engine}
              onChange={(e) => setEngine(e.target.value)}
            >
              {" "}
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </label>
          <label className="flex flex-col m-2">
            Production year:
            <input
              className="input input-bordered input-primary w-full max-w-xs"
              placeholder="Production Year"
              type="number"
              name="year"
              id="year"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            />
          </label>
          <label className="flex flex-col m-2">
            {" "}
            Door Number:
            <select
              className="input input-bordered input-primary w-full max-w-xs"
              placeholder="Door Number"
              name="numberOfDoors"
              id="numberOfDoors"
              value={numberOfDoors}
              onChange={(e) => setNumberOfDoors(Number(e.target.value))}
            >
              {" "}
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </label>
          <label className="flex flex-col m-2">
            Engine capacity:
            <input
              className="input input-bordered input-primary w-full max-w-xs"
              placeholder="Capacity"
              type="text"
              name="engineCapacity"
              id="engineCapacity"
              value={engineCapacity}
              onChange={(e) => setEngineCapacity(Number(e.target.value))}
            />
          </label>
          <label className="flex flex-col m-2">
            {" "}
            Body type:
            <select
              className="input input-bordered input-primary w-full max-w-xs"
              name="bodyType"
              id="bodyType"
              value={bodyType}
              onChange={(e) => setBodyType(e.target.value)}
            >
              {" "}
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="SUV">SUV</option>
              <option value="Coupe">Coupe</option>
            </select>
          </label>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
}

export default AddCar;
