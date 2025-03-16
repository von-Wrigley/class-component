import { useRef, useState } from 'react';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from './hooks';
import { addForm } from './FormSlice';
import { useNavigate } from 'react-router';

const scema = z
  .object({
    name: z.string().refine((value) => /^[A-Z]/.test(value), {
      message: 'Should start with Capital Letter',
      path: ['name'],
    }),
    age: z.number().positive(),
    email: z.string().email(),
    password: z
      .string()
      .refine(
        (value) =>
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* )/.test(value),
        'Password should contain: 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character'
      ),
    confirmpassword: z.string(),
    terms: z.boolean(),
    gender: z.string(),
    img: z
      .custom<FileList>()
      .transform((file) => file[0] as File)
      .refine((file) => ['image/png', 'image/jpeg'].includes(file.type), {
        message: 'Invalid image file type',
      })
      .refine((file) => file.size <= 5000000, {
        message: 'File size should not exceed 5MB',
      }),
    picture: z
      .custom<FileList>()
      .transform((file) => file[0] as File)
      .refine((file) => ['image/png', 'image/jpeg'].includes(file.type), {
        message: 'Invalid image file type',
      })
      .refine((file) => file.size <= 5000000, {
        message: 'File size should not exceed 5MB',
      }),
    country: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: 'Passwords should match',
    path: ['confirmpassword'],
  });

export type Check = z.infer<typeof scema>;

function UncontrolledForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmpasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement | null>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement | null>(null);
  let imgRef = useRef<string | null>(null);
  const countriesRef = useRef<HTMLInputElement | null>(null);

  const [emailError, setEmailError] = useState<string | undefined>();
  const checkEmail = z.string().email({ message: 'Print valid email' });

  const [nameError, setNameError] = useState<string | undefined>();
  const checkName = z.string().refine((value) => /^[A-Z]/.test(value), {
    message: 'Should start with Capital Letter',
    path: ['name'],
  });

  const [ageError, setAgeError] = useState<string | undefined>();
  const checkAge = z.number().positive({ message: 'Shoul be positive age' });

  const [passwordError, setPasswordError] = useState<string | undefined>();
  const checkPassword = z
    .string()
    .refine(
      (value) =>
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* )/.test(value),
      'Password should contain: 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character'
    );

  const [confirmpasswordError, setConfirmPasswordError] = useState<
    string | undefined
  >();

  const countries = useAppSelector(
    (state) => state.uncontolledFormation.countries
  );
  const imageCheck = z
    .custom<FileList>()
    .refine((fileList) => fileList.length === 0, 'Expected file')
    .transform((file) => file[0] as File)
    .refine((file) => ['image/png', 'image/jpeg'].includes(file.type), {
      message: 'Invalid image file type',
    })
    .refine((file) => file.size <= 5000000, {
      message: 'File size should not exceed 5MB',
    });
  type ImageScema = z.infer<typeof imageCheck>;
  const [imageError, setImageError] = useState<string | undefined>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDa = {
      name: nameRef.current?.value,
      age: parseInt(ageRef.current?.value as string),
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmpassword: confirmpasswordRef.current?.value,
      picture: pictureRef.current?.value,
      gender: genderRef.current?.value,
      terms: termsRef.current?.checked,
      country: countriesRef.current?.value,
      img: imgRef,
    };
    const parseName = checkName.safeParse(nameRef.current?.value);
    setNameError(parseName.error?.errors[0].message);

    const parseEmail = checkEmail.safeParse(emailRef.current?.value);
    setEmailError(parseEmail.error?.errors[0].message);

    const parseAge = checkAge.safeParse(
      parseInt(ageRef.current?.value as string)
    );
    setAgeError(parseAge.error?.errors[0].message);

    const parsePassword = checkPassword.safeParse(passwordRef.current?.value);
    setPasswordError(parsePassword.error?.errors[0].message);

    if (passwordRef.current?.value !== confirmpasswordRef.current?.value) {
      setConfirmPasswordError('Passwords dont match');
    }

    const parseImage = imageCheck.safeParse(
      pictureRef?.current?.files?.[0] as ImageScema
    );
    setImageError(parseImage.error?.errors[1]?.message);

    handleChange(pictureRef.current?.files?.[0] as ImageScema);
    dispatch(addForm(formDa));
    navigate('/');
  };
  const convertBase64 = (x: ImageScema | null) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(x as Blob);

      fileReader.onloadend = () => {
        resolve(
          (fileReader.result as string).replace('data:', '').replace(/^.+,/, '')
        );
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleChange = async (x: ImageScema | null) => {
    const base64 = await convertBase64(x);
    imgRef = base64;
    console.log(imgRef);
    return base64;
  };

  return (
    <div className="flex flex-col gap-14 border-2 bg-amber-50 text-black p-4 ">
      <h1>UncontrolledForm</h1>
      <div>
        <form
          onSubmit={handleSubmit}
          className="grid justify-items-start gap-10 border p-5"
        >
          <label className="flex flex-row gap-7 ">
            <h4>Name:</h4>
            <div>
              <input
                required
                type="text"
                name="name"
                ref={nameRef}
                className="border rounded-lg w-md"
              />
              {nameError && <p className="text-red-600">{nameError}</p>}
            </div>
          </label>

          <label>
            Age:
            <input type="number" name="age" ref={ageRef} required />
            {ageError && <p className="text-red-600">{ageError}</p>}
          </label>
          <label>
            Email:
            <input required type="text" name="email" ref={emailRef} />
          </label>
          {emailError && <p className="text-red-600">{emailError}</p>}

          <label>
            Password:
            <input
              type="password"
              name="password"
              ref={passwordRef}
              autoComplete="off"
              required
            />
            {passwordError && <p className="text-red-600">{passwordError}</p>}
            Password again:
            <input
              type="password"
              name="password"
              ref={confirmpasswordRef}
              autoComplete="on"
              required
            />
          </label>
          {confirmpasswordError && (
            <p className="text-red-600">{confirmpasswordError}</p>
          )}

          <label>Gender Selection</label>
          <select
            ref={genderRef}
            name="gender"
            required
            onChange={() => {
              genderRef.current?.focus();
            }}
          >
            <option value="female">female</option>
            <option value="male">male</option>
          </select>

          <div>
            <input type="checkbox" id="Terms" name="Terms" ref={termsRef} />
            <label htmlFor="Terms"> Terms and Conditions agreement </label>
          </div>

          <div className="flex flex-col">
            <label htmlFor="picture"> Choose picture </label>
            <input
              type="file"
              id="picture"
              name="picture"
              accept="image/png, image/jpeg, image/jpg"
              ref={pictureRef}
            />
            {imageError && <p className="text-red-600">{imageError}</p>}
          </div>

          <label htmlFor="countryId"> Country</label>
          <input
            ref={countriesRef}
            id="countryId"
            className="border"
            type="text"
            autoComplete="off"
            list="datalistCountries"
            size={50}
            required
          />

          <datalist id="datalistCountries">
            {countries.map((x: string, index: number) => (
              <option value={x} key={index}>
                {x}
              </option>
            ))}
          </datalist>

          <button type="submit" className="border p-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UncontrolledForm;
