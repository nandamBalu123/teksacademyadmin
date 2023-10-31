import React , {useState} from 'react'
import favicon from "../../../images/favicon.jpeg";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import "./Sidebar1.css";

const Sidebar1 = () => {
// const [isActive , setIsActive]= useState(false);
// const toggleSection =()=>{ 
//     setIsActive(!isActive);
// };
// const navigationLinks =[
//     { 
//         href: "example.com",
//         iconClass:'fa-regular fa-building',
//         text:"Home",
//         isActive:true,
//     },
//     { 
//         href: "example.com",
//         iconClass:'fa-regular fa-user',
//         text:"People",
//         count:10,

//     },
// ]
  return (
    <div>
        {/* <section className={isActive ? 'active' : ""}>
            <div className='button' onClick={toggleSection}>
                <i className='fa-solid fa-bars'/>  
                </div>
                <div className='sidebar'>
                    <div className='profile'>
                        <div className='pro-img'> 
                        <img src={favicon} alt='profile-pic'/> </div>
                        <div className='pro-info'>
                            <h3> Bhavitha</h3> </div>
                         </div>
                         
                         <ul> 
                            {navigationLinks.map((link,index)=>{ 
                                <li key={index}> 
                                <a href={link.href} className={link.isActive ? 'active' : ""}> 
                                <span className='icon'> 
                                <i className='{link.iconClass}'/></span>
                                <span className='item'>{link.text}</span>
                                {link.count && <span className='count'> {link.count} </span>}
                                </a>
                                </li>
                            })}
                         </ul>
                          </div>
             </section> */}
  {/* <nav className='sidebar'> 
      <div className='sidebar-top-wrapper'> 
      <div className='sidebar-top'>  
      <a href="#" className="logo__wrapper">
        
          <img src={favicon} alt="Logo" className="logo-small"/>
          <span >
            Teks Academy
          </span>
        </a>
      </div><hr/>
      <div className='expand-btn'> 
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.00979 2.72L10.3565 7.06667C10.8698 7.58 10.8698 8.42 10.3565 8.93333L6.00979 13.28"
            stroke="#4A516D" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
       </div>
      <div className='sidebar-links'>
        <h2><HomeOutlinedIcon /> &nbsp;Dashboard</h2>
        <ul> 
            <li> 
                <a href='/' title='Home' className='tooltip'> 
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-home" width="24" height="24"
              viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
              stroke-linejoin="round"> 
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
              <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
              <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
              </svg>
              <span className='link hide'> Home</span>
          <span className='tooltip_content'>Home</span>
                 </a>
            </li>
           <li> 
           <a href='#orders' title='Orders' className='tooltip'> 
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-box" width="24" height="24"
              viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
              stroke-linejoin="round"></svg>
                <span className="link hide">Orders</span>
            <span className="tooltip__content">Orders</span>
            </a>
           </li>
           <li> 
           <a href="#documentation" title="Documentation" className="tooltip">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2"></path>
            </svg>
            <span className="link hide">Documentation</span>
            <span className="tooltip__content">Documentation</span>
          </a>
           </li>
        </ul>
         </div>
       </nav> */}
    </div>
   
  )
}

export default Sidebar1

