import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import HeroCarousel from '../components/Hero'
import AboutUs from '../components/About'
import Card from '../components/Card'
import ServicesSection from "../components/ServicesSection"
import Whychooseus from '../components/Why'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ScrollButton from '../components/ScrollButton'

const Home = () => {
    const location = useLocation()

    useEffect(() => {
        if (location.state?.scrollToId) {
            const element = document.getElementById(location.state.scrollToId)
            if (element) {
                element.scrollIntoView({ behavior: "smooth" })
            }
        }
    }, [location])

    return (
        <div>
            <Navbar />

            <section id="home">
                <HeroCarousel />
            </section>

            <Card />

            <section id="about">
                <AboutUs />
            </section>

            <section id="services">
                <ServicesSection />
            </section>

            <section id="whychooseus">
                <Whychooseus />
            </section>

            <section id="contact">
                <Contact />
            </section>
            <ScrollButton />
        </div>
    )
}

export default Home
