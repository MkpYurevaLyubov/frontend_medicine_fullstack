import React, {useEffect, useState} from "react";
import Selected from "../elements/Selected";
import AddFilterDate from "../../icons/plus.svg";
import {IFormFilterOrdersProps} from "../../types/interfaces";
import "./formFilterOrders.scss";
import InputDate from "../elements/InputDate";
import Buttons from "../elements/Button";

const methods = [
  {
    id: "",
    fullname: "None"
  },
  {
    id: "patientsname",
    fullname: "По имени"
  },
  {
    id: "doctorid",
    fullname: "По врачу"
  },
  {
    id: "dateorder",
    fullname: "По дате"
  }
];

const type = [
  {
    id: "asc",
    fullname: "По возрастанию"
  },
  {
    id: "desc",
    fullname: "По убыванию"
  }
];

const FormFilterOrders: React.FC<IFormFilterOrdersProps> = ({filter, onChange, ftrWithDate, changeBtnFltDate, onClickSaveDate}) => {
  return (
    <>
      <div className="formFilterOrdersOneLine">
        <div className="selected">
          <Selected
            values={methods}
            value={filter.method}
            onChange={(e) => onChange("method", e)}
            title="Сортировать по:"
          />
        </div>
        <div className="selected">
          {filter && filter.method &&
            <Selected
              values={type}
              value={filter.type}
              onChange={(e) => onChange("type", e)}
              title="Направление:"
            />
          }
        </div>
      </div>
      <div className="formFilterOrdersTwoLine">
        {filter && filter.method && filter.type &&
          <>
            <div
              className={`addFilterDate ${ftrWithDate && "display"}`}
              onClick={changeBtnFltDate}
            >
              <p>Добавить фильтр по дате:</p>
              <img src={AddFilterDate} alt="Add Filter Date"/>
            </div>
            {ftrWithDate &&
              <>
                <div className="inputsFilterDate">
                  <InputDate
                    title="C:"
                    value={new Date(filter.from)}
                    onChange={(e) => onChange("from", e)}
                  />
                </div>
                <div className="inputsFilterDate">
                  <InputDate
                    title="По:"
                    value={new Date(filter.to)}
                    onChange={(e) => onChange("to", e)}
                  />
                </div>
                <div className="btnFilterDate">
                  <Buttons
                    text="Фильтровать"
                    onClick={onClickSaveDate}
                    disabled={false}
                  />
                </div>
                <div className="btnFilterDate">
                  <Buttons
                    text="Закрыть"
                    onClick={changeBtnFltDate}
                    disabled={false}
                  />
                </div>
              </>
            }
          </>
        }
      </div>
    </>
  );
};

export default FormFilterOrders;