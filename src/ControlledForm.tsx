import { useForm, SubmitHandler } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from './hooks';
import { addConrtolForm } from './FormHookSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const IMAGE_SCHEMA = z
  .instanceof(FileList)
  .refine((file) => file.length > 0, {
    message: 'No files selected',
  })
  .transform((file) => file[0] as File)
  .refine((file) => ['image/png', 'image/jpeg'].includes(file.type), {
    message: 'Invalid image file type',
  })
  .refine((file) => file.size <= 5000000, {
    message: 'File size should not exceed 5MB',
  });

type imageType = z.infer<typeof IMAGE_SCHEMA>;

export interface IFormInput {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmpassword: string;
  terms: boolean;
  gender: string;
  picture?: imageType;
  country: string;
  image64?: imageType;
  img?: imageType;
}

export default function ControlledForm() {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(
    (state) => state.controlledFormation.countries
  );
  const navigate = useNavigate();
  const [image64, setImage64] = useState<imageType>();
  const [inputCountry, setInputCountry] = useState<string>('');

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { picture, ...restdata } = data;
    const newData = { ...restdata, image64 };
    dispatch(addConrtolForm(newData));
    navigate('/');
  };
  const scema: ZodType<IFormInput> = z
    .object({
      name: z.string().refine((value) => /^[A-Z]/.test(value), {
        message: 'Should start with Capital Letter',
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
      picture: IMAGE_SCHEMA,
      country: z.string(),
    })
    .refine((data) => data.password === data.confirmpassword, {
      message: 'Passwords should match',
      path: ['confirmpassword'],
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(scema), mode: 'onChange' });
  const convertBase64 = (x: imageType) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(x);

      fileReader.onloadend = () => {
        if (!fileReader.result) return;

        resolve(
          (fileReader.result as string).replace('data:', '').replace(/^.+,/, '')
        );
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setImage64(base64 as imageType);
  };

  const listofcountries = countries.filter((x: string) => {
    const selCountry = x.toLowerCase();
    return selCountry.includes(inputCountry.toLowerCase());
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-10 text-black bg-amber-50 p-6"
    >
      <label> Name</label>
      <input
        type="text"
        {...register('name')}
        className="border invalid:border-pink-600"
      />
      {errors.name && (
        <span className="text-red-600">{errors.name.message}</span>
      )}
      <label> Age</label>
      <input
        type="number"
        {...register('age', { valueAsNumber: true })}
        className="border"
      />
      {errors.age && <span className="text-red-600">{errors.age.message}</span>}
      <label> Email</label>
      <input type="email" {...register('email')} className="border" />
      {errors.email && (
        <span className="text-red-600">{errors.email.message}</span>
      )}
      <label> Password</label>
      <input
        type="password"
        {...register('password')}
        className="border"
        autoComplete="on"
      />
      {errors.password && (
        <span className="text-red-600">{errors.password.message}</span>
      )}
      <label>Confirm Password</label>
      <input
        type="password"
        {...register('confirmpassword')}
        className="border"
        autoComplete="on"
      />
      {errors.confirmpassword && (
        <span className="text-red-600">{errors.confirmpassword.message}</span>
      )}
      <label> T&C</label>
      <input type="checkbox" {...register('terms')} />
      <label>Gender Selection</label>
      <select {...register('gender')}>
        <option value="female">female</option>
        <option value="male">male</option>
      </select>

      <label> Picture</label>
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        {...register('picture')}
        onChange={(e) => handleChange(e)}
        className="border"
      />
      {errors.picture && (
        <span className="text-red-600">{errors.picture.message}</span>
      )}
      <label htmlFor="countryId"> Country</label>

      <input
        {...register('country')}
        id="countryId"
        className="border"
        type="text"
        autoComplete="off"
        onChange={(e) => setInputCountry(e.target.value)}
        list="datalistCountries"
        size={50}
      />
      <datalist
        id="datalistCountries"
        className=" max-h-16 overflow-x-hidden overflow-y-auto   "
      >
        {listofcountries.length === 0 ? (
          <option className="text-red-600">No matching countries</option>
        ) : (
          listofcountries.map((x: string, index: number) => (
            <option key={index}>{x}</option>
          ))
        )}
      </datalist>

      <input
        type="submit"
        className={`${isValid ? 'bg-green-500 cursor-pointer' : 'bg-red-600'}`}
        disabled={!isValid}
      />
    </form>
  );
}
