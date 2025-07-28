import './../App.css';

const Footer = () => {
  return (
    <div className='footer'>
    <section className='fmain'>
      <div className='sec1'>
        <img className='flogo' src='\src\assets\logoo.png' alt='logo'/>
        <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
        <br/>
        <div className='faimg'>
          <img src='\src\assets\googleplay.png' alt='alogo'/>
          <img src='\src\assets\appstore.png' alt='alogo'/>
        </div>
      </div>

      <div className='sec2'>
        <h2>Company</h2>
        <br/>
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Privacy Policy</li>
        </ul>
      </div>

      <div className='sec3'>
          <h2>Get in touch</h2>
          <br/>
          <ul>
            <li>+1-234-567-890</li>
            <li>contact@example.com</li>
          </ul>
      </div>
    </section>
      <p className='crights'>Copyright 2025 © PickASeat. All Right Reserved.</p>
    </div>
    
  )
}

export default Footer
