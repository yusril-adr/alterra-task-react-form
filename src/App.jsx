import { useState, useRef } from 'react';
import Swal from 'sweetalert2';

const App = () => {
  const classNames = [
    'Coding Backend with Golang',
    'Coding Frontend with ReactJS',
    'Fullstack Developer',
  ];

  const baseData = {
    nama: '',
    email: '',
    noHandphone: '',
    pendidikan: '',
    kelas: '',
    harapan: '',
    photoFile: '',
  };

  const baseError = {
    nama: '',
    email: '',
    noHandphone: '',
    pendidikan: '',
    kelas: '',
  };

  const validation = {
    nama: /^[a-zA-Z ]*$/,
    email:  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    noHandphone: /\+?([ -]?\d+)+|\(\d+\)([ -]\d+){9-14}/,
  };

  const [data, setData] = useState(baseData);
  const [errorMessage, setErrorMessage] = useState(baseError);
  const photoFile = useRef(null);

  const validateNama = () => {
    if (data.nama === '') {
      return setErrorMessage({
        ...errorMessage,
        nama: 'Nama tidak boleh kosong',
      });
    }

    if (!(validation.nama.test(data.nama))) {
      return setErrorMessage({
        ...errorMessage,
        nama: 'Nama hanya boleh mengandung huruf',
      });
    }

    return setErrorMessage({
        ...errorMessage,
        nama: '',
      }); 
  };

  const validateEmail = () => {
    if (data.email === '') {
      return setErrorMessage({
        ...errorMessage,
        email: 'Email tidak boleh kosong',
      });
    }

    if (!(validation.email.test(data.email))) {
      return setErrorMessage({
        ...errorMessage,
        email: 'Email tidak sesuai',
      });
    }

    return setErrorMessage({
        ...errorMessage,
        email: '',
      });
  };

  const validateNoHandphone = () => {
    if (data.noHandphone === '') {
      return setErrorMessage({
        ...errorMessage,
        noHandphone: 'Nomor Handphone tidak boleh kosong',
      });
    }

    if (!(validation.noHandphone.test(data.noHandphone))) {
      return setErrorMessage({
        ...errorMessage,
        noHandphone: 'Nomor Handphone tidak sesuai',
      });
    }

    if (!(data.noHandphone.length >= 9 && data.noHandphone.length <= 14)) {
      return setErrorMessage({
        ...errorMessage,
        noHandphone: 'Panjang Nomor Handphone hanya boleh memiliki batas karakter 9-14',
      });
    }

    return setErrorMessage({
      ...errorMessage,
      noHandphone: '',
    });
  };

  const resetInput = () => {
    setData(baseData);
    setErrorMessage(baseError);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let invalid = false;
    Object.keys(errorMessage).forEach((key) => {
      if (errorMessage[key] !== '') {
        invalid = true;
      }
    })

    if (invalid) {
      return Swal.fire(
        'Data gagal disimpan',
        'Isi data dengan benar ya !',
        'error',
      );
    }

    resetInput();
    Swal.fire(
      'Data berhasil disimpan',
      'Terima kasih telah mendaftar !',
      'success',
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="container flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-center">Pendaftaran Peserta Coding Bootcamp</h1>

        <form 
          className="mt-8 shadow flex flex-col w-full lg:w-3/4 p-4 rounded"
          onSubmit={handleSubmit}
          onReset={() => {
            // Agar errorMessage juga ikut ter-reset
            resetInput();
          }}
        >
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="mb-2">Nama Lengkap</label>
            <input 
              type="text" 
              id="name" 
              className="rounded" 
              required
              value={data.nama}
              onChange={(event) => {
                setData({
                  ...data,
                  nama: event.target.value,
                })
              }}
              onBlur={validateNama}
            />
            
            { errorMessage.nama !== '' && (
              <p className="bg-red-300 text-red-500 mt-2 p-3">
                {errorMessage.nama}
              </p>
            ) }
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="mb-2">Email</label>
            <input 
              type="email"
              id="email"
              className="rounded"
              required
              value={data.email}
              onChange={(event) => {
                setData({
                  ...data,
                  email: event.target.value,
                })
              }}
              onBlur={validateEmail}
            />

            { errorMessage.email !== '' && (
              <p className="bg-red-300 text-red-500 mt-2 p-3">
                {errorMessage.email}
              </p>
            ) }
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="phone_number" className="mb-2">No. Handphone</label>
            <input 
              type="tel"
              id="phone_number" 
              className="rounded"
              required
              value={data.noHandphone}
              onChange={(event) => {
                setData({
                  ...data,
                  noHandphone: event.target.value,
                })
              }}
              onBlur={validateNoHandphone}
            />
            { errorMessage.noHandphone !== '' && (
              <p className="bg-red-300 text-red-500 mt-2 p-3">
                {errorMessage.noHandphone}
              </p>
            ) }
          </div>

          <div className="flex flex-col mb-4">
            <p>Latar belakang Pendidikan</p>
            
            <div className="flex">
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="education_it" 
                  name="education" 
                  required
                  value="IT"
                  checked={data.pendidikan === "IT"}
                  onChange={(event) => {
                    setData({
                      ...data,
                      pendidikan: event.target.value,
                    })
                  }}
                />
                <label htmlFor="education_it" className="ml-2">IT</label>
              </div>

              <div className="flex items-center ml-4">
                <input 
                  type="radio"
                  id="education_non_it"
                  name="education"
                  value="Non IT"
                  checked={data.pendidikan === "Non IT"}
                  onChange={(event) => {
                    setData({
                      ...data,
                      pendidikan: event.target.value,
                    })
                  }}
                />
                <label htmlFor="education_non_it" className="ml-2">Non IT</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="class" className="mb-2">Kelas Coding yang Dipilih :</label>
            <select 
              id="class" 
              className="rounded" 
              required
              onChange={(event) => {
                setData({
                  ...data,
                  kelas: event.target.value,
                })
              }}
              defaultValue=""
              value={data.kelas}
            >
              <option value="" disabled>Pilih Salah Satu Program</option>
              { classNames.map((className) => (
                <option value={className} key={className}>{className}</option>
              )) }
            </select>
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="photo" className="mb-2">Foto Surat Kesungguhan</label>
            <input 
              type="file" 
              id="photo" 
              className="rounded" 
              accept="image/*" 
              ref={photoFile} 
              required
              onChange={(event) => {
                setData({
                  ...data,
                  photoFile: event.target.value,
                })
              }}
              value={data.photoFile}
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="hope" className="mb-2">Harapan Untuk Coding Bootcamp Ini</label>
            <textarea id="hope" cols="30" rows="10"></textarea>
          </div>

          <div className="flex justify-center items-center">
            <button type="submit" className="bg-blue-500 text-slate-50 rounded px-4 py-2">Submit</button>
            <button type="reset" className="bg-red-500 text-slate-50 rounded px-4 py-2 ml-8">Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
