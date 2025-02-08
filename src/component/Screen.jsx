import jewerry1 from '../assets/jew.jpeg'
import jewerry2 from '../assets/jewelry.jpeg'
import jewerry3 from '../assets/jeweley.jpeg'
import jewerry4 from '../assets/pak.jpeg'
import { Carousel } from "flowbite-react";



function Screen() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel slideInterval={3000}>
        <img className='object-contain' src={jewerry1} alt="..." />
        <img className='object-contain' src={jewerry2} alt="..." />
        <img className='object-contain' src={jewerry3} alt="..." />
        <img className='object-contain' src={jewerry4} alt="..." />
        {/* <img className='object-cover' src={} alt="..." /> */}
      </Carousel>
    </div>
  );
}


export default Screen;
