import React from "react"

import { ReactComponent as WorkIcon } from "../images/Work.png"
import { ReactComponent as SchoolIcon } from "../images/School.png"

import timelineElements from "./timelineElements"

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component"

import "react-vertical-timeline-component/style.min.css"

export default function timeline() {
  let workIconStyles = { background: "#06D6A0", Image: WorkIcon }
  let schoolIconStyles = { background: "#f9c74f", Image: SchoolIcon }
  
  return (
    <div>
      <VerticalTimeline layout={"1-column-left"}>
        {timelineElements.map((element) => {
          let isWorkIcon = element.icon === "work"
          let showButton =
            element.buttonText !== undefined &&
            element.buttonText !== null &&
            element.buttonText !== ""

          return (
            <VerticalTimelineElement
              key={element.key}
              date={element.date}
              dateClassName="date"
              iconStyle={isWorkIcon ? workIconStyles : schoolIconStyles} 
            >
              <h3 className="vertical-timeline-element-title">
                {element.title}
              </h3>
              <h5 className="vertical-timeline-element-subtitle">
                {element.location}
              </h5>
              <p id="description">{element.description}</p>
              {showButton && (
                <a
                  className={`button ${
                    isWorkIcon ? "workButton" : "schoolButton"
                  }`}
                  href="/"
                >
                  {element.buttonText}
                </a>
              )}
            </VerticalTimelineElement>
          )
        })}
      </VerticalTimeline>
    </div>
  )
}
