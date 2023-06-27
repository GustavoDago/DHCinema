import { useState } from "react"

const Accordion = ({title, content, active}) => {
    const [isActive,setIsActive] = useState(active)

    return (
        <div className="accordion-item">
          <div className="accordion-title" onClick={() => {
            setIsActive(!isActive)
            }}>
            <div>{title}</div>
            <div>{isActive ? <img src="/icons/close-accordion.svg"/> : <img src="/icons/open-accordion.svg"/>}</div>
          </div>
          {isActive && <div className="accordion-content">{content}</div>}
        </div>
      );
}

export default Accordion;