import { NavLink } from 'react-router';
import './App.css';
import { useAppSelector } from './hooks';
import { Check } from './UncontrolledForm';
import { IFormInput } from './ControlledForm';

function App() {
  const selected = useAppSelector((state) => state.uncontolledFormation.form);

  const selectedHookForm = useAppSelector(
    (state) => state.controlledFormation.form
  );

  return (
    <>
      <h1>Forms</h1>
      <div className="my-3 py-2 ">
        <NavLink className="mr-5" to="/uncontrolform">
          uncontrolform
        </NavLink>

        <NavLink to="/controlform">controlform</NavLink>
      </div>

      <div className="grid gap-10 justify-items-start p-8">
        <div className="bg-pink-100 flex flex-row gap-4 text-black p-3">
          <h3>Uncontrolled Form</h3>
          {selected.map((x: Check, index: number) => (
            <div
              key={index}
              className="grid  gap-3  border-2 hover:shadow-2xl p-5 justify-items-start last:bg-amber-300 "
            >
              <p>Name: {x.name}</p>
              <p>Age: {x.age}</p>
              <p>Email: {x.email}</p>
              <p>Password: {x.password}</p>
              {x.terms === true ? (
                <p>You accepted terms</p>
              ) : (
                <p>You didnt accep terms</p>
              )}
              <p>Gender: {x.gender}</p>
              <p>Country: {x.country}</p>
              <img
                width={100}
                height={100}
                alt="Logo"
                src={`data:image/png;base64,${x.img}`}
              />
            </div>
          ))}
        </div>

        <div className="bg-pink-100 flex flex-row gap-4 text-black p-3">
          <h3>React Hook Form</h3>
          {selectedHookForm.map((x: IFormInput, index: number) => (
            <div
              key={index}
              className="grid  gap-3  border-2 hover:shadow-2xl p-5 justify-items-start last:bg-amber-300 "
            >
              <p>Name: {x.name}</p>
              <p>Age: {x.age}</p>
              <p>Email: {x.email}</p>
              <p>Password: {x.password}</p>
              {x.terms === true ? (
                <p>You accepted terms</p>
              ) : (
                <p>You didnt accep terms</p>
              )}
              <p>Gender: {x.gender}</p>
              <p>Country: {x.country}</p>
              <img
                width={300}
                height={300}
                alt="Logo"
                src={`data:image/png;base64,${x.image64}`}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
