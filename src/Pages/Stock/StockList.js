import React, { useState, useEffect } from "react";
import Menu from "../../Component/Menu/Menu";
import { Container, Row, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointLeft } from "@fortawesome/free-solid-svg-icons";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import "./StockList.css";

const AdvanceSearch = (props) => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [activeFilter, setActiveFilter] = useState([]);
  const [categories, setCategories] = useState([]);
  const [color, setColor] = useState([]);
  const [clarity, setClarity] = useState([]);
  const [cut, setCut] = useState([]);
  const [polish, setPolish] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const headers = [
    { name: "CATEGORY", selector: "CATEGORY" },
    { name: "CA", selector: "CA" },
    { name: "CH", selector: "CH" },
    { name: "Clarity", selector: "CLR" },
    { name: "Color", selector: "COL" },
    { name: "COL-SHADE", selector: "COL-SHADE" },
    { name: "COMMENT", selector: "COMMENT" },
    { name: "Cut", selector: "CUT" },
    { name: "Culet", selector: "Culet" },
    { name: "DIA_MN", selector: "DIA_MN" },
    { name: "DIA_MX", selector: "DIA_MX" },
    { name: "DPL", selector: "DPL" },
    { name: "EFCM", selector: "EFCM" },
    { name: "FLOURESENCE", selector: "FLOURESENCE" },
    { name: "GIRDLE", selector: "GIRDLE" },
    { name: "HT", selector: "HT" },
    { name: "INS", selector: "INS" },
    { name: "KTSVIEW", selector: "KTSVIEW" },
    { name: "LN", selector: "LN" },
    { name: "LOC", selector: "LOC" },
    { name: "LW", selector: "LW" },
    { name: "MILKY", selector: "MILKY" },
    { name: "NATTS", selector: "NATTS" },
    { name: "Origin", selector: "Origin" },
    { name: "PA", selector: "PA" },
    { name: "PD", selector: "PD" },
    { name: "Polish", selector: "POL" },
    { name: "SHAPE", selector: "SHAPE" },
    { name: "STATUS", selector: "STATUS" },
    { name: "SYM", selector: "SYM" },
    { name: "TBL", selector: "TBL" },
    { name: "WD", selector: "WD" },
    { name: "eye_clean", selector: "eye_clean" },
    { name: "heart_and_arrow", selector: "heart_and_arrow" },
    { name: "measurement", selector: "measurement" },
    { name: "type2a_name", selector: "type2a_name" },
  ];

  const getList = async () => {
    setShowLoader(true);
    var res = await axios.get(
      "https://phpstack-426242-1347501.cloudwaysapps.com/StockList.php",
      {}
    );
    if (res) {
      setData(res.data);
      setFilterData(res.data);
    }
    setShowLoader(false);
  };

  useEffect(() => {
    getList();
  }, []);

  const getValues = () => {
    if (data.length > 0) {
      const latestData = [...data];
      const category = new Set(latestData.map((d) => d.CATEGORY));
      const color = new Set(latestData.map((d) => d.COL));
      const clarity = new Set(latestData.map((d) => d.CLR));
      const cut = new Set(latestData.map((d) => d.CUT));
      const polish = new Set(latestData.map((d) => d.POL));
      setCategories([...category]);
      setColor([...color]);
      setClarity([...clarity]);
      setCut([...cut]);
      setPolish([...polish]);
    }
  };

  useEffect(() => {
    getValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onFilterChange = (filter) => {
    if (filter === "") {
      return;
    }
    let updatedFilter = [];
    if (activeFilter.includes(filter)) {
      const filterIndex = activeFilter.indexOf(filter);
      updatedFilter = [...activeFilter];
      updatedFilter.splice(filterIndex, 1);
      setActiveFilter(updatedFilter);
    } else {
      updatedFilter = [...activeFilter, filter];
      setActiveFilter(updatedFilter);
    }

    let newData = [];
    if (updatedFilter.length > 0) {
      data.map((d) => {
        updatedFilter.forEach((flt) => {
          if (
            d.COL === flt ||
            d.CLR === flt ||
            d.CUT === flt ||
            d.POL === flt
          ) {
            newData.push(d);
          }
        });
      });
    } else {
      newData = [...data];
    }
    setFilterData(newData);
  };

  const advanceSearchForm = (
    <Accordion defaultActiveKey="0">
      <Card className="advanceSearchForm shadow rounded">
        <Card.Header>
          <Accordion.Toggle
            as={Button}
            variant="link"
            eventKey="0"
            className="title"
          >
            Filter By
          </Accordion.Toggle>
          <Button className="text-dark ml-1 icon">
            <FontAwesomeIcon icon={faHandPointLeft} className="mr-1" />
            (Click here)
          </Button>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <form id="form">
              <Row className="mt-2">
                <label id="inputlabel" htmlFor="myInput">
                  Color :-
                </label>
                {color.map((filter) => (
                  <div key={uuidv4()} className="checkboxes">
                    <input
                      id={filter}
                      className="checkbox"
                      type="checkbox"
                      checked={activeFilter.includes(filter)}
                      onChange={() => {
                        onFilterChange(filter);
                      }}
                    />
                    <label htmlFor="color_filter">{filter}</label>
                  </div>
                ))}
              </Row>
              <Row className="mt-2">
                <label id="inputlabel" htmlFor="myInput">
                  Clarity :-
                </label>
                {clarity.map((filter) => (
                  <div key={uuidv4()} className="checkboxes">
                    <input
                      id={filter}
                      className="checkbox"
                      type="checkbox"
                      checked={activeFilter.includes(filter)}
                      onChange={() => {
                        onFilterChange(filter);
                      }}
                    />
                    <label htmlFor="clarity_filter">{filter}</label>
                  </div>
                ))}
              </Row>
              <Row className="mt-2">
                <label id="inputlabel" htmlFor="myInput">
                  Cut :-
                </label>
                {cut.map((filter) => (
                  <div key={uuidv4()} className="checkboxes">
                    <input
                      id={filter}
                      className="checkbox"
                      type="checkbox"
                      checked={activeFilter.includes(filter)}
                      onChange={() => {
                        onFilterChange(filter);
                      }}
                    />
                    <label htmlFor="cut_filter">{filter}</label>
                  </div>
                ))}
              </Row>
              <Row className="mt-2">
                <label id="inputlabel" htmlFor="myInput">
                  Polish :-
                </label>
                {polish.map((filter) => (
                  <div key={uuidv4()} className="checkboxes">
                    <input
                      id={filter}
                      className="checkbox"
                      type="checkbox"
                      checked={activeFilter.includes(filter)}
                      onChange={() => {
                        onFilterChange(filter);
                      }}
                    />
                    <label htmlFor="polish_filter">{filter}</label>
                  </div>
                ))}
              </Row>
            </form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );

  const generateRaws = categories.map((category, i) => {
    return (
      <tbody>
        <tr key={i}>
          <td colSpan={headers.length} id="title">
            {category}
          </td>
        </tr>
        {filterData.map((d, key) => {
          if (d.CATEGORY === category) {
            return (
              <tr key={key}>
                {headers.map((h, i) => {
                  return <td key={i}>{d[h.selector]}</td>;
                })}
              </tr>
            );
          }
        })}
      </tbody>
    );
  });

  return (
    <>
      <Menu {...props} />
      <div className="wrapper">
        <BlockUi tag="div" blocking={showLoader} message="Loading, please wait">
          <Container fluid>
            <Row>
              {advanceSearchForm}
              <table>
                <thead>
                  <tr>
                    {headers.map((h, i) => {
                      return (
                        <th className="text-center" key={i}>
                          {h.name}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                {generateRaws}
              </table>
            </Row>
          </Container>
        </BlockUi>
      </div>
    </>
  );
};
export default AdvanceSearch;
