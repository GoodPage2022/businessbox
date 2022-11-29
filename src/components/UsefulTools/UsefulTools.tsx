import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import UsefulToolsConstants from "../../constants/useful-tools";

const UsefulTools = () => {
  return (
    <section className="usefulTools">
      <div className="container usefulTools__container">
        <h1 className="title usefulTools__title">Some Useful tools</h1>
        <div>
          <Accordion>
            {UsefulToolsConstants.map((item) => {
              return (
                <AccordionItem key={item.id}>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <span className="section__primary-text">
                        {item.title}
                      </span>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p className="section__secondary-text">{item.desc}</p>
                  </AccordionItemPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default UsefulTools;
