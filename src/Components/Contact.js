import { useState } from 'react';
import Title from './Title';

function Contact() {
  const [guest, setGuests] = useState({
    name: '',
    phone: '',
    text: '',
    email: '',
  });

  const handleChange = (field, value) => {
    const updatedGuests = { ...guest };
    updatedGuests[field] = value;
    setGuests(updatedGuests);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('contact:', guest);
    alert('Danke für eure Rückmeldung! 🎉');
  };
  return (
    <section id="contact" className="scroll-mt-24">
      <div className="w-1/3 m-auto p-4">
        <Title title="Contact Us" />
        <form onSubmit={handleSubmit} className="">
          <div className="flex flex-col gap-4">
            <div className="gap-2 lg:gap-6">
              <div className="font-medium">Name*</div>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Your Full Name"
                value={guest.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>
            <div className="gap-2 lg:gap-6">
              <div className="font-medium">Your E-Mail*</div>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="z.B. dani@michel.com"
                value={guest.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>
            <div className="gap-2 lg:gap-6">
              <div className="font-medium">Your Phone Number</div>
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="z.B. +41..."
                value={guest.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </div>
            <div className="gap-2 lg:gap-6">
              <div className="font-medium">Your Text*</div>
              <textarea
                type="range"
                className="input input-bordered w-full"
                placeholder="What would you like to share with us"
                value={guest.text}
                onChange={(e) => handleChange('text', e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between items-center pt-4">
            <button type="submit" className="btn btn-primary">
              ✅ Abschicken
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;
