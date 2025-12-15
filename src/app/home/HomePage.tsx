"use client";
import { Intro } from './Intro'
import { Places } from './Places'
import { Header } from '@/components/header'
import { SpecialForGuests } from './SpecialForGuests'
import { EventSpace } from './EventSpace'
import { PlacesMap } from './PlacesMap'
import { Footer } from '@/components/footer';
import { FoodGallery } from './FoodGallery';


type Props = {}

export default function HomePage({ }: Props) {

  return (
    <section>
      <Header />
      <section className='mt-[27px] md:mt-[64px] font-jost'>
        <Intro />
        <Places />
        <FoodGallery />
        <SpecialForGuests />
        <EventSpace />
        <PlacesMap />
      </section>
      <Footer />
    </section>
  )
}
