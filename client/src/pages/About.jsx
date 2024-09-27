


import React from 'react'
import Logo from '../components/Logo'

export default function About() {

  return (

    <div className="p-5 space-y-10">

        {/* about us */}
        <div className="max-w-3xl mx-auto space-y-5">

          <h3 className="text-xl md:text-3xl font-serif">
            About Us
          </h3>

          <p className="">
              Welcome to the COOPING, your go-to source for the latest news, insights, and stories from our vibrant campus community.
             We are dedicated to showcasing the diverse experiences, achievements, and perspectives of our students, faculty, and many other things.
          </p>

        </div>

        {/* what we offer */}
        <div className="max-w-3xl mx-auto space-y-5">

          <h2 className="capitalize text-xl md:text-3xl font-serif">
            What we offer
          </h2>

          <ul className="list-disc space-y-4 px-6">

            <li className=""><b>Campus News:</b> Stay updated on the latest happenings at campus. From major events and announcements to new programs and initiatives, we keep you informed about what’s going on in our community.</li> 

            <li className=""><b>Student Stories :</b> Hear directly from our students about their academic journeys, extracurricular activities, and personal growth. From study tips to campus life hacks, our student contributors share their unique experiences and advice.</li>

            <li className=""><b>Faculty Insights:</b> Gain valuable knowledge from our esteemed faculty members who are experts in their fields. Read about their latest research, innovative teaching methods, and contributions to their disciplines.</li>

            <li className=""><b>Opinion Pieces:</b> Engage with thought-provoking articles on current issues, written by members of our university community. These pieces offer diverse perspectives and encourage meaningful discussions.</li>

          </ul>

        </div>

        {/* join conversation */}
        <div className="max-w-3xl mx-auto space-y-5">

          <h2 className="text-xl md:text-3xl font-serif">Join the Conversation</h2>

          <p className="">
               We invite you to explore our blog, leave comments, and share your thoughts. Your feedback is invaluable to us as we strive to create a vibrant and inclusive online community.
             Thank you for visiting the COOPING. Together, let’s celebrate the spirit of learning, discovery, and innovation that defines our university.
          </p>

        </div>

    </div>

  )
  
}
