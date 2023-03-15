import { Formik, Form, Field, ErrorMessage } from "formik";
import { api } from "../utils/api";
import { createCarInput } from "../types";
import Head from "next/head";

function AddCar() {
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
        <Formik
          initialValues={{
            make: "",
            model: "",
            engine: "Diesel",
            year: 1990,
            numberOfDoors: 2,
            engineCapacity: 1.0,
            bodyType: "Sedan",
            photos: "car1",
          }}
          validate={(values) => {
            try {
              const result = createCarInput.parse(values);
              console.log(result);
            } catch (error: any) {
              return error.formErrors.fieldErrors;
            }
          }}
          onSubmit={(values) => {
            mutate(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="w-1/2 flex flex-col justify-between">
              <label className="flex flex-col m-2" htmlFor="make">
                Make:
                <Field
                  className={`input input-bordered input-primary w-full max-w-xs ${
                    errors.make && touched.make ? "input-error" : ""
                  }`}
                  type="text"
                  name="make"
                  id="make"
                  placeholder="Make"
                />
                <ErrorMessage
                  name="make"
                  component="div"
                  className="text-red-600"
                />
              </label>
              <label className="flex flex-col m-2" htmlFor="model">
                Model:
                <Field
                  className={`input input-bordered input-primary w-full max-w-xs ${
                    errors.model && touched.model ? "input-error" : ""
                  }`}
                  type="text"
                  name="model"
                  id="model"
                  placeholder="Model"
                />
                <ErrorMessage
                  name="model"
                  component="div"
                  className="text-red-600"
                />
              </label>
              <label className="flex flex-col m-2" htmlFor="engine">
                Engine:
                <Field
                  className={`input input-bordered input-primary w-full max-w-xs ${
                    errors.engine && touched.engine ? "input-error" : ""
                  }`}
                  as="select"
                  name="engine"
                  id="engine"
                >
                  <option value="Diesel">Diesel</option>
                  <option value="Petrol">Petrol</option>
                </Field>
                <ErrorMessage
                  name="engine"
                  component="div"
                  className="text-red-600"
                />
              </label>
              <label className="flex flex-col m-2" htmlFor="year">
                Year:
                <Field
                  className={`input input-bordered input-primary w-full max-w-xs ${
                    errors.year && touched.year ? "input-error" : ""
                  }`}
                  type="number"
                  name="year"
                  id="year"
                  placeholder="Year"
                />
                <ErrorMessage
                  name="year"
                  component="div"
                  className="text-red-600"
                />
              </label>
              <label className="flex flex-col m-2" htmlFor="numberOfDoors">
                Number of doors:
                <Field
                  className={`input input-bordered input-primary w-full max-w-xs ${
                    errors.numberOfDoors && touched.numberOfDoors
                      ? "input-error"
                      : ""
                  }`}
                  type="number"
                  name="numberOfDoors"
                  id="numberOfDoors"
                  placeholder="Number of doors"
                />{" "}
                <ErrorMessage
                  name="numberOfDoors"
                  component="div"
                  className="text-red-600"
                />{" "}
              </label>{" "}
              <label className="flex flex-col m-2" htmlFor="engineCapacity">
                {" "}
                Engine capacity:{" "}
                <Field
                  className={`input input-bordered input-primary w-full max-w-xs ${
                    errors.engineCapacity && touched.engineCapacity
                      ? "input-error"
                      : ""
                  }`}
                  type="number"
                  name="engineCapacity"
                  id="engineCapacity"
                  placeholder="Engine capacity"
                />{" "}
                <ErrorMessage
                  name="engineCapacity"
                  component="div"
                  className="text-red-600"
                />{" "}
              </label>{" "}
              <label className="flex flex-col m-2" htmlFor="bodyType">
                {" "}
                Body type:{" "}
                <Field
                  className={`input input-bordered input-primary w-full max-w-xs ${
                    errors.bodyType && touched.bodyType ? "input-error" : ""
                  }`}
                  as="select"
                  name="bodyType"
                  id="bodyType"
                >
                  <option value="Sedan">Sedan</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="SUV">SUV</option>
                </Field>
                <ErrorMessage
                  name="bodyType"
                  component="div"
                  className="text-red-600"
                />
              </label>
              <label className="flex flex-col m-2" htmlFor="photos">
                {" "}
                Photos:{" "}
                <Field
                  className={`input input-bordered input-primary w-full max-w-xs ${
                    errors.photos && touched.photos ? "input-error" : ""
                  }`}
                  name="photos"
                  id="photos"
                ></Field>
                <ErrorMessage
                  name="photos"
                  component="div"
                  className="text-red-600"
                />
              </label>
              <button className="btn btn-primary m-2" type="submit">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default AddCar;
