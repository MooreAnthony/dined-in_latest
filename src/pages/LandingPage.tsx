import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Calendar, Users, TrendingUp, Wand2, Star } from 'lucide-react';
import { Button } from '../components/common/Button';
import { LogoBanner } from '../components/common/LogoBanner';
import { Accordion, AccordionItem } from '../components/common/Accordion';

export const LandingPage: React.FC = () => {
  return (
    <div className="container mx-auto space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-10 pt-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1a237e] via-purple-600 to-pink-500 animate-gradient bg-300%">
            Modern Restaurant Booking Made Simple
          </h1>
          <p className="text-xl text-gray-600">
            Streamline your restaurant's booking process and delight your customers with our intuitive reservation system.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/signup"><Button size="lg">Get Started Free</Button></Link>
            <Link to="/contact"><Button variant="outline" size="lg">Contact Sales</Button></Link>
          </div>
        </div>

        <div className="mt-16">
          <p className="text-sm text-gray-500 mb-6">Trusted by leading restaurants worldwide</p>
          <LogoBanner />
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="bg-gray-50 py-16 rounded-xl shadow-inner text-center space-y-10">
        <h2 className="text-3xl font-bold">Try It Yourself</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Experience the booking journey your customers will love — right here, in seconds.
        </p>
        <div className="max-w-xl mx-auto">
          {/* Replace with actual interactive component later */}
          <div className="rounded-lg border border-gray-300 p-6 text-left space-y-4 bg-white">
            <p className="text-gray-500">🔧 Demo Booking Widget Placeholder</p>
            <p className="text-sm text-gray-400">Simulate a reservation flow here.</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Powerful Features to Elevate Your Business</h2>
          <p className="mt-4 text-gray-600">Tools that save time and boost efficiency for you and your guests.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Calendar className="w-6 h-6 text-[#1a237e]" />,
              title: "Smart Scheduling",
              desc: "Optimize seating, manage shifts, and prevent double bookings with ease.",
            },
            {
              icon: <Users className="w-6 h-6 text-[#1a237e]" />,
              title: "Guest Profiles",
              desc: "Store guest preferences, birthdays, and visit history for personalized service.",
            },
            {
              icon: <TrendingUp className="w-6 h-6 text-[#1a237e]" />,
              title: "Insights & Reports",
              desc: "Track peak times, no-show rates, and revenue trends from bookings.",
            },
            {
              icon: <Wand2 className="w-6 h-6 text-[#1a237e]" />,
              title: "Custom Widgets",
              desc: "Embed our booking widget into your site with your brand and style.",
            },
            {
              icon: <UtensilsCrossed className="w-6 h-6 text-[#1a237e]" />,
              title: "Table Management",
              desc: "Combine tables, set turn times, and visualize floor layout.",
            },
            {
              icon: <Star className="w-6 h-6 text-[#1a237e]" />,
              title: "Reservation Alerts",
              desc: "Get SMS or email alerts for VIP guests, late arrivals, and cancellations.",
            },
          ].map((feature, idx) => (
            <div key={idx} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 bg-[#1a237e]/10 rounded-lg flex items-center justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20 text-center">
        <h2 className="text-3xl font-bold mb-12">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Maria, The Olive Table",
              quote: "Since switching to Dined In, our no-shows have dropped and we’ve boosted repeat bookings by 30%.",
            },
            {
              name: "Jake, Fire & Smoke BBQ",
              quote: "The table management feature is a game changer. Friday nights used to be chaos, now it’s smooth sailing.",
            },
            {
              name: "Anita, Sakura Sushi",
              quote: "I love how easy it is to customize the widget and track guest notes. It’s like magic.",
            },
          ].map((testimonial, idx) => (
            <div key={idx} className="p-6 bg-gray-50 rounded-lg shadow-md">
              <p className="text-gray-700 italic">“{testimonial.quote}”</p>
              <p className="mt-4 font-semibold text-[#1a237e]">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 space-y-10">
        <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
        <Accordion>
          <AccordionItem title="How long does it take to set up Dined In?">
            Most restaurants are live within 1–2 hours. We guide you every step of the way.
          </AccordionItem>
          <AccordionItem title="Can I integrate it with my existing POS system?">
            Yes! We support integrations with most major POS providers.
          </AccordionItem>
          <AccordionItem title="Is there a free trial available?">
            Absolutely. You can try Dined In free for 14 days — no credit card required.
          </AccordionItem>
        </Accordion>
      </section>

      {/* Final CTA */}
      <section className="bg-[#1a237e] rounded-2xl p-12 text-center mt-24">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center">
            <div className="p-3 bg-white/10 rounded-full">
              <UtensilsCrossed className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white">Let’s Get You Booked</h2>
          <p className="text-lg text-white/80">
            Join thousands of restaurants already using Dined In to boost bookings and simplify operations.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/signup"><Button variant="secondary" size="lg">Start Free Trial</Button></Link>
            <Link to="/pricing"><Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white/10">View Pricing</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
};
