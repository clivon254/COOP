

import React, { useState } from 'react'
import icon1 from "../assets/01.png"
import icon2 from "../assets/02.png"
import icon3 from "../assets/03.png"
import icon4 from "../assets/04.png"
import { Button, Textarea, TextInput } from 'flowbite-react'


export default function Contact() {
  
  const contactList = [
    {
      imageUrl:icon1,
      title:"Location Address",
      desc:"Ushirika road,Karen"
    },
    {
      imageUrl:icon2,
      title:"phone number",
      desc:"+254 111 202 895"
    },
    {
      imageUrl:icon3,
      title:"send email",
      desc:"cooping@gamil.com"
    },
    {
      imageUrl:icon4,
      title:"Our website",
      desc:"www.cooping.com"
    },
  ]

  const [formData, setFormData] = useState({})


  // handleChange
  const handleChange = () => {}


  // handleSubmit
  const handleSubmit = () => {}


  return (
    
    <div className="w-full p-5 space-y-20">

      {/* upper level */}
      <div className="space-y-10">

        {/* title */}
        <div className="space-y-5">

          <h2 className="text-center font-serif text-2xl md:3xl xl:4xl">Get in touch with us</h2>

          <h2 className="text-center font-serif text-4xl md:5xl xl:6xl">We are always eager to hear from you</h2>

        </div>

        <div className="w-full">

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 ">

              {/* Map */}
              <div className="col-span-2 w-full h-[400px] md:h-full border-2 border-blue-500 rounded-xl">

                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24306.04129006211!2d36.70835083476563!3d-1.3664598000000054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f051fc223e6c9%3A0x46afe71d2e294614!2sCooperative%20University%20of%20Kenya%2C%20Karen!5e1!3m2!1sen!2ske!4v1727415304114!5m2!1sen!2ske" 
                  className="w-full h-full rounded-xl"
                />

              </div>

              {/* icons */}
              <div className="space-y-3">
                {contactList.map((val,i) => (

                  <div key={i} className="flex gap-x-5 items-center p-2">

                    <img 
                      src={val.imageUrl}
                      alt="" 
                      className="" 
                    />

                    <div className="">

                      <h6 className="text-xl font-semibold">{val.title}</h6>

                      <p className="text-gray-700 dark:text-gray-300">{val.desc}</p>

                    </div>

                  </div>

                ))}
              </div>

          </div>

        </div>

      </div>
        
      {/* lower level */}
      <div className="px-5">

        {/* form */}
        <div className="space-y-10">

          <div className="space-y-5">

            <h2 className="text-center font-serif text-2xl md:3xl xl:4xl">Contact us</h2>

            <h2 className="text-center font-serif text-4xl md:5xl xl:6xl">Fill the form below so we can get to know your needs better</h2>

          </div>


          <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <TextInput
                type='text'
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />

              <TextInput
                type='email'
                name="email"
                placeholder="email"
                value={formData.name}
                onChange={handleChange}
              />

              <TextInput
                type='text'
                name="phone"
                placeholder="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <TextInput
                type='text'
                name="subject"
                placeholder="subject"
                value={formData.subject}
                onChange={handleChange}
              />


            </div>

            <Textarea
              placeholder='Your Message'
              name="message"
              value={formData.subject}
              onChange={handleChange}
            />

            <Button
              type="submit"
              gradientDuoTone="pinkToOrange"
              pill
              className='mx-auto w-1/2'
            >
              Submit
            </Button>

          </form>

        </div>

      </div>

    </div>

  )

}
